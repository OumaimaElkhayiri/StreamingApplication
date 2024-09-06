import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "./Auth";

const apiURL = "https://tvshowdbapi.herokuapp.com";

export function JouerEpisode() {
    const { episodeId } = useParams();
    const [episode, setEpisode] = useState(null);
    const [error, setError] = useState(null);
    const { isAuthenticated } = useAuth(); // Get authentication status from context

    useEffect(() => {
        async function fetchData() {
            try {
                const token = sessionStorage.getItem("authToken");
                const response = await fetch(`${apiURL}/viewepisode?episodeId=${episodeId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setEpisode(data);
                } else if (response.status !== 401) { // Handle all status codes except 401
                    setError(`Failed to fetch data: ${response.status}`);
                }
            } catch (error) {
                setError(`Error fetching data: ${error.message}`);
            }
        }

        fetchData();
    }, [episodeId]);

    return (
        <div className="container">
            {(!isAuthenticated || (isAuthenticated && episode)) && ( // Check if not authenticated or authenticated with episode data
                <div>
                    {!isAuthenticated && (
                        <div style={{border: "1px solid red", borderRadius: "10px", padding: "10px", marginBottom: "20px", marginTop: "10px"}}>
                            <h1 style={{fontSize: "3rem", textAlign: "center"}}>
                                Vous devez être connecté pour accéder à cette page.
                            </h1>
                            <p style={{fontSize: "0.8rem", textAlign: "center", margin: "10px 0"}}>
                                <Link to="/login" style={{fontSize: "0.8rem"}}>Se connecter</Link>
                            </p>
                        </div>
                    )}
                    {isAuthenticated && episode && (
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "90vh"}}>
                            <video controls style={{maxWidth: "90%", maxHeight: "90%"}}>
                                <source src={episode.videoURL} type="video/mp4"/>
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
