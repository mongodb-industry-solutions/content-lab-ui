"use client";

/**
 * Typewriter component for the chatbot component source: https://github.com/mongodb-industry-solutions/leafy-bank-ui/blob/main/frontend/components/ChatbotPortfolio/Typewriter.jsx
 * Contains the typewriter effect for the chatbot messages
 */

import { useState, useEffect, useRef } from "react";

const Typewriter = ({ text, messageId, completedMessages, markCompleted }) => {
    const [displayedText, setDisplayedText] = useState("");
    const typingIntervalRef = useRef(null);

    useEffect(() => {
        if (completedMessages[messageId]) {
            setDisplayedText(text);
            return;
        }

        let currentIndex = 0;

        const typeNextCharacter = () => {
            currentIndex++;
            setDisplayedText((prev) => text.slice(0, currentIndex));

            if (currentIndex >= text.length) {
                clearInterval(typingIntervalRef.current);
                markCompleted(messageId);
            }
        };

        // Speed up the typing by reducing the interval from 30ms to 10ms
        typingIntervalRef.current = setInterval(typeNextCharacter, 15);

        return () => clearInterval(typingIntervalRef.current);
    }, [text, messageId, completedMessages, markCompleted]);

    // Preserve newlines by replacing \n with <br />
    return <span dangerouslySetInnerHTML={{ __html: displayedText.replace(/\n/g, '<br />') }} />;
};

export default Typewriter; 