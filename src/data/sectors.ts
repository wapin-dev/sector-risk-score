import { Sector } from '@/types/risk-assessment';

export const sectors: Sector[] = [
  {
    id: 'restaurant',
    name: 'Restauration',
    description: 'Restaurants, cafés, traiteurs, cantines',
    icon: '🍽️',
    questionnaire: [
      {
        id: 'r1',
        text: 'Votre personnel manipule-t-il des couteaux ou objets tranchants ?',
        category: 'Risques physiques',
        type: 'boolean',
        weight: 8,
        helpText: 'Incluant couteaux de cuisine, mandolines, hachoirs...'
      },
      {
        id: 'r2',
        text: 'À quelle fréquence y a-t-il exposition à des surfaces chaudes ?',
        category: 'Risques thermiques',
        type: 'frequency',
        options: [
          { value: 'never', label: 'Jamais', score: 0 },
          { value: 'rarely', label: 'Rarement', score: 2 },
          { value: 'sometimes', label: 'Parfois', score: 5 },
          { value: 'often', label: 'Souvent', score: 8 }
        ],
        weight: 7,
        helpText: 'Fours, plaques, friteuses, etc.'
      },
      {
        id: 'r3',
        text: 'Des produits chimiques sont-ils utilisés pour le nettoyage ?',
        category: 'Risques chimiques',
        type: 'boolean',
        weight: 6,
        helpText: 'Dégraissants, désinfectants, détergents...'
      },
      {
        id: 'r4',
        text: 'Y a-t-il des risques de chutes (sols glissants, dénivelés) ?',
        category: 'Risques physiques',
        type: 'frequency',
        options: [
          { value: 'never', label: 'Jamais', score: 0 },
          { value: 'rarely', label: 'Rarement', score: 3 },
          { value: 'sometimes', label: 'Parfois', score: 6 },
          { value: 'often', label: 'Souvent', score: 9 }
        ],
        weight: 8
      },
      {
        id: 'r5',
        text: 'Le personnel porte-t-il des charges lourdes ?',
        category: 'Troubles musculosquelettiques',
        type: 'frequency',
        options: [
          { value: 'never', label: 'Jamais', score: 0 },
          { value: 'rarely', label: 'Rarement (< 5kg)', score: 2 },
          { value: 'sometimes', label: 'Parfois (5-15kg)', score: 5 },
          { value: 'often', label: 'Souvent (> 15kg)', score: 8 }
        ],
        weight: 6
      },
      {
        id: 'r6',
        text: 'Y a-t-il exposition au bruit (équipements, musique) ?',
        category: 'Risques physiques',
        type: 'frequency',
        options: [
          { value: 'never', label: 'Environnement calme', score: 0 },
          { value: 'rarely', label: 'Peu bruyant', score: 1 },
          { value: 'sometimes', label: 'Modérément bruyant', score: 4 },
          { value: 'often', label: 'Très bruyant', score: 7 }
        ],
        weight: 4
      },
      {
        id: 'r7',
        text: 'Le personnel travaille-t-il en horaires décalés ?',
        category: 'Organisation du travail',
        type: 'frequency',
        options: [
          { value: 'never', label: 'Horaires normaux uniquement', score: 0 },
          { value: 'rarely', label: 'Occasionnellement', score: 2 },
          { value: 'sometimes', label: 'Régulièrement', score: 4 },
          { value: 'often', label: 'Très fréquemment', score: 6 }
        ],
        weight: 5
      },
      {
        id: 'r8',
        text: 'Des mesures de prévention contre les coupures sont-elles en place ?',
        category: 'Mesures de prévention',
        type: 'measures',
        options: [
          { value: 'none', label: 'Aucune mesure', score: 8 },
          { value: 'basic', label: 'Mesures de base', score: 4 },
          { value: 'good', label: 'Bonnes mesures', score: 2 },
          { value: 'excellent', label: 'Mesures excellentes', score: 0 }
        ],
        weight: 7,
        helpText: 'EPI, formation, protège-lames, etc.'
      }
    ]
  },
  {
    id: 'construction',
    name: 'Bâtiment & Travaux Publics',
    description: 'Construction, rénovation, travaux publics',
    icon: '🏗️',
    questionnaire: [
      {
        id: 'c1',
        text: 'Le personnel travaille-t-il en hauteur ?',
        category: 'Risques de chute',
        type: 'frequency',
        options: [
          { value: 'never', label: 'Jamais', score: 0 },
          { value: 'rarely', label: 'Occasionnellement (< 2m)', score: 3 },
          { value: 'sometimes', label: 'Régulièrement (2-5m)', score: 6 },
          { value: 'often', label: 'Fréquemment (> 5m)', score: 9 }
        ],
        weight: 10,
        helpText: 'Échafaudages, toitures, échelles...'
      },
      {
        id: 'c2',
        text: 'Y a-t-il utilisation d\'outils vibrants ?',
        category: 'Troubles musculosquelettiques',
        type: 'frequency',
        options: [
          { value: 'never', label: 'Jamais', score: 0 },
          { value: 'rarely', label: 'Rarement', score: 2 },
          { value: 'sometimes', label: 'Parfois', score: 5 },
          { value: 'often', label: 'Quotidiennement', score: 8 }
        ],
        weight: 7,
        helpText: 'Marteaux-piqueurs, perceuses, tronçonneuses...'
      },
      {
        id: 'c3',
        text: 'Le personnel est-il exposé à la poussière ?',
        category: 'Risques respiratoires',
        type: 'frequency',
        options: [
          { value: 'never', label: 'Jamais', score: 0 },
          { value: 'rarely', label: 'Rarement', score: 3 },
          { value: 'sometimes', label: 'Parfois', score: 6 },
          { value: 'often', label: 'Fréquemment', score: 9 }
        ],
        weight: 8,
        helpText: 'Poussière de béton, plâtre, bois, silice...'
      },
      {
        id: 'c4',
        text: 'Des équipements de protection collective sont-ils utilisés ?',
        category: 'Mesures de prévention',
        type: 'measures',
        options: [
          { value: 'none', label: 'Aucun équipement', score: 9 },
          { value: 'basic', label: 'Équipements de base', score: 5 },
          { value: 'good', label: 'Bons équipements', score: 2 },
          { value: 'excellent', label: 'Équipements complets', score: 0 }
        ],
        weight: 9,
        helpText: 'Garde-corps, filets, ventilation...'
      }
    ]
  },
  {
    id: 'commerce',
    name: 'Commerce de détail',
    description: 'Magasins, supermarchés, boutiques',
    icon: '🛍️',
    questionnaire: [
      {
        id: 'co1',
        text: 'Le personnel effectue-t-il des manutentions répétitives ?',
        category: 'Troubles musculosquelettiques',
        type: 'frequency',
        options: [
          { value: 'never', label: 'Jamais', score: 0 },
          { value: 'rarely', label: 'Rarement', score: 2 },
          { value: 'sometimes', label: 'Parfois', score: 5 },
          { value: 'often', label: 'Constamment', score: 8 }
        ],
        weight: 7,
        helpText: 'Mise en rayon, déchargement, port de charges...'
      },
      {
        id: 'co2',
        text: 'Y a-t-il des risques d\'agression ou de vol ?',
        category: 'Risques psychosociaux',
        type: 'frequency',
        options: [
          { value: 'never', label: 'Jamais', score: 0 },
          { value: 'rarely', label: 'Très rarement', score: 2 },
          { value: 'sometimes', label: 'Parfois', score: 5 },
          { value: 'often', label: 'Fréquemment', score: 8 }
        ],
        weight: 6,
        helpText: 'Notamment pour les commerces avec maniement d\'argent'
      },
      {
        id: 'co3',
        text: 'Le personnel travaille-t-il debout de façon prolongée ?',
        category: 'Troubles musculosquelettiques',
        type: 'frequency',
        options: [
          { value: 'never', label: 'Jamais', score: 0 },
          { value: 'rarely', label: 'Moins de 2h/jour', score: 1 },
          { value: 'sometimes', label: '2-6h/jour', score: 4 },
          { value: 'often', label: 'Plus de 6h/jour', score: 7 }
        ],
        weight: 5
      }
    ]
  }
];