import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Answer, Sector, RiskCategory } from '@/types/risk-assessment';
import { ChevronLeft, Download, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { useMemo } from 'react';

interface ResultsStepProps {
  sector: Sector;
  answers: Answer[];
  onBack: () => void;
  onRestart: () => void;
}

export const ResultsStep = ({ sector, answers, onBack, onRestart }: ResultsStepProps) => {
  const results = useMemo(() => {
    const totalScore = answers.reduce((sum, answer) => sum + answer.score, 0);
    const maxPossibleScore = sector.questionnaire.reduce((sum, question) => {
      if (question.type === 'boolean') {
        return sum + question.weight;
      }
      const maxOptionScore = question.options ? Math.max(...question.options.map(opt => opt.score)) : 0;
      return sum + (maxOptionScore * (question.weight / 10));
    }, 0);

    const percentage = Math.round((totalScore / maxPossibleScore) * 100);
    
    let riskLevel: 'low' | 'medium' | 'high';
    if (percentage < 30) riskLevel = 'low';
    else if (percentage < 70) riskLevel = 'medium';
    else riskLevel = 'high';

    // Grouper par catégorie
    const categoryMap = new Map<string, RiskCategory>();
    
    sector.questionnaire.forEach(question => {
      const answer = answers.find(a => a.questionId === question.id);
      const score = answer?.score || 0;
      
      let maxQuestionScore = question.weight;
      if (question.options) {
        maxQuestionScore = Math.max(...question.options.map(opt => opt.score)) * (question.weight / 10);
      }
      
      if (categoryMap.has(question.category)) {
        const category = categoryMap.get(question.category)!;
        category.score += score;
        category.maxScore += maxQuestionScore;
        category.questions += 1;
      } else {
        categoryMap.set(question.category, {
          name: question.category,
          score,
          maxScore: maxQuestionScore,
          questions: 1
        });
      }
    });

    const categories = Array.from(categoryMap.values());

    return {
      totalScore,
      maxPossibleScore,
      percentage,
      riskLevel,
      categories
    };
  }, [answers, sector]);

  const getRiskLevelInfo = (level: 'low' | 'medium' | 'high') => {
    switch (level) {
      case 'low':
        return {
          icon: <CheckCircle className="w-6 h-6" />,
          color: 'success',
          label: 'Risque Faible',
          description: 'Votre niveau de risque est acceptable. Maintenez vos bonnes pratiques.',
          bgClass: 'bg-success/10 border-success/20'
        };
      case 'medium':
        return {
          icon: <AlertTriangle className="w-6 h-6" />,
          color: 'warning',
          label: 'Risque Modéré',
          description: 'Des améliorations sont recommandées pour réduire les risques.',
          bgClass: 'bg-warning/10 border-warning/20'
        };
      case 'high':
        return {
          icon: <XCircle className="w-6 h-6" />,
          color: 'destructive',
          label: 'Risque Élevé',
          description: 'Des actions urgentes sont nécessaires pour assurer la sécurité.',
          bgClass: 'bg-destructive/10 border-destructive/20'
        };
    }
  };

  const riskInfo = getRiskLevelInfo(results.riskLevel);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <Button variant="outline" onClick={onBack}>
          <ChevronLeft className="w-4 h-4 mr-2" />
          Retour au questionnaire
        </Button>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Résultats de l'évaluation</h1>
        <Badge variant="secondary" className="text-lg px-4 py-2">
          {sector.name}
        </Badge>
      </div>

      {/* Score global */}
      <Card className={`mb-6 border-2 ${riskInfo.bgClass}`}>
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className={`text-${riskInfo.color}`}>
              {riskInfo.icon}
            </div>
          </div>
          <CardTitle className="text-2xl">{riskInfo.label}</CardTitle>
          <div className="text-4xl font-bold mt-2">
            {results.percentage}%
          </div>
          <p className="text-muted-foreground mt-2">
            {riskInfo.description}
          </p>
        </CardHeader>
        <CardContent>
          <Progress 
            value={results.percentage} 
            className="h-4"
          />
          <p className="text-center text-sm text-muted-foreground mt-2">
            Score: {Math.round(results.totalScore)} / {Math.round(results.maxPossibleScore)}
          </p>
        </CardContent>
      </Card>

      {/* Détail par catégorie */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {results.categories.map((category) => {
          const categoryPercentage = Math.round((category.score / category.maxScore) * 100);
          let categoryLevel: 'low' | 'medium' | 'high' = 'low';
          if (categoryPercentage >= 70) categoryLevel = 'high';
          else if (categoryPercentage >= 30) categoryLevel = 'medium';
          
          const categoryInfo = getRiskLevelInfo(categoryLevel);
          
          return (
            <Card key={category.name} className="border">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center justify-between">
                  {category.name}
                  <div className={`text-${categoryInfo.color}`}>
                    {categoryInfo.icon}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Progress value={categoryPercentage} className="h-2" />
                  <div className="flex justify-between text-sm">
                    <span>{categoryPercentage}%</span>
                    <span>{category.questions} question{category.questions > 1 ? 's' : ''}</span>
                  </div>
                  <Badge 
                    variant={categoryLevel === 'low' ? 'default' : categoryLevel === 'medium' ? 'secondary' : 'destructive'}
                    className="text-xs"
                  >
                    {categoryInfo.label}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Prochaines étapes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
              <Download className="w-4 h-4 mr-2" />
              Télécharger le rapport PDF
            </Button>
            <Button variant="outline">
              Voir le plan d'action détaillé
            </Button>
          </div>
          
          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground mb-4">
              Recommandation : Refaire cette évaluation tous les 12 mois ou après tout changement significatif dans votre organisation.
            </p>
            <Button variant="ghost" onClick={onRestart}>
              Nouvelle évaluation
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};