#!/bin/python

def begin(file):
    file.write("{\n")

def add(key, value, file):
    if value: # Skip empty values
        file.write("\"" + key + "\":\"" + value + "\",\n");

def end(file):
    file.seek(file.tell() - 2)
    file.write("\n}\n")

