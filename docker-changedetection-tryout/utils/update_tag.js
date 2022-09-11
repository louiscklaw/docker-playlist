const fs = require('fs')

const target_json_file = '/home/logic/_workspace/docker-playlist/docker-changedetection-tryout/volumes/private-changedetect/datastore/url-watches.json'

var raw_json = JSON.parse(fs.readFileSync(target_json_file,{encoding:'utf-8'})  )

Object.keys(raw_json.watching).forEach(k => {


  if (raw_json.watching[k].url.search(/.*missav.com\/actresses.*/) != -1){
    raw_json.watching[k].tag = 'missav.com/actresses'
  }

  if (raw_json.watching[k].url.search(/.*missav.com\/series.*/) != -1){
    raw_json.watching[k].tag = 'missav.com/series'
  }

  if (raw_json.watching[k].url.search(/.*missav.com\/genres.*/) != -1){
    raw_json.watching[k].tag = 'missav.com/genres'
  }

  
  if (raw_json.watching[k].url.search(/.*supjav.com\/ja\/category.*/) != -1){
    raw_json.watching[k].tag = 'supjav.com/category'
  }
  
  if (raw_json.watching[k].url.search(/.*supjav.com\/ja\/tag.*/) != -1){
    raw_json.watching[k].tag = 'supjav.com/tag'
  }
  
  if (raw_json.watching[k].url.search(/.*av01.tv\/actor.*/) != -1){
    raw_json.watching[k].tag = 'av01.tv/actor'
  }
  
  if (raw_json.watching[k].url.search(/.*av01.tv\/series.*/) != -1){
    raw_json.watching[k].tag = 'av01.tv/series'
  }
  
  if (raw_json.watching[k].url.search(/.*jable.tv\/tags.*/) != -1){
    raw_json.watching[k].tag = 'jable.tv\/tags'
  }
  
  if (raw_json.watching[k].url.search(/.*jable.tv\/models.*/) != -1){
    raw_json.watching[k].tag = 'jable.tv\/models'
  }

  if (raw_json.watching[k].url.search(/.*jable.tv\/search.*/) != -1){
    raw_json.watching[k].tag = 'jable.tv\/search'
  }
  
  if (raw_json.watching[k].url.search(/.*carousell.com.hk\/search.*/) != -1){
    raw_json.watching[k].tag = 'carousell.com.hk\/search'
  }
  
  if (raw_json.watching[k].url.search(/.*carousell.com.hk.*\/free-items.*/) != -1){
    raw_json.watching[k].tag = 'categories\/free-items'
  }
  
  if (raw_json.watching[k].url.search(/.*carousell.com.hk\/p\/.*/) != -1){
    raw_json.watching[k].tag = 'categories\/products'
  }
  
  if (raw_json.watching[k].url.search(/.*carousell.com.hk\/u\/.*/) != -1){
    raw_json.watching[k].tag = 'categories\/user'
  }

  if (raw_json.watching[k].url.search(/.*world\.taobao\.com\/product.*/) != -1){
    raw_json.watching[k].tag = 'world.taobao.com/product'
  }

  if (raw_json.watching[k].url.search(/.*world\.taobao\.com\/dianpu\/.*/) != -1){
    raw_json.watching[k].tag = 'world.taobao.com\/dianpu'
  }

  raw_json.watching[k].title = ''
  raw_json.watching[k].last_error = ''
  raw_json.watching[k].extract_title_as_title = true
  raw_json.watching[k].last_notification_error = false
  
})

console.log(JSON.stringify(raw_json.watching['702d2306-3416-496a-9618-206bc8b26396'], null, 2))
fs.writeFileSync(target_json_file,JSON.stringify(raw_json,null, 2), {encoding:'utf-8'})