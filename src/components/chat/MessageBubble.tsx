import React from "react";
import {
  User,
  MapPin,
  DollarSign,
  Star,
  Briefcase,
  Building2,
} from "lucide-react";

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
      // Handle bullet points
      if (line.trim().startsWith("• ")) {
        const parts = line.split("**");
        if (parts.length >= 3) {
          return (
            <div
              key={index}
              className={`mb-2 ${hasHebrew ? "text-right" : "text-left"}`}
              dir={hasHebrew ? "rtl" : "ltr"}
            >
              •{" "}
              <strong className="font-semibold text-hit-dark">
                {parts[1]}
              </strong>
              {parts[2]}
            </div>
          );
        }
        return (
          <div
            key={index}
            className={`mb-2 ${hasHebrew ? "text-right" : "text-left"}`}
            dir={hasHebrew ? "rtl" : "ltr"}
          >
            {line}
          </div>
        );
      }

      // Handle bold text
      if (line.includes("**")) {
        const parts = line.split("**");
        return (
          <div
            key={index}
            className={`${index > 0 ? "mt-3" : ""} ${
              hasHebrew ? "text-right" : "text-left"
            }`}
            dir={hasHebrew ? "rtl" : "ltr"}
          >
            {parts.map((part, partIndex) =>
              partIndex % 2 === 1 ? (
                <strong key={partIndex} className="font-semibold text-hit-dark">
                  {part}
                </strong>
              ) : (
                part
              )
            )}
          </div>
        );
      }

      // Regular line
      return line.trim() ? (
        <div
          key={index}
          className={`${index > 0 ? "mt-3" : ""} ${
            hasHebrew ? "text-right" : "text-left"
          }`}
          dir={hasHebrew ? "rtl" : "ltr"}
        >
          {line}
        </div>
      ) : (
        <div key={index} className="h-3"></div>
      );
    });
  };

  // Streamlined job card rendering with reduced visual weight
  const renderJobCard = (job: any, index: number) => {
    return (
      <div
        key={index}
        className="bg-white/60 backdrop-blur-sm rounded-lg border border-hit-secondary/20 p-4 mb-3 hover:bg-white/80 transition-all duration-200"
        dir="rtl"
      >
        {/* Header */}
        <div className="flex items-start space-x-3 mb-3 space-x-reverse">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-hit-dark text-lg leading-tight text-right mb-1">
              {job.title}
            </h3>
            <p className="text-hit-secondary font-medium text-base text-right mb-2">
              {job.company}
            </p>

            {/* Metadata */}
            <div className="flex flex-wrap gap-3 justify-end text-sm text-hit-secondary">
              <div className="flex items-center space-x-1 space-x-reverse">
                <span>{job.location}</span>
                <MapPin className="w-4 h-4" />
              </div>
              <div className="flex items-center space-x-1 space-x-reverse">
                <span className="font-medium text-hit-dark">{job.salary}</span>
                <DollarSign className="w-4 h-4" />
              </div>
              <div className="flex items-center space-x-1 space-x-reverse">
                <span className="text-yellow-600 font-medium">
                  {Math.round(job.match_score * 100)}% התאמה
                </span>
                <Star className="w-4 h-4 text-yellow-500" />
              </div>
            </div>
          </div>

          {/* Company logo/icon */}
          {job.logo ? (
            <img
              src={job.logo}
              alt={`${job.company} logo`}
              className="w-12 h-12 rounded-lg object-cover border border-hit-secondary/20"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                const fallback = target.nextElementSibling as HTMLElement;
                fallback?.classList.remove("hidden");
              }}
            />
          ) : null}
          <div
            className={`w-12 h-12 rounded-lg bg-hit-primary/90 flex items-center justify-center ${
              job.logo ? "hidden" : ""
            }`}
          >
            <Building2 className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Job description preview */}
        {job.description && (
          <p className="text-sm text-hit-dark/80 leading-relaxed text-right line-clamp-2 mb-3">
            {job.description}
          </p>
        )}

        {/* Skills/Tags */}
        {job.skills && job.skills.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-end">
            {job.skills.slice(0, 4).map((skill: string, skillIndex: number) => (
              <span
                key={skillIndex}
                className="px-2 py-1 bg-hit-light text-hit-secondary text-xs rounded-md font-medium"
              >
                {skill}
              </span>
            ))}
            {job.skills.length > 4 && (
              <span className="px-2 py-1 bg-hit-secondary/10 text-hit-secondary text-xs rounded-md font-medium">
                +{job.skills.length - 4} עוד
              </span>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="group">
      {/* Main message container with Claude-inspired layout */}
      <div
        className={`flex items-start ${
          isUser ? "justify-end" : "justify-start"
        } group`}
      >
        {/* Avatar - Only for AI, positioned left */}
        {!isUser && (
          <div className="flex-shrink-0 mr-3">
            <div className="h-8 w-8 bg-hit-primary rounded-full flex items-center justify-center shadow-sm">
              <img
                src="logo-white.png"
                className="h-6 w-6"
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
        <div className={`max-w-[85%] ${isUser ? "ml-12" : "mr-12"}`}>
          {/* Message bubble with subtle styling */}
          <div
            className={`
            px-4 py-3 rounded-2xl
            ${
              isUser
                ? "bg-hit-primary/90 text-white ml-auto"
                : "bg-white/70 backdrop-blur-sm text-hit-dark border border-hit-secondary/20"
            }
          `}
          >
            <div
              className={`
                text-lg leading-relaxed
                ${containsHebrew(message.text) ? "text-right" : "text-left"}
              `}
              dir={containsHebrew(message.text) ? "rtl" : "ltr"}
            >
              {formatMessageText(message.text)}
            </div>
          </div>

          {/* Job data rendering for AI messages */}
          {!isUser && jobData && jobData.jobs && jobData.jobs.length > 0 && (
            <div className="mt-4">
              <div className="text-sm text-hit-secondary mb-3 text-right font-medium">
                {jobData.totalJobsFound
                  ? `נמצאו ${jobData.totalJobsFound} משרות רלוונטיות:`
                  : "משרות רלוונטיות:"}
              </div>
              <div className="space-y-3">
                {jobData.jobs
                  .slice(0, 3)
                  .map((job: any, index: number) => renderJobCard(job, index))}
              </div>
              {jobData.jobs.length > 3 && (
                <div className="text-center mt-4">
                  <button className="text-hit-primary hover:text-hit-secondary text-sm font-medium transition-colors">
                    הצג עוד משרות ({jobData.jobs.length - 3})
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Timestamp - subtle and small */}
          <div
            className={`
            text-xs text-hit-secondary/60 mt-2 px-1
            ${isUser ? "text-right" : "text-left"}
          `}
          >
            {formatTime(message.timestamp)}
          </div>
        </div>

        {/* User avatar - positioned right */}
        {isUser && (
          <div className="flex-shrink-0 ml-3">
            <div className="h-8 w-8 bg-hit-secondary rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
