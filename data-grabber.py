#!/usr/bin/env python
import urllib.request
import requests
import os
import json

#url = 'http://tidesandcurrents.noaa.gov/sltrends/mslUSTrendsTable.htm'
#response = urllib.request.urlopen(url)
#data = response.read()      # a `bytes` object
#text = data.decode('utf-8') # a `str`; this step can't be used if data is binary
#print(text)

resp = requests.get('http://services.cngnow.com/V1/Stations.svc/external/circlefilter?latitude=35.4675&longitude=-97.5161&range=15&status=active')

if resp.status_code != 200:
    raise ApiError('GET /tasks/ {}'.format(resp.status_code))

r = resp.json()
data = json.dumps(r)
print(data)

newfile = open(os.path.join("json","test.json"), 'w')
newfile.write(str(data))
newfile.close()
