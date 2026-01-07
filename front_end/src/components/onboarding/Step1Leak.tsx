"use client";

import { Card } from "@/components/ui/Card";
import { Pizza, Smartphone, ShoppingBag, CreditCard } from "lucide-react";
import { motion } from "framer-motion";

const habits = [
    { id: "food", label: "Food", icon: Pizza, color: "bg-orange-100 text-orange-600" },
    { id: "tech", label: "Tech", icon: Smartphone, color: "bg-blue-100 text-blue-600" },
    { id: "shopping", label: "Shopping", icon: ShoppingBag, color: "bg-pink-100 text-pink-600" },
    { id: "subscriptions", label: "Subscriptions", icon: CreditCard, color: "bg-purple-100 text-purple-600" },
];

export function Step1Leak({ selected, onSelect }: { selected: string, onSelect: (id: string) => void }) {
    return (
        <div className="space-y-8 text-center">
            <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">The Leak.</h2>
                <p className="text-[var(--personality-text)]/60">Where does your money disappear most?</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {habits.map((habit, i) => (
                    <motion.div
                        key={habit.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <Card
                            className={`p-6 cursor-pointer border-2 transition-all hover:scale-105 active:scale-95 flex flex-col items-center gap-3 ${selected === habit.id ? "border-[var(--personality-accent)]" : "border-transparent"
                                }`}
                            onClick={() => onSelect(habit.id)}
                        >
                            <div className={`p-3 rounded-2xl ${habit.color}`}>
                                <habit.icon className="w-6 h-6" />
                            </div>
                            <span className="font-semibold">{habit.label}</span>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
