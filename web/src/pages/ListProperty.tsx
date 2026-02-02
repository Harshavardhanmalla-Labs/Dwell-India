import React, { useMemo, useState } from "react";
import {
    ShieldCheck,
    Camera,
    CheckCircle,
    ArrowRight,
    Cpu,
    Sparkles,
    UserCheck,
    Lock,
    FileSearch,
} from "lucide-react";
import "./ListProperty.css";

type StepId = 1 | 2 | 3;

type Step = {
    id: StepId;
    title: string;
    description: React.ReactNode;
    icon: React.ReactNode;
    checklist: string[];
};

const PARTNER_FEE_INR = 4999;

export const ListProperty: React.FC = () => {
    const [activeStep, setActiveStep] = useState<StepId>(1);

    const steps: Step[] = useMemo(
        () => [
            {
                id: 1,
                title: "AI Deed Audit",
                description: (
                    <>
                        Upload your Sale Deed. We flag missing fields, anomalies, and
                        consistency issues—so buyers see a <strong>Verified</strong> signal,
                        not your documents.
                    </>
                ),
                icon: (
                    <div className="icon-group">
                        <FileSearch size={40} className="text-primary" />
                        <Cpu size={24} className="ai-overlay" />
                    </div>
                ),
                checklist: ["Ownership linkage check", "Tax receipt / mutation hints"],
            },
            {
                id: 2,
                title: "ID Trust-Link",
                description: (
                    <>
                        Securely link Aadhaar & LinkedIn. We confirm identity and issue a{" "}
                        <strong>Verified Owner</strong> badge. Documents stay private.
                    </>
                ),
                icon: (
                    <div className="icon-group">
                        <UserCheck size={40} className="text-primary" />
                        <Lock size={20} className="ai-overlay" />
                    </div>
                ),
                checklist: ["Encrypted upload + redaction", "Trusted Seller badge"],
            },
            {
                id: 3,
                title: "Live Confirmation",
                description: (
                    <>
                        A Dwell Partner records a <strong>Geofenced 360 tour</strong> with
                        timestamp + location proofs. No outdated photos.
                    </>
                ),
                icon: (
                    <div className="icon-group">
                        <Camera size={40} className="text-primary" />
                        <ShieldCheck size={20} className="ai-overlay" />
                    </div>
                ),
                checklist: ["GPS + timestamped capture", "Anti-fraud media validation"],
            },
        ],
        []
    );

    // const active = steps.find((s) => s.id === activeStep)!;

    return (
        <div className="list-property-container">
            <header className="list-header">
                <div className="container">
                    <div
                        className="badge-premium badge-trust"
                        style={{
                            background: "rgba(255,255,255,0.1)",
                            color: "white",
                            marginBottom: "1.5rem",
                        }}
                    >
                        <Sparkles size={14} />
                        <span>AI Seller Suite</span>
                    </div>

                    <h1>
                        List Effortlessly, <br />
                        <span className="text-gradient" style={{ filter: "brightness(1.5)" }}>
                            Sell with Proof.
                        </span>
                    </h1>

                    <p>
                        We verify identity + listing evidence and show buyers a simple
                        signal—<strong>Verified</strong>—without exposing your private docs.
                    </p>
                </div>
            </header>

            <main className="container section-padding">
                {/* Step selector */}
                <div className="sell-flow-grid" role="list" aria-label="Listing flow">
                    {steps.map((step) => {
                        const isActive = step.id === activeStep;
                        return (
                            <button
                                key={step.id}
                                type="button"
                                role="listitem"
                                className={`flow-step-card glass-card ${isActive ? "is-active" : ""
                                    }`}
                                onClick={() => setActiveStep(step.id)}
                                aria-current={isActive ? "step" : undefined}
                            >
                                <div className="step-count">Step {String(step.id).padStart(2, "0")}</div>
                                {step.icon}
                                <h3>{step.title}</h3>
                                <p>{step.description}</p>

                                <ul className="step-checklist">
                                    {step.checklist.map((item) => (
                                        <li key={item}>
                                            <CheckCircle size={14} /> {item}
                                        </li>
                                    ))}
                                </ul>
                            </button>
                        );
                    })}
                </div>

                {/* Trust banner */}
                <div className="trust-proxy-banner glass-card">
                    <div className="banner-content">
                        <div className="banner-icon">🛡️</div>
                        <div>
                            <h4>Dwell “Trust Proxy” Guarantee</h4>
                            <p>
                                Buyers never see your private papers. We show only a
                                verification signal and evidence summary. Your privacy is a
                                first-class feature.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Context-aware actions */}
                <div className="sell-actions">
                    <button className="btn-dwell btn-dwell-primary">
                        {activeStep === 1
                            ? "Start AI Audit Now"
                            : activeStep === 2
                                ? "Link ID & Get Verified"
                                : "Schedule Partner Tour"}{" "}
                        <ArrowRight size={18} />
                    </button>

                    <button className="btn-dwell btn-dwell-secondary">
                        Request Partner Assistance
                    </button>

                    <p className="fee-note">
                        Fixed Partner Assistance Fee:{" "}
                        <strong>₹{PARTNER_FEE_INR.toLocaleString("en-IN")}</strong>
                    </p>

                    {/* tiny compliance note (optional but smart) */}
                    <p className="fine-print">
                        Verification is an assistance service and not a legal title opinion.
                    </p>
                </div>
            </main>
        </div>
    );
};
