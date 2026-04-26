"use client"

import { createContext, useReducer } from "react";

type State = {
    successAnimate: boolean
};

type Action =
    | { type: 'PLAY'; payload: boolean }

export const EventContext = createContext<{
    successAnimate: boolean;
    setEvents: (data: boolean) => void
} | undefined>(undefined);

const initialState = {
    successAnimate: false
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

    const setEvents = (data: boolean) => {
        dispatch({
            type: 'PLAY',
            payload: data
        });
    };

    const contextValue = {
        successAnimate: state.successAnimate,
        setEvents
    };

    return (
        <EventContext.Provider value={contextValue}>
            {children}
        </EventContext.Provider>
    );
}
