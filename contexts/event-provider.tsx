"use client"

/* 
    saya menyadari context ini terlalu berlebihan hanya untuk satu event
    tetapi untuk pengembangan aplikasi yang lebih kompleks, context ini bisa digunakan
*/


import { createContext, useEffect, useReducer } from "react";

type Animate = {
    play: boolean
    title: string
    message: string
}

type State = {
    successAnimate: Animate
};

type Action =
    | { type: 'PLAY'; payload: Animate }

export const EventContext = createContext<{
    successAnimate: Animate;
    setEvents: (data: Animate) => void
} | undefined>(undefined);

const initialState: State = {
    successAnimate: {
        play: false,
        title: '',
        message: ''
    }
};

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'PLAY':
            return {
                ...state,
                successAnimate: action.payload
            };
        default:
            return state;
    }
};

export function EventProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const setEvents = (data: Animate) => {
        dispatch({
            type: 'PLAY',
            payload: data
        });
    };

    const contextValue = {
        successAnimate: state.successAnimate,
        setEvents
    };

    useEffect(() => {
        if (state.successAnimate.play) {
            const timer = setTimeout(() => {
                setEvents(initialState.successAnimate)
            }, 3000)

            return () => clearTimeout(timer)
        }
    }, [state.successAnimate.play])

    return (
        <EventContext.Provider value={contextValue}>
            {children}
        </EventContext.Provider>
    );
}
