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

import fs from 'fs'
import path from 'path'
import mime from 'mime-types'

const filetype = mime.lookup('jpg')
const filepath = './hotdog.jpg'
const filename = path.basename(filepath)

console.log(filetype)

const test = async () => {
  try {
    const params = new URLSearchParams()
    params.append('username', 'admin')
    params.append('password', 'superSecure')

    var response = await fetch('http://localhost:8095/api/user/login', {
      method: 'POST',
      body: params,
    })

    // const data = await response.json()
    let auth_token = response.headers.raw()['set-cookie']

    const abc = new File([fs.readFileSync(filepath)], filename, { type: filetype })

    const formData = new FormData()
    formData.set('file', abc, filename)

    response = await fetch('http://localhost:8095/api/file', {
      method: 'PUT',
      body: formData,
      headers: { cookie: auth_token },
    })
    let { id: file_id } = await response.json()
    console.log({ file_id })

    const link_image_params = new URLSearchParams()
    link_image_params.append('id', 'a279f5fa-4f1c-4bdb-bd84-86a781db2a3a')

    response = await fetch(`http://localhost:8095/api/file/${file_id}/attach`, {
      method: 'POST',
      body: link_image_params,
      headers: { cookie: auth_token },
    })
    console.log(await response.json())

    response = await fetch(`http://localhost:8095/api/user/logout`, {
      method: 'POST',
      headers: { cookie: auth_token },
    })
    console.log(await response.json())
  } catch (error) {
    console.error(error)
  }
}

test()
