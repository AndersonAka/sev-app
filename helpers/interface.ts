export interface ITypePersonne {
  typePersonne?: string | null;
}

export interface IPersonnePhysique {
  nom?: string | null;
  prenom?: string | null;
  lieuDeResidence?: string | null;
  eglise?: string | null;
  profession?: string | null;
  telephone: string | null;
}

export interface IPersonneMorale {
  raisonSociale?: string | null;
  personneDeReference?: string | null;
  fonction?: string | null;
  adresseEmail?: string | null;
  telephone?: string | null;
}

export interface IChoixMembre {
  type?: string | null;
  option?: string | null;
  montant?: string | null;
}

export interface IAdhesiionCollecte {
  montant?: string | null;
  date?: string | null;
}

export interface IChoixMoyenPaiement {
  option?: string | null;
  numero?: string | null;
}
