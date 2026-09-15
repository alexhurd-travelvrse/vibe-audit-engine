import React, { useEffect, useRef } from 'react';
import { useCreator } from '../context/CreatorContext';

const AudioController = ({ experienceId, active, script }) => {
    const { creator } = useGame(); // Keep this if used for something else, otherwise remove
    const { publicConfig } = useCreator();
    const currentIdRef = useRef(experienceId);
    const playedForThisRoom = useRef(false);

    useEffect(() => {
        if (!active) return;

        // Reset tracking if room changed
        if (currentIdRef.current !== experienceId) {
            playedForThisRoom.current = false;
            currentIdRef.current = experienceId;
            window.speechSynthesis.cancel();
        }

        if (playedForThisRoom.current) return;
        playedForThisRoom.current = true;

        const playVoice = () => {
            // Priority: Prop Script > Configured Script > Default Config Script > Fallback
            const configScript = publicConfig.audio[experienceId];
            const defaultScript = publicConfig.audio['default'];

            const text = script || configScript || defaultScript || "Welcome to the experience.";

            const utterance = new SpeechSynthesisUtterance(text);
            const voices = window.speechSynthesis.getVoices();
            const preferredVoice = voices.find(v =>
                (v.name.includes("Male") || v.name.includes("David") || v.name.includes("Google US English")) &&
                (v.lang.includes("en-US"))
            ) || voices.find(v => v.lang.includes("en"));
            if (preferredVoice) utterance.voice = preferredVoice;
            window.speechSynthesis.cancel();
            window.speechSynthesis.speak(utterance);
        };

        const handleInit = () => {
            playVoice();
        };

        window.addEventListener('init-audio', handleInit);

        const timer = setTimeout(playVoice, 1500);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('init-audio', handleInit);
            window.speechSynthesis.cancel();
            window.speechSynthesis.onvoiceschanged = null;
        };
    }, [experienceId, active, script]);

    return null;
};

export default AudioController;
