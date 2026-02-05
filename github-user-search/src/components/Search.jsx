import { useState } from "react";
import { fetchUserData } from "../services/githubService";

export default function Search() {
    const [username, setUsername] = useState("");
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username) return;

        setLoading(true);
        setError("");
        setUserData(null);

        try {
            const data = await fetchUserData(username);
            setUserData(data);
        } catch (err) {
            setError("Looks like we can't find the user");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter GitHub username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            {userData && (
                <div style={{ marginTop: "20px" }}>
                    <img src={userData.avatar_url} alt={userData.login} width={100} />
                    <h2>{userData.name || userData.login}</h2>
                    <a href={userData.html_url} target="_blank">
                        Visit GitHub Profile
                    </a>
                </div>
            )}
        </div>
    );
}
