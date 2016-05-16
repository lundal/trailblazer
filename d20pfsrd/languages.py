#!/bin/python

import entry

index = []

def processEntry(line):
    data = line.replace("\n", "").replace("\"", "\\\"").split("\t")
    path = "languages/{:0>4d}.json".format(len(index))
    with open(path, 'w') as outfile:
        index.append(data[0]);
        requirements = ""
        for requirement in data[6:13]:
            if requirement:
                if requirements:
                    requirements += ", "
                requirements += requirement
        entry.begin(outfile)
        entry.add("name", data[0], outfile)
        entry.add("spokenby", data[1], outfile)
        entry.add("description", data[2], outfile)
        entry.end(outfile)

def writeIndex():
    path = "languages/index.json"
    with open(path, 'w') as outfile:
        outfile.write("{\n")
        outfile.write("\"languages\":[\n")
        for entry in index[0:-1]:
            outfile.write("\"" + entry + "\",\n")
        outfile.write("\"" + index[-1] + "\"\n")
        outfile.write("]\n")
        outfile.write("}\n")

with open("languages.txt") as infile:
    first = True
    for line in infile:
        if first == True:
            first = False
            continue
        processEntry(line)
    writeIndex()
