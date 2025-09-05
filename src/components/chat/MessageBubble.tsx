import React from "react";
import { User } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface MessageBubbleProps {
  message: Message;
  jobData?: any;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, jobData }) => {
  const isUser = message.sender === "user";

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Helper function to detect if text contains Hebrew
  const containsHebrew = (text: string) => {
    return /[\u0590-\u05FF]/.test(text);
  };

  const formatMessageText = (text: string) => {
    const lines = text.split("\n");
    const hasHebrew = containsHebrew(text);

    return lines.map((line, index) => {
      // Handle bullet points with minimal styling
      if (line.trim().startsWith("• ")) {
        const parts = line.split("**");
        if (parts.length >= 3) {
          return (
            <div
              key={index}
              className={`mb-3 ${
                hasHebrew ? "text-right" : "text-left"
              } flex items-start space-x-3 space-x-reverse`}
              dir={hasHebrew ? "rtl" : "ltr"}
            >
              <div className="text-gray-400 mt-2 flex-shrink-0">•</div>
              <div>
                <strong className="font-semibold block mb-1">{parts[1]}</strong>
                <span className="text-gray-700">{parts[2]}</span>
              </div>
            </div>
          );
        }
        return (
          <div
            key={index}
            className={`mb-3 ${
              hasHebrew ? "text-right" : "text-left"
            } flex items-start space-x-3 space-x-reverse`}
            dir={hasHebrew ? "rtl" : "ltr"}
          >
            <div className="text-gray-400 mt-2 flex-shrink-0">•</div>
            <span>{line.substring(2)}</span>
          </div>
        );
      }

      // Handle bold text with minimal styling
      if (line.includes("**")) {
        const parts = line.split("**");
        return (
          <div
            key={index}
            className={`${index > 0 ? "mt-4" : ""} ${
              hasHebrew ? "text-right" : "text-left"
            }`}
            dir={hasHebrew ? "rtl" : "ltr"}
          >
            {parts.map((part, partIndex) =>
              partIndex % 2 === 1 ? (
                <strong key={partIndex} className="font-semibold">
                  {part}
                </strong>
              ) : (
                <span key={partIndex}>{part}</span>
              )
            )}
          </div>
        );
      }

      // Regular line
      return line.trim() ? (
        <div
          key={index}
          className={`${index > 0 ? "mt-4" : ""} ${
            hasHebrew ? "text-right" : "text-left"
          }`}
          dir={hasHebrew ? "rtl" : "ltr"}
        >
          {line}
        </div>
      ) : (
        <div key={index} className="mt-4" />
      );
    });
  };

  return (
    <div
      className={`flex w-full ${
        isUser ? "justify-end" : "justify-start"
      } group px-2 mb-6`}
    >
      {/* AI Avatar - Only for AI messages, very minimal */}
      {!isUser && (
        <div className="flex-shrink-0 mr-4 mt-1">
          <div className="h-8 w-8 bg-hit-primary rounded-full flex items-center justify-center shadow-sm">
            <img
              src="/logo-white-bg.png"
              className="h-5 w-5 rounded"
              alt="MentorHIT"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
              }}
            />
          </div>
        </div>
      )}

      {/* Message content */}
      <div
        className={`max-w-[85%] sm:max-w-[75%] ${
          isUser ? "ml-10 sm:ml-12" : "mr-10 sm:mr-12"
        }`}
      >
        {/* User messages: Keep styled bubble for contrast */}
        {isUser ? (
          <div className="bg-gradient-to-br from-hit-dark via-hit-secondary to-hit-dark text-white rounded-2xl px-5 py-4 shadow-lg ml-auto">
            <div
              className={`text-base leading-relaxed ${
                containsHebrew(message.text) ? "text-right" : "text-left"
              }`}
              dir={containsHebrew(message.text) ? "rtl" : "ltr"}
            >
              {formatMessageText(message.text)}
            </div>

            {/* Timestamp for user messages */}
            <div className="text-xs text-white/70 mt-2 text-left">
              {formatTime(message.timestamp)}
            </div>
          </div>
        ) : (
          /* AI messages: Claude-style plain text - NO background, borders, or styling */
          <div className="w-full">
            <div
              className={`text-base leading-relaxed text-gray-800 ${
                containsHebrew(message.text) ? "text-right" : "text-left"
              }`}
              dir={containsHebrew(message.text) ? "rtl" : "ltr"}
            >
              {formatMessageText(message.text)}
            </div>

            {/* Minimal timestamp for AI messages */}
            <div
              className={`text-xs text-gray-400 mt-3 ${
                containsHebrew(message.text) ? "text-right" : "text-left"
              }`}
            >
              {formatTime(message.timestamp)}
            </div>

            {/* Job data display if present - also minimal styling */}
            {jobData && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg border-l-4 border-hit-primary">
                <h4 className="font-semibold text-hit-dark mb-2">
                  פרטי משרה רלוונטית:
                </h4>
                <div className="space-y-2 text-sm text-gray-700">
                  <div>
                    <strong>חברה:</strong> {jobData.company}
                  </div>
                  <div>
                    <strong>תפקיד:</strong> {jobData.title}
                  </div>
                  <div>
                    <strong>מיקום:</strong> {jobData.location}
                  </div>
                  <div>
                    <strong>דרישות:</strong> {jobData.requirements}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
