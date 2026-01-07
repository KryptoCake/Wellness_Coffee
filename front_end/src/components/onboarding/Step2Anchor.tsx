"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useState } from "react";
import { ArrowLeft, Target } from "lucide-react";
import { api } from "@/lib/api";

export function Step2Anchor({
    data,
    onNext,
    onBack
}: {
    data: { name: string, target: string },
    onNext: (data: { goalName: string, targetAmount: string }) => void,
    onBack: () => void
}) {
    const [goalName, setGoalName] = useState(data.name || "Hostal Ometepe");
    const [targetAmount, setTargetAmount] = useState(data.target || "");

    const handleNext = async () => {
        // Guardar en la memoria compartida del sistema (Backend + IA)
        await api.memory.add(
            `El objetivo principal (The Anchor) del usuario es: ${goalName} con una meta de $${targetAmount}.`,
            "onboarding",
            { type: "goal", amount: targetAmount }
        );
        
        onNext({ goalName, targetAmount });
    };

    return (
        <div className="space-y-8">
            <div className="space-y-2 text-center">
                <h2 className="text-3xl font-bold tracking-tight">The Anchor.</h2>
                <p className="text-[var(--personality-text)]/60">What are you building for the future?</p>
            </div>

            <div className="space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium ml-1">Goal Name</label>
                    <Input
                        placeholder="e.g., Hostal Ometepe"
                        value={goalName}
                        onChange={(e) => setGoalName(e.target.value)}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium ml-1">Target Amount ($)</label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--personality-text)]/40">$</span>
                        <Input
                            type="number"
                            className="pl-8"
                            placeholder="50000"
                            value={targetAmount}
                            onChange={(e) => setTargetAmount(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="flex gap-4 pt-4">
                <Button variant="ghost" onClick={onBack} className="flex-1">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                </Button>
                <Button
                    disabled={!goalName || !targetAmount}
                    onClick={handleNext}
                    className="flex-2"
                >
                    Confirm Anchor
                </Button>
            </div>
        </div>
    );
}
