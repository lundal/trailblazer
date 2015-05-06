.PHONY: clean

db.json: feats.txt spells.txt
	echo "{" > db.json
	./feats.py >> db.json
	./spells.py >> db.json
	echo "}" >> db.json

feats.txt:
	wget -O feats.txt "https://docs.google.com/spreadsheet/pub?key=0Ak-IxjmMq9NMdHhobmxRSzBJQ2JjVXJaYkFwZjM0MlE&output=txt"
#	wget -O feats.txt "https://docs.google.com/spreadsheet/pub?key=0AhwDI9kFz9SddEJPRDVsYVczNVc2TlF6VDNBYTZqbkE&output=txt"

spells.txt:
	wget -O spells.txt "https://spreadsheets.google.com/pub?key=0Ak-IxjmMq9NMdHdnME9hZXIzdTBJam1kYkVUWUZKQ1E&output=txt"
#	wget -O spells.txt "https://spreadsheets.google.com/pub?key=0AhwDI9kFz9SddG5GNlY5bGNoS2VKVC11YXhMLTlDLUE&output=txt"

clean:
	rm *.txt
	rm *.json
