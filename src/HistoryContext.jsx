import React, {createContext, useState, useContext, useEffect} from "react";
import {svrURL} from "./constants.js";

const HistoryContext = createContext();

export const useHistoryContext = () => {
    return useContext(HistoryContext);
};

export const HistoryProvider = ({ children }) => {
    const [history, setHistory] = useState([]);

    const fetchHistory = async (authToken) => {
        if (!authToken) return;

        try {
            const response = await fetch(`${svrURL}/user/history`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                }
            });

            if (response.ok) {
                const data = await response.json();
                setHistory(data);
            }
        } catch (error) {
            console.error("Error fetching Historique:", error);
        }
    }

    useEffect(() => {
        const token = sessionStorage.getItem("authToken");
        fetchHistory(token);
    }, []);

    return (
        <HistoryContext.Provider value={{ history, setHistory }}>
            {children}
        </HistoryContext.Provider>
    );
};