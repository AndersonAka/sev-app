import {
  IAdhesionCollecte,
  IChoixMembre,
  IChoixModePaiement,
  IChoixMoyenPaiement,
  IMotEnregistrement,
  IPersonneMorale,
  IPersonnePhysique,
  ITypePersonne,
} from "@/helpers/interface";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface DataStoreState {
  current: number;
  dataTypePersonne: ITypePersonne;
  dataPersonnePhysique: IPersonnePhysique;
  dataChoixMembre: IChoixMembre;
  dataPersonneMorale: IPersonneMorale;
  dataChoixPaiement: IChoixMoyenPaiement;
  dataEngagementCollecte: IAdhesionCollecte;
  dataMotEnregistrement: IMotEnregistrement;
  dataChoixModePaiement: IChoixModePaiement;
  accessToken: string | null;
  activeFrais: boolean;
  montantApayer: string | null;
  typeOperation: string | null;
  setTypeOperation: (typeOperation: string | null) => void;
  setMontantApayer: (montantApayer: string | null) => void;
  setActiveFrais: (activeFrais: boolean) => void;
  setAccessToken: (accessToken: string | null) => void;
  setDataChoixModePaiement: (dataChoixModePaiement: IChoixModePaiement) => void;
  setDataMotEnregistrement: (dataMotEnregistrement: IMotEnregistrement) => void;
  setDataEngagementCollecte: (
    dataEngagementCollecte: IAdhesionCollecte
  ) => void;
  setDataChoixPaiement: (dataChoixPaiement: IChoixMoyenPaiement) => void;
  setDataPersonneMorale: (dataPersonneMorale: IPersonneMorale) => void;
  setDataChoixMembre: (dataChoixMembre: IChoixMembre) => void;
  setDataPersonnePhysique: (dataPersonnePhysique: IPersonnePhysique) => void;
  setDataTypePersonne: (dataTypePersonne: ITypePersonne) => void;
  setCurrent: (current: number) => void;
  resetStore: () => void; //  fonction resetStore ici
}

const useDataStore = create<DataStoreState>()(
  persist(
    (set, get) => ({
      current: 0,
      dataTypePersonne: {
        typePersonne: null,
      },
      dataPersonnePhysique: {
        nom: null,
        prenom: null,
        lieuDeResidence: null,
        eglise: null,
        profession: null,
        telephone: null,
      },
      dataChoixMembre: {
        type: null,
        option: null,
      },
      dataPersonneMorale: {
        raisonSociale: null,
        personneDeReference: null,
        fonction: null,
        adresseEmail: null,
        telephone: null,
      },
      dataChoixPaiement: {
        option: null,
        numero: null,
      },
      dataEngagementCollecte: {
        option: null,
        montant: null,
        date: null,
        modePaiement: null,
      },
      dataMotEnregistrement: {
        titre: null,
        texte: null,
      },
      dataChoixModePaiement: {
        optionPaiement: null,
        modePaiement: null,
        date: null,
      },
      accessToken: null,
      activeFrais: false,
      montantApayer: null,
      typeOperation: null,
      setTypeOperation: (typeOperation: string | null) =>
        set({ typeOperation }),
      setMontantApayer: (montantApayer: string | null) =>
        set({ montantApayer }),
      setActiveFrais: (activeFrais: boolean) => set({ activeFrais }),
      setAccessToken: (accessToken: string | null) => set({ accessToken }),
      setDataChoixModePaiement: (dataChoixModePaiement: IChoixModePaiement) =>
        set({ dataChoixModePaiement }),
      setDataMotEnregistrement: (dataMotEnregistrement: IMotEnregistrement) =>
        set({ dataMotEnregistrement }),
      setDataEngagementCollecte: (dataEngagementCollecte: IAdhesionCollecte) =>
        set({ dataEngagementCollecte }),
      setDataChoixPaiement: (dataChoixPaiement: IChoixMoyenPaiement) =>
        set({ dataChoixPaiement }),
      setDataPersonneMorale: (dataPersonneMorale: IPersonneMorale) =>
        set({ dataPersonneMorale }),

      setDataChoixMembre: (dataChoixMembre: IChoixMembre) =>
        set({ dataChoixMembre }),
      setDataPersonnePhysique: (dataPersonnePhysique: IPersonnePhysique) =>
        set({ dataPersonnePhysique }),
      setDataTypePersonne: (dataTypePersonne: ITypePersonne) =>
        set({ dataTypePersonne }),
      setCurrent: (current: number) => set({ current }),
      // Fonction de réinitialisation
      resetStore: () =>
        set({
          current: 0,
          dataTypePersonne: {
            typePersonne: null,
          },
          dataPersonnePhysique: {
            nom: null,
            prenom: null,
            lieuDeResidence: null,
            eglise: null,
            profession: null,
            telephone: null,
          },
          dataChoixMembre: {
            type: null,
            option: null,
          },
          dataPersonneMorale: {
            raisonSociale: null,
            personneDeReference: null,
            fonction: null,
            adresseEmail: null,
            telephone: null,
          },
          dataChoixPaiement: {
            option: null,
            numero: null,
          },
          dataEngagementCollecte: {
            option: null,
            montant: null,
            date: null,
            modePaiement: null,
          },
          dataMotEnregistrement: {
            titre: null,
            texte: null,
          },
          dataChoixModePaiement: {
            optionPaiement: null,
            modePaiement: null,
            date: null,
          },
          accessToken: null,
          activeFrais: false,
          montantApayer: null,
          // typeOperation: null,
        }),
    }),
    {
      name: "dataStore",
    }
  )
);

export default useDataStore;
