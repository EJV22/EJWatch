import { createContext, useCallback, useContext, useRef, useState } from "react";
import { tmdbFetch } from "./api.js";

const ApiContext = createContext(null);

export function useApi() {
    const ctx = useContext(ApiContext);
    if (!ctx) throw new Error("useApi must be used inside <ContextProvider>");
    return ctx;
}

function ContextProvider({ children }) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const controllerRef = useRef(null);

    const load = useCallback(async (path) => {
        controllerRef.current?.abort();
        const controller = new AbortController();
        controllerRef.current = controller;

        setLoading(true);
        setError(null);
        setItems([]);

        try {
            const data = await tmdbFetch(path, { signal: controller.signal });
            setItems((data.results || []).filter((r) => r.media_type !== "person"));
        } catch (err) {
            if (err.name === "AbortError") return;
            setError(err.message);
        } finally {
            if (controllerRef.current === controller) setLoading(false);
        }
    }, []);

    const clear = useCallback(() => {
        controllerRef.current?.abort();
        setItems([]);
        setError(null);
        setLoading(false);
    }, []);

    return (
        <ApiContext.Provider value={{ items, loading, error, load, clear }}>
            {children}
        </ApiContext.Provider>
    );
}

export default ContextProvider;