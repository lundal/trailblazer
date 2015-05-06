#!/bin/python

print("\"spells\":[")

with open("spells.txt") as file:
    first = True
    for line in file:
        data = line.replace("\"", "\\\"").split("\t")
        if first == True:
            first = False
            continue
        print("{")
        print("\"name\":\"" + data[0] + "\",")
        print("\"school\":\"" + data[1] + "\",")
        print("\"subschool\":\"" + data[2] + "\",")
        print("\"castingtime\":\"" + data[5] + "\",")
        print("\"components\":\"" + data[6] + "\",")
        print("\"range\":\"" + data[8] + "\",")
        print("\"area\":\"" + data[9] + "\",")
        print("\"effect\":\"" + data[10] + "\",")
        print("\"target\":\"" + data[11] + "\",")
        print("\"duration\":\"" + data[12] + "\",")
        print("\"savingthrow\":\"" + data[15] + "\",")
        print("\"spellresistance\":\"" + data[16] + "\",")
        print("\"description\":\"" + data[17] + "\",")
        #print("\"descriptionformatted\":\"" + data[18] + "\",")
        print("\"descriptionshort\":\"" + data[44] + "\",")
        print("\"domain\":\"" + data[43] + "\",")
        print("},")

print("],")

# TODO: Index
