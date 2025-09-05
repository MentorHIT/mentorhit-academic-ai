import React from "react";
import {
  User,
  MapPin,
  DollarSign,
  Star,
  Briefcase,
  Building2,
  Clock,
  ThumbsUp,
  Share2,
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
      // Handle bullet points with enhanced styling
      if (line.trim().startsWith("• ")) {
        const parts = line.split("**");
        if (parts.length >= 3) {
          return (
            <div
              key={index}
              className={`mb-4 ${
                hasHebrew ? "text-right" : "text-left"
              } flex items-start space-x-3 space-x-reverse`}
              dir={hasHebrew ? "rtl" : "ltr"}
            >
              <div className="h-2 w-2 bg-current rounded-full mt-3 flex-shrink-0"></div>
              <div>
                <strong className="font-bold text-current block mb-1">
                  {parts[1]}
                </strong>
                <span className="text-current/90">{parts[2]}</span>
              </div>
            </div>
          );
        }
        return (
          <div
            key={index}
            className={`mb-4 ${
              hasHebrew ? "text-right" : "text-left"
            } flex items-start space-x-3 space-x-reverse`}
            dir={hasHebrew ? "rtl" : "ltr"}
          >
            <div className="h-2 w-2 bg-current rounded-full mt-3 flex-shrink-0"></div>
            <span>{line.substring(2)}</span>
          </div>
        );
      }

      // Handle bold text with enhanced styling
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
                <strong
                  key={partIndex}
                  className="font-bold text-current bg-current/10 px-2 py-0.5 rounded-md"
                >
                  {part}
                </strong>
              ) : (
                <span key={partIndex}>{part}</span>
              )
            )}
          </div>
        );
      }

      // Regular line with enhanced spacing
      return line.trim() ? (
        <div
          key={index}
          className={`${index > 0 ? "mt-4" : ""} ${
            hasHebrew ? "text-right" : "text-left"
          } leading-relaxed`}
          dir={hasHebrew ? "rtl" : "ltr"}
        >
          {line}
        </div>
      ) : (
        <div key={index} className="h-4"></div>
      );
    });
  };

  // Enhanced job card rendering
  const renderJobCard = (job: any, index: number) => {
    return (
      <div
        key={index}
        className="group bg-white/95 backdrop-blur-sm rounded-2xl border border-hit-primary/20 p-5 mb-4 hover:bg-white hover:border-hit-primary/40 transition-all duration-300 shadow-sm hover:shadow-lg transform hover:-translate-y-1"
        dir="rtl"
      >
        {/* Enhanced job header */}
        <div className="flex items-start space-x-4 mb-4 space-x-reverse">
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-end mb-2">
              <span className="text-xs font-bold text-hit-primary bg-hit-light px-3 py-1 rounded-full">
                התאמה של {Math.round(job.match_score * 100)}%
              </span>
            </div>

            <h3 className="font-bold text-hit-dark text-xl sm:text-2xl leading-tight text-right mb-2 group-hover:text-hit-primary transition-colors">
              {job.title}
            </h3>

            <div className="flex items-center justify-end space-x-2 space-x-reverse mb-3">
              <p className="text-hit-secondary font-bold text-lg">
                {job.company}
              </p>
              <Building2 className="w-5 h-5 text-hit-secondary" />
            </div>

            {/* Enhanced metadata grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center space-x-2 space-x-reverse justify-end">
                <span className="font-semibold text-hit-dark">
                  {job.location}
                </span>
                <div className="p-2 bg-hit-light rounded-lg">
                  <MapPin className="w-4 h-4 text-hit-primary" />
                </div>
              </div>

              <div className="flex items-center space-x-2 space-x-reverse justify-end">
                <span className="font-bold text-hit-primary text-lg">
                  {job.salary}
                </span>
                <div className="p-2 bg-green-50 rounded-lg">
                  <DollarSign className="w-4 h-4 text-green-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced company logo */}
          {job.logo ? (
            <img
              src={job.logo}
              alt={`${job.company} logo`}
              className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl object-cover border-2 border-hit-primary/20 shadow-md group-hover:border-hit-primary/40 transition-colors"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                const fallback = target.nextElementSibling as HTMLElement;
                fallback?.classList.remove("hidden");
              }}
            />
          ) : null}
          <div
            className={`w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-br from-hit-primary to-hit-secondary flex items-center justify-center shadow-md ${
              job.logo ? "hidden" : ""
            }`}
          >
            <Building2 className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Enhanced job description */}
        {job.description && (
          <div className="mb-4 p-4 bg-hit-light/50 rounded-xl">
            <p className="text-base text-hit-dark/90 leading-relaxed text-right line-clamp-3">
              {job.description}
            </p>
          </div>
        )}

        {/* Enhanced skills section */}
        {job.skills && job.skills.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-bold text-hit-secondary mb-3 text-right">
              כישורים נדרשים:
            </h4>
            <div className="flex flex-wrap gap-2 justify-end">
              {job.skills
                .slice(0, 4)
                .map((skill: string, skillIndex: number) => (
                  <span
                    key={skillIndex}
                    className="px-3 py-2 bg-gradient-to-r from-hit-light to-white text-hit-secondary text-sm font-semibold rounded-xl border border-hit-primary/20 hover:border-hit-primary/40 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              {job.skills.length > 4 && (
                <span className="px-3 py-2 bg-hit-secondary/10 text-hit-secondary text-sm font-semibold rounded-xl border border-hit-secondary/20">
                  +{job.skills.length - 4} עוד
                </span>
              )}
            </div>
          </div>
        )}

        {/* Enhanced action buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-hit-primary/10">
          <div className="flex items-center space-x-3">
            <button className="p-2 text-hit-secondary hover:text-hit-primary hover:bg-hit-light rounded-lg transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
            <button className="p-2 text-hit-secondary hover:text-hit-primary hover:bg-hit-light rounded-lg transition-colors">
              <ThumbsUp className="w-4 h-4" />
            </button>
          </div>

          <button className="px-6 py-2 bg-gradient-to-r from-hit-primary to-hit-secondary text-white font-bold rounded-xl hover:shadow-lg transition-all duration-200 transform hover:scale-105">
            צפה במשרה
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="group mb-8 animate-slideIn">
      {/* Enhanced message container with role-based styling */}
      <div
        className={`flex items-start ${
          isUser ? "justify-end" : "justify-start"
        } group px-2`}
      >
        {/* Enhanced AI Avatar - Left positioned */}
        {!isUser && (
          <div className="flex-shrink-0 mr-4 sm:mr-5">
            <div className="relative">
              <div className="h-12 w-12 sm:h-14 sm:w-14 bg-gradient-to-br from-hit-primary via-hit-secondary to-hit-dark rounded-2xl flex items-center justify-center shadow-xl relative overflow-hidden border-2 border-white">
                <img
                  src="/logo-white-bg.png"
                  className="h-8 w-8 sm:h-9 sm:w-9 rounded-xl z-10"
                  alt="MentorHIT"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                  }}
                />
                {/* Animated glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-2xl"></div>
              </div>

              {/* Status badge */}
              <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-400 rounded-full border-2 border-white shadow-sm animate-pulse"></div>

              {/* Role indicator */}
              <div className="absolute -top-2 -right-2 bg-hit-primary text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm">
                AI
              </div>
            </div>
          </div>
        )}

        {/* Enhanced message content */}
        <div
          className={`max-w-[85%] sm:max-w-[75%] ${
            isUser ? "ml-10 sm:ml-12" : "mr-10 sm:mr-12"
          }`}
        >
          {/* Enhanced role-based message bubble */}
          <div
            className={`
            relative px-6 py-5 sm:px-7 sm:py-6 rounded-3xl shadow-lg backdrop-blur-sm border-2 overflow-hidden
            ${
              isUser
                ? "bg-gradient-to-br from-hit-dark via-hit-secondary to-hit-dark text-white ml-auto border-hit-dark/30 shadow-hit-dark/20"
                : "bg-gradient-to-br from-white via-hit-light/30 to-white text-hit-dark border-hit-primary/30 shadow-hit-primary/10"
            }
          `}
          >
            {/* Content with enhanced typography */}
            <div
              className={`
                text-lg sm:text-xl leading-relaxed font-medium relative z-10
                ${containsHebrew(message.text) ? "text-right" : "text-left"}
                ${isUser ? "text-white" : "text-hit-dark"}
              `}
              dir={containsHebrew(message.text) ? "rtl" : "ltr"}
            >
              {formatMessageText(message.text)}
            </div>

            {/* Decorative gradient overlay */}
            <div
              className={`
              absolute inset-0 opacity-20 rounded-3xl
              ${
                isUser
                  ? "bg-gradient-to-br from-white/10 via-transparent to-hit-primary/10"
                  : "bg-gradient-to-br from-hit-primary/5 via-transparent to-hit-secondary/5"
              }
            `}
            ></div>
          </div>

          {/* Enhanced job data rendering */}
          {!isUser && jobData && jobData.jobs && jobData.jobs.length > 0 && (
            <div className="mt-6 sm:mt-7">
              {/* Enhanced section header */}
              <div className="mb-5 p-4 bg-gradient-to-r from-hit-light/80 to-white/80 backdrop-blur-sm rounded-2xl border border-hit-primary/20">
                <div className="flex items-center justify-end space-x-3 space-x-reverse">
                  <div className="text-right">
                    <h3 className="text-xl sm:text-2xl font-bold text-hit-dark mb-1">
                      משרות מומלצות
                    </h3>
                    <p className="text-hit-secondary font-semibold">
                      {jobData.totalJobsFound
                        ? `נמצאו ${jobData.totalJobsFound} משרות רלוונטיות`
                        : `${jobData.jobs.length} משרות מותאמות אישית`}
                    </p>
                  </div>
                  <div className="p-3 bg-hit-primary/10 rounded-2xl">
                    <Briefcase className="h-7 w-7 text-hit-primary" />
                  </div>
                </div>
              </div>

              {/* Enhanced job cards */}
              <div className="space-y-4">
                {jobData.jobs
                  .slice(0, 3)
                  .map((job: any, index: number) => renderJobCard(job, index))}
              </div>

              {/* Enhanced "show more" section */}
              {jobData.jobs.length > 3 && (
                <div className="text-center mt-6">
                  <button className="group px-8 py-4 bg-gradient-to-r from-hit-primary to-hit-secondary text-white font-bold rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden">
                    <span className="relative z-10">
                      הצג עוד משרות ({jobData.jobs.length - 3})
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-2xl"></div>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Enhanced timestamp with additional info */}
          <div
            className={`
            flex items-center justify-between mt-3 sm:mt-4 px-2 text-sm
            ${isUser ? "text-right flex-row-reverse" : "text-left"}
          `}
          >
            <div
              className={`flex items-center space-x-2 ${
                isUser ? "space-x-reverse" : ""
              } text-hit-secondary/70`}
            >
              <Clock className="h-3 w-3" />
              <span>{formatTime(message.timestamp)}</span>
            </div>

            {!isUser && (
              <div className="flex items-center space-x-2 text-hit-primary/60">
                <span className="text-xs font-semibold">MentorHIT</span>
                <div className="h-2 w-2 bg-hit-primary rounded-full"></div>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced User avatar - Right positioned */}
        {isUser && (
          <div className="flex-shrink-0 ml-4 sm:ml-5">
            <div className="relative">
              <div className="h-12 w-12 sm:h-14 sm:w-14 bg-gradient-to-br from-hit-secondary via-hit-dark to-hit-secondary rounded-2xl flex items-center justify-center shadow-xl border-2 border-white">
                <User className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
              </div>

              {/* User indicator */}
              <div className="absolute -top-2 -left-2 bg-hit-secondary text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm">
                You
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
