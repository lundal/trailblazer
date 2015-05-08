#!/bin/python

import entry

index = []

def processEntry(line):
    data = line.replace("\"", "\\\"").split("\t")
    path = "traits/{:0>4d}.json".format(len(index))
    with open(path, 'w') as outfile:
        index.append(data[4]);
        requirements = ""
        for requirement in data[6:13]:
            if requirement:
                if requirements:
                    requirements += ", "
                requirements += requirement
        entry.begin(outfile)
        entry.add("name", data[4], outfile)
        entry.add("type", data[2], outfile)
        entry.add("category", data[3], outfile)
        entry.add("requirements", requirements, outfile)
        entry.add("description", data[13], outfile)
        entry.add("url", data[0], outfile)
        entry.end(outfile)

def writeIndex():
    path = "traits/index.json"
    with open(path, 'w') as outfile:
        outfile.write("{\n")
        outfile.write("\"traits\":[\n")
        for entry in index[0:-1]:
            outfile.write("\"" + entry + "\",\n")
        outfile.write("\"" + index[-1] + "\"\n")
        outfile.write("]\n")
        outfile.write("}\n")

with open("traits.txt") as infile:
    first = True
    for line in infile:
        if first == True:
            first = False
            continue
        processEntry(line)
    writeIndex()
