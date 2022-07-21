import React from 'react'

const HOST = 'http://localhost:9000'

function App() {
  const [debug_query_result, setDebugQueryResult] = React.useState(null)

  async function handleCreateTableClick(e) {
    console.log('handleCreateTableClick')
    try {
      const query = 'CREATE TABLE sensors (ID LONG, make STRING, city STRING);'

      // proxy enabled in package.json, check proxy
      // https://stackoverflow.com/questions/47902840/enabling-cors-in-create-react-app-utility
      const response = await fetch(`/exec?query=${encodeURIComponent(query)}`)
      const json = await response.json()

      console.log(json)
    } catch (error) {
      console.log(error)
    }
  }
  async function handleInsertReadingsClick(e) {
    try {
      const query = `CREATE TABLE readings
      AS(
          SELECT
              x ID,
              timestamp_sequence(to_timestamp('2019-10-17T00:00:00', 'yyyy-MM-ddTHH:mm:ss'), rnd_long(1,10,0) * 100000L) ts,
              rnd_double(0)*8 + 15 temp,
              rnd_long(0, 10000, 0) sensorId
          FROM long_sequence(10000000) x)
      TIMESTAMP(ts)
      PARTITION BY MONTH;`

      const response = await fetch(`/exec?query=${encodeURIComponent(query)}`)
      const json = await response.json()

      console.log(json)
    } catch (error) {
      console.log(error)
    }
  }

  async function handleInsertSensorsClick(e) {
    try {
      const query = `INSERT INTO sensors
      SELECT
          x ID, --increasing integer
          rnd_str('Eberle', 'Honeywell', 'Omron', 'United Automation', 'RS Pro') make,
          rnd_str('New York', 'Miami', 'Boston', 'Chicago', 'San Francisco') city
      FROM long_sequence(10000) x
  ;`

      const response = await fetch(`/exec?query=${encodeURIComponent(query)}`)
      const json = await response.json()

      console.log(json)
    } catch (error) {
      console.log(error)
    }
  }

  async function handleInsertClickSimple(e) {
    try {
      const query = "INSERT INTO trades VALUES('abc', 123456)"

      const response = await fetch(`/exec?query=${encodeURIComponent(query)}`)
      const json = await response.json()

      console.log(json)
    } catch (error) {
      console.log(error)
    }
  }

  async function handleQueryClick(e) {
    try {
      const query = 'SELECT name FROM trades;'

      const response = await fetch(`/exec?query=${encodeURIComponent(query)}`)
      const json = await response.json()
      setDebugQueryResult(json)

      console.log(json)
    } catch (error) {
      console.log(error)
    }
  }

  async function handleQueryReadingsClick(e) {
    try {
      const query = `SELECT ts, city, make, avg(temp)
      FROM readings timestamp(ts)
      JOIN
          (SELECT ID sensId, city, make
          FROM sensors
          WHERE city='Miami' AND make='Omron') a
      ON readings.sensorId = a.sensId
      WHERE ts IN '2019-10-21;1d'`

      const response = await fetch(`/exec?query=${encodeURIComponent(query)}`)
      const json = await response.json()
      setDebugQueryResult(json)

      console.log(json)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="App">
      helloworld
      <div>
        <div>create</div>
        <div>
          <button onClick={e => handleCreateTableClick(e)}>create table</button>
        </div>
      </div>
      <div>
        <div>insert</div>
        <div>
          <button onClick={e => handleInsertReadingsClick(e)}>handleInsertReadingsClick</button>
        </div>
        <div>
          <button onClick={e => handleInsertSensorsClick(e)}>handleInsertSensorsClick</button>
        </div>
      </div>
      <div>
        <div>query</div>
        <div>
          <button
            onClick={e => {
              setDebugQueryResult({})
            }}
          >
            reset query result
          </button>
        </div>
        <div>
          <button onClick={e => handleQueryClick(e)}>handleQueryClick</button>
          <button onClick={e => handleQueryReadingsClick(e)}>handleQueryReadingsClick</button>
        </div>
        <div>
          <pre>{JSON.stringify(debug_query_result, null, 2)}</pre>
        </div>
      </div>
    </div>
  )
}

export default App
