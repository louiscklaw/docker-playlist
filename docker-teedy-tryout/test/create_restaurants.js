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

console.log(response)

for (var i = 0; i < 9; i++) {
  console.log(`creating restaurant ${i}`)
  const params = new URLSearchParams()
  params.append('title', `restaurant_${i}`)
  params.append('language', 'eng')

  try {
    response = await fetch(`http://localhost:8095/api/document`, {
      method: 'PUT',
      body: params,
      headers: { cookie: auth_token },
    })
  } catch (error) {
    console.log('err')
  }
}
