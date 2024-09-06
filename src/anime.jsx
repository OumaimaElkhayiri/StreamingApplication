import {Link} from "react-router-dom";

export function Anime(props) {
    const animeUrl = `/AnimeDetails/${props.anime.tvshowId}`;

    return (
        <div className="column is-3-desktop is-4-tablet is-6-mobile">
            <Link to={animeUrl} className="card has-text-black" style={{minHeight: 700}} >
                <div className="card-image">
                    <figure className="image is-square" style={{minHeight: 400}} >
                        <img src={props.anime.imgURL} alt={props.anime.name} />
                    </figure>
                </div>
                <div className="card-content">
                    <div className="content">
                        <h3 className="title is-3 has-text-centered has-text-black" style={{minHeight: 115}}>{props.anime.title} </h3>
                        <div className="mb-0 has-text-centered">
                            <span className="has-text-weight-bold has-text-centered">Studio : </span>
                            <span>{props.anime.studio.name}</span>
                        </div>
                        <div className="mb-0 has-text-centered">
                            <span className="has-text-weight-bold has-text-centered">Genres : </span>
                            <span>{props.anime.genres.map((p) => p.name).join(", ")}</span>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}
