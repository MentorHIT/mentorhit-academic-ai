import React, { useState, useRef, useEffect } from "react";
import { Send, Loader2 } from "lucide-react";
import { useChat } from "../../context/ChatContext";
import MessageBubble from "./MessageBubble";
import SuggestedPrompts from "./SuggestedPrompts";

const ChatInterface = () => {
  const [inputValue, setInputValue] = useState("");
  const {
    messages,
    isTyping,
    sendMessage,
    conversationHistory,
    lastResponseMetadata,
    lastJobData,
  } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Helper function to detect Hebrew text
  const containsHebrew = (text: string) => {
    return /[\u0590-\u05FF]/.test(text);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const message = inputValue.trim();
    setInputValue("");

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    await sendMessage(message);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInputValue(value);

    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px";

    // Auto-detect RTL direction
    const hasHebrew = containsHebrew(value);
    textarea.dir = hasHebrew ? "rtl" : "ltr";
    textarea.style.textAlign = hasHebrew ? "right" : "left";
  };

  const handleSuggestedPrompt = (prompt: string) => {
    setInputValue(prompt);
    if (textareaRef.current) {
      textareaRef.current.focus();
      // Set RTL for Hebrew prompts
      const hasHebrew = containsHebrew(prompt);
      textareaRef.current.dir = hasHebrew ? "rtl" : "ltr";
      textareaRef.current.style.textAlign = hasHebrew ? "right" : "left";
    }
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-hit-light/30 to-white dark:from-gray-900/30 dark:to-gray-800 transition-colors duration-300">
      {/* Chat Messages Area - Claude-inspired layout */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto">
          {/* Messages container with reduced spacing */}
          <div className="max-w-4xl mx-auto px-4 py-6 space-y-3 min-h-full">
            {/* Welcome message for empty chat */}
            {messages.length === 0 && (
              <div className="text-center py-12">
                <div className="h-16 w-16 bg-hit-primary/10 dark:bg-hit-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <img
                    src="logo-white.png"
                    className="h-10 w-10"
                    alt="MentorHIT"
                  />
                </div>
                <h2 className="text-xl font-semibold text-hit-dark dark:text-hit-light mb-2">
                  ברוכים הבאים ל-MentorHIT
                </h2>
                <p className="text-hit-secondary dark:text-gray-400 text-lg leading-relaxed max-w-md mx-auto">
                  היועץ האקדמי הדיגיטלי שלכם. איך אני יכול לעזור לכם היום?
                </p>
              </div>
            )}

            {/* Message list with tighter spacing */}
            {messages.map((message, index) => {
              // For AI messages, check if this is the last message and pass job data
              const shouldPassJobData =
                message.sender === "ai" &&
                index === messages.length - 1 &&
                lastJobData;

              return (
                <MessageBubble
                  key={message.id}
                  message={message}
                  jobData={shouldPassJobData ? lastJobData : undefined}
                />
              );
            })}

            {/* Typing indicator with new styling */}
            {isTyping && (
              <div className="flex items-start justify-start group">
                <div className="flex-shrink-0 mr-3">
                  <div className="h-8 w-8 bg-hit-primary rounded-full flex items-center justify-center shadow-sm">
                    <img
                      src="logo-white.png"
                      className="h-6 w-6"
                      alt="MentorHIT"
                    />
                  </div>
                </div>
                <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl px-4 py-3 border border-hit-secondary/20 dark:border-gray-600/20">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-hit-secondary dark:bg-hit-primary rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-hit-secondary dark:bg-hit-primary rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-hit-secondary dark:bg-hit-primary rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                    <span className="text-sm text-hit-secondary dark:text-gray-300 font-medium">
                      MentorHIT חושב...
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Suggested Prompts - Cleaner styling */}
      {messages.length <= 1 && (
        <div className="px-4 pb-4">
          <div className="max-w-4xl mx-auto">
            <SuggestedPrompts onPromptClick={handleSuggestedPrompt} />
          </div>
        </div>
      )}

      {/* Input Area - Enhanced styling with fixed positioning */}
      <div className="border-t border-hit-secondary/20 dark:border-gray-600/20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto p-4">
          <form onSubmit={handleSubmit} className="flex items-end space-x-3">
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="שאלו על קורסים, ייעוץ קריירה או תכנון אקדמי..."
                className="
                  w-full px-4 py-3 border border-hit-secondary/30 dark:border-gray-600/30 rounded-xl resize-none 
                  focus:ring-2 focus:ring-hit-primary focus:border-hit-primary 
                  transition-all duration-200 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm
                  text-lg leading-relaxed placeholder:text-hit-secondary/60 dark:placeholder:text-gray-400
                  hover:border-hit-secondary/50 dark:hover:border-gray-500/50
                  dark:text-gray-100
                "
                style={{
                  minHeight: "52px",
                  maxHeight: "120px",
                  textAlign: containsHebrew(inputValue) ? "right" : "left",
                }}
                dir={containsHebrew(inputValue) ? "rtl" : "ltr"}
                disabled={isTyping}
              />
            </div>

            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="
                bg-hit-primary text-white p-3 rounded-xl 
                hover:bg-hit-primary/90 focus:ring-2 focus:ring-hit-primary focus:ring-offset-2 
                transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed 
                shadow-lg hover:shadow-xl flex-shrink-0 dark:focus:ring-offset-gray-900
              "
            >
              {isTyping ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
