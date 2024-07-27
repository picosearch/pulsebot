async function fetchData() {
  const sheetId = "1YVu3PszcFrC9-arFm1qcy5XSmNi-orj7U6UONG2Boz4"; // Replace with your actual sheet ID
  const range = "heartbeat!A:C"; // Replace with your actual range
  const apiKey = "AIzaSyC-cDc5zk9gTtvgMbkz9OnWFmZGN8Iqkgg"; // Replace with your API key if needed

  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`
  );
  const data = await response.json();
  console.log("data ww::", data);
  return data.values.slice(1).map((row) => ({
    date: row[0],
    device: row[1],
    status: row[2]
  }));
}

async function drawChart() {
  const data = await fetchData();
  console.log(data[0]["status"]);
}

drawChart();
