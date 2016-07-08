D20PFSRDFOLDER=d20pfsrd
D20PFSRD=$(D20PFSRDFOLDER)/feats $(D20PFSRDFOLDER)/spells $(D20PFSRDFOLDER)/traits $(D20PFSRDFOLDER)/languages
D20PFSRDBUILD=$(shell find $(D20PFSRDFOLDER) -name '*.py') $(D20PFSRDFOLDER)/makefile

EXTFOLDER=external
EXTFONTS=$(shell find $(EXTFOLDER)/fonts -name '*.*')
EXTJS=$(shell find $(EXTFOLDER)/js -name '*.js')
EXTCSS=$(shell find $(EXTFOLDER)/css -name '*.css')

SRCFOLDER=source
SRCVIEWS=$(shell find $(SRCFOLDER)/views -name '*.html')
SRCCSS=$(shell find $(SRCFOLDER)/css -name '*.css')
SRCJS=$(shell find $(SRCFOLDER)/js $(SRCFOLDER)/services $(SRCFOLDER)/sections -name '*.js')

TMPFOLDER=temp
TMPSRCCSSALL=$(TMPFOLDER)/source.css
TMPSRCCSSMIN=$(TMPFOLDER)/source.min.css
TMPSRCJSALL=$(TMPFOLDER)/source.js
TMPSRCJSMIN=$(TMPFOLDER)/source.min.js

VIEWS=$(TMPFOLDER)/views.html
CSS=$(TMPFOLDER)/app.css
JS=$(TMPFOLDER)/app.js

TEMPLATE=$(SRCFOLDER)/app.html
DRIVEID=driveid.txt

OUTFOLDER=build
OUT=$(OUTFOLDER)/index.html

.PHONY: clean

build: $(OUT)

clean:
	rm -rf $(TMPFOLDER)
	rm -rf $(OUTFOLDER)
	cd $(D20PFSRDFOLDER) && make clean

$(VIEWS): $(SRCVIEWS)
	mkdir -p $(TMPFOLDER)
	rm -f $@
	for view in $(SRCVIEWS); do \
		echo "<script type=\"text/ng-template\" id=\"$$view\">" >> $@; \
		cat $$view >> $@; \
		echo "</script>" >> $@; \
	done

$(TMPSRCCSSALL): $(SRCCSS)
	mkdir -p $(TMPFOLDER)
	cat $^ > $@

$(TMPSRCCSSMIN): $(TMPSRCCSSALL)
	mkdir -p $(TMPFOLDER)
	curl -X POST -s --data-urlencode 'input@$<' https://cssminifier.com/raw > $@

$(CSS): $(EXTCSS) $(TMPSRCCSSMIN)
	mkdir -p $(TMPFOLDER)
	cat $^ > $@

$(TMPSRCJSALL): $(SRCJS)
	mkdir -p $(TMPFOLDER)
	cat $^ > $@

$(TMPSRCJSMIN): $(TMPSRCJSALL)
	mkdir -p $(TMPFOLDER)
	cat $< > $@
	#curl -X POST -s --data-urlencode 'input@$<' https://javascript-minifier.com/raw > $@

$(JS): $(EXTJS) $(TMPSRCJSMIN)
	mkdir -p $(TMPFOLDER)
	cat $^ > $@

$(D20PFSRD): $(D20PFSRDBUILD)
	cd $(D20PFSRDFOLDER) && make all

$(OUT): $(VIEWS) $(CSS) $(JS) $(TEMPLATE) $(DRIVEID) $(EXTFONTS) $(D20PFSRD)
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
	cp -f $(EXTFONTS) $(OUTFOLDER)/fonts/
	sed -i -e 's/..\/fonts/fonts/g' $@
	# Add d20pfsrd
	cp -rf $(D20PFSRD) $(OUTFOLDER)/
	sed -i -e 's/d20pfsrd\///g' $@
