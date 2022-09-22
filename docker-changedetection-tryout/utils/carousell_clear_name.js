const fs = require('fs')

const target_json_file = '/home/logic/_workspace/docker-playlist/docker-changedetection-tryout/volumes/carousell-changedetect/datastore/url-watches.json'

var raw_json = JSON.parse(fs.readFileSync(target_json_file,{encoding:'utf-8'})  )

Object.keys(raw_json.watching).forEach(k => {
  // k = '78a864ac-22ac-45b0-ba6c-99776154385d'

  console.log('hit',k)
  raw_json.watching[k]["title"]= ""
  raw_json.watching[k]["last_checked"]= 1563778989

  // console.log(raw_json.watching['78a864ac-22ac-45b0-ba6c-99776154385d'])
  // process.exit()
})



fs.writeFileSync(target_json_file,JSON.stringify(raw_json,null, 2), {encoding:'utf-8'})