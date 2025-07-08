'use client';

import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { Mic, Send } from "lucide-react";
import { Body } from '@leafygreen-ui/typography';
import Card from '@leafygreen-ui/card';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import styles from "./ChatbotInput.module.css";

export default function ChatbotInput({ className, onChange, onSendMessage, ...props }) {
  const internalTextareaRef = useRef(null);
  const [value, setValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [baseText, setBaseText] = useState(""); // Text before speech recognition started

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  // Auto-resize textarea
  useLayoutEffect(() => {
    const textarea = internalTextareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const newHeight = Math.min(textarea.scrollHeight, 200);
      textarea.style.height = `${newHeight}px`;
    }
  }, [value]);

  // Update the listening state based on actual SpeechRecognition state
  useEffect(() => {
    setIsListening(listening);
  }, [listening]);

  // Handle transcript updates
  useEffect(() => {
    if (isListening && transcript) {
      // Combine base text with current transcript
      const newValue = baseText + (baseText ? ' ' : '') + transcript;
      setValue(newValue);
      
      if (onChange) {
        const syntheticEvent = {
          target: { value: newValue }
        };
        onChange(syntheticEvent);
      }
    }
  }, [transcript, isListening, baseText, onChange]);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter' && isListening) {
        e.preventDefault();
        stopListening();
      }
    };

    if (isListening) {
      document.addEventListener('keydown', handleKeyPress);
      return () => document.removeEventListener('keydown', handleKeyPress);
    }
  }, [isListening]);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    
    // If not listening, update base text to current value
    if (!isListening) {
      setBaseText(newValue);
    }
    
    if (onChange) onChange(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) {
      // Send message to parent component
      if (onSendMessage) {
        onSendMessage(value.trim());
      }
      
      // Clear input after sending
      setValue("");
      setBaseText("");
      resetTranscript();
    }
  };

  const startListening = () => {
    if (!browserSupportsSpeechRecognition) {
      console.warn("Browser doesn't support speech recognition");
      alert("Your browser doesn't support speech recognition. Please try Chrome or Edge.");
      return;
    }
    
    // Store current text as base text
    setBaseText(value);
    resetTranscript();
    
    SpeechRecognition.startListening({ 
      continuous: true,
      language: 'en-US'
    });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    // After stopping, set the final combined text as the base text
    if (transcript) {
      const finalText = baseText + (baseText ? ' ' : '') + transcript;
      setBaseText(finalText);
      setValue(finalText);
    }
  };

  const handleMicClick = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const hasValue = value.trim().length > 0;

  return (
    <Card className={styles.compactCard}>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputWrapper}>
          <Body
            as="textarea"
            ref={internalTextareaRef}
            rows={1}
            value={value}
            onChange={handleInputChange}
            placeholder={isListening ? "Listening..." : "Ask me anything..."}
            className={styles.textarea}
            disabled={isListening} // Disable manual input while listening
            {...props}
          />
          
          <div className={styles.buttonContainer}>
            <button
              type="button"
              onClick={handleMicClick}
              className={`${styles.micButton} ${isListening ? styles.listening : ""}`}
              aria-label={isListening ? "Stop recording" : "Start recording"}
            >
              <Mic className={styles.icon} />
            </button>

            <button
              type="submit"
              disabled={!hasValue}
              className={`${styles.sendButton} ${!hasValue ? styles.disabled : ""}`}
              aria-label="Send message"
            >
              <Send className={styles.icon} />
            </button>
          </div>
        </div>
      </form>
    </Card>
  );
}