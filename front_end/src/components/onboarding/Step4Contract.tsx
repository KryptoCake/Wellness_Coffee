"use client";

import { motion, useMotionValue } from "framer-motion";
import { Check, ChevronRight, ShieldCheck } from "lucide-react";
import { useState, useRef } from "react";

export function Step4Contract({
    formData,
    onFinish,
    onBack
}: {
    formData: any,
    onFinish: () => void,
    onBack: () => void
}) {
    const [signed, setSigned] = useState(false);
    const constraintsRef = useRef(null);
    const x = useMotionValue(0);

    const handleDragEnd = (_: any, info: any) => {
        if (info.point.x > 200 || info.offset.x > 150) {
            setSigned(true);
            setTimeout(onFinish, 800);
        }
    };

    return (
        <div className="space-y-8 flex flex-col h-full">
            <div className="space-y-2 text-center">
                <h2 className="text-3xl font-bold tracking-tight">The Contract.</h2>
                <p className="text-[var(--personality-text)]/60">I commit to my future self.</p>
            </div>

            <div className="flex-1 border-2 border-dashed border-[var(--personality-text)]/10 rounded-3xl p-6 space-y-4 bg-[var(--personality-card)]/30">
                <div className="flex items-center gap-3 text-sm text-[var(--personality-text)]/60">
                    <ShieldCheck className="w-5 h-5 text-[var(--personality-accent)]" />
                    <span>Discipline Agreement</span>
                </div>

                <p className="text-sm leading-relaxed italic">
                    "I, the user, authorize my partner <strong>{formData.personality.toUpperCase()}</strong> to intervene whenever my spending habits compromise my goal of <strong>{formData.goalName}</strong> ($ {formData.targetAmount})."
                </p>

                <ul className="text-xs space-y-2 text-[var(--personality-text)]/50 pt-4">
                    <li className="flex items-center gap-2">
                        <Check className="w-3 h-3 text-[var(--personality-accent)]" /> Zero Complacence Protocol active.
                    </li>
                    <li className="flex items-center gap-2">
                        <Check className="w-3 h-3 text-[var(--personality-accent)]" /> Opportunity Cost analysis enabled.
                    </li>
                </ul>
            </div>

            {/* Slide to Sign */}
            <div className="relative h-16 bg-black/5 rounded-full p-2" ref={constraintsRef}>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-sm font-semibold opacity-30 uppercase tracking-widest">
                    Slide to Sign
                </div>

                <motion.div
                    drag="x"
                    dragConstraints={{ left: 0, right: 240 }}
                    dragElastic={0.1}
                    style={{ x }}
                    onDragEnd={handleDragEnd}
                    className="h-12 w-12 bg-[var(--personality-accent)] rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing shadow-lg"
                >
                    {signed ? (
                        <Check className="text-white w-6 h-6" />
                    ) : (
                        <ChevronRight className="text-white w-6 h-6" />
                    )}
                </motion.div>
            </div>

            <button onClick={onBack} className="text-xs text-[var(--personality-text)]/40 hover:text-[var(--personality-text)]/60 transition-colors py-4">
                Change terms of contract
            </button>
        </div>
    );
}
