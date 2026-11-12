import { BrainstormNote, LessonDesign, RubricScore, ReflectionData, QuizResult } from '../types';
import { INITIAL_BRAINSTORM_NOTES, INITIAL_LESSON_DESIGN } from '../data/workshopData';

const KEYS = {
  CURRENT_MODULE: 'numeracylab_current_module',
  WORKSHOP_MODE: 'numeracylab_mode',
  TIMER_SECONDS: 'numeracylab_timer_seconds',
  COMPLETED_MODULES: 'numeracylab_completed_modules',
  BRAINSTORM_NOTES: 'numeracylab_brainstorm_notes',
  BRAINSTORM_STANCE: 'numeracylab_brainstorm_stance',
  CHALLENGE_DATA: 'numeracylab_challenge_data',
  DESIGN_STUDIO: 'numeracylab_design_studio',
  RUBRIC_SCORES: 'numeracylab_rubric_scores',
  REFLECTION_DATA: 'numeracylab_reflection_data',
  LEARNING_QUIZ: 'numeracylab_learning_quiz',
};

export const Storage = {
  get<T>(key: string, fallback: T): T {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch {
      return fallback;
    }
  },

  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  },

  // Module state
  getCurrentModule(): string {
    return this.get(KEYS.CURRENT_MODULE, 'welcome');
  },
  setCurrentModule(id: string): void {
    this.set(KEYS.CURRENT_MODULE, id);
  },

  // Completed modules
  getCompletedModules(): string[] {
    return this.get(KEYS.COMPLETED_MODULES, ['welcome']);
  },
  toggleModuleCompleted(id: string): string[] {
    const current = this.getCompletedModules();
    const next = current.includes(id)
      ? current.filter(m => m !== id)
      : [...current, id];
    this.set(KEYS.COMPLETED_MODULES, next);
    return next;
  },

  // Brainstorm
  getBrainstormNotes(): BrainstormNote[] {
    return this.get(KEYS.BRAINSTORM_NOTES, INITIAL_BRAINSTORM_NOTES);
  },
  setBrainstormNotes(notes: BrainstormNote[]): void {
    this.set(KEYS.BRAINSTORM_NOTES, notes);
  },

  // Design studio
  getLessonDesign(): LessonDesign {
    return this.get(KEYS.DESIGN_STUDIO, INITIAL_LESSON_DESIGN);
  },
  setLessonDesign(design: LessonDesign): void {
    this.set(KEYS.DESIGN_STUDIO, design);
  },

  // Rubric scores
  getRubricScore(): RubricScore {
    return this.get(KEYS.RUBRIC_SCORES, {
      relevance: 4,
      contextQuality: 4,
      mathIntegration: 3,
      reasoningDev: 4,
      assessmentQuality: 3,
      evaluatorGroup: 'Kelompok Fasilitator / Pengawas SMP',
      appreciation: 'Rancangan sangat kontekstual dengan mengangkat isu riil lingkungan sekolah yang dekat dengan keseharian murid.',
      recommendations: 'Tingkatkan alur rubrik pada aktivitas 3 agar penilaian penalaran siswa memiliki indikator performa bertingkat yang lebih terukur.',
      awardedBadges: ['Inspiratif & Kontekstual', 'Penalaran Tinggi', 'Kaya Stimulus Data'],
    });
  },
  setRubricScore(score: RubricScore): void {
    this.set(KEYS.RUBRIC_SCORES, score);
  },

  // Reflection
  getReflection(): ReflectionData {
    return this.get(KEYS.REFLECTION_DATA, {
      mostImportantLearning: 'Numerasi bukan hak prerogatif guru matematika, melainkan tanggung jawab bersama seluruh guru mata pelajaran untuk melatih nalar kritis siswa menggunakan data.',
      understandingShift: 'Dulu saya mengira numerasi sama dengan menghitung rumus aljabar yang rumit. Sekarang saya paham bahwa membaca infografik, grafik cuaca, debit kran air, dan diagram persentase di mapel saya juga merupakan numerasi murni.',
      classroomApplication: 'Saya akan memasukkan stimulus data riil (tabel/grafik) dalam LKPD bab berikutnya, mengajak murid mendiskusikan angka sebelum menarik kesimpulan materi.',
      potentialChallenges: 'Siswa sering takut saat melihat angka dan merasa "sedang belajar matematika lagi". Solusinya adalah menyajikan angka dalam bentuk cerita grafis yang menarik.',
      commitmentPledge: 'Mulai pembelajaran minggu depan, saya akan menyisipkan minimal satu stimulus data kontekstual di kelas untuk memantik diskusi bernalar siswa.',
      participantName: 'Dra. Endang Sulistyowati',
      schoolName: 'SMP Negeri 1 Nusantara',
      subjectTaught: 'Ilmu Pengetahuan Alam (IPA)',
      dateCompleted: '12 November 2026',
    });
  },
  setReflection(ref: ReflectionData): void {
    this.set(KEYS.REFLECTION_DATA, ref);
  },

  // Learning Hub Quiz
  getQuizResult(): QuizResult {
    return this.get(KEYS.LEARNING_QUIZ, {
      score: 5,
      totalQuestions: 5,
      percentage: 100,
      answers: { 1: 1, 2: 1, 3: 2, 4: 1, 5: 1 },
      submitted: true,
      completedAt: '12 November 2026',
    });
  },
  setQuizResult(result: QuizResult): void {
    this.set(KEYS.LEARNING_QUIZ, result);
  },

  // Reset all
  resetAll(): void {
    localStorage.clear();
  },
};
