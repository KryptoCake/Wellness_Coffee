"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

export function CapitalCounter({ amount }: { amount: number }) {
    const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 });
    const display = useTransform(spring, (current) =>
        new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(current)
    );

    useEffect(() => {
        spring.set(amount);
    }, [amount, spring]);

    return (
        <motion.div className="text-5xl font-black tracking-tighter tabular-nums">
            <motion.span>{display}</motion.span>
        </motion.div>
    );
}
