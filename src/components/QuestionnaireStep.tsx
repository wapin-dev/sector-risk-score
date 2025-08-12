import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Question, Answer, Sector } from '@/types/risk-assessment';
import { ChevronLeft, ChevronRight, HelpCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface QuestionnaireStepProps {
  sector: Sector;
  onComplete: (answers: Answer[]) => void;
  onBack: () => void;
}

export const QuestionnaireStep = ({ sector, onComplete, onBack }: QuestionnaireStepProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);

  const currentQuestion = sector.questionnaire[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / sector.questionnaire.length) * 100;

  const handleAnswer = (value: string) => {
    const score = calculateScore(currentQuestion, value);
    
    const newAnswer: Answer = {
      questionId: currentQuestion.id,
      value,
      score
    };

    const updatedAnswers = answers.filter(a => a.questionId !== currentQuestion.id);
    updatedAnswers.push(newAnswer);
    setAnswers(updatedAnswers);
  };

  const calculateScore = (question: Question, value: string): number => {
    if (question.type === 'boolean') {
      return value === 'true' ? question.weight : 0;
    }
    
    if (question.options) {
      const option = question.options.find(opt => opt.value === value);
      return option ? option.score * (question.weight / 10) : 0;
    }
    
    return 0;
  };

  const getCurrentAnswer = () => {
    return answers.find(a => a.questionId === currentQuestion.id)?.value || '';
  };

  const canProceed = () => {
    return getCurrentAnswer() !== '';
  };

  const handleNext = () => {
    if (currentQuestionIndex < sector.questionnaire.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      onComplete(answers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const isLastQuestion = currentQuestionIndex === sector.questionnaire.length - 1;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <Button variant="outline" onClick={onBack}>
            <ChevronLeft className="w-4 h-4 mr-2" />
            Retour aux secteurs
          </Button>
          <Badge variant="secondary">
            {sector.name}
          </Badge>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Question {currentQuestionIndex + 1} sur {sector.questionnaire.length}</span>
            <span>{Math.round(progress)}% terminé</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <Badge variant="outline" className="mb-3">
                {currentQuestion.category}
              </Badge>
              <CardTitle className="text-xl leading-relaxed">
                {currentQuestion.text}
              </CardTitle>
            </div>
            {currentQuestion.helpText && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="w-5 h-5 text-muted-foreground ml-4 flex-shrink-0" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>{currentQuestion.helpText}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {currentQuestion.type === 'boolean' ? (
            <RadioGroup 
              value={getCurrentAnswer()} 
              onValueChange={handleAnswer}
              className="space-y-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="true" id="yes" />
                <Label htmlFor="yes" className="cursor-pointer">Oui</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="false" id="no" />
                <Label htmlFor="no" className="cursor-pointer">Non</Label>
              </div>
            </RadioGroup>
          ) : (
            <RadioGroup 
              value={getCurrentAnswer()} 
              onValueChange={handleAnswer}
              className="space-y-3"
            >
              {currentQuestion.options?.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="cursor-pointer flex-1">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Précédent
        </Button>
        
        <Button 
          onClick={handleNext}
          disabled={!canProceed()}
          className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
        >
          {isLastQuestion ? 'Terminer l\'évaluation' : 'Suivant'}
          {!isLastQuestion && <ChevronRight className="w-4 h-4 ml-2" />}
        </Button>
      </div>
    </div>
  );
};