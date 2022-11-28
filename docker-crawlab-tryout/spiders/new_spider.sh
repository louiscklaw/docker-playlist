#!/usr/bin/env bash

set -ex


scrapy startproject scrapy_quotes

pushd scrapy_quotes
  scrapy genspider quotes quotes.toscrape.com
