#!/bin/python

import entry

index = []

def processEntry(line):
    data = line.replace("\"", "\\\"").split("\t")
    path = "spells/{:0>4d}.json".format(len(index))
    with open(path, 'w') as outfile:
        index.append(data[0]);
        entry.begin(outfile)
        entry.add("name", data[0], outfile)
        entry.add("school", data[1], outfile)
        entry.add("subschool", data[2], outfile)
        entry.add("domain", data[43], outfile)
        entry.add("castingtime", data[5], outfile)
        entry.add("components", data[6], outfile)
        entry.add("range", data[8], outfile)
        entry.add("area", data[9], outfile)
        entry.add("effect", data[10], outfile)
        entry.add("target", data[11], outfile)
        entry.add("duration", data[12], outfile)
        entry.add("savingthrow", data[15], outfile)
        entry.add("spellresistance", data[16], outfile)
        entry.add("description", data[17], outfile)
        #entry.add("descriptionformatted", data[18], outfile)
        entry.add("descriptionshort", data[44], outfile)
        entry.end(outfile)

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
