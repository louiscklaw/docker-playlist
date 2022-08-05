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
    return client.get('http://localhost:8095/api/document/list?limit=9999', {
      withCredentials: true,
    })
  })
  .then(({ data }) => {
    var ids = data.documents.map(doc => doc.id)
    console.log(ids)
    // var ids = data.map(d => d.id)
    // console.log(ids)
    return ids
  })
  .then(ids => {
    return Promise.all(ids.map(id => client.delete(`http://localhost:8095/api/document/${id}`)))
  })
  .then(res => console.log(res))
  .catch(err => console.log(err))
