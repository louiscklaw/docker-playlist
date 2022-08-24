'use strict'

import fetch, {
  FormData,
  Blob,
  blobFrom,
  blobFromSync,
  File,
  fileFrom,
  fileFromSync,
} from 'node-fetch'

const params = new URLSearchParams()
params.append('username', 'admin')
params.append('password', 'superSecure')

var response = await fetch('http://localhost:8095/api/user/login', {
  method: 'POST',
  body: params,
})
let auth_token = response.headers.raw()['set-cookie']

// console.log(response)

var ids = []

for (var i = 0; i < 10; i++) {
  // console.log(`creating restaurant ${i}`)

  const params = new URLSearchParams()
  params.append('title', `restaurant_${i}`)
  params.append('language', 'eng')

  response = await fetch(`http://localhost:8095/api/document`, {
    method: 'PUT',
    body: params,
    headers: { cookie: auth_token },
  })
  var r_json = await response.json()
  ids.push(r_json.id)
}

console.log({ ids })
