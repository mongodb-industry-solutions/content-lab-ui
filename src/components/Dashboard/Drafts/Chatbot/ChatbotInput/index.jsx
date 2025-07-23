'use client';

/**
 * Chatbot input component for the chatbot component
 * Contains the chatbot input and the send button
 */

import { useState, useRef, useLayoutEffect } from "react";
import { Send, X } from "lucide-react";
import { Body } from '@leafygreen-ui/typography';
import Card from '@leafygreen-ui/card';
import styles from "./ChatbotInput.module.css";

export default function ChatbotInput({ 
  className, 
  onChange, 
  onSendMessage, 
  activeCommand,
  onClearActiveCommand,
  ...props 
}) {
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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim() || activeCommand) {
      const messageToSend = activeCommand ? `${activeCommand.command} ${value}`.trim() : value.trim();
      
      // Send message to parent component
      if (onSendMessage) {
        onSendMessage(messageToSend);
      }
      
      // Clear input after sending
      setValue("");
    }
  };

  const hasValue = value.trim().length > 0 || activeCommand;

  return (
    <Card className={styles.compactCard}>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputWrapper}>
          {activeCommand && (
            <div className={styles.commandChip}>
              <span>{activeCommand.command}</span>
              <button
                type="button"
                onClick={onClearActiveCommand}
                className={styles.commandRemove}
                aria-label="Remove command"
              >
                <X className={styles.removeIcon} />
              </button>
            </div>
          )}
          <Body
            as="textarea"
            ref={internalTextareaRef}
            rows={1}
            value={value}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={activeCommand ? "Add context for your command..." : "Start typing to brainstorm, edit, or improve text..."}
            className={`${styles.textarea} ${activeCommand ? styles.textareaWithCommand : ''}`}
            {...props}
          />
          
          <div className={styles.buttonContainer}>
            <button
              type="submit"
              disabled={!hasValue}
              className={styles.sendButton}
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