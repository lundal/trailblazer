#!/bin/python

import re

with open("linguistics.txt") as infile:
    with open("languages.txt", 'w') as outfile:
        state = "waiting"
        for line in infile:
            line = line.replace("\n", "").replace("“", "\"").replace("”", "\"").replace(".\"", "\".")

            if state == "waiting" and "<a name=\"TOC-Learn-a-Language\">" in line:
                state = "name"
                continue

            if state != "waiting" and "</div>" in line:
                state = "waiting"
                continue

            if (state == "name" or state == "description") and "<h4" in line:
                if (state == "description"):
                    outfile.write("\t")
                notags = re.sub("<[^<>]*>", "", line)
                nameonly = re.sub(" \\(.*\\)", "", notags)
                outfile.write("\n" + nameonly)
                state = "spokenby"
                continue

            if state == "spokenby" and "<b>" in line:
                notags = re.sub("<[^<>]*>", "", line)
                aftercolon = re.sub("^[^:]*: ", "", notags)
                nodot = re.sub("\\.", "", aftercolon)
                outfile.write("\t" + nodot)
                state = "description"
                continue

            if state == "description" and "<p>" in line:
                notags = re.sub("<[^<>]*>", "", line)
                outfile.write("\t" + notags)
                state = "name"
                continue
