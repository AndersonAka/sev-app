// app/api/getVeroliveToken/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const reference = searchParams.get("reference");
  const montant = searchParams.get("montant");
  const accessToken = searchParams.get("accessToken");

  if (!reference || !montant) {
    return NextResponse.json(
      { message: "Paramètres manquants" },
      { status: 400 }
    );
  }

  try {
    const response = await axios.post(
      "https://verolive-secure.com/apiverolive/_payement",
      {
        reference: reference,
        montant: montant,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return NextResponse.json(response.data);
  } catch (error: any) {
    // console.error("Erreur lors de la requête vers l'API Verolive :", error);
    return NextResponse.json(
      {
        message: "Erreur lors de la récupération du token",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
