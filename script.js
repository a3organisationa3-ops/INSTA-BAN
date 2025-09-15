// === STEP 1: FETCH INSTAGRAM DATA ===
function fetchData() {
  const username = document.getElementById("username").value.trim();
  if (!username) {
    alert("Please enter a username!");
    return;
  }

  const url = `https://www.instagram.com/${username}/?__a=1&__d=dis`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const userData = data.graphql.user;

      // Fill data into UI
      document.getElementById("profile-pic").src = userData.profile_pic_url_hd;
      document.getElementById("full-name").innerText = userData.full_name || "N/A";
      document.getElementById("user").innerText = userData.username;
      document.getElementById("bio").innerText = userData.biography || "No bio";
      document.getElementById("followers").innerText = userData.edge_followed_by.count;
      document.getElementById("following").innerText = userData.edge_follow.count;
      document.getElementById("posts").innerText = userData.edge_owner_to_timeline_media.count;
      document.getElementById("private").innerText = userData.is_private ? "Private" : "Public";

      // Show results
      document.getElementById("result").classList.remove("hidden");
    })
    .catch(error => {
      console.error(error);
      alert("Error fetching data. Account may be private or Instagram blocked the request.");
    });
}

// === STEP 2: SHOW KEY INPUT ===
function showKeyInput() {
  document.getElementById("key-section").classList.remove("hidden");
}

// === STEP 3: VERIFY KEY ===
function verifyKey() {
  const enteredKey = document.getElementById("access-key").value.trim();
  const correctKey = "INSTABAN980";

  if (enteredKey === correctKey) {
    document.getElementById("key-section").classList.add("hidden");
    startBanProcess();
  } else {
    document.getElementById("key-error").innerText = "❌ Wrong key! Please contact admin for correct key.";
  }
}

// === STEP 4: BAN PROCESS ===
function startBanProcess() {
  document.getElementById("ban-process").classList.remove("hidden");

  let progress = 0;
  const progressBar = document.getElementById("progress-bar");
  const progressText = document.getElementById("progress-text");

  const steps = [
    "Initializing ban request...",
    "Connecting to Instagram servers...",
    "Validating target account...",
    "Generating reports...",
    "Submitting ban request...",
    "Finalizing process..."
  ];

  const interval = setInterval(() => {
    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(showCrashScreen, 1000);
    } else {
      progress += 20;
      progressBar.style.width = progress + "%";
      progressText.innerText = steps[Math.floor(progress / 20) - 1] || "Processing...";
    }
  }, 2000); // 2 sec per step
}

// === STEP 5: SHOW CRASH SCREEN ===
function showCrashScreen() {
  document.getElementById("ban-process").classList.add("hidden");
  document.getElementById("crash-screen").classList.remove("hidden");
    }
