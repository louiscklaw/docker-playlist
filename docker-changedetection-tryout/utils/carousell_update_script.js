const fs = require('fs')

const target_json_file = '/home/logic/_workspace/docker-playlist/docker-changedetection-tryout/volumes/carousell-changedetect/datastore/url-watches.json'

var raw_json = JSON.parse(fs.readFileSync(target_json_file,{encoding:'utf-8'})  )

Object.keys(raw_json.watching).forEach(k => {
  // k = '78a864ac-22ac-45b0-ba6c-99776154385d'

  if ( raw_json.watching[k].tag.search(/categories\/products/) != -1){
    console.log('hit',k)
    raw_json.watching[k]["webdriver_js_execute_code"]= `
document.querySelectorAll('main > div > div')[0]?.remove()
document.querySelectorAll('.D_ahP.D_aRz').forEach(el => el?.remove())
document.querySelectorAll('#bannerB')[0]?.remove()
document.querySelectorAll('section > div > div > div > div > p')[4]?.remove()

// remove google ads
document.querySelectorAll('div[data-google-query-id]').forEach(el => {
  el.parentElement.remove()
  el.remove()
})

// remove review time
// section > div > div > div > div > div > div > div > span
document.querySelectorAll('section > div > div > div > div > div > div > div > span').forEach(el => {
  el.remove()
})

`.trim()
  }

  if ( raw_json.watching[k].tag.search(/carousell.com.hk\/categories/) != -1){
    console.log('hit',k)
    raw_json.watching[k]["webdriver_js_execute_code"]= `
// clear favourite count
document.querySelectorAll('main > div > div > div > div > div > button > span').forEach(el => el.remove())

// clear time
document.querySelectorAll('main > div > div > div > div > div > a > div > div > p').forEach(el => el.remove())

// document.querySelectorAll('.D_ahP.D_aRz').forEach(el => el?.remove())

// document.querySelectorAll('#bannerB')[0]?.remove()

// document.querySelectorAll('section > div > div > div > div > p')[4]?.remove()
`.trim()
  }


  if ( raw_json.watching[k].tag.search(/carousell.com.hk\/search/) != -1){
    console.log('hit',k)
    raw_json.watching[k]["webdriver_js_execute_code"]= `

// clear favourite count
document.querySelectorAll('main > div > div > div > div > div > button > span').forEach(el => 
  el.remove()
)

// clear time
document.querySelectorAll('main > div > div > div > div > div > div > a > div > div > p').forEach(el => 
  el.parentElement.remove()
)

// clear boost
document.querySelectorAll('svg[fill]').forEach(el => {
  if (el.getAttribute('fill') == '#00bfa2') {
    el.remove()
  }
})

// remove google ads
document.querySelectorAll('div[data-google-query-id]').forEach(el => {
  el.parentElement.remove()
  el.remove()
})

`.trim()
}


  if ( raw_json.watching[k].tag.search(/carousell.com.hk\/service/) != -1){
    console.log('hit, carousell.com.hk/service',k)
    raw_json.watching[k]["webdriver_js_execute_code"]= `

// remove google ads
document.querySelectorAll('div[data-google-query-id]').forEach(el => {
  el.parentElement.remove()
})
    

// clear favourite count
document.querySelectorAll('button[data-testid]')?.forEach(el => 
  el?.remove()
)

// clear time
document.querySelectorAll('main > div > div > div > div > div > div > a > div > div > p')?.forEach(el => 
  el?.remove()
)

// clear boost
document.querySelectorAll('svg[fill]')?.forEach(el => {
  if (el.getAttribute('fill') == '#00bfa2') {
    el.parentElement.parentElement.parentElement.parentElement.parentElement.style.display = 'none'
  }
})

// remove search ads cards
Array(10).fill(0).forEach(idx => {
  document.querySelectorAll('#native-ad-'+ idx)[0]?.remove()
})

`.trim()
}

if ( raw_json.watching[k].tag.search(/categories\/free-items/) != -1){
    console.log('hit, categories/free-items',k)
    raw_json.watching[k]["webdriver_js_execute_code"]= `

// clear time
document.querySelectorAll('a > div > div > p')?.forEach(el => 
  el?.remove()
)

// remove search ads cards
Array(10).fill(0).forEach(idx => {
  document.querySelectorAll('#native-ad-'+ idx)[0]?.remove()
})


document.querySelectorAll('svg[fill]')?.forEach(el => {
  if (el.getAttribute('fill') == '#00bfa2') {
    el.parentElement.parentElement.parentElement.parentElement.parentElement.style.display = 'none'
  }
})

// clear favourite count
document.querySelectorAll('button[data-testid]')?.forEach(el => 
  el?.remove()
)

// remove google ads
document.querySelectorAll('div[data-google-query-id]').forEach(el => {
  el.parentElement.remove()
  el.remove()
})

// remove search suggestions
document.querySelectorAll('#main > div > div > div > main > div > a').forEach(el => {
  el.remove()
})

`.trim()
}


if ( raw_json.watching[k].tag.search(/carousell.com.hk\/service/) != -1){
  console.log('hit, carousell.com.hk/service',k)
  raw_json.watching[k]["webdriver_js_execute_code"]= `

// remove google ads
document.querySelectorAll('div[data-google-query-id]').forEach(el => {
  el.parentElement.remove()
})
  

// clear favourite count
document.querySelectorAll('button[data-testid]')?.forEach(el => 
el?.remove()
)

// clear time
document.querySelectorAll('main > div > div > div > div > div > div > a > div > div > p')?.forEach(el => 
el?.remove()
)

// clear boost
document.querySelectorAll('svg[fill]')?.forEach(el => {
if (el.getAttribute('fill') == '#00bfa2') {
  el.parentElement.parentElement.parentElement.parentElement.parentElement.style.display = 'none'
}
})

// remove search ads cards
Array(10).fill(0).forEach(idx => {
document.querySelectorAll('#native-ad-'+ idx)[0]?.remove()
})

`.trim()
}

if ( raw_json.watching[k].tag.search(/categories\/user/) != -1){
  console.log('hit, categories/user',k)
  raw_json.watching[k]["webdriver_js_execute_code"]= `

// clear favourite count
document.querySelectorAll('button[data-testid]')?.forEach(el => 
  el?.remove()
)
  
// remove google ads
document.querySelectorAll('div[data-google-query-id]').forEach(el => {
  el.parentElement.remove()
  el.remove()
})

`.trim()
}


if ( raw_json.watching[k].tag.search(/price.com.hk\/product/) != -1){
  console.log('hit, price.com.hk/product',k)
  raw_json.watching[k]["webdriver_js_execute_code"]= `

// remove bottom dialog
document.querySelectorAll('div[role]')[0].remove()

`.trim()
}


if ( raw_json.watching[k].tag.search(/price.com.hk\/profile/) != -1){
  console.log('hit, price.com.hk/profile',k)
  raw_json.watching[k]["webdriver_js_execute_code"]= `

// remove bottom dialog
document.querySelectorAll('div[role]')[0].remove()

`.trim()
}

  // raw_json.watching[k]["title"]= ""
  // raw_json.watching[k]["paused"]= true
  // raw_json.watching[k]["last_checked"]= 1563778989

  // console.log(raw_json.watching['78a864ac-22ac-45b0-ba6c-99776154385d'])
  // process.exit()
})



fs.writeFileSync(target_json_file,JSON.stringify(raw_json,null, 2), {encoding:'utf-8'})