import React, { useState, useCallback } from "react";
import { ChevronRight, ChevronLeft, Check } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

interface QuizStep {
  id: string;
  title: string;
  question: string;
  options: { value: string; label: string; description?: string }[];
  type: "single" | "multiple";
}

const PreferencesQuiz = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { updateUser } = useAuth();

  const steps: QuizStep[] = [
    {
      id: "interests",
      title: "תחום התמחות",
      question: "אילו תחומים הכי מעניינים אתכם?",
      type: "multiple",
      options: [
        {
          value: "ai_data",
          label: "בינה מלאכותית ומדעי הנתונים",
          description: "למשל: למידה עמוקה, ראייה ממוחשבת, כריית נתונים",
        },
        {
          value: "cybersecurity_web",
          label: "תקשורת ואינטרנט",
          description:
            "למשל: אבטחת מחשבים, היבטים מעשיים באבטחת סייבר, פיתוח צד לקוח, פיתוח צד שרת",
        },
        {
          value: "software_eng",
          label: "הנדסת תוכנה",
          description:
            "למשל: בדיקות תוכנה, תבנית עיצוב תוכנה, תכנות מונחה עצמים בסביבות דוט נט וסי-שארפ",
        },
        {
          value: "system_eng",
          label: "הנדסת מחשבים",
          description:
            "למשל: מערכות זמן אמת, רובוטיקה למדעי המחשב, פיתוח תוכנה עבור רכב אוטונומי אינטליגנטי, אלגוריתמים לניווט ושיערוך מקום",
        },
        {
          value: "general",
          label: "קורסי בחירה כלליים",
          description:
            "למשל: תכנות לוגי, מבוא למערכות מידע גאוגרפי, תכנות תחרותי, גרפיקה ממוחשבת",
        },
      ],
    },
    {
      id: "course_purpose",
      title: "מטרת קורסי הבחירה",
      question: "מה חשוב לכם הכי הרבה בקורסי הבחירה?",
      type: "multiple",
      options: [
        {
          value: "career_focused",
          label: "רלוונטיות לקריירה",
          description: "קורסים שיעזרו לי למצוא עבודה בתחום שאני רוצה",
        },
        {
          value: "skill_building",
          label: "פיתוח כישורים טכניים",
          description: "ללמוד טכנולוגיות וכלים חדשים",
        },
        {
          value: "academic_excellence",
          label: "הישגים אקדמיים",
          description: "קורסים שאני יכול להצליח בהם ולהעלות ממוצע",
        },
        {
          value: "interest_driven",
          label: "עניין אישי",
          description: "קורסים שמעניינים אותי גם אם הם לא קשורים לקריירה",
        },
        {
          value: "networking",
          label: "קשרים ועבודה קבוצתית",
          description: "קורסים עם פרויקטים קבוצתיים וחיבור לסטודנטים אחרים",
        },
      ],
    },
    {
      id: "learning_style",
      title: "סגנון למידה מועדף",
      question: "איך אתם הכי אוהבים ללמוד חומר חדש?",
      type: "single",
      options: [
        {
          value: "hands_on",
          label: "למידה מעשית ופרויקטים",
          description: "אוהב ללמוד תוך כדי עשייה ובניית דברים",
        },
        {
          value: "theory_first",
          label: "הבנה תיאורטית מעמיקה",
          description: "מעדיף להבין את העקרונות לפני המעבר לפרקטיקה",
        },
        {
          value: "collaborative",
          label: "למידה חברתית ושיתופית",
          description: "אוהב לעבוד בקבוצות ולשתף רעיונות",
        },
        {
          value: "visual_learner",
          label: "למידה חזותית ואינטראקטיבית",
          description: "מתחבר לדיאגרמות, סרטונים ודוגמאות חזותיות",
        },
        {
          value: "structured",
          label: "למידה מובנית ושיטתית",
          description: "אוהב תכנית לימודים ברורה ומתקדמת בצורה הדרגתית",
        },
      ],
    },
    {
      id: "future_goals",
      title: "מטרות לעתיד",
      question: "איך אתה רואה את עצמך בעוד 5 שנים?",
      type: "multiple",
      options: [
        {
          value: "tech_leader",
          label: "מוביל טכנולוגי",
          description: "מוביל צוותי פיתוח ומשפיע על החלטות טכנולוגיות",
        },
        {
          value: "entrepreneur",
          label: "יזם וחדשן",
          description: "מקים חברה או פותח מוצרים חדשניים",
        },
        {
          value: "specialist",
          label: "מומחה בתחום מסוים",
          description: "הופך למומחה מוכר בתחום ספציפי",
        },
        {
          value: "global_impact",
          label: "יוצר השפעה חברתית",
          description: "עובד על פרויקטים שמשפיעים חיובית על החברה",
        },
        {
          value: "work_life_balance",
          label: "איזון עבודה וחיים",
          description: "משלב בין קריירה מספקת לחיים אישיים מלאים",
        },
      ],
    },
    {
      id: "work_environment",
      title: "סביבת עבודה מועדפת",
      question: "באיזה סוג של סביבת עבודה אתה מרגיש הכי טוב?",
      type: "single",
      options: [
        {
          value: "startup",
          label: "סטארט-אפ דינמי",
          description: "סביבה מהירה, חדשנית ומאתגרת",
        },
        {
          value: "remote_flexible",
          label: "עבודה מרחוק וגמישה",
          description: "חופש גיאוגרפי וגמישות בשעות העבודה",
        },
        {
          value: "research_academic",
          label: "מחקר ואקדמיה",
          description: "סביבה אקדמית עם דגש על מחקר וחדשנות",
        },
        {
          value: "freelance_consulting",
          label: "עצמאי וייעוץ",
          description: "עבודה עצמאית עם לקוחות מגוונים",
        },
        {
          value: "social_impact",
          label: "ארגונים חברתיים",
          description: "ארגונים שמטרתם יצירת השפעה חברתית חיובית",
        },
      ],
    },
  ];

  // Memoized function to handle answer changes
  const handleAnswerChange = useCallback(
    (stepId: string, value: string, isMultiple: boolean) => {
      setAnswers((prev) => {
        const newAnswers = { ...prev };

        if (isMultiple) {
          const currentAnswers = newAnswers[stepId] || [];
          if (currentAnswers.includes(value)) {
            // Remove the value if it's already selected
            newAnswers[stepId] = currentAnswers.filter((a) => a !== value);
          } else {
            // Add the value to the selection
            newAnswers[stepId] = [...currentAnswers, value];
          }
        } else {
          // For single selection, replace the entire array
          newAnswers[stepId] = [value];
        }

        return newAnswers;
      });
    },
    []
  );

  // Check if current step has valid answers
  const canProceed = useCallback(() => {
    const currentStepId = steps[currentStep]?.id;
    if (!currentStepId) return false;

    const currentAnswers = answers[currentStepId] || [];
    return currentAnswers.length > 0;
  }, [currentStep, answers, steps]);

  const handleNext = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  }, [currentStep, steps.length]);

  const handlePrev = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  const handleSubmit = useCallback(async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      // Simulate API call to save preferences
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Save answers to localStorage for persistence
      localStorage.setItem("mentorHIT_preferences", JSON.stringify(answers));

      // Update user to mark quiz as completed
      updateUser({ hasCompletedQuiz: true });

      setIsCompleted(true);
    } catch (error) {
      console.error("Failed to save preferences:", error);
      // You could add error handling here
    } finally {
      setIsSubmitting(false);
    }
  }, [answers, updateUser, isSubmitting]);

  const progress = ((currentStep + 1) / steps.length) * 100;

  // Completion screen
  if (isCompleted) {
    return (
      <div className="h-full overflow-y-auto">
        <div className="max-w-2xl mx-auto p-4 md:p-8 text-center">
          <div className="bg-hit-gradient rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-lg">
            <Check className="h-6 w-6 md:h-8 md:w-8 text-hit-primary" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-hit-dark mb-4">
            ההעדפות נשמרו בהצלחה!
          </h2>
          <p className="text-hit-secondary mb-6 md:mb-8 text-sm md:text-base">
            תודה שהשלמתם את השאלון. מנטורהיט יוכל כעת לספק לך הכוונה אקדמית
            ומקצועית מותאמת אישית על בסיס תחומי העניין שלך.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-hit-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-hit-primary-hover transition-colors shadow-md"
          >
            התחילו שיחה איתנו :)
          </button>
        </div>
      </div>
    );
  }

  const currentStepData = steps[currentStep];

  if (!currentStepData) {
    return (
      <div className="h-full overflow-y-auto">
        <div className="max-w-2xl mx-auto p-4 md:p-8 text-center">
          <p className="text-red-600">שגיאה: שלב לא קיים</p>
          <button
            onClick={() => setCurrentStep(0)}
            className="mt-4 bg-hit-primary text-white px-4 py-2 rounded-lg"
          >
            חזור להתחלה
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8 pb-8">
        {/* Question */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-hit-dark mb-2 text-right">
            {currentStepData.title}
          </h1>
          <p className="text-lg md:text-xl text-hit-secondary text-right">
            {currentStepData.question}
          </p>
          {currentStepData.type === "multiple" && (
            <p className="text-xs md:text-sm text-hit-secondary/70 mt-2 text-right">
              אתם יכולים לבחור יותר מתשובה אחת
            </p>
          )}
        </div>

        {/* Options */}
        <div className="space-y-3 mb-6 md:mb-8">
          {currentStepData.options.map((option) => {
            const currentAnswers = answers[currentStepData.id] || [];
            const isSelected = currentAnswers.includes(option.value);

            return (
              <button
                key={option.value}
                onClick={() =>
                  handleAnswerChange(
                    currentStepData.id,
                    option.value,
                    currentStepData.type === "multiple"
                  )
                }
                className={`w-full p-3 md:p-4 border-2 rounded-xl text-right transition-all shadow-sm hover:shadow-md ${
                  isSelected
                    ? "border-hit-primary bg-hit-light shadow-md"
                    : "border-gray-200 hover:border-hit-secondary bg-white"
                }`}
              >
                <div className="flex items-start justify-between flex-row-reverse">
                  <div className="flex-1 text-right">
                    <h3 className="font-medium text-hit-dark mb-1 text-sm md:text-base">
                      {option.label}
                    </h3>
                    {option.description && (
                      <p className="text-xs md:text-sm text-hit-secondary leading-relaxed">
                        {option.description}
                      </p>
                    )}
                  </div>
                  <div
                    className={`w-4 h-4 md:w-5 md:h-5 rounded-full border-2 flex items-center justify-center ml-3 transition-colors flex-shrink-0 ${
                      isSelected
                        ? "border-hit-primary bg-hit-primary"
                        : "border-gray-300"
                    }`}
                  >
                    {isSelected && (
                      <Check className="h-2 w-2 md:h-3 md:w-3 text-white" />
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-3 md:space-y-0">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="flex items-center justify-center md:justify-start space-x-2 px-4 py-2 text-hit-secondary disabled:opacity-50 disabled:cursor-not-allowed hover:text-hit-dark transition-colors order-2 md:order-1"
          >
            <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
            <span className="text-sm md:text-base">הקודם</span>
          </button>

          {currentStep === steps.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={!canProceed() || isSubmitting}
              className="flex items-center justify-center space-x-2 bg-hit-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-hit-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md order-1 md:order-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 md:h-5 md:w-5 border-b-2 border-white" />
                  <span className="text-sm md:text-base">שומר...</span>
                </>
              ) : (
                <>
                  <span className="text-sm md:text-base">סיום השאלון</span>
                  <Check className="h-4 w-4 md:h-5 md:w-5" />
                </>
              )}
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className="flex items-center justify-center space-x-2 bg-hit-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-hit-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md order-1 md:order-2"
            >
              <span className="text-sm md:text-base">הבא</span>
              <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
            </button>
          )}
        </div>

        {/* Beautiful Progress Summary */}
        <div className="mt-6 md:mt-8 bg-gradient-to-r from-hit-light to-white rounded-xl p-4 md:p-6 border border-hit-primary/20 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-hit-primary rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">
                  {currentStep + 1}
                </span>
              </div>
              <div>
                <h4 className="font-semibold text-hit-dark text-sm md:text-base">
                  התקדמות השאלון
                </h4>
                <p className="text-xs md:text-sm text-hit-secondary">
                  {currentStep === steps.length - 1
                    ? "כמעט סיימתם!"
                    : "אתם עושים עבודה מצוינת"}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg md:text-xl font-bold text-hit-primary">
                {Math.round(progress)}%
              </div>
              <div className="text-xs text-hit-secondary">הושלם</div>
            </div>
          </div>

          {/* Mini step indicators */}
          <div className="flex justify-center space-x-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-6 md:w-8 rounded-full transition-all duration-300 ${
                  index < currentStep
                    ? "bg-hit-primary shadow-sm"
                    : index === currentStep
                    ? "bg-hit-secondary animate-pulse"
                    : "bg-gray-200"
                }`}
              />
            ))}
          </div>

          {/* Motivational message based on progress */}
          <div className="mt-4 text-center">
            {progress < 40 && (
              <p className="text-sm text-hit-secondary">
                💡 כל תשובה עוזרת לנו להכין המלצות מותאמות אישית עבורכם
              </p>
            )}
            {progress >= 40 && progress < 80 && (
              <p className="text-sm text-hit-secondary">
                🎯 אתם באמצע הדרך! ההמלצות שלנו נהיות יותר ויותר מדויקות
              </p>
            )}
            {progress >= 80 && currentStep < steps.length - 1 && (
              <p className="text-sm text-hit-secondary">
                🚀 כמעט סיימתם! עוד שלב אחד ותקבלו הכוונה אקדמית מותאמת אישית
              </p>
            )}
            {currentStep === steps.length - 1 && (
              <p className="text-sm text-hit-secondary">
                ✨ מושלם! לחצו על "סיום השאלון" כדי לשמור את ההעדפות שלכם
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreferencesQuiz;
