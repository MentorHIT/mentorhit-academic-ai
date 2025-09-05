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
          <div className="bg-hit-dark text-white rounded-2xl px-5 py-4 shadow-lg ml-auto">
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

            {/* Rich Job Interface from AWS */}
            {jobData && jobData.jobs && (
              <div className="mt-6">
                <h4 className="font-semibold text-hit-dark mb-4 text-right">
                  משרות מומלצות ({jobData.jobs.length})
                </h4>
                <div className="grid gap-4">
                  {jobData.jobs.map((job, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl border border-hit-primary/20 p-4 hover:shadow-lg transition-all"
                    >
                      <div className="flex items-start gap-4">
                        {/* Company Logo */}
                        <div className="flex-shrink-0">
                          {job.logo ? (
                            <img
                              src={job.logo}
                              alt={job.company}
                              className="w-12 h-12 rounded-lg"
                            />
                          ) : (
                            <div className="w-12 h-12 bg-hit-light rounded-lg flex items-center justify-center">
                              <span className="text-hit-secondary font-bold text-sm">
                                {job.company.charAt(0)}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Job Info */}
                        <div className="flex-1 text-right">
                          <h5 className="font-bold text-hit-dark">
                            {job.title}
                          </h5>
                          <p className="text-hit-secondary font-medium">
                            {job.company}
                          </p>
                          <p className="text-sm text-gray-600 mb-2">
                            {job.location}
                          </p>

                          {/* Match Score */}
                          <div className="flex items-center justify-end gap-2 mb-2">
                            <span className="text-sm font-medium">התאמה:</span>
                            <div className="bg-hit-primary text-white px-2 py-1 rounded-full text-sm font-bold">
                              {Math.round(job.match_score * 100)}%
                            </div>
                          </div>

                          {/* Salary */}
                          <p className="text-hit-secondary font-semibold mb-2">
                            {job.salary}
                          </p>

                          {/* Skills */}
                          <div className="flex flex-wrap gap-1 justify-end">
                            {job.skills.slice(0, 4).map((skill, skillIndex) => (
                              <span
                                key={skillIndex}
                                className="bg-hit-light text-hit-dark px-2 py-1 rounded-full text-xs"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
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
