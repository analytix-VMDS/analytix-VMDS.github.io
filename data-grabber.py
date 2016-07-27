#!/usr/bin/env python

#from urllib.request import urlopen
import urllib.request
import requests
import os
import json

resp = requests.get('http://demo.ckan.org/api/3/action/group_list')

if resp.status_code != 200:
    # This means something went wrong.
    raise ApiError('GET /tasks/ {}'.format(resp.status_code))
#for todo_item in resp.json():
#    print(todo_item[1])
#    print('{} {}'.format)
#    print('{} {}'.format(todo_item['id'], todo_item['summary']))

#url = 'http://demo.ckan.org/api/3/action/group_list'
#response = urllib.urlopen(url)

#d = json.load(response)
#print(d)
r = resp.json()
data = json.dumps(r)
print(data)

#data = resp.content #json().dumps('http://demo.ckan.org/api/3/action/group_list')
#print(resp.json()["result"][2])
#print(resp.content)

newfile = open(os.path.join("json","test.json"), 'w')
newfile.write(str(data))#.decode('utf-8')
newfile.close()

#file = open("newfile.txt", "r")
#print file.read()

#file.write("hello world in the new file")
           
#file.write("and another line")
                      
#file.close()