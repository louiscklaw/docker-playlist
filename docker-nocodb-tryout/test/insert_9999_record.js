const fetch = require('node-fetch')

const url = 'http://localhost:8080/api/v2/tables/mwjeqskam6xb5zj/records'
const headers = {
  accept: 'application/json',
  'Content-Type': 'application/json',
  'xc-auth':
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxvZ2lja2VlQGdtYWlsLmNvbSIsImlkIjoidXNkcnpzMmRlamo0bDgxaiIsInJvbGVzIjoib3JnLWxldmVsLWNyZWF0b3Isc3VwZXIiLCJ0b2tlbl92ZXJzaW9uIjoiNWVkYmM5ZWQ1MDY0MjQwMzE3MDJkNWNiZDg4NjU2MjY0MWE1NzJlZjFhZWUwN2EyYzZmODhlYjlkNWRhYjA2YWI3NmY3ZGU3NmExZWQ2NjgiLCJpYXQiOjE3MDI0NDgxMjQsImV4cCI6MTcwMjQ4NDEyNH0.ISF_BHI_sdydKURhbf5sT-al_1ivF_rAQMasHsA0oIw',
}
const body = JSON.stringify({
  name: 'string',
  age: 1,
  sex: 'F',
  address: 'string',
  description: 'string',
})

for(var i =0; i< 4999;i++){
    console.log(i)
    fetch(url, {
        method: 'POST',
        headers: headers,
        body: body,
      })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error))
}