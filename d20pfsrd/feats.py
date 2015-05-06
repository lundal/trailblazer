#!/bin/python

print("\"feats\":[")

with open("feats.txt") as file:
    first = True
    for line in file:
        data = line.replace("\"", "\\\"").split("\t")
        if first == True:
            first = False
            continue
        print("{")
        print("\"name\":\"" + data[1] + "\",")
        print("\"type\":\"" + data[2] + "\",")
        print("\"description\":\"" + data[3] + "\",")
        print("\"prequesites\":\"" + data[4] + "\",")
        print("\"benefit\":\"" + data[6] + "\",")
        print("\"normal\":\"" + data[7] + "\",")
        print("\"special\":\"" + data[8] + "\",")
        print("},")

print("],")

# TODO: Index
