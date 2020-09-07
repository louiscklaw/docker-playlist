#!/usr/bin/env python3

import os,sys
from pprint import pprint

import requests

r = requests.get('https://api.github.com/events')

print(r.text)

print('helloworld')
