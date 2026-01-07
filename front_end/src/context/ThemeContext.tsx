"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Personality = "zen" | "hartman" | "house" | "tracy" | "standard";

interface ThemeContextType {
    personality: Personality;
    setPersonality: (personality: Personality) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [personality, setPersonality] = useState<Personality>("standard");

    // Load from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem("wc_personality") as Personality;
        if (saved) setPersonality(saved);
    }, []);

    // Sync with data-attribute on body and persist
    useEffect(() => {
        document.documentElement.setAttribute("data-personality", personality);
        localStorage.setItem("wc_personality", personality);
    }, [personality]);

    return (
        <ThemeContext.Provider value={{ personality, setPersonality }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
