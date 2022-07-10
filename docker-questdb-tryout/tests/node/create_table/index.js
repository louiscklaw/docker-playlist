const fetch = require("node-fetch");

const HOST = "http://localhost:9000";

async function createTable() {
  try {
    const query = "CREATE TABLE IF NOT EXISTS trades (name STRING, value INT)";

    const response = await fetch(
      `${HOST}/exec?query=${encodeURIComponent(query)}`
    );
    const json = await response.json();

    console.log(json);
  } catch (error) {
    console.log(error);
  }
}

createTable();
