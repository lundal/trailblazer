FONTS=$(shell find bootstrap/fonts -name '*.*') $(shell find fonts -name '*.*')

D20PFSRDFOLDER=d20pfsrd
D20PFSRD=$(D20PFSRDFOLDER)/feats $(D20PFSRDFOLDER)/spells $(D20PFSRDFOLDER)/traits $(D20PFSRDFOLDER)/languages
D20PFSRDBUILD=$(shell find $(D20PFSRDFOLDER) -name '*.py') $(D20PFSRDFOLDER)/makefile

LIBJS=angular/angular.min.js angular/angular-route.min.js angular/angular-ui-bootstrap.min.js lz-string/lz-string.min.js mqgenie/mq.genie.min.js
LIBCSS=bootstrap/css/bootstrap.min.css bootstrap/css/bootstrap-theme.min.css

APPVIEWS=$(shell find views -name '*.html')
APPCSS=$(shell find styles -name '*.css')
APPCSSALL=appcssall.temp
APPCSSMIN=appcssmin.temp
APPJS=$(shell find js services controllers -name '*.js')
APPJSALL=appjs.temp
APPJSMIN=appjsmin.temp

VIEWS=views.temp
CSS=css.temp
JS=js.temp

TEMPLATE=template.html
DRIVEID=driveid.txt

OUTFOLDER=out
OUT=$(OUTFOLDER)/index.html

.PHONY: clean

build: $(OUT)

clean:
	rm -f $(shell find . -name '*.temp')
	rm -rf $(OUTFOLDER)
	cd $(D20PFSRDFOLDER) && make clean

$(VIEWS): $(APPVIEWS)
	rm -f $@
	for view in $(APPVIEWS); do \
		echo "<script type=\"text/ng-template\" id=\"$$view\">" >> $@; \
		cat $$view >> $@; \
		echo "</script>" >> $@; \
	done

$(APPCSSALL): $(APPCSS)
	cat $^ > $@

$(APPCSSMIN): $(APPCSSALL)
	curl -X POST -s --data-urlencode 'input@$<' https://cssminifier.com/raw > $@

$(CSS): $(LIBCSS) $(APPCSSMIN)
	cat $^ > $@

$(APPJSALL): $(APPJS)
	cat $^ > $@

$(APPJSMIN): $(APPJSALL)
	curl -X POST -s --data-urlencode 'input@$<' https://javascript-minifier.com/raw > $@

$(JS): $(LIBJS) $(APPJSMIN)
	cat $^ > $@

$(D20PFSRD): $(D20PFSRDBUILD)
	cd $(D20PFSRDFOLDER) && make all

$(OUT): $(VIEWS) $(CSS) $(JS) $(TEMPLATE) $(DRIVEID) $(FONTS) $(D20PFSRD)
	mkdir -p $(OUTFOLDER)
	cat $(TEMPLATE) \
	| sed \
	-e '/@VIEWS/{' -e 'r $(VIEWS)' -e 'd}' \
	-e '/@CSS/{' -e 'r $(CSS)' -e 'd}' \
	-e '/@JS/{' -e 'r $(JS)' -e 'a ;\n' -e 'd}' \
	| sed \
	-e 's/@DRIVEID/$(shell cat $(DRIVEID))/' \
	-e 's/^  *//g' -e 's/  *$$//g' > $@
	# Add fonts
	mkdir -p $(OUTFOLDER)/fonts/
	cp -f $(FONTS) $(OUTFOLDER)/fonts/
	sed -i -e 's/..\/fonts/fonts/g' $@
	# Add d20pfsrd
	cp -rf $(D20PFSRD) $(OUTFOLDER)/
	sed -i -e 's/d20pfsrd\///g' $@
