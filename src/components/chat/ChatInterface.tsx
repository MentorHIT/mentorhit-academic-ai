// src/components/chat/ChatInterface.tsx - CORRECTED JSX VERSION

import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Loader2,
  Sparkles,
  ArrowUp,
  Mic,
  Paperclip,
  Smile,
} from "lucide-react";
import { useChat } from "../../context/ChatContext";
import MessageBubble from "./MessageBubble";
import SuggestedPrompts from "./SuggestedPrompts";

const ChatInterface = () => {
  const [inputValue, setInputValue] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
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

    // Auto-resize textarea with smoother animation
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = Math.min(textarea.scrollHeight, 160) + "px";

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
      // Auto-resize for the new content
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 160) + "px";
    }
  };

  const quickPrompts = [
    "איך אני יכול לשפר את הציונים שלי?",
    "איזה קורסי בחירה מומלצים?",
    "תכנון לוח זמנים אופטימלי",
    "הכנה לראיון עבודה",
  ];

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-hit-light/10 via-white to-gray-50/30 relative overflow-hidden">
      {/* Background pattern for visual depth */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, ${getComputedStyle(
              document.documentElement
            ).getPropertyValue("--hit-primary")} 2px, transparent 2px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Chat Messages Area - Enhanced UX Design */}
      <div className="flex-1 overflow-hidden relative z-10">
        <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-hit-primary/20 scrollbar-track-transparent">
          {/* ✅ SCROLLING FIX: Removed min-h-full from this container */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
            {/* Enhanced Welcome State - ORIGINAL HEBREW TEXT */}
            {messages.length === 0 && (
              <div className="text-center py-12 sm:py-16 px-6 animate-fadeIn">
                {/* Hero Logo with glow effect */}
                <div className="relative mb-8">
                  <div className="h-24 w-24 sm:h-28 sm:w-28 bg-gradient-to-br from-hit-primary via-hit-secondary to-hit-dark rounded-3xl flex items-center justify-center mx-auto shadow-2xl relative overflow-hidden">
                    <img
                      src="/logo-white-bg.png"
                      className="h-14 w-14 sm:h-16 sm:w-16 rounded-2xl z-10"
                      alt="MentorHIT"
                    />
                    {/* Animated glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/10 to-transparent rounded-3xl animate-pulse" />
                  </div>
                </div>

                {/* Enhanced Welcome Message */}
                <div className="mb-10 sm:mb-12">
                  <h2 className="text-3xl sm:text-4xl font-bold text-hit-dark mb-4 leading-tight">
                    שלום! אני מנטור
                    <span className="bg-gradient-to-r from-hit-primary to-hit-secondary bg-clip-text text-transparent">
                      HIT
                    </span>
                  </h2>
                  <p className="text-lg sm:text-xl text-hit-secondary max-w-2xl mx-auto leading-relaxed">
                    הייעוץ האקדמי החכם שלכם במכון הטכנולוגי חולון
                  </p>
                  <div className="mt-6 text-base text-hit-secondary/80 max-w-lg mx-auto">
                    אני כאן כדי לעזור לכם לתכנן את הלימודים, לבחור קורסים ולהכין
                    אתכם לקריירה בהיי-טק 🚀
                  </div>
                </div>

                {/* Enhanced Suggested Prompts */}
                <div className="max-w-3xl mx-auto mb-8">
                  <p className="text-hit-secondary text-lg mb-6 font-medium">
                    💡 נושאים פופולריים שאתם יכולים לשאול עליהם:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {quickPrompts.map((prompt, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestedPrompt(prompt)}
                        className="group p-4 bg-white/80 hover:bg-white border-2 border-hit-primary/20 hover:border-hit-primary/40 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 text-right backdrop-blur-sm transform hover:-translate-y-1"
                      >
                        <p className="text-base font-semibold text-hit-dark group-hover:text-hit-primary transition-colors">
                          {prompt}
                        </p>
                      </button>
                    ))}
                  </div>

                  {/* Enhanced CTA - HIT Colors */}
                  <div className="bg-gradient-to-r from-hit-light/70 to-hit-light/50 backdrop-blur-sm rounded-2xl p-6 border border-hit-primary/30 max-w-md mx-auto">
                    <p className="text-hit-secondary text-base mb-4">
                      או הקלידו שאלה בתיבה למטה
                    </p>
                    <div className="flex items-center justify-center space-x-2 text-hit-primary/60">
                      <div className="h-2 w-2 bg-hit-primary rounded-full animate-bounce" />
                      <div className="h-2 w-2 bg-hit-secondary rounded-full animate-bounce delay-100" />
                      <div className="h-2 w-2 bg-hit-dark rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Enhanced Message List */}
            {messages.map((message, index) => {
              const shouldPassJobData =
                message.sender === "ai" &&
                index === messages.length - 1 &&
                lastJobData;

              return (
                <div key={message.id} className="animate-slideIn">
                  <MessageBubble
                    message={message}
                    jobData={shouldPassJobData ? lastJobData : undefined}
                  />
                </div>
              );
            })}

            {/* Enhanced Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start mb-6 animate-slideIn">
                <div className="flex items-center space-x-4">
                  <div className="h-8 w-8 bg-hit-primary rounded-full flex items-center justify-center shadow-sm">
                    <img
                      src="/logo-white-bg.png"
                      className="h-5 w-5 rounded"
                      alt="MentorHIT"
                    />
                  </div>
                  <div className="bg-gray-100 rounded-2xl px-5 py-4 shadow-sm">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="h-2 w-2 bg-hit-primary rounded-full animate-bounce" />
                        <div className="h-2 w-2 bg-hit-secondary rounded-full animate-bounce delay-100" />
                        <div className="h-2 w-2 bg-hit-dark rounded-full animate-bounce delay-200" />
                      </div>
                      <span className="text-sm text-hit-secondary">
                        מנטורHIT כותב...
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Scroll anchor */}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Enhanced Input Area */}
      <div className="border-t border-hit-primary/20 bg-gradient-to-r from-white/95 to-hit-light/30 backdrop-blur-xl relative z-20">
        <div className="max-w-4xl mx-auto p-4 sm:p-6">
          <div className="relative">
            <form onSubmit={handleSubmit} className="relative">
              <div
                className={`
                  relative overflow-hidden rounded-3xl border-2 transition-all duration-300 backdrop-blur-sm
                  ${
                    isInputFocused
                      ? "border-hit-primary/50 shadow-xl shadow-hit-primary/10"
                      : "border-hit-primary/30 shadow-lg"
                  }
                `}
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(232,247,248,0.8) 100%)",
                }}
              >
                <div className="flex items-end space-x-4 p-4">
                  {/* Enhanced Textarea */}
                  <div className="flex-1 relative">
                    <textarea
                      ref={textareaRef}
                      value={inputValue}
                      onChange={handleInputChange}
                      onKeyPress={handleKeyPress}
                      onFocus={() => setIsInputFocused(true)}
                      onBlur={() => setIsInputFocused(false)}
                      placeholder="שאלו אותי כל שאלה אקדמית..."
                      className="w-full resize-none bg-transparent border-none outline-none text-base text-hit-dark placeholder-hit-secondary/70 leading-relaxed"
                      style={{
                        minHeight: "24px",
                        maxHeight: "160px",
                        direction: containsHebrew(inputValue) ? "rtl" : "ltr",
                        textAlign: containsHebrew(inputValue)
                          ? "right"
                          : "left",
                      }}
                      rows={1}
                      maxLength={2000}
                    />
                  </div>

                  {/* Enhanced Send Button */}
                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isTyping}
                    className={`
                      group relative rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform active:scale-95 border-0 outline-none
                      ${
                        inputValue.trim() && !isTyping
                          ? "bg-gradient-to-r from-hit-primary to-hit-secondary text-white hover:shadow-xl hover:scale-105 active:scale-95"
                          : "bg-hit-secondary/20 text-hit-secondary/40 cursor-not-allowed"
                      }
                    `}
                    style={{
                      minHeight: "48px",
                      minWidth: "48px",
                      padding: "12px",
                    }}
                  >
                    {isTyping ? (
                      <Loader2 className="h-6 w-6 animate-spin" />
                    ) : (
                      <>
                        <ArrowUp className="h-6 w-6 group-hover:scale-110 transition-transform" />
                        {/* Button glow effect */}
                        {inputValue.trim() && (
                          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl" />
                        )}
                      </>
                    )}
                  </button>
                </div>

                {/* Focus glow effect */}
                {isInputFocused && (
                  <div className="absolute inset-0 bg-gradient-to-r from-hit-primary/5 to-hit-secondary/5 rounded-3xl pointer-events-none" />
                )}
              </div>
            </form>

            {/* Enhanced footer with status */}
            <div className="flex items-center justify-between mt-4 px-2">
              <div className="flex items-center space-x-2 text-sm text-hit-secondary/70">
                <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse" />
                <span>AI Assistant Online</span>
              </div>

              <div className="text-sm text-hit-secondary/70">
                {inputValue.length > 0 && (
                  <span className="transition-opacity duration-200">
                    {inputValue.length}/2000
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
