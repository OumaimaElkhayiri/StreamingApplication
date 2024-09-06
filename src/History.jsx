import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { svrURL } from "./constants.js";
import { useAuth } from "./Auth";
import { useHistoryContext } from "./HistoryContext.jsx";

export function Historique() {
    const [pageCourante, setPageCourante] = useState(1);
    const [taillePage] = useState(6);
    const { authToken } = useAuth();
    const { history, setHistory } = useHistoryContext();

    useEffect(() => {
        async function fetchHistorique() {
            if (!authToken) return;

            try {
                const response = await fetch(`${svrURL}/user/history`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setHistory(data);
                }
            } catch (error) {
                console.error("Error fetching Historique:", error);
            }
        }

        fetchHistorique();
    }, [authToken, setHistory]);

    const totalEpisodes = history.length;
    const totalPages = Math.ceil(totalEpisodes / taillePage);

    const afficherEpisodes = () => {
        const debut = (pageCourante - 1) * taillePage;
        const episodesAffichage = history.slice(debut, debut + taillePage);
        return episodesAffichage.map((episode) => (
            <Episode key={episode.episodeId} episode={episode} />
        ));
    };

    function Episode({ episode }) {
        return (
            <div className="column is-4-desktop is-4-tablet is-6-mobile">
                <div className="card" style={{ flexDirection: "column", height: "375px" }}>
                    <div className="card-image">
                        <figure className="image" style={{ margin: 0 }}>
                            <img src={episode.imgURL} alt={episode.title} style={{ height: "60%" }} />
                        </figure>
                    </div>
                    <div className="card-content has-text-centered">
                        <Link to={`/AnimeDetails/${episode.tvshowId}`} className="title is-5 has-text-link">{episode.tvshowTitle}</Link><br/>
                        <Link to={`/season/${episode.seasonId}`} className="title is-5 has-text-link">Season {episode.seasonNumber}</Link><br/>
                        <Link to={`/episode/${episode.episodeId}`} className="title is-5 has-text-link">{episode.episodeTitle}</Link>
                    </div>
                </div>
            </div>
        );
    }

    const renderPagination = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <li key={i}>
                    <span
                        className={pageCourante === i ? "pagination-link is-current" : "pagination-link"}
                        aria-label={`Page ${i}`}
                        onClick={() => setPageCourante(i)}
                    >
                        {i}
                    </span>
                </li>
            );
        }
        return pages;
    };

    return (
        <div className="container">
            {history.length > 0 ? (
                <>
                    <h1 className="title has-text-centered">History</h1>
                    <div className="columns is-multiline">
                        {afficherEpisodes()}
                    </div>
                    <nav className="pagination" role="navigation" aria-label="pagination">
                        <span
                            className="pagination-previous"
                            onClick={() => {
                                if (pageCourante > 1) setPageCourante(pageCourante - 1);
                            }}
                        >
                            {"<"}
                        </span>
                        <span
                            className="pagination-next"
                            onClick={() => {
                                if (pageCourante < totalPages) setPageCourante(pageCourante + 1);
                            }}
                        >
                            {">"}
                        </span>
                        <ul className="pagination-list">
                            {renderPagination()}
                        </ul>
                    </nav>
                </>
            ) : (
                <p className="has-text-centered">No history available.</p>
            )}
        </div>
    );
}