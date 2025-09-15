// === CONFIG ===
const validKey = "INSTABAN980";

// === Validate Key on index.html ===
function validateKey() {
  const enteredKey = document.getElementById("keyInput").value.trim();
  const keyError = document.getElementById("keyError");

  if (enteredKey === validKey) {
    localStorage.setItem("instaBanKey", enteredKey);
    window.location.href = "analysis.html";
  } else {
    keyError.textContent = "❌ Wrong Key! Please purchase the correct key.";
  }
}

// === Check if Key is Present on analysis.html ===
if (window.location.pathname.includes("analysis.html")) {
  const sessionKey = localStorage.getItem("instaBanKey");
  if (sessionKey !== validKey) {
    alert("Access denied! Please enter the correct key.");
    window.location.href = "index.html";
  }
}

// === Start Fake Analysis ===
function startAnalysis() {
  const username = document.getElementById("usernameInput").value.trim();
  const inputSection = document.getElementById("inputSection");
  const analysisSection = document.getElementById("analysisSection");
  const progressBar = document.getElementById("progress");
  const reportLog = document.getElementById("reportLog");
  const crashSection = document.getElementById("crashSection");

  if (!username) {
    alert("Please enter a username.");
    return;
  }

  inputSection.style.display = "none";
  analysisSection.style.display = "block";

  let progress = 0;
  let reports = 0;
  const totalReports = 10000;

  const fakeReports = [
    "Checking account details...",
    "Fetching username data...",
    "Analyzing followers activity...",
    "Detecting violations...",
    "Tracking IP address...",
    "Cross-checking multiple reports...",
    "Reviewing Instagram policies...",
    "Finalizing account status..."
  ];

  // Progress bar simulation
  const analysisInterval = setInterval(() => {
    progress += 2;
    progressBar.style.width = progress + "%";

    if (progress >= 100) {
      clearInterval(analysisInterval);
      generateFakeReports();
    }
  }, 150);

  // Generate fake reports one by one
  function generateFakeReports() {
    const reportInterval = setInterval(() => {
      if (reports < totalReports) {
        const randomLog = fakeReports[Math.floor(Math.random() * fakeReports.length)];
        reports++;
        reportLog.innerHTML += `<p>[Report #${reports}] ${randomLog}</p>`;
        reportLog.scrollTop = reportLog.scrollHeight;
      } else {
        clearInterval(reportInterval);
        analysisSection.style.display = "none";
        crashSection.style.display = "block";
      }
    }, 5);
  }
}
