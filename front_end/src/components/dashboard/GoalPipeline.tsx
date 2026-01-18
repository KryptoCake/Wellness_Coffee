"use client";

import { Card } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { Target, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

export function GoalPipeline({ goal }: { goal: { name: string, target: number, current: number } }) {
    const [mounted, setMounted] = useState(false);
    const progress = (goal.current / goal.target) * 100;

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <Card className="p-6 space-y-4 overflow-hidden relative" variant="solid">
            <div className="flex justify-between items-start">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[var(--personality-accent)]">
                        <Target className="w-4 h-4" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Active Anchor</span>
                    </div>
                    <h2 className="text-xl font-bold">{goal.name}</h2>
                </div>
                <div className="text-right">
                    <p className="text-sm font-bold">$ {mounted ? goal.target.toLocaleString() : goal.target}</p>
                    <p className="text-[10px] text-[var(--personality-text)]/40 uppercase">Target</p>
                </div>
            </div>

            <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-[var(--personality-text)]/40">
                    <span>{progress.toFixed(1)}% Complete</span>
                    <span>$ {mounted ? (goal.target - goal.current).toLocaleString() : (goal.target - goal.current)} Left</span>
                </div>
                <div className="h-4 bg-black/5 rounded-full overflow-hidden p-1">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-[var(--personality-accent)] rounded-full relative"
                    >
                        <div className="absolute inset-0 bg-white/20 animate-pulse" />
                    </motion.div>
                </div>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-black/5">
                <TrendingUp className="w-3 h-3 text-green-500" />
                <span className="text-[10px] text-[var(--personality-text)]/50">
                    On track to finish in <strong>8 months</strong> at current rescue rate.
                </span>
            </div>
        </Card>
    );
}
