import axios from "axios";

const BASE_URL = "https://api.github.com";

export async function searchUsers({ username, location, minRepos, page }) {
  let query = username;

  if (location) query += ` location:${location}`;
  if (minRepos) query += ` repos:>=${minRepos}`;

  const response = await axios.get(`${BASE_URL}/search/users`, {
    params: {
      q: query,
      per_page: 10,
      page: page || 1,
    },
  });

  return response.data;
}

export async function fetchUserDetails(url) {
  const response = await axios.get(url);
  return response.data;
}
