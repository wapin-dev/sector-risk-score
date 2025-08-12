export interface Sector {
  id: string;
  name: string;
  description: string;
  icon: string;
  questionnaire: Question[];
}

export interface Question {
  id: string;
  text: string;
  category: string;
  type: 'boolean' | 'frequency' | 'severity' | 'measures';
  options?: QuestionOption[];
  weight: number;
  helpText?: string;
}

export interface QuestionOption {
  value: string;
  label: string;
  score: number;
}

export interface Answer {
  questionId: string;
  value: string;
  score: number;
}

export interface Assessment {
  sectorId: string;
  answers: Answer[];
  totalScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  recommendations: Recommendation[];
  completedAt: Date;
}

export interface Recommendation {
  id: string;
  category: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  deadline?: string;
}

export interface RiskCategory {
  name: string;
  score: number;
  maxScore: number;
  questions: number;
}