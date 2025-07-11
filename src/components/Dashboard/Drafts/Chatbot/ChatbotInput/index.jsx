'use client';

import { useState, useRef, useLayoutEffect } from "react";
import { Send } from "lucide-react";
import { Body } from '@leafygreen-ui/typography';
import Card from '@leafygreen-ui/card';
import styles from "./ChatbotInput.module.css";

export default function ChatbotInput({ className, onChange, onSendMessage, ...props }) {
  const internalTextareaRef = useRef(null);
  const [value, setValue] = useState("");

  // Auto-resize textarea
  useLayoutEffect(() => {
    const textarea = internalTextareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const newHeight = Math.min(textarea.scrollHeight, 200);
      textarea.style.height = `${newHeight}px`;
    }
  }, [value]);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    
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
            placeholder="Ask me anything..."
            className={styles.textarea}
            {...props}
          />
          
          <div className={styles.buttonContainer}>
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