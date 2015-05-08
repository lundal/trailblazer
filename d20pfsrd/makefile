.PHONY: all clean

all: feats.txt spells.txt traits.txt
	mkdir -p feats spells traits
	python feats.py
	python spells.py
	python traits.py

feats.txt:
	wget -O feats.txt "https://docs.google.com/spreadsheet/pub?key=0Ak-IxjmMq9NMdHhobmxRSzBJQ2JjVXJaYkFwZjM0MlE&output=txt"
#	wget -O feats.txt "https://docs.google.com/spreadsheet/pub?key=0AhwDI9kFz9SddEJPRDVsYVczNVc2TlF6VDNBYTZqbkE&output=txt"

spells.txt:
	wget -O spells.txt "https://spreadsheets.google.com/pub?key=0Ak-IxjmMq9NMdHdnME9hZXIzdTBJam1kYkVUWUZKQ1E&output=txt"
#	wget -O spells.txt "https://spreadsheets.google.com/pub?key=0AhwDI9kFz9SddG5GNlY5bGNoS2VKVC11YXhMLTlDLUE&output=txt"

traits.txt:
	wget -O traits.txt "https://spreadsheets.google.com/pub?key=0Ak-IxjmMq9NMdHFZTl9mZUhOWUVzT3JxRGJTWU9lMkE&output=txt"

clean:
	rm -r feats spells
	rm *.txt
