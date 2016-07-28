#!/usr/bin/env python
import urllib.request
import requests
import os
import json
import cgitb
import cgi
from flask import Flask
import pico
#app = Flask(__name__)

#@app.route('/index.html')#//localhost.8888')
#def hello_world():
#    return 'Hello, World!'

#cgitb.enable() #This will show any errors on your webpage

#inputs = cgi.FieldStorage() #REMEMBER: We do not have inputs, simply a button to run the program. In order to get inputs, give each one a name and call it by inputs['insert_name']


#url = 'http://tidesandcurrents.noaa.gov/sltrends/mslUSTrendsTable.htm'
#response = urllib.request.urlopen(url)
#data = response.read()      # a `bytes` object
#text = data.decode('utf-8') # a `str`; this step can't be used if data is binary
#print(text)

#def pyth:

urls=['http://services.cngnow.com/V1/Stations.svc/external/circlefilter?latitude=35.4675&longitude=-97.5161&range=15&status=active',
      'http://apiv3.iucnredlist.org/api/v3/species/countries/name/Loxodonta%20africana?token=9bb4facb6d23f48efbf424bb05c0c1ef1cf6f468393bc745d42179ac4aca5fee',
      'http://elections.huffingtonpost.com/pollster/api/charts.json']

#print(urls)

for index, urllist in enumerate(urls):
    resp = requests.get(urllist)

    print(resp)

    if resp.status_code != 200:
        raise ApiError('GET /tasks/ {}'.format(resp.status_code))

    r = resp.json()
    data = json.dumps(r)
    #print(data)
    print(index)

    newfile = open(os.path.join("json","file"+str(index)+".json"), 'w')
    newfile.write(str(data))
    newfile.close()

#pyth()
