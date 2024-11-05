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
