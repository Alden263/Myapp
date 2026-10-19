export interface ProductIdeaFramework {
  id: string;
  name: string;
  subject: string;
  targetAudience: string;
  learningGoals: string[];
  coreScopeDescription: string;
  userPersona: {
    title: string;
    painPoints: string[];
    studyHabits: string;
  };
  mvpModules: {
    number: number;
    title: string;
    description: string;
    features: string[];
  }[];
  futureScopeRoadmap: string[];
  sampleQuestionPreview: {
    question: string;
    options: string[];
    correctIndex: number;
    aiExplanation: string;
  };
}
