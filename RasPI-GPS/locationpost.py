# TO DO
# Get location with GPS sensor
# Send data to Server/ Mongo DB

import time
import requests
import grovepi
import sys

_port = ? #declare GPS port
url = "http://0.0.0.0:3000/cars" #input server ip

while True:
  
  try:
    # get ID for car and set it to variable ID

    # Read GPs location

    # code to read GPS location her

    payload = { 'LOC' : loc, 'id' : ID }

    requests.post(url, data=payload)    # write data

    time.sleep(10.0)           # 10 second delay

  except KeyboardInterrupt:
    print "Terminating"
    break
  except IOError:
    print "IOError, continuing"
  except:
    print "Unexpected error, continuing"
    print "sys.exc_info()[0]: ", sys.exc_info()[0]

