"use client";

import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { PanicButton } from "@/components/chat/PanicButton";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Send, ArrowLeft, MoreVertical } from "lucide-react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

interface Message {
    id: number;
    role: string;
    content: string;
    personality?: string;
}

export default function ChatPage() {
    const { personality } = useTheme();
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, role: "system", content: "Welcome back. How can I assist your financial discipline today?", personality: "standard" },
    ]);
    const [input, setInput] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), role: "user", content: input };
        setMessages([...messages, userMsg]);
        setInput("");

        // Mock AI response
        setTimeout(() => {
            setMessages((prev) => [...prev, {
                id: Date.now() + 1,
                role: "system",
                content: `Analyzing intent... [Role: ${personality.toUpperCase()}]. Proceed with caution.`,
                personality: personality
            }]);
        }, 1000);
    };

    return (
        <div className="flex flex-col h-screen bg-[var(--personality-bg)] max-w-2xl mx-auto shadow-2xl">
            {/* Header */}
            <header className="p-4 flex items-center gap-4 bg-[var(--personality-card)] border-b border-black/5">
                <Link href="/dashboard">
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                </Link>
                <div className="flex-1">
                    <h2 className="text-sm font-bold capitalize">{personality} Partner</h2>
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[10px] uppercase font-bold opacity-40">Ready for Intervention</span>
                    </div>
                </div>
                <Button variant="ghost" size="icon" className="rounded-full">
                    <MoreVertical className="w-5 h-5" />
                </Button>
            </header>

            {/* Messages */}
            <div
                className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide"
                ref={scrollRef}
            >
                {messages.map((msg) => (
                    <ChatMessage key={msg.id} {...msg} />
                ))}
            </div>

            {/* Input Area */}
            <footer className="p-4 bg-[var(--personality-card)] border-t border-black/5 relative pb-10">
                <div className="flex gap-2 items-center">
                    <Input
                        placeholder="Describe expense or ask for advice..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        className="rounded-full bg-black/5 border-none"
                    />
                    <Button
                        variant="primary"
                        size="icon"
                        className="rounded-full shrink-0"
                        onClick={handleSend}
                    >
                        <Send className="w-5 h-5" />
                    </Button>
                </div>

                {/* Panic Button FAB */}
                <div className="absolute -top-16 right-4">
                    <PanicButton />
                </div>
            </footer>
        </div>
    );
}
