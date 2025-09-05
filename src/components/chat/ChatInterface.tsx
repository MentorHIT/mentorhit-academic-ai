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
        ></div>
      </div>

      {/* Chat Messages Area - Enhanced UX Design */}
      <div className="flex-1 overflow-hidden relative z-10">
        <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-hit-primary/20 scrollbar-track-transparent">
          {/* Messages container with professional spacing */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 min-h-full">
            {/* Enhanced Welcome State */}
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
                    <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-3xl"></div>
                    <div className="absolute -inset-1 bg-gradient-to-br from-hit-primary to-hit-secondary rounded-3xl blur-xl opacity-50 animate-pulse"></div>
                  </div>

                  {/* Floating sparkles */}
                  <div className="absolute top-2 right-1/3 animate-bounce delay-100">
                    <Sparkles className="h-4 w-4 text-hit-primary/60" />
                  </div>
                  <div className="absolute bottom-2 left-1/3 animate-bounce delay-300">
                    <Sparkles className="h-3 w-3 text-hit-secondary/60" />
                  </div>
                </div>

                {/* Enhanced welcome text */}
                <div className="mb-8">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-hit-dark via-hit-primary to-hit-secondary bg-clip-text text-transparent mb-4 leading-tight">
                    ברוכים הבאים ל-MentorHIT
                  </h2>
                  <p className="text-hit-secondary text-xl sm:text-2xl leading-relaxed max-w-2xl mx-auto font-medium">
                    היועץ האקדמי הדיגיטלי שלכם
                  </p>
                  <p className="text-hit-secondary/80 text-lg mt-3 max-w-lg mx-auto">
                    קבלו ייעוץ מותאם אישית, המלצות על קורסים ותכנון קריירה חכם
                  </p>
                </div>

                {/* Quick start buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto mb-8">
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

                {/* Enhanced CTA */}
                <div className="bg-gradient-to-r from-hit-light/50 to-white/50 backdrop-blur-sm rounded-2xl p-6 border border-hit-primary/20 max-w-md mx-auto">
                  <p className="text-hit-secondary text-base mb-4">
                    או הקלידו שאלה בתיבה למטה
                  </p>
                  <div className="flex items-center justify-center space-x-2 text-hit-primary/60">
                    <div className="h-2 w-2 bg-hit-primary rounded-full animate-bounce"></div>
                    <div className="h-2 w-2 bg-hit-secondary rounded-full animate-bounce delay-100"></div>
                    <div className="h-2 w-2 bg-hit-dark rounded-full animate-bounce delay-200"></div>
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
              <div className="flex items-start justify-start group animate-slideIn">
                <div className="flex-shrink-0 mr-4">
                  <div className="h-12 w-12 bg-gradient-to-br from-hit-primary to-hit-secondary rounded-2xl flex items-center justify-center shadow-lg relative">
                    <img
                      src="/logo-white-bg.png"
                      className="h-8 w-8 rounded-lg z-10"
                      alt="MentorHIT"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
                  </div>
                </div>
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-4 border border-hit-secondary/20 shadow-md">
                  <div className="flex items-center space-x-4">
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 bg-hit-secondary rounded-full animate-bounce"></div>
                      <div className="w-3 h-3 bg-hit-secondary rounded-full animate-bounce delay-100"></div>
                      <div className="w-3 h-3 bg-hit-secondary rounded-full animate-bounce delay-200"></div>
                    </div>
                    <span className="text-lg font-semibold text-hit-secondary">
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

      {/* Suggested Prompts - Only show when minimal chat */}
      {messages.length > 0 && messages.length <= 2 && (
        <div className="px-4 sm:px-6 pb-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <SuggestedPrompts onPromptClick={handleSuggestedPrompt} />
          </div>
        </div>
      )}

      {/* Enhanced Input Area - Professional Design */}
      <div className="relative z-10">
        {/* Input container with enhanced styling */}
        <div className="bg-white/95 backdrop-blur-xl border-t border-hit-primary/20 shadow-2xl">
          <div className="max-w-4xl mx-auto p-4 sm:p-6">
            {/* Enhanced input form */}
            <form onSubmit={handleSubmit} className="relative">
              <div
                className={`
                relative bg-white rounded-3xl border-2 transition-all duration-300 shadow-lg overflow-hidden
                ${
                  isInputFocused
                    ? "border-hit-primary shadow-hit-primary/20 shadow-2xl"
                    : "border-hit-primary/30 hover:border-hit-primary/50"
                }
              `}
              >
                {/* Input field with enhanced design */}
                <textarea
                  ref={textareaRef}
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                  placeholder="שאלו על קורסים, ייעוץ קריירה או תכנון אקדמי..."
                  className="
                    w-full px-6 py-5 pr-24 resize-none bg-transparent
                    text-xl leading-relaxed font-medium text-hit-dark placeholder:text-hit-secondary/50
                    focus:outline-none
                  "
                  style={{
                    minHeight: "68px",
                    maxHeight: "160px",
                    textAlign: containsHebrew(inputValue) ? "right" : "left",
                    fontSize: "18px", // Prevent zoom on iOS
                  }}
                  dir={containsHebrew(inputValue) ? "rtl" : "ltr"}
                  disabled={isTyping}
                />

                {/* Input actions area */}
                <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                  {/* Additional action buttons */}
                  <button
                    type="button"
                    className="p-2 text-hit-secondary/60 hover:text-hit-primary rounded-xl hover:bg-hit-light/30 transition-all duration-200"
                    title="הוסף קובץ"
                  >
                    <Paperclip className="h-5 w-5" />
                  </button>

                  <button
                    type="button"
                    className="p-2 text-hit-secondary/60 hover:text-hit-primary rounded-xl hover:bg-hit-light/30 transition-all duration-200"
                    title="הקלטה קולית"
                  >
                    <Mic className="h-5 w-5" />
                  </button>
                </div>

                {/* Enhanced Send Button */}
                <div className="absolute bottom-4 right-4">
                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isTyping}
                    className={`
                      relative overflow-hidden rounded-2xl transition-all duration-300 shadow-lg
                      flex items-center justify-center group
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
                          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl"></div>
                        )}
                      </>
                    )}
                  </button>
                </div>

                {/* Focus glow effect */}
                {isInputFocused && (
                  <div className="absolute inset-0 bg-gradient-to-r from-hit-primary/5 to-hit-secondary/5 rounded-3xl pointer-events-none"></div>
                )}
              </div>
            </form>

            {/* Enhanced footer with status */}
            <div className="flex items-center justify-between mt-4 px-2">
              <div className="flex items-center space-x-2 text-sm text-hit-secondary/70">
                <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
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
