"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ChatMessageProps {
    role: string;
    content: string;
    personality?: string;
}

export function ChatMessage({ role, content, personality }: ChatMessageProps) {
    const isUser = role === "user";

    const styles: Record<string, string> = {
        standard: "bg-coffee-100 text-coffee-900",
        zen: "bg-green-50 text-green-900 rounded-3xl",
        hartman: "bg-military-900 text-military-100 font-mono uppercase text-xs border border-military-700",
        house: "bg-clinical-50 text-clinical-900 border-l-4 border-clinical-500",
        tracy: "bg-zinc-900 text-white",
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={cn(
                "flex w-full",
                isUser ? "justify-end" : "justify-start"
            )}
        >
            <div
                className={cn(
                    "max-w-[85%] p-3 px-4 rounded-2xl text-sm leading-relaxed shadow-sm",
                    isUser
                        ? "bg-[var(--personality-accent)] text-white rounded-tr-none"
                        : cn(styles[personality || "standard"], "rounded-tl-none")
                )}
            >
                {content}
            </div>
        </motion.div>
    );
}
