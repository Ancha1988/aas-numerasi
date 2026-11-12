export type ModuleId =
  | 'welcome'
  | 'icebreaking'
  | 'brainstorming'
  | 'challenge'
  | 'learninghub'
  | 'crosssubject'
  | 'designstudio'
  | 'presentation'
  | 'reflection';

export type WorkshopMode = 'participant' | 'facilitator';

export type CognitiveProcess = 'Memahami' | 'Menerapkan' | 'Menalar';

export interface ModuleMetadata {
  id: ModuleId;
  order: number;
  code: string;
  title: string;
  subtitle: string;
  durationMinutes: number;
  objective: string;
  activityInstruction: string;
}

export interface BrainstormNote {
  id: string;
  author: string;
  subject: string;
  content: string;
  stance: 'setuju' | 'tidak_setuju' | 'ragu_ragu';
  color: string;
  timestamp: string;
  likes: number;
}

export interface ActivityStep {
  id: string;
  title: string;
  description: string;
  timeAllocation: string;
  cognitiveProcess: CognitiveProcess;
  studentAction: string;
}

export interface LessonDesign {
  id: string;
  groupName: string;
  subject: string;
  gradeLevel: string;
  topic: string;
  learningGoal: string;
  realContext: string;
  dataStimulus: string;
  mathContent: string[];
  cognitiveProcess: CognitiveProcess;
  studentActivities: ActivityStep[];
  studentProduct: string;
  assessmentStrategy: string;
  lastUpdated: string;
}

export interface RubricScore {
  relevance: number;        // 1-4
  contextQuality: number;   // 1-4
  mathIntegration: number;  // 1-4
  reasoningDev: number;     // 1-4
  assessmentQuality: number;// 1-4
  evaluatorGroup: string;
  appreciation: string;
  recommendations: string;
  awardedBadges: string[];
}

export interface ReflectionData {
  mostImportantLearning: string;
  understandingShift: string;
  classroomApplication: string;
  potentialChallenges: string;
  commitmentPledge: string;
  participantName: string;
  schoolName: string;
  subjectTaught: string;
  dateCompleted: string;
}

export interface CrossSubjectData {
  id: string;
  subjectName: string;
  topic: string;
  iconName: string;
  curriculumDomain: string;
  stimulusTitle: string;
  stimulusDescription: string;
  dataPoints: { label: string; value: number | string; unit?: string }[];
  contextType: 'Personal' | 'Sosial Budaya' | 'Saintifik' | 'Pekerjaan';
  mathContent: string;
  questions: {
    question: string;
    level: CognitiveProcess;
    hint: string;
    sampleAnswer: string;
  }[];
  studentActivity: string;
  numeracyCompetence: string;
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  percentage: number;
  answers: Record<number, number>;
  submitted: boolean;
  completedAt?: string;
}
