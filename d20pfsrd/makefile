.PHONY: all feats spells traits clean

all: feats spells traits

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
	wget -O $@ "https://spreadsheets.google.com/pub?key=0Ak-IxjmMq9NMdHFZTl9mZUhOWUVzT3JxRGJTWU9lMkE&output=txt"

traits: traits.txt
	mkdir -p traits
	python traits.py

clean:
	rm -f *.txt
	rm -rf __pycache__
	rm -rf feats spells traits
