export const retournerChoixMembre = (choixMembre: string) => {
  switch (choixMembre) {
    case "a":
      return "Argent: 10.000 F CFA/mois";
    case "b":
      return "Bronze: 20.000 F CFA/mois";
    case "o":
      return "Or: 100.000 F CFA/mois";
    case "d":
      return "Diamant: ";
    default:
      return "";
  }
};

const optionsDonateur = [
  { label: "Bronze (20.000 F CFA/mois)", value: "b" },
  { label: "Argent (10.000 F CFA/mois)", value: "a" },
  { label: "Or (100.000 F CFA/mois)", value: "o" },
  { label: "Diamant (+100.000 F CFA/mois)", value: "d" },
];

export function getCurrentDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Mois au format MM
  const day = String(now.getDate()).padStart(2, "0"); // Jour au format DD
  const hours = String(now.getHours()).padStart(2, "0"); // Heure au format HH
  const minutes = String(now.getMinutes()).padStart(2, "0"); // Minute au format MM
  const seconds = String(now.getSeconds()).padStart(2, "0"); // Seconde au format SS

  return `⁠${year}${month}${day}${hours}${minutes}${seconds}`;
}

export const identifiantClientApi = {
  reference: "BE62E1",
  cle: "c8156034539479b46bf2",
};

export const calculTotal = (montant: string) => {
  const total = Number(montant) + Number(montant) * 0.02;
  return total;
};

export const valeurMontantSansFrais = (montant: string) => {
  return montant;
};

export const calculFrais = (montant: string) => {
  const total = Number(montant) * 0.02;
  return total;
};

export const bearToken = "";
