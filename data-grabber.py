import requests
import os

resp = requests.get('http://demo.ckan.org/api/3/action/group_list')
if resp.status_code != 200:
    # This means something went wrong.
    raise ApiError('GET /tasks/ {}'.format(resp.status_code))
#for todo_item in resp.json():
#    print(todo_item[1])
#    print('{} {}'.format)
#    print('{} {}'.format(todo_item['id'], todo_item['summary']))

data = resp.content
#print(resp.json()["result"][2])
#print(resp.content)

newfile = open(os.path.join("json","test.json"), 'w')
newfile.write(str(data))
newfile.close()

#file = open("newfile.txt", "r")
#print file.read()

#file.write("hello world in the new file")
           
#file.write("and another line")
                      
#file.close()