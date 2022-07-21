const fetch = require('node-fetch')

const HOST = 'http://localhost:9000'

async function insertData() {
  try {
    const query = "INSERT INTO trades VALUES('abc', 123456)"

    const response = await fetch(`${HOST}/exec?query=${encodeURIComponent(query)}`)
    const json = await response.json()

    console.log(json)
  } catch (error) {
    console.log(error)
  }
}

insertData()
