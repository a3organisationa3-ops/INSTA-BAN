// === CONFIG ===
const validKey = "INSTABAN980";

// --- Validate Key and Redirect ---
function validateKey() {
  const enteredKey = document.getElementById("keyInput").value.trim();

  if (enteredKey === validKey) {
    // Save key session
    localStorage.setItem("instaBanKey", enteredKey);
    window.location.href = "analysis.html";
  } else {
    alert("❌ Wrong Key! Please purchase the correct key.");
  }
}

// --- Check Key Session ---
if (window.location.pathname.includes("analysis.html")) {
  const sessionKey = localStorage.getItem("instaBanKey");
  if (sessionKey !== validKey) {
    alert("Access Denied! Please enter valid key.");
    window.location.href = "index.html";
  }
}

// --- Fetch Instagram Public Data ---
async function fetchInstagramData(username) {
  try {
    const url = `https://www.instagram.com/${username}/?__a=1&__d=dis`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    });

    if (!response.ok) {
      throw new Error("Account fetch failed");
    }

    const data = await response.json();
    return {
      username: data.graphql.user.username,
      fullName: data.graphql.user.full_name,
      followers: data.graphql.user.edge_followed_by.count,
      following: data.graphql.user.edge_follow.count,
      bio: data.graphql.user.biography,
      dp: data.graphql.user.profile_pic_url_hd,
      isPrivate: data.graphql.user.is_private
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

// --- Analyze Account Function ---
async function analyzeAccount() {
  const username = document.getElementById("usernameInput").value.trim();
  const loading = document.getElementById("loading");
  const resultDiv = document.getElementById("result");

  if (!username) {
    alert("Please enter an Instagram username.");
    return;
  }

  loading.style.display = "block";
  resultDiv.innerHTML = "";

  const data = await fetchInstagramData(username);

  loading.style.display = "none";

  if (!data) {
    alert("Error fetching account data. Account may be private or request blocked.");
    return;
  }

  // Show fetched data
  resultDiv.innerHTML = `
    <h3>${data.fullName} (@${data.username})</h3>
    <img src="${data.dp}" alt="Profile Picture" width="100" style="border-radius:50%;margin:10px 0;">
    <p><strong>Followers:</strong> ${data.followers}</p>
    <p><strong>Following:</strong> ${data.following}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Private Account:</strong> ${data.isPrivate ? "Yes 🔒" : "No 🌐"}</p>
    <button onclick="startBanProcess()">Start Ban Process</button>
  `;
}

// --- Ban Process (Fake Loader + Redirect) ---
function startBanProcess() {
  alert("Ban process started! This will take 5-8 hours to complete.\nYou will be notified when done.");
  window.location.href = "https://wa.me/919836942455?text=I%20want%20to%20buy%20the%20InstaBan%20key";
}
