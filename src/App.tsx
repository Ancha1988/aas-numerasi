import React, { useState, useEffect } from 'react';
import { ModuleId, WorkshopMode, BrainstormNote, LessonDesign, RubricScore, ReflectionData, QuizResult } from './types';
import { WORKSHOP_MODULES } from './data/workshopData';
import { Storage } from './utils/storage';
import { Header } from './components/Header';
import { ModuleNavRibbon } from './components/ModuleNavRibbon';
import { FacilitatorDrawer } from './components/FacilitatorDrawer';
import { PIDInstructionsModal } from './components/PIDInstructionsModal';
import { ExportModal } from './components/ExportModal';
import { InteractiveLabModal } from './components/InteractiveLabModal';
import { WorkshopEvaluationDashboard } from './components/WorkshopEvaluationDashboard';

// Module Components
import { Modul01Welcome } from './components/modules/Modul01Welcome';
import { Modul02IceBreaking } from './components/modules/Modul02IceBreaking';
import { Modul03Brainstorming } from './components/modules/Modul03Brainstorming';
import { Modul04Challenge } from './components/modules/Modul04Challenge';
import { Modul05LearningHub } from './components/modules/Modul05LearningHub';
import { Modul06CrossSubjectLab } from './components/modules/Modul06CrossSubjectLab';
import { Modul07DesignStudio } from './components/modules/Modul07DesignStudio';
import { Modul08Presentation } from './components/modules/Modul08Presentation';
import { Modul09Reflection } from './components/modules/Modul09Reflection';

