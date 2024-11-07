import * as Yup from "yup";

export const typePersonneSchema = Yup.object().shape({
  typePersonne: Yup.string().required("Ce champ est obligatoire"),
});

export const personnePhysiqueSchema = Yup.object().shape({
  nom: Yup.string().required("Ce champ est obligatoire"),
  prenom: Yup.string().required("Ce champ est obligatoire"),
  eglise: Yup.string().required("Ce champ est obligatoire"),
  telephone: Yup.string()
    .min(14, "Numéro de telephone est icorrect. Ex: +225 00 00 00 00")
    .required("Ce champ est obligatoire"),
});

export const personneMoraleSchema = Yup.object().shape({
  raisonSociale: Yup.string().required("Ce champ est obligatoire"),
  personneDeReference: Yup.string().required("Ce champ est obligatoire"),
  fonction: Yup.string().required("Ce champ est obligatoire"),
  adresseEmail: Yup.string().email("Email non valide"),
  telephone: Yup.string()
    .min(14, "Numéro de telephone est icorrect. Ex: +225 00 00 00 00")
    .required("Ce champ est obligatoire"),
});

export const adhesionCollectSchema = Yup.object().shape({
  montant: Yup.number().required("Ce champ est obligatoire"),
  date: Yup.date().required("Ce champ est obligatoire"),
});
