import * as Yup from "yup";

export const typePersonneSchema = Yup.object().shape({
  typePersonne: Yup.string().required("Ce champ est obligatoire"),
});

export const personnePhysiqueSchema = Yup.object().shape({
  nom: Yup.string().required("Ce champ est obligatoire"),
  prenom: Yup.string().required("Ce champ est obligatoire"),
  telephone: Yup.string().required("Ce champ est obligatoire"),
});

export const personneMoraleSchema = Yup.object().shape({
  raisonSociale: Yup.string()
    .min(5, "5 caractères minimun")
    .required("Ce champ est obligatoire"),
  personneDeReference: Yup.string()
    .min(5, "5 caractères minimun")
    .required("Ce champ est obligatoire"),
  fonction: Yup.string()
    .min(5, "5 caractères minimun")
    .required("Ce champ est obligatoire"),
  telephone: Yup.string()
    .min(5, "5 caractères minimun")
    .required("Ce champ est obligatoire"),
});
