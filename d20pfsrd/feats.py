#!/bin/python

import entry

index = []

def processEntry(line):
    data = line.replace("\"", "\\\"").split("\t")
    path = "feats/{:0>4d}.json".format(len(index))
    with open(path, 'w') as outfile:
        index.append(data[1]);
        entry.begin(outfile)
        entry.add("name", data[1], outfile)
        entry.add("type", data[2], outfile)
        entry.add("description", data[3], outfile)
        entry.add("prequesites", data[4], outfile)
        entry.add("benefit", data[6], outfile)
        entry.add("normal", data[7], outfile)
        entry.add("special", data[8], outfile)
        entry.end(outfile)

def writeIndex():
    path = "feats/index.json"
    with open(path, 'w') as outfile:
        outfile.write("{\n")
        outfile.write("\"feats\":[\n")
        for entry in index[0:-1]:
            outfile.write("\"" + entry + "\",\n")
        outfile.write("\"" + index[-1] + "\"\n")
        outfile.write("]\n")
        outfile.write("}\n")

with open("feats.txt") as infile:
    first = True
    for line in infile:
        if first == True:
            first = False
            continue
        processEntry(line)
    writeIndex()
