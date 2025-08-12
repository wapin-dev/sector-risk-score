// Définition du type pour les catégories
export interface Category {
  id: string;
  name: string;
}

// Liste des catégories extraites du fichier sectors.ts
export const categories: Category[] = [
  { id: 'activites-veterinaires', name: 'Activités vétérinaires' },
  { id: 'agriculture', name: 'Agriculture, sylviculture et pêche' },
  { id: 'commerce-gros-detail', name: 'Commerce en gros et de détail' },
  { id: 'construction-maintenance', name: 'Construction et maintenance' },
  { id: 'cuir-tannerie', name: 'Cuir et tannerie' },
  { id: 'education', name: 'Éducation' },
  { id: 'electricite-travaux', name: 'Électricité et travaux connexes' },
  { id: 'alimentation-boissons', name: 'Fabrication de denrées alimentaires et de boissons' },
  { id: 'gaz-eau-electricite', name: 'Gaz, eau et électricité' },
  { id: 'gestion-dechets', name: 'Gestion des déchets' },
  { id: 'hotels-restaurants', name: 'Hôtels, restaurants et restauration' },
  { id: 'immobilier', name: 'Immobilier' },
  { id: 'industrie-manufacturiere', name: 'Industrie manufacturière' },
  { id: 'industries-extractives', name: 'Industries extractives' },
  { id: 'information-communication', name: 'Information et communication' },
  { id: 'outils-generiques', name: 'Outils génériques/risques propres' },
  { id: 'personnel-services', name: 'Personnel et autres professions de service' },
  { id: 'production-vente-alimentaire', name: 'Production et vente de denrées alimentaires' },
  { id: 'salons-coiffure-esthetique', name: 'Salons de coiffure et esthétique' },
  { id: 'sante-social', name: 'Santé humaine et activités des travailleurs sociaux' },
  { id: 'audiovisuel', name: 'Secteur audiovisuel' },
  { id: 'securite-privee', name: 'Sécurité privée' },
  { id: 'services-nettoyage', name: 'Services de nettoyage' },
  { id: 'spectacle-vivant', name: 'Spectacle vivant' },
  { id: 'sports-loisirs', name: 'Sports et loisirs' },
  { id: 'transport-air-eau-rail', name: 'Transport (air, eau et rail)' },
  { id: 'transport-auto-logistique', name: 'Transport automobile, distribution et logistique' },
  { id: 'transport-public', name: 'Transports public/de passagers' },
  { id: 'bureau-administration', name: 'Travail de bureau et administration' },
  { id: 'travail-bois', name: 'Travail du bois et activités connexes' },
  { id: 'travail-metal', name: 'Travail du métal' },
  { id: 'vehicules-reparation', name: 'Véhicules à moteur, réparation et activités connexes' }
];