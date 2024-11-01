import * as Yup from "yup";

export const typePersonneSchema = Yup.object().shape({
  typePersonne: Yup.string().required("Ce champ est obligatoire"),
});

export const personnePhysiqueSchema = Yup.object().shape({
  nom: Yup.string().required("Ce champ est obligatoire"),
  prenom: Yup.string().required("Ce champ est obligatoire"),
  telephone: Yup.string().required("Ce champ est obligatoire"),
});
