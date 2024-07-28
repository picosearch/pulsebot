async function fetchData() {
  const response = await fetch(
    "https://api-data-proxy.glitch.me/pulsebot-data"
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
  updateCountdown(60, data[0]["status"], data[0]["date"].split(" ")[0]); // 30 seconds countdown
  console.log(data[0]["status"]);
}

function updateCountdown(seconds, status, time) {
  const timeElement = document.getElementById("time_new");
  const statusElement = document.getElementById("status");
  const spinnerElement = document.getElementById("spinner");
  const dateElement = document.getElementById("date");
  dateElement.textContent = `(${time})`;
  let remainingTime = seconds;
  if (status === "ON") {
    statusElement.textContent = "ON";
    statusElement.className = "status-on";
    // spinnerElement.className = "DG-ON";
  } else {
    statusElement.textContent = "OFF";
    statusElement.className = "status-off";
    // spinnerElement.className = "DG-OFF";
  }

  const interval = setInterval(() => {
    if (remainingTime <= 0) {
      clearInterval(interval);
      drawChart();
    } else {
      timeElement.textContent = `${remainingTime}s`;
      remainingTime--;
    }
  }, 1000);
}
drawChart();
