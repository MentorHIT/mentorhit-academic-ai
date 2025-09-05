import React from "react";
import {
  MessageCircle,
  BookOpen,
  TrendingUp,
  Calendar,
  Target,
  Briefcase,
  Star,
  ArrowLeft,
  Sparkles,
  Clock,
} from "lucide-react";

interface SuggestedPromptsProps {
  onPromptClick: (prompt: string) => void;
}

const SuggestedPrompts: React.FC<SuggestedPromptsProps> = ({
  onPromptClick,
}) => {
  const prompts = [
    {
      text: "איך אני יכול לשפר את הציונים שלי?",
      icon: TrendingUp,
      category: "אקדמיה",
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50",
      textColor: "text-green-700",
      description: "קבלו טיפים מותאמים אישית",
    },
    {
      text: "איזה קורסי בחירה מומלצים לתחום הסייבר?",
      icon: BookOpen,
      category: "קורסים",
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
      description: "המלצות מבוססות נתונים",
    },
    {
      text: "איך לתכנן את הלוח זמנים שלי?",
      icon: Calendar,
      category: "תכנון",
      color: "from-purple-500 to-violet-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-700",
      description: "אופטימיזציה חכמה של הזמן",
    },
    {
      text: "מה התחומים הכי מבוקשים בשוק העבודה?",
      icon: Briefcase,
      category: "קריירה",
      color: "from-orange-500 to-red-600",
      bgColor: "bg-orange-50",
      textColor: "text-orange-700",
      description: "מגמות עדכניות בתעשייה",
    },
    {
      text: "איך להכין CV מנצח בתחום הטכנולוגיה?",
      icon: Star,
      category: "קריירה",
      color: "from-hit-primary to-hit-secondary",
      bgColor: "bg-hit-light",
      textColor: "text-hit-dark",
      description: "כלים למיתוג אישי מוצלח",
    },
    {
      text: "איך לתכנן את הפרויקט הגמר שלי?",
      icon: Target,
      category: "פרויקטים",
      color: "from-pink-500 to-rose-600",
      bgColor: "bg-pink-50",
      textColor: "text-pink-700",
      description: "מדריך שלב אחר שלב",
    },
  ];

  const categories = [
    {
      name: "אקדמיה",
      count: prompts.filter((p) => p.category === "אקדמיה").length,
    },
    {
      name: "קורסים",
      count: prompts.filter((p) => p.category === "קורסים").length,
    },
    {
      name: "קריירה",
      count: prompts.filter((p) => p.category === "קריירה").length,
    },
    {
      name: "תכנון",
      count: prompts.filter((p) => p.category === "תכנון").length,
    },
    {
      name: "פרויקטים",
      count: prompts.filter((p) => p.category === "פרויקטים").length,
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto animate-fadeIn">
      {/* Enhanced Header Section */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center space-x-3 space-x-reverse mb-4">
          <div className="h-12 w-12 bg-gradient-to-br from-hit-primary to-hit-secondary rounded-2xl flex items-center justify-center shadow-lg">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div className="text-right">
            <h3 className="text-2xl sm:text-3xl font-bold text-hit-dark mb-1">
              השאלות הפופולריות
            </h3>
            <p className="text-hit-secondary font-medium">
              בחרו נושא להתחלה מהירה
            </p>
          </div>
        </div>

        {/* Categories overview */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-hit-primary/20 shadow-sm"
            >
              <span className="text-sm font-bold text-hit-primary bg-hit-light px-2 py-0.5 rounded-full">
                {category.count}
              </span>
              <span className="text-sm font-semibold text-hit-dark">
                {category.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Prompts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {prompts.map((prompt, index) => {
          const IconComponent = prompt.icon;
          return (
            <button
              key={index}
              onClick={() => onPromptClick(prompt.text)}
              className="group relative p-6 bg-white/90 hover:bg-white border-2 border-gray-200/60 hover:border-hit-primary/40 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 text-right backdrop-blur-sm transform hover:-translate-y-2 overflow-hidden touch-manipulation"
              style={{ minHeight: "140px" }}
            >
              {/* Background gradient overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${prompt.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-3xl`}
              ></div>

              {/* Category badge */}
              <div className="flex items-center justify-end mb-4">
                <div
                  className={`flex items-center space-x-2 space-x-reverse px-3 py-1.5 ${prompt.bgColor} rounded-full border border-current/20`}
                >
                  <span className={`text-xs font-bold ${prompt.textColor}`}>
                    {prompt.category}
                  </span>
                  <div
                    className={`h-1.5 w-1.5 ${prompt.textColor.replace(
                      "text-",
                      "bg-"
                    )} rounded-full`}
                  ></div>
                </div>
              </div>

              {/* Main content */}
              <div className="flex items-start space-x-4 space-x-reverse mb-4">
                <div className="flex-1 text-right">
                  <h4 className="text-lg sm:text-xl font-bold text-hit-dark leading-tight mb-2 group-hover:text-hit-primary transition-colors">
                    {prompt.text}
                  </h4>
                  <p className="text-sm text-hit-secondary/80 leading-relaxed">
                    {prompt.description}
                  </p>
                </div>

                {/* Enhanced icon */}
                <div className="flex-shrink-0">
                  <div
                    className={`h-14 w-14 bg-gradient-to-br ${prompt.color} rounded-2xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-3`}
                  >
                    <IconComponent className="h-7 w-7 text-white" />
                  </div>
                </div>
              </div>

              {/* Action indicator */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 space-x-reverse text-hit-secondary/60 group-hover:text-hit-primary/80 transition-colors">
                  <ArrowLeft className="h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
                  <span className="text-sm font-medium">לחצו לשאלה</span>
                </div>

                <div className="flex items-center space-x-1 text-hit-secondary/40">
                  <Clock className="h-3 w-3" />
                  <span className="text-xs">תשובה מיידית</span>
                </div>
              </div>

              {/* Hover accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-hit-primary to-hit-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center rounded-b-3xl"></div>

              {/* Corner decoration */}
              <div className="absolute top-4 left-4 w-2 h-2 bg-hit-primary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          );
        })}
      </div>

      {/* Enhanced Call to Action */}
      <div className="mt-8 sm:mt-12 text-center">
        <div className="inline-block p-6 bg-gradient-to-r from-hit-light/60 to-white/60 backdrop-blur-sm rounded-3xl border-2 border-hit-primary/20 shadow-lg">
          <div className="flex items-center justify-center space-x-4 space-x-reverse mb-4">
            <div className="h-10 w-10 bg-hit-primary/10 rounded-2xl flex items-center justify-center">
              <MessageCircle className="h-5 w-5 text-hit-primary" />
            </div>
            <h4 className="text-xl font-bold text-hit-dark">
              יש לכם שאלה אחרת?
            </h4>
          </div>

          <p className="text-hit-secondary text-lg leading-relaxed mb-4 max-w-md mx-auto">
            כתבו שאלה משלכם בתיבת הטקסט למטה וקבלו תשובה מותאמת אישית
          </p>

          {/* Animated prompt indicator */}
          <div className="flex items-center justify-center space-x-2 text-hit-primary/60">
            <div className="flex space-x-1">
              <div className="h-2 w-2 bg-hit-primary rounded-full animate-bounce"></div>
              <div className="h-2 w-2 bg-hit-secondary rounded-full animate-bounce delay-100"></div>
              <div className="h-2 w-2 bg-hit-dark rounded-full animate-bounce delay-200"></div>
            </div>
            <span className="text-sm font-medium">מחכים לשאלתכם</span>
            <div className="h-5 w-5 border-2 border-hit-primary rounded-full flex items-center justify-center">
              <ArrowLeft className="h-3 w-3 text-hit-primary animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestedPrompts;
