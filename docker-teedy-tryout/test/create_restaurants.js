// create restaurants as documents
'use strict'

const { default: axios } = require('axios')
const { CookieJar } = require('tough-cookie')
const { wrapper } = require('axios-cookiejar-support')
const qs = require('qs')

const jar = new CookieJar()
const client = wrapper(axios.create({ jar }))

client
  .post(
    `http://localhost:8095/api/user/login`,
    qs.stringify({ username: 'admin', password: 'superSecure' }),
  )
  .then(() => {
    return Promise.all(
      Array(30)
        .fill(0)
        .map((x, idx) =>
          client.put(
            `http://localhost:8095/api/document`,
            qs.stringify({ title: `restaurant_${idx}`, language: 'eng' }),
            { withCredentials: true },
          ),
        ),
    )
  })
  .then(ress => {
    console.log(ress)
  })
  .catch(err => console.log(err))
