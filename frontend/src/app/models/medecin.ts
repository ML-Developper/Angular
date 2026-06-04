export interface Medecin {
  nom?: string;
  prenom?: string;
  date_n?: string;
  genre?: string;
  gouvernerat?: string;
  tel?: number;
  adresse?: string;
  email?: string;
  password?: string;
  specialite?: string;
  assurance_m?: boolean;

  jours_travaille: {
    lundi?: boolean;
    mardi?: boolean;
    mercredi?: boolean;
    jeudi?: boolean;
    vendredi?: boolean;
    samedi?: boolean;
    dimanche?: boolean;
  };

  heure_o?: string;
  heure_f?: string;
  image?: string;
  role?: string;
}
