const fs = require('fs')

const target_json_file = '/home/logic/_workspace/docker-playlist/docker-changedetection-tryout/volumes/private-changedetect/datastore/url-watches.json'

var raw_json = JSON.parse(fs.readFileSync(target_json_file,{encoding:'utf-8'})  )

Object.keys(raw_json.watching).forEach(k => {
  if ( raw_json.watching[k].tag.search(/missav.com\/actresses/) != -1){
    console.log('hit',k)
    raw_json.watching[k]["css_filter"]= "/html/body/div[1]/div[2]/div[3]"
    raw_json.watching[k]["check_unique_lines"]= true

    // "last_checked": 0,
    // "last_viewed": 0,
    raw_json.watching[k]["last_checked"]= 0
    raw_json.watching[k]["last_viewed"]= 0
  }

})



fs.writeFileSync(target_json_file,JSON.stringify(raw_json,null, 2), {encoding:'utf-8'})