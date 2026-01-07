"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Step1Leak } from "@/components/onboarding/Step1Leak";
import { Step2Anchor } from "@/components/onboarding/Step2Anchor";
import { Step3Partner } from "@/components/onboarding/Step3Partner";
import { Step4Contract } from "@/components/onboarding/Step4Contract";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        habit: "",
        goalName: "",
        targetAmount: "",
        personality: "standard",
    });
    const router = useRouter();

    const nextStep = () => setStep((s) => s + 1);
    const prevStep = () => setStep((s) => s - 1);

    const updateData = (data: Partial<typeof formData>) => {
        setFormData((prev) => ({ ...prev, ...data }));
    };

    const finish = () => {
        // In a real app, we'd save this to the backend
        localStorage.setItem("wc_onboarded", "true");
        localStorage.setItem("wc_goal", JSON.stringify({
            name: formData.goalName,
            target: parseFloat(formData.targetAmount),
            current: 0
        }));
        router.push("/dashboard");
    };

    return (
        <div className="min-h-screen bg-[var(--personality-bg)] flex flex-col items-center justify-center p-6 overflow-hidden">
            <div className="w-full max-w-md relative min-h-[500px] flex flex-col">
                {/* Progress Bar */}
                <div className="absolute top-0 left-0 w-full h-1 bg-black/5 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-[var(--personality-accent)]"
                        initial={{ width: "0%" }}
                        animate={{ width: `${(step / 4) * 100}%` }}
                    />
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="flex-1 flex flex-col pt-12"
                    >
                        {step === 1 && (
                            <Step1Leak
                                selected={formData.habit}
                                onSelect={(habit) => { updateData({ habit }); nextStep(); }}
                            />
                        )}
                        {step === 2 && (
                            <Step2Anchor
                                data={{ name: formData.goalName, target: formData.targetAmount }}
                                onNext={(data) => { updateData(data); nextStep(); }}
                                onBack={prevStep}
                            />
                        )}
                        {step === 3 && (
                            <Step3Partner
                                selected={formData.personality}
                                onSelect={(personality) => { updateData({ personality }); nextStep(); }}
                                onBack={prevStep}
                            />
                        )}
                        {step === 4 && (
                            <Step4Contract
                                formData={formData}
                                onFinish={finish}
                                onBack={prevStep}
                            />
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
