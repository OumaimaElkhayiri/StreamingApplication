import { useState, useEffect } from "react";
import { Anime } from "./anime.jsx";

export function Home() {
    const [anime, setAnime] = useState([]);
    const [titreFiltre, setTitreFiltre] = useState("");
    const [studioFiltre, setStudioFiltre] = useState("");
    const [studios, setStudios] = useState([]);
    const [taillePage, setTaillePage] = useState(8);
    const [pageCourante, setPageCourante] = useState(1);

    function nbPages() {
        return Math.ceil(handleTitleFilter().length / taillePage) + 1;
    }

    function Paginer(){
        const debut= (pageCourante - 1) * taillePage;
        const fin = debut +taillePage;
        return handleTitleFilter().slice(debut, fin);
    }

    function tableauPages(){
        let p = [];
        for (let i=1 ; i<nbPages(); i++){
            p.push(i);
        } return p ;
    }


    function changementPage(p) {
        setTaillePage(p)
        setPageCourante(1)
        localStorage.setItem("itemsParPage", p)
    }

    function changementTitre(p) {
        setTitreFiltre(p)
        setPageCourante(1)
    }

    function changementStudio(props) {
        setStudioFiltre(props)
        setPageCourante(1)
    }


    useEffect(() => {
        async function fetchData() {
            try {
                const animeResponse = await fetch("https://tvshowdbapi.herokuapp.com/tvShows");
                const studiosResponse = await fetch("https://tvshowdbapi.herokuapp.com/studios");

                if (animeResponse.ok && studiosResponse.ok) {
                    const animeData = await animeResponse.json();
                    const studiosData = await studiosResponse.json();
                    setAnime(animeData);
                    setStudios(studiosData);
                } else {
                    console.error("Failed to fetch data");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, []);

    function handleTitleFilter(){
        let titreF = anime;
        if(titreFiltre !== "") {
            titreF = titreF.filter((t) => t.title.toUpperCase().includes(titreFiltre.toUpperCase()));}
        if (studioFiltre !== ""){titreF = titreF.filter((t) => t.studio.name.includes(studioFiltre));
        }
        return titreF
    }

    return (
        <div className="container">
            <div className="field-body" style={{marginTop: 50, marginBottom: 20, width: 500, marginLeft: "30%"}}>
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label htmlFor="titre" className="label">Titre:</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <p className="control is-expanded">
                                <input
                                    id="titre"
                                    className="input"
                                    style={{width: 200}}
                                    type="text"
                                    placeholder="Titre de l'anime"
                                    value={titreFiltre}
                                    onChange={(e) => changementTitre(e.target.value)}
                                />
                            </p>
                        </div>
                    </div>
                </div>
                <div className="field is-horizontal" style={{paddingLeft: 20}}>
                    <div className="field-label is-normal">
                        <label className="label" htmlFor="studios">Studio:</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control" style={{minWidth: 200}}>
                                <div className="select is-fullwidth">
                                    <select
                                        id="studios"
                                        className="is-small"
                                        value={studioFiltre}
                                        onChange={(e) => changementStudio(e.target.value)}
                                    >
                                        <option value="">Tous les studios</option>
                                        {studios.map((studio) => (
                                            <option key={studio.studioId}>
                                                {studio.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="columns is-multiline" style={{marginTop: 20}}>
                {Paginer().map((tvShow) => {return <Anime key={tvShow.tvShowId} anime={tvShow}/>})}
            </div>
            <nav className="pagination" role="navigation" aria-label="pagination" style={{marginLeft: "3.3%", marginRight: "3.3%"}}>
                <button className="pagination-previous" onClick={
                    () => {
                        if (pageCourante === 1)
                            setPageCourante(pageCourante); else {
                            setPageCourante(pageCourante - 1)
                        }
                    }}>Précédent
                </button>
                <button className="pagination-next" onClick={

                    () => {
                        if (pageCourante === nbPages() - 1)
                            setPageCourante(pageCourante); else {
                            setPageCourante(pageCourante + 1)
                        }
                    }}>Suivant
                </button>
                <ul className="pagination-list">
                    {tableauPages().map((numPage) => (
                        <li key={numPage}>
                            <button className="pagination-link" aria-label={`Page ${numPage}`} aria-current="page" onClick={
                                () => setPageCourante(numPage)
                            }>{numPage}</button>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="has-text-centered containter" style={{marginTop: -55}}>
                <select className="select" defaultValue={localStorage.getItem("itemsParPage") ? localStorage.getItem("itemsParPage") : 8} onChange={(e) => changementPage(parseInt(e.target.value))}>
                    <option>4</option>
                    <option>8</option>
                    <option>12</option>
                    <option>16</option>
                </select>
            </div>
</div>
    );
}
