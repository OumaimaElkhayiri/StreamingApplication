import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {useHistoryContext} from "./HistoryContext.jsx";


const apiURL = "https://tvshowdbapi.herokuapp.com";

// affichage de chaque episode
function Episode({ episode }) {
    const history = useHistoryContext().history;
    const historique = history.some((h) => h.episodeId === episode.episodeId);
    return (
        <div className="card" style={{ height: "350px", filter: historique ? "grayscale(100%) blur(2px)" : "none"}}>
            <figure className="image">
                <img src={episode.imgURL} alt={episode.title} />
            </figure>
            <div className="card-content">
                <div className="content">
                    <h3>{episode.title}</h3>
                    <p className="has-text-centered">{episode.number}</p>
                </div>
            </div>
        </div>
    );
}

// Main Season component
export function Season() {
    const { seasonId } = useParams();
    const [episodes, setEpisodes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [error, setError] = useState(null);
    const [tvshowTitle, setTvshowTitle] = useState("");
    const [seasonNumber, setSeasonNumber] = useState("");
    const navigate = useNavigate();


    const episodesPerPage = 8;

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`${apiURL}/episodes?seasonId=${seasonId}`);
                if (response.ok) {
                    const data = await response.json();
                    setEpisodes(data.episodes);
                    setTotalPages(Math.ceil(data.episodes.length / episodesPerPage));
                    setTvshowTitle(data.tvshowTitle);
                    setSeasonNumber(data.seasonNumber);
                } else {
                    setError(`Failed to fetch data: ${response.status}`);
                }
            } catch (error) {
                setError(`Error fetching data: ${error.message}`);
            }
        }

        fetchData();
    }, [seasonId]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const getPaginatedEpisodes = () => {
        const startIndex = (currentPage - 1) * episodesPerPage;
        const endIndex = startIndex + episodesPerPage;
        return episodes.slice(startIndex, endIndex);


    };

    const handleEpisode = (episodeId) => {
        navigate(`/episode/${episodeId}`);
    }


    return (
        <div className="container">
            {error && <p className="help is-danger">{error}</p>}
            {episodes.length > 0 && (
                <div>
                    <h1 className="title is-2 has-text-centered">{tvshowTitle}</h1>
                    <h1 className="title is-4 has-text-centered">{seasonNumber}</h1>
                    <div className="columns is-multiline">
                        {getPaginatedEpisodes().map(episode => (
                            <div key={episode.episodeId} className="column is-one-quarter-desktop is-one-third-tablet is-half-mobile" onClick={() => handleEpisode(episode.episodeId)}>
                                <Episode episode={episode} />
                            </div>
                        ))}
                    </div>
                    <nav className="pagination" role="navigation" aria-label="pagination">
                        <button className="button pagination-previous" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                            Previous
                        </button>
                        <button className="button pagination-next" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                            Next
                        </button>
                        <ul className="pagination-list">
                            {Array.from({ length: totalPages }).map((_, index) => (
                                <li key={index}>
                                    <button
                                        className={`button pagination-link ${currentPage === index + 1 ? "is-current" : ""}`}
                                        onClick={() => handlePageChange(index + 1)}
                                    >
                                        {index + 1}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            )}
        </div>
    );
}
