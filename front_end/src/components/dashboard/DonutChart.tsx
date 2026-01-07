"use client";

import { motion } from "framer-motion";

export function DonutChart() {
    const data = [
        { label: "Food", value: 40, color: "var(--color-coffee-500)" },
        { label: "Tech", value: 30, color: "var(--color-military-500)" },
        { label: "Subs", value: 30, color: "var(--color-clinical-500)" },
    ];

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="relative w-24 h-24">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    {/* Mock donut chart using path segments if needed, but for MVP a simple CSS conic-gradient works too */}
                    <circle
                        cx="50" cy="50" r="40"
                        fill="transparent"
                        stroke="currentColor"
                        strokeWidth="12"
                        className="text-black/5"
                    />
                    <motion.circle
                        cx="50" cy="50" r="40"
                        fill="transparent"
                        stroke="var(--personality-accent)"
                        strokeWidth="12"
                        strokeDasharray="251.2"
                        initial={{ strokeDashoffset: 251.2 }}
                        animate={{ strokeDashoffset: 100 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        strokeLinecap="round"
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[10px] font-bold">RESCUE</span>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-1 w-full">
                {data.map((item) => (
                    <div key={item.label} className="flex items-center justify-between text-[10px]">
                        <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                            <span className="opacity-50">{item.label}</span>
                        </div>
                        <span className="font-bold">{item.value}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
