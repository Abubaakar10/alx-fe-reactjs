import axios from "axios";

const BASE_URL = "https://api.github.com";

export async function searchUsers({ username, location, minRepos, page = 1 }) {
  let query = username;
  if (location) query += `+location:${location}`;
  if (minRepos) query += `+repos:>=${minRepos}`;
  const url = `${BASE_URL}/search/users?q=${query}&per_page=10&page=${page}`;
  const response = await axios.get(url);
  return response.data;
}

export async function fetchUserDetails(url) {
  const response = await axios.get(url);
  return response.data;
}
