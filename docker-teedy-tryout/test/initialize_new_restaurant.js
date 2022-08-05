'use strict'

import fetch, { File, FormData, fileFromSync } from 'node-fetch'
import fs from 'fs'
import path from 'path'

const filetype = 'text/plain'
const filepath = './5bit.dat'
const filename = path.basename(filepath)

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

    console.log(await response.json())
  } catch (error) {
    console.error(error)
  }
}

test()
