import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AnimeDetails } from "./Details.jsx";
import { Home } from "./Home.jsx";
import { Login } from "./Login.jsx";
import { Navbar } from "./Navbar.jsx";
import { AuthProvider } from "./Auth";
import { Season } from "./season.jsx";
import { JouerEpisode } from "./JouerEpisode.jsx";
import { Historique } from "./History";
import {HistoryProvider} from "./HistoryContext.jsx";

export function App() {
    return (

        <AuthProvider>
            <HistoryProvider>
                <BrowserRouter>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/AnimeDetails/:id" element={<AnimeDetails />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/season/:seasonId" element={<Season />} />
                        <Route path="/episode/:episodeId" element={<JouerEpisode />} />
                        <Route path="/history" element={<Historique />} />
                    </Routes>
                    <footer className="footer" style={{ backgroundColor: "white" }}>
                        <div className="container">
                            <div className="content has-text-centered">
                                <p>2180106</p>
                            </div>
                        </div>
                    </footer>
                </BrowserRouter>
            </HistoryProvider>
        </AuthProvider>

            );
}
