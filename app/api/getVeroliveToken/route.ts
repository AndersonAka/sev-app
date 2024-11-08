// app/api/getVeroliveToken/route.ts
import { NextResponse } from "next/server";
import axios from "axios";
import { hashCode } from "@/helpers/encodeHash";

// Fonction utilitaire pour obtenir la date/heure actuelle
const getCurrentDateTime = (): string => {
  return new Date().toISOString();
};

// Fonction utilitaire pour générer le Bearer Token
// const hashCode = (reference: string, cle: string, timeLess: string): string => {
//   // Implémentez ici la logique de génération du token
//   const BearToken = hashCode(reference, cle, timeLess);

//   return `${reference}, ${cle}, ${timeLess}`;
// };

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const reference = searchParams.get("reference");
  const cle = searchParams.get("cle");
  if (!reference || !cle) {
    return NextResponse.json(
      { message: "Paramètres manquants" },
      { status: 400 }
    );
  }
  const timeLess = getCurrentDateTime();
  const BearToken = hashCode(reference, cle, timeLess);
  try {
    const response = await axios.post(
      "https://verolive-secure.com/apiverolive/_get_token",
      {
        client: reference,
        timeless: timeLess,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${BearToken}`,
        },
      }
    );
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Erreur lors de la requête vers l'API Verolive :", error);
    return NextResponse.json(
      {
        message: "Erreur lors de la récupération du token",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
