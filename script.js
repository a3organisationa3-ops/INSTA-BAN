// --- Fetch Instagram Data (Proxy Method) ---
async function fetchInstagramData(username) {
  try {
    const proxyUrl = `https://api.codetabs.com/v1/proxy/?quest=https://www.instagram.com/${username}/?__a=1&__d=dis`;

    const response = await fetch(proxyUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();

    // Agar data format sahi nahi aaya
    if (!data.graphql || !data.graphql.user) {
      throw new Error("Invalid data received");
    }

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
    console.error("Error fetching account data:", error);
    return null;
  }
}
