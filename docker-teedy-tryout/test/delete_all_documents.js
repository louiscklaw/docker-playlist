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
response = await fetch(`http://localhost:8095/api/document/list?limit=9999`, {
  method: 'GET',
  headers: { cookie: auth_token },
})
var { documents } = await response.json()
var ids = documents.map(d => d.id)

var delete_result = await Promise.all(
  ids.map(id => {
    console.log(`delete docuemnt ${id}`)
    return fetch(`http://localhost:8095/api/document/${id}`, {
      method: 'DELETE',
      headers: { cookie: auth_token },
    })
  }),
)
