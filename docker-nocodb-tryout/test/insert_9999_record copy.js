const fetch = require('node-fetch');

let url = 'http://localhost:8080/api/v1/db/data/noco/p5ythkoutmson8d/Features/views/Features?offset=0&limit=25&where=';

let options = {
  method: 'GET',
  headers: {
    'xc-auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxvZ2lja2VlQGdtYWlsLmNvbSIsImlkIjoidXNkcnpzMmRlamo0bDgxaiIsInJvbGVzIjoib3JnLWxldmVsLWNyZWF0b3Isc3VwZXIiLCJ0b2tlbl92ZXJzaW9uIjoiNWVkYmM5ZWQ1MDY0MjQwMzE3MDJkNWNiZDg4NjU2MjY0MWE1NzJlZjFhZWUwN2EyYzZmODhlYjlkNWRhYjA2YWI3NmY3ZGU3NmExZWQ2NjgiLCJpYXQiOjE3MDI0NDgxMjQsImV4cCI6MTcwMjQ4NDEyNH0.ISF_BHI_sdydKURhbf5sT-al_1ivF_rAQMasHsA0oIw'
  }
};

for(var i = 0; i < 99999; i++){
    console.log(i)
    fetch(url, options)
        .then(res => res.json())
        .then(json => console.log(json))
        .catch(err => console.error('error:' + err));

}