"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function PanicButton() {
    const [isRecording, setIsRecording] = useState(false);

    const startRecording = () => {
        setIsRecording(true);
        // In real app, start Web Speech API here
    };

    const stopRecording = () => {
        setIsRecording(false);
        // In real app, stop and process audio
    };

    return (
        <div className="relative">
            <AnimatePresence>
                {isRecording && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 bg-red-600 text-white p-3 rounded-2xl shadow-2xl text-center text-[10px] font-bold uppercase tracking-widest z-50"
                    >
                        <div className="flex items-center justify-center gap-2 mb-1">
                            <div className="w-2 h-2 rounded-full bg-white animate-ping" />
                            Recording Panic...
                        </div>
                        Release to Intervene
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                onPointerDown={startRecording}
                onPointerUp={stopRecording}
                onPointerLeave={stopRecording}
                whileTap={{ scale: 0.9 }}
                className={cn(
                    "w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300",
                    isRecording
                        ? "bg-red-600 rotate-90 scale-125"
                        : "bg-[var(--personality-accent)] hover:scale-110"
                )}
            >
                {isRecording ? (
                    <X className="text-white w-8 h-8" />
                ) : (
                    <Mic className="text-white w-8 h-8" />
                )}

                {/* Radar Effect while idle to invite interaction */}
                {!isRecording && (
                    <div className="absolute inset-0 rounded-full bg-[var(--personality-accent)]/20 animate-ping -z-10" />
                )}
            </motion.button>
        </div>
    );
}
