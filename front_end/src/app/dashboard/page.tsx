"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CapitalCounter } from "@/components/dashboard/CapitalCounter";
import { GoalPipeline } from "@/components/dashboard/GoalPipeline";
import { DonutChart } from "@/components/dashboard/DonutChart";
import { Plus, MessageSquare, ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
    const [goal, setGoal] = useState({ name: "Hostal Ometepe", target: 50000, current: 1200 });
    const [rescued] = useState(450.75);

    useEffect(() => {
        const savedGoal = localStorage.getItem("wc_goal");
        if (savedGoal) setGoal(JSON.parse(savedGoal));
    }, []);

    return (
        <div className="min-h-screen bg-[var(--personality-bg)] p-6 pb-32 space-y-6 max-w-2xl mx-auto">
            {/* Header */}
            <header className="flex justify-between items-center py-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Status Report</h1>
                    <p className="text-sm text-[var(--personality-text)]/50">Wellness Coffee Prophet</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="rounded-full bg-black/5">
                        <ShieldAlert className="w-5 h-5 text-red-500" />
                    </Button>
                </div>
            </header>

            {/* Main Metric */}
            <Card className="p-8 text-center space-y-2" variant="solid">
                <span className="text-sm font-semibold uppercase tracking-widest text-[var(--personality-text)]/40">Capital Rescued</span>
                <CapitalCounter amount={rescued} />
                <p className="text-xs text-green-600 font-medium">+15.2% from last week</p>
            </Card>

            {/* Goal Progress */}
            <GoalPipeline goal={goal} />

            {/* Insights */}
            <div className="grid grid-cols-2 gap-4">
                <Card className="p-6 space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--personality-text)]/50">Rescued From</h3>
                    <DonutChart />
                </Card>

                <Card className="p-6 flex flex-col justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--personality-text)]/50">Next Hito</h3>
                    <div className="space-y-1">
                        <p className="text-2xl font-bold">$ 5,000</p>
                        <p className="text-[10px] text-[var(--personality-text)]/40 italic">Cimentación Fase 1</p>
                    </div>
                    <div className="w-full h-1 bg-black/5 rounded-full mt-4">
                        <div className="h-full bg-[var(--personality-accent)] w-1/4 rounded-full" />
                    </div>
                </Card>
            </div>

            {/* Quick Tips / Non-Passive Messages */}
            <Card className="p-4 border-l-4 border-[var(--personality-accent)] bg-[var(--personality-accent)]/5 flex gap-4 items-start">
                <div className="p-2 bg-[var(--personality-accent)] rounded-xl text-white">
                    <MessageSquare className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                    <p className="text-sm font-bold">Standard Partner says:</p>
                    <p className="text-sm text-[var(--personality-text)]/70">
                        "Your 'Subscriptions' leak is active. Cancel 3 unused services to rescue $45 today."
                    </p>
                </div>
            </Card>

            {/* Navigation FAB / Menu */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-[var(--personality-card)] shadow-2xl rounded-full p-2 border border-black/5 backdrop-blur-md">
                <Link href="/dashboard" className="p-3 bg-[var(--personality-accent)] text-white rounded-full">
                    <Plus className="w-6 h-6" />
                </Link>
                <Link href="/chat" className="p-3 hover:bg-black/5 rounded-full transition-colors">
                    <MessageSquare className="w-6 h-6 opacity-60" />
                </Link>
            </div>
        </div>
    );
}
