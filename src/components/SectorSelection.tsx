import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sector } from '@/types/risk-assessment';

interface SectorSelectionProps {
  sectors: Sector[];
  onSelectSector: (sector: Sector) => void;
}

export const SectorSelection = ({ sectors, onSelectSector }: SectorSelectionProps) => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Évaluation des Risques Professionnels
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Sélectionnez votre secteur d'activité pour commencer l'évaluation des risques et générer votre Document Unique (DUERP)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sectors.map((sector) => (
          <Card key={sector.id} className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 hover:border-primary/50">
            <CardHeader className="text-center pb-4">
              <div className="text-6xl mb-4">{sector.icon}</div>
              <CardTitle className="text-xl">{sector.name}</CardTitle>
              <CardDescription className="text-sm">
                {sector.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Button 
                onClick={() => onSelectSector(sector)}
                className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-300"
              >
                Commencer l'évaluation
              </Button>
              <p className="text-xs text-muted-foreground text-center mt-3">
                {sector.questionnaire.length} questions spécialisées
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 bg-card/50 rounded-lg p-6 border">
        <h2 className="text-xl font-semibold mb-4">🎯 Pourquoi évaluer les risques ?</h2>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <div className="text-2xl mb-2">⚖️</div>
            <h3 className="font-medium">Obligation légale</h3>
            <p className="text-muted-foreground">Respect du Code du travail</p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">🛡️</div>
            <h3 className="font-medium">Protection</h3>
            <p className="text-muted-foreground">Sécurité de vos équipes</p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">📋</div>
            <h3 className="font-medium">Document Unique</h3>
            <p className="text-muted-foreground">Génération automatique</p>
          </div>
        </div>
      </div>
    </div>
  );
};