#!/bin/python

index = []

def processEntry(line):
    data = line.replace("\"", "\\\"").split("\t")
    path = "feats/{:0>4d}.json".format(len(index))
    with open(path, 'w') as outfile:
        index.append(data[1]);
        outfile.write("{\n")
        outfile.write("\"name\":\"" + data[1] + "\",\n")
        outfile.write("\"type\":\"" + data[2] + "\",\n")
        outfile.write("\"description\":\"" + data[3] + "\",\n")
        outfile.write("\"prequesites\":\"" + data[4] + "\",\n")
        outfile.write("\"benefit\":\"" + data[6] + "\",\n")
        outfile.write("\"normal\":\"" + data[7] + "\",\n")
        outfile.write("\"special\":\"" + data[8] + "\"\n") # No comma
        outfile.write("}\n")

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
