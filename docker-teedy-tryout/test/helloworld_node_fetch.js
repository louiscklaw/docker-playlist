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

var response = await fetch('https://httpbin.org/post', {
  method: 'POST',
  body: params,
})

console.log(response)
