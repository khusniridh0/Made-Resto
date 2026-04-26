'use client'

import { EventContext } from "@/contexts/event-provider";
import { useContext } from "react";

export const SuccessAnimation = () => {
    const eventContext = useContext(EventContext)

    if (!eventContext) { return null }

    const { successAnimate } = eventContext

    return (
        successAnimate.play && <div className="fixed w-screen h-screen bg-stone-900/60 z-50 flex justify-center items-center">
            <div className="success-wrapper">
                <div className="icon-wrap">
                    <svg className="success-svg mx-auto" viewBox="0 0 100 100" width="120" height="120">
                        <circle className="success-circle" cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="6" strokeLinecap="round"></circle>
                        <polyline className="success-check" points="35 50 45 60 65 40" fill="none" stroke="#10b981" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"></polyline>
                    </svg>
                </div>
                <h2>{successAnimate.title}</h2>
                <p>{successAnimate.message}</p>
            </div>
        </div>
    );
}