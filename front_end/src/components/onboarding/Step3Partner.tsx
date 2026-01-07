"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useTheme, type Personality } from "@/context/ThemeContext";
import { ArrowLeft, Play, Music } from "lucide-react";
import { useState } from "react";

const personas = [
    { id: "standard", name: "Standard", desc: "Pragmatic & Precise", status: "Free" },
    { id: "zen", name: "Zen", desc: "Mindful & Calm", status: "Free" },
    { id: "hartman", name: "Hartman", desc: "Aggressive & Direct", status: "Premium" },
    { id: "house", name: "House", desc: "Sarcastic & Clinical", status: "Premium" },
    { id: "tracy", name: "Tracy", desc: "Productivity & ROI", status: "Premium" },
];

export function Step3Partner({
    selected,
    onSelect,
    onBack
}: {
    selected: string,
    onSelect: (p: Personality) => void,
    onBack: () => void
}) {
    const { setPersonality } = useTheme();
    const [playing, setPlaying] = useState<string | null>(null);

    const handlePreview = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        setPlaying(id);
        setTimeout(() => setPlaying(null), 2000);
    };

    return (
        <div className="space-y-8">
            <div className="space-y-2 text-center">
                <h2 className="text-3xl font-bold tracking-tight">The Partner.</h2>
                <p className="text-[var(--personality-text)]/60">Choose your intellectual partner.</p>
            </div>

            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 scrollbar-hide">
                {personas.map((p) => (
                    <Card
                        key={p.id}
                        className={`p-4 cursor-pointer border-2 transition-all flex items-center justify-between gap-4 ${selected === p.id ? "border-[var(--personality-accent)] bg-[var(--personality-accent)]/5" : "border-transparent"
                            }`}
                        onClick={() => {
                            setPersonality(p.id as Personality);
                            onSelect(p.id as Personality);
                        }}
                    >
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <span className="font-bold">{p.name}</span>
                                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-black/10">
                                    {p.status}
                                </span>
                            </div>
                            <p className="text-xs text-[var(--personality-text)]/60">{p.desc}</p>
                        </div>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full w-8 h-8"
                            onClick={(e) => handlePreview(e, p.id)}
                        >
                            {playing === p.id ? (
                                <Music className="w-4 h-4 animate-bounce" />
                            ) : (
                                <Play className="w-4 h-4" />
                            )}
                        </Button>
                    </Card>
                ))}
            </div>

            <div className="flex gap-4 pt-4">
                <Button variant="ghost" onClick={onBack}>
                    <ArrowLeft className="w-4 h-4" />
                </Button>
                <Button onClick={onBack} variant="ghost" className="flex-1 pointer-events-none opacity-0">Back</Button>
            </div>
        </div>
    );
}
