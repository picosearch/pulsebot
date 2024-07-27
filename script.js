async function fetchData() {
  const sheetId = "1YVu3PszcFrC9-arFm1qcy5XSmNi-orj7U6UONG2Boz4"; // Replace with your actual sheet ID
  const range = "heartbeat!A:C"; // Replace with your actual range
  const pulsebot = "AIzaSyC-cDc5zk9gTtvgMbkz9OnWFmZGN8Iqkgg"; // Replace with your API key if needed

  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${pulsebot}`
  );
  const data = await response.json();
  return data.values.slice(1).map((row) => ({
    date: row[0],
    device: row[1],
    status: row[2]
  }));
}

async function drawChart() {
  const data = await fetchData();
  updateCountdown(30, data[0]["status"], data[0]["date"]); // 30 seconds countdown
  console.log(data[0]["status"]);
}

function updateCountdown(seconds, status, time) {
  const statusText = document.getElementById("status-text");

  let remainingTime = seconds;

  const interval = setInterval(() => {
    if (remainingTime <= 0) {
      clearInterval(interval);
      statusText.textContent = `DG is ${status}: (${time})`;
      drawChart();
    } else {
      statusText.textContent = `DG is ${status}: ${remainingTime}s`;
      remainingTime--;
    }
  }, 1000);
}
drawChart();
