"use server";

import { IPersonneMorale, IPersonnePhysique } from "@/helpers/interface";
import prisma from "@/prisma/client";

export const enregistrementAdhesion = async (
  typeOperation: string,
  typePersonne: string,
  typePaiement: string,
  datePaiement: string,
  montantEngagement: string,
  statusPaiement: string,
  typeMembre?: string,
  modePaiement?: string,
  referencePaiement?: string,
  optionMembreDonateur?: string,
  PersonneMorale?: IPersonneMorale,
  personnePhysique?: IPersonnePhysique,
  referenceVerolive?: string,
  montantPayer?: string
) => {
  try {
    console.log("Enregistrement");
    const response = await prisma.adhesion.create({
      data: {
        typeOperation: typeOperation,
        nom: personnePhysique?.nom,
        prenom: personnePhysique?.prenom,
        telephone: personnePhysique?.telephone,
        lieuResidence: personnePhysique?.lieuDeResidence,
        eglise: personnePhysique?.eglise,
        profession: personnePhysique?.profession,
        raisonSociale: PersonneMorale?.raisonSociale,
        personneReference: PersonneMorale?.personneDeReference,
        fonction: PersonneMorale?.fonction,
        adresseMail: PersonneMorale?.adresseEmail,
        typePersonne: typePersonne,
        typeMembre: typeMembre,
        optionMembreDonateur: optionMembreDonateur,
        typePaiement: typePaiement,
        datePaiement: datePaiement,
        modePaiement: modePaiement,
        referencePaiement: referencePaiement,
        referenceVerolive: referenceVerolive,
        montantEngagement: Number(montantEngagement),
        montantPayer: Number(montantPayer),
        statusPaiement: statusPaiement,
      },
    });
    console.log("Terminer");
    console.log(response);
    return { data: response, message: "success" };
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de l'enregistrement de la collecte:",
      error
    );
    return { data: null, message: "Une erreur est survenue" };
  }
};

export const enregistrementCollecte = async (
  typeOperation: string,
  typePersonne: string,
  typePaiement: string,
  datePaiement: string,
  montantEngagement: string,
  statusPaiement: string,
  typeMembre?: string,
  modePaiement?: string,
  referencePaiement?: string,
  optionMembreDonateur?: string,
  PersonneMorale?: IPersonneMorale,
  personnePhysique?: IPersonnePhysique,
  referenceVerolive?: string,
  montantPayer?: string
) => {
  try {
    console.log("Enregistrement");
    const response = await prisma.collecte.create({
      data: {
        typeOperation: typeOperation,
        nom: personnePhysique?.nom,
        prenom: personnePhysique?.prenom,
        telephone: personnePhysique?.telephone,
        lieuResidence: personnePhysique?.lieuDeResidence,
        eglise: personnePhysique?.eglise,
        profession: personnePhysique?.profession,
        raisonSociale: PersonneMorale?.raisonSociale,
        personneReference: PersonneMorale?.personneDeReference,
        fonction: PersonneMorale?.fonction,
        adresseMail: PersonneMorale?.adresseEmail,
        typePersonne: typePersonne,
        typeMembre: typeMembre,
        optionMembreDonateur: optionMembreDonateur,
        typePaiement: typePaiement,
        datePaiement: datePaiement,
        modePaiement: modePaiement,
        referencePaiement: referencePaiement,
        referenceVerolive: referenceVerolive,
        montantEngagement: Number(montantEngagement),
        montantPayer: Number(montantPayer),
        statusPaiement: statusPaiement,
      },
    });
    console.log("Terminer");
    console.log(response);
    return { data: response, message: "success" };
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de l'enregistrement de la collecte:",
      error
    );
    return { data: null, message: "Une erreur est survenue" };
  }
};
