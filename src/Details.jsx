import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {useParams} from "react-router-dom";
import { useAuth } from "./Auth";
// test 2
const animeURL = "https://tvshowdbapi.herokuapp.com"

export function AnimeDetails() {
    const [anime, setanimeData] = useState(null);
    const [setError] = useState(null);
    const params = useParams()
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`${animeURL}/tvshow?tvshowId=${params.id}`);
                if (response.ok) {
                    const data = await response.json();
                    setanimeData(data);
                    console.log(data)
                } else {
                    setError(`Failed to fetch data: ${response.status}`);
                }
            } catch (error) {
                setError(`Error fetching data: ${error.message}`);
            }
        }

        fetchData();
    }, []);

    const handleClick = (seasonId) => {
        navigate(`/season/${seasonId}`);
    }

    return <div>
        <div className="container">
            {
                anime !== null &&
                <div className="details">
                    <div className="field-body">
                        <div className="column is-4-desktop is-4-tablet is-6-mobile">
                            <figure className="image">
                                <img src={anime.imgURL} alt={anime.title}/>
                            </figure>
                        </div>
                        <div className="column is-8">
                            <div className="column">
                                <span htmlFor="titre" className="title is-2">{anime.title}</span>
                            </div>
                            <div className="column is-pulled-right" style={{marginRight: "2.8%"}}>
                                <span htmlFor="genres">{anime.genres.map((t) => t.name).join(", ")}</span>
                            </div>
                            <div className="column">
                                <span htmlFor="Date de parution">{anime.year}</span>
                            </div>
                            <div className="column">
                                <span htmlFor="nombre d'episode">{anime.episodeCount} episodes</span>
                                <span htmlFor="tv Parental Guideline" style={{marginLeft: "6%"}}>{anime.tvParentalGuideline}</span>
                            </div>
                            <div className="column">
                                <span htmlFor="Studio">Studio</span>
                                <span htmlFor="Nom du studio" style={{marginLeft: "10.75%"}}>{anime.studio.name}</span>
                            </div>
                            <div className="column has-text-justified" style={{marginRight: "2.8%"}}>{anime.plot}</div>
                            <div className="column">
                                <audio controls id="cryURL" src={anime.audioURL} autoPlay>
                                    <source type="audio/ogg"/>
                                    Your browser does not support the audio element.
                                </audio>
                            </div>
                        </div>
                    </div>
                    <div style={{overflow: "auto"}}>
                        <div style={{
                            display: "flex",
                            position: "relative",
                            marginLeft: "0.9%",
                            marginTop: 50,
                            marginBottom: 50
                        }}>
                            {anime.roles.map(role => (
                                <div className="card has-text-centered" key={role.roleId} style={{minHeight: 300, minWidth: 200, marginRight: 25}}>
                                    <figure className="card-image">
                                        <img src={role.imgURL} alt={role.name}/>
                                    </figure>
                                    <div>
                                        <span><b>{role.name}</b></span>
                                    </div>
                                    <span>{role.character}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div style={{overflow: "auto"}}>
                        <div style={{
                            display: "flex",
                            position: "relative",
                            marginLeft: "0.9%",
                            marginTop: 50,
                            marginBottom: 50
                        }}>
                            {anime.seasons.map(season => (
                                <div className="column is-3 card has-text-centered" key={season.seasonId} style={{minHeight: 300, minWidth: 200, marginRight: 25}} onClick={() => handleClick(season.seasonId)}>
                                    <figure className="card-image">
                                        <img src={season.imgURL} alt={`Season ${season.number}`}/>
                                    </figure>
                                    <div style={{marginTop: 10, height: 50}}>
                                        <span className="title is-4">Season {season.number}</span>
                                    </div>
                                    <div style={{marginTop: 10, height: 50}}>
                                        <span>{season.episodeCount} episodes</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            }
        </div>
    </div>;
}