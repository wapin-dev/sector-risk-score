import { useState } from 'react';
import { SectorSelection } from '@/components/SectorSelection';
import { QuestionnaireStep } from '@/components/QuestionnaireStep';
import { ResultsStep } from '@/components/ResultsStep';
import { sectors } from '@/data/sectors';
import { Sector, Answer } from '@/types/risk-assessment';

type Step = 'sector' | 'questionnaire' | 'results';

const Index = () => {
  const [currentStep, setCurrentStep] = useState<Step>('sector');
  const [selectedSector, setSelectedSector] = useState<Sector | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);

  const handleSectorSelection = (sector: Sector) => {
    setSelectedSector(sector);
    setCurrentStep('questionnaire');
  };

  const handleQuestionnaireComplete = (questionnaireAnswers: Answer[]) => {
    setAnswers(questionnaireAnswers);
    setCurrentStep('results');
  };

  const handleBackToSectors = () => {
    setCurrentStep('sector');
    setSelectedSector(null);
    setAnswers([]);
  };

  const handleBackToQuestionnaire = () => {
    setCurrentStep('questionnaire');
  };

  const handleRestart = () => {
    setCurrentStep('sector');
    setSelectedSector(null);
    setAnswers([]);
  };

  return (
    <div className="min-h-screen bg-background">
      {currentStep === 'sector' && (
        <SectorSelection 
          sectors={sectors} 
          onSelectSector={handleSectorSelection}
        />
      )}
      
      {currentStep === 'questionnaire' && selectedSector && (
        <QuestionnaireStep 
          sector={selectedSector}
          onComplete={handleQuestionnaireComplete}
          onBack={handleBackToSectors}
        />
      )}
      
      {currentStep === 'results' && selectedSector && (
        <ResultsStep 
          sector={selectedSector}
          answers={answers}
          onBack={handleBackToQuestionnaire}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
};

export default Index;
