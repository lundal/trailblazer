.PHONY: all feats spells traits languages clean

all: feats spells traits languages

feats.txt:
	wget -O $@ "https://docs.google.com/spreadsheet/pub?key=0Ak-IxjmMq9NMdHhobmxRSzBJQ2JjVXJaYkFwZjM0MlE&output=txt" # OGL
#	wget -O $@ "https://docs.google.com/spreadsheet/pub?key=0AhwDI9kFz9SddEJPRDVsYVczNVc2TlF6VDNBYTZqbkE&output=txt" # OGL+Paizo

feats: feats.txt
	mkdir -p feats
	python feats.py

spells.txt:
	wget -O $@ "https://spreadsheets.google.com/pub?key=0Ak-IxjmMq9NMdHdnME9hZXIzdTBJam1kYkVUWUZKQ1E&output=txt" # OGL
#	wget -O $@ "https://spreadsheets.google.com/pub?key=0AhwDI9kFz9SddG5GNlY5bGNoS2VKVC11YXhMLTlDLUE&output=txt" # OGL+Paizo

spells: spells.txt
	mkdir -p spells
	python spells.py

traits.txt:
	wget -O $@ "https://docs.google.com/spreadsheets/d/1OQH-t50ZqZ-WSajGRbaALzbExij2mL-i13G_p054jig/export?format=tsv"

traits: traits.txt
	mkdir -p traits
	python traits.py

linguistics.txt:
	wget -O $@ "http://www.d20pfsrd.com/skills/linguistics"

languages.txt: linguistics.txt
	python linguistics.py

languages: languages.txt
	mkdir -p languages
	python languages.py

clean:
	rm -f *.txt
	rm -rf __pycache__
	rm -rf feats spells traits languages
