import { useState } from "react";
import { searchUsers, fetchUserDetails } from "../services/githubService";

export default function Search() {
  // Input states
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");

  // App states
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

  // Handles search
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!username) return;

    setLoading(true);
    setError("");
    setUsers([]);
    setPage(1);

    try {
      const result = await searchUsers({ username, location, minRepos, page: 1 });

      if (!result.items || result.items.length === 0) {
        setError("Looks like we can't find the user");
        setLoading(false);
        return;
      }

      const detailedUsers = await Promise.all(
        result.items.map((user) => fetchUserDetails(user.url))
      );

      setUsers(detailedUsers);
    } catch {
      setError("Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
  };

  // Load more
  const loadMore = async () => {
    const nextPage = page + 1;
    setPage(nextPage);
    setLoading(true);

    try {
      const result = await searchUsers({ username, location, minRepos, page: nextPage });

      const detailedUsers = await Promise.all(
        result.items.map((user) => fetchUserDetails(user.url))
      );

      setUsers((prev) => [...prev, ...detailedUsers]);
    } catch {
      setError("Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full px-4 mt-6">
      {/* Search Form */}
      <form
        onSubmit={handleSearch}
        className="grid gap-4 md:grid-cols-4 w-full max-w-xl mb-6"
      >
        <input
          type="text"
          className="border p-2 rounded w-full"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          className="border p-2 rounded w-full"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="number"
          className="border p-2 rounded w-full"
          placeholder="Min Repos"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
        />
        <button className="bg-black text-white rounded p-2 w-full">
          Search
        </button>
      </form>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid gap-4 md:grid-cols-2 w-full max-w-xl">
        {users.map((user) => (
          <div key={user.id} className="border rounded p-4 flex gap-4 items-center">
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-20 h-20 rounded-full"
            />
            <div>
              <h3 className="font-bold text-lg">{user.name || user.login}</h3>
              <p>Location: {user.location || "N/A"}</p>
              <p>Repos: {user.public_repos}</p>
              <a
                href={user.html_url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline"
              >
                View Profile
              </a>
            </div>
          </div>
        ))}
      </div>

      {users.length > 0 && (
        <button
          onClick={loadMore}
          className="mt-6 block bg-gray-800 text-white px-6 py-2 rounded"
        >
          Load More
        </button>
      )}
    </div>
  );
}
