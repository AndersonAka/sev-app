// /app/api/enregistrementCollecte/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client"; // Assurez-vous d'importer correctement votre client Prisma

export async function POST(request: NextRequest) {
  const {
    typeOperation,
    typePersonne,
    typePaiement,
    datePaiement,
    montantEngagement,
    statusPaiement,
    typeMembre,
    modePaiement,
    referencePaiement,
    optionMembreDonateur,
    PersonneMorale,
    personnePhysique,
    referenceVerolive,
    montantPayer,
  } = await request.json();

  try {
    console.log(request.body);
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
    return NextResponse.json({ data: response, message: "success" });
  } catch (error) {
    console.error("Erreur lors de l’enregistrement de la collecte:", error);
    return NextResponse.json({
      data: null,
      message: "Une erreur est survenue",
    });
  }
}