export default function App() {
  // Navigation & Mode states
  const [activeModuleId, setActiveModuleId] = useState<ModuleId>(() => {
    return (Storage.getCurrentModule() as ModuleId) || 'welcome';
  });
  const [currentMode, setCurrentMode] = useState<WorkshopMode>(() => {
    return (Storage.get('numeracylab_mode', 'participant') as WorkshopMode);
  });
  const [completedModules, setCompletedModules] = useState<string[]>(() => {
    return Storage.getCompletedModules();
  });

  // Data persistence states
  const [brainstormNotes, setBrainstormNotes] = useState<BrainstormNote[]>(() => {
    return Storage.getBrainstormNotes();
  });
  const [lessonDesign, setLessonDesign] = useState<LessonDesign>(() => {
    return Storage.getLessonDesign();
  });
  const [rubricScore, setRubricScore] = useState<RubricScore>(() => {
    return Storage.getRubricScore();
  });
  const [reflectionData, setReflectionData] = useState<ReflectionData>(() => {
    return Storage.getReflection();
  });

  // Modal dialog states
  const [isPIDGuideOpen, setIsPIDGuideOpen] = useState<boolean>(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [isFacilitatorDrawerOpen, setIsFacilitatorDrawerOpen] = useState<boolean>(false);
  const [isInteractiveLabOpen, setIsInteractiveLabOpen] = useState<boolean>(false);
  const [isEvaluationDashboardOpen, setIsEvaluationDashboardOpen] = useState<boolean>(false);

  // Quiz result from storage
  const [quizResult, setQuizResult] = useState<QuizResult>(() => {
    return Storage.getQuizResult();
  });

  const handleOpenEvaluationDashboard = () => {
    // Refresh latest quiz & design states from storage
    setQuizResult(Storage.getQuizResult());
    setIsEvaluationDashboardOpen(true);
  };

  // Sync active module to storage
  const handleSelectModule = (id: ModuleId) => {
    setActiveModuleId(id);
    Storage.setCurrentModule(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleMode = (mode: WorkshopMode) => {
    setCurrentMode(mode);
    Storage.set('numeracylab_mode', mode);
  };

  const handleToggleModuleCompleted = (id: ModuleId) => {
    const updated = Storage.toggleModuleCompleted(id);
    setCompletedModules(updated);
  };

  const currentModuleIndex = WORKSHOP_MODULES.findIndex((m) => m.id === activeModuleId);
  const currentModule = WORKSHOP_MODULES[currentModuleIndex] || WORKSHOP_MODULES[0];

  const handleNextModule = () => {
    if (currentModuleIndex < WORKSHOP_MODULES.length - 1) {
      const nextId = WORKSHOP_MODULES[currentModuleIndex + 1].id;
      handleSelectModule(nextId);
    }
  };

  const handlePrevModule = () => {
    if (currentModuleIndex > 0) {
      const prevId = WORKSHOP_MODULES[currentModuleIndex - 1].id;
      handleSelectModule(prevId);
    }
  };

  // Keyboard shortcut support for Facilitators on PID (Left/Right Arrow, Space)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in input or textarea
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }
      if (e.key === 'ArrowRight') {
        handleNextModule();
      } else if (e.key === 'ArrowLeft') {
        handlePrevModule();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentModuleIndex]);

  return (
    <div className="min-h-screen bg-[#EFF5F8] text-[#19304E] flex flex-col font-sans selection:bg-[#00848B] selection:text-white">
      {/* Top Header */}
      <Header
        currentMode={currentMode}
        onToggleMode={handleToggleMode}
        onOpenPIDGuide={() => setIsPIDGuideOpen(true)}
        onOpenExportCenter={() => setIsExportModalOpen(true)}
        onOpenFacilitatorGuide={() => setIsFacilitatorDrawerOpen(true)}
        onOpenInteractiveLab={() => setIsInteractiveLabOpen(true)}
        onOpenEvaluationDashboard={handleOpenEvaluationDashboard}
        activeModuleTitle={currentModule.title}
      />

      {/* 9-Module Progress & Touch Ribbon */}
      <ModuleNavRibbon
        modules={WORKSHOP_MODULES}
        activeModuleId={activeModuleId}
        completedModules={completedModules}
        onSelectModule={handleSelectModule}
      />

      {/* Main Module Content Area — Optimized for 1920x1080 widescreen PID */}
      <main className="flex-1 max-w-[1840px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeModuleId === 'welcome' && (
          <Modul01Welcome
            onNext={handleNextModule}
            onOpenPIDGuide={() => setIsPIDGuideOpen(true)}
            onSetMode={handleToggleMode}
            isCompleted={completedModules.includes('welcome')}
            onToggleComplete={() => handleToggleModuleCompleted('welcome')}
          />
        )}

        {activeModuleId === 'icebreaking' && (
          <Modul02IceBreaking
            onPrev={handlePrevModule}
            onNext={handleNextModule}
            isCompleted={completedModules.includes('icebreaking')}
            onToggleComplete={() => handleToggleModuleCompleted('icebreaking')}
          />
        )}

        {activeModuleId === 'brainstorming' && (
          <Modul03Brainstorming
            onPrev={handlePrevModule}
            onNext={handleNextModule}
            isCompleted={completedModules.includes('brainstorming')}
            onToggleComplete={() => handleToggleModuleCompleted('brainstorming')}
            notes={brainstormNotes}
            onUpdateNotes={(updated) => {
              setBrainstormNotes(updated);
              Storage.setBrainstormNotes(updated);
            }}
          />
        )}

        {activeModuleId === 'challenge' && (
          <Modul04Challenge
            onPrev={handlePrevModule}
            onNext={handleNextModule}
            isCompleted={completedModules.includes('challenge')}
            onToggleComplete={() => handleToggleModuleCompleted('challenge')}
          />
        )}

        {activeModuleId === 'learninghub' && (
          <Modul05LearningHub
            onPrev={handlePrevModule}
            onNext={handleNextModule}
            isCompleted={completedModules.includes('learninghub')}
            onToggleComplete={() => handleToggleModuleCompleted('learninghub')}
          />
        )}

        {activeModuleId === 'crosssubject' && (
          <Modul06CrossSubjectLab
            onPrev={handlePrevModule}
            onNext={handleNextModule}
            isCompleted={completedModules.includes('crosssubject')}
            onToggleComplete={() => handleToggleModuleCompleted('crosssubject')}
          />
        )}

        {activeModuleId === 'designstudio' && (
          <Modul07DesignStudio
            onPrev={handlePrevModule}
            onNext={handleNextModule}
            isCompleted={completedModules.includes('designstudio')}
            onToggleComplete={() => handleToggleModuleCompleted('designstudio')}
            lessonDesign={lessonDesign}
            onUpdateDesign={(updated) => {
              setLessonDesign(updated);
              Storage.setLessonDesign(updated);
            }}
            onOpenExportCenter={() => setIsExportModalOpen(true)}
          />
        )}

        {activeModuleId === 'presentation' && (
          <Modul08Presentation
            onPrev={handlePrevModule}
            onNext={handleNextModule}
            isCompleted={completedModules.includes('presentation')}
            onToggleComplete={() => handleToggleModuleCompleted('presentation')}
            rubricScore={rubricScore}
            onUpdateRubric={(updated) => {
              setRubricScore(updated);
              Storage.setRubricScore(updated);
            }}
            currentDesign={lessonDesign}
          />
        )}

        {activeModuleId === 'reflection' && (
          <Modul09Reflection
            onPrev={handlePrevModule}
            isCompleted={completedModules.includes('reflection')}
            onToggleComplete={() => handleToggleModuleCompleted('reflection')}
            reflectionData={reflectionData}
            onUpdateReflection={(updated) => {
              setReflectionData(updated);
              Storage.setReflection(updated);
            }}
            onOpenExportCenter={() => setIsExportModalOpen(true)}
            onOpenEvaluationDashboard={handleOpenEvaluationDashboard}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#19304E] text-white border-t-2 border-[#244369] py-6 sm:py-7 mt-12 no-print select-none">
        <div className="max-w-[1840px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-slate-300 font-medium">
          <div className="flex items-center gap-2.5">
            <span className="font-heading font-extrabold text-white text-base tracking-wide">
              NUMERACY LAB <span className="text-[#E6A637]">SMP</span>
            </span>
            <span aria-hidden="true">·</span>
            <span>Workshop Penguatan Numerasi bagi Guru SMP (120 Menit)</span>
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            <span>Dirancang Khusus Papan Interaktif Digital (PID)</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono font-bold text-[#E6A637]">Resolusi 1920x1080 & 1366x768</span>
          </div>
        </div>
      </footer>

      {/* Floating Facilitator Drawer */}
      <FacilitatorDrawer
        isOpen={isFacilitatorDrawerOpen}
        onClose={() => setIsFacilitatorDrawerOpen(false)}
        activeModuleId={activeModuleId}
        onJumpModule={handleSelectModule}
      />

      {/* PID Guidance Modal */}
      <PIDInstructionsModal
        isOpen={isPIDGuideOpen}
        onClose={() => setIsPIDGuideOpen(false)}
      />

      {/* Export & Print Center Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        lessonDesign={lessonDesign}
        brainstormNotes={brainstormNotes}
        rubricScore={rubricScore}
        reflectionData={reflectionData}
        onOpenEvaluationDashboard={handleOpenEvaluationDashboard}
      />

      {/* Interactive Simulation Lab Modal */}
      <InteractiveLabModal
        isOpen={isInteractiveLabOpen}
        onClose={() => setIsInteractiveLabOpen(false)}
      />

      {/* Workshop Evaluation & Summary Dashboard Modal */}
      <WorkshopEvaluationDashboard
        isOpen={isEvaluationDashboardOpen}
        onClose={() => setIsEvaluationDashboardOpen(false)}
        completedModules={completedModules}
        lessonDesign={lessonDesign}
        brainstormNotes={brainstormNotes}
        rubricScore={rubricScore}
        reflectionData={reflectionData}
        quizResult={quizResult}
        onSelectModule={handleSelectModule}
      />
    </div>
  );
}
