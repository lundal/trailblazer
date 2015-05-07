#!/bin/python

index = []

def processEntry(line):
    data = line.replace("\"", "\\\"").split("\t")
    path = "spells/{:0>4d}.json".format(len(index))
    with open(path, 'w') as outfile:
        index.append(data[0]);
        outfile.write("{\n")
        outfile.write("\"name\":\"" + data[0] + "\",\n")
        outfile.write("\"school\":\"" + data[1] + "\",\n")
        outfile.write("\"subschool\":\"" + data[2] + "\",\n")
        #outfile.write("\"domain\":\"" + data[43] + "\",\n")
        outfile.write("\"castingtime\":\"" + data[5] + "\",\n")
        outfile.write("\"components\":\"" + data[6] + "\",\n")
        outfile.write("\"range\":\"" + data[8] + "\",\n")
        outfile.write("\"area\":\"" + data[9] + "\",\n")
        outfile.write("\"effect\":\"" + data[10] + "\",\n")
        outfile.write("\"target\":\"" + data[11] + "\",\n")
        outfile.write("\"duration\":\"" + data[12] + "\",\n")
        outfile.write("\"savingthrow\":\"" + data[15] + "\",\n")
        outfile.write("\"spellresistance\":\"" + data[16] + "\",\n")
        outfile.write("\"description\":\"" + data[17] + "\",\n")
        #outfile.write("\"descriptionformatted\":\"" + data[18] + "\",\n")
        outfile.write("\"descriptionshort\":\"" + data[44] + "\"\n") # No comma
        outfile.write("}\n")

def writeIndex():
    path = "spells/index.json"
    with open(path, 'w') as outfile:
        outfile.write("{\n")
        outfile.write("\"spells\":[\n")
        for entry in index[0:-1]:
            outfile.write("\"" + entry + "\",\n")
        outfile.write("\"" + index[-1] + "\"\n")
        outfile.write("]\n")
        outfile.write("}\n")

with open("spells.txt") as infile:
    first = True
    for line in infile:
        if first == True:
            first = False
            continue
        processEntry(line)
    writeIndex()
