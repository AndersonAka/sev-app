import {
  IChoixMembre,
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
  setDataPersonneMorale: (dataPersonneMorale: IPersonneMorale) => void;
  setDataChoixMembre: (dataChoixMembre: IChoixMembre) => void;
  setDataPersonnePhysique: (dataPersonnePhysique: IPersonnePhysique) => void;
  setDataTypePersonne: (dataTypePersonne: ITypePersonne) => void;
  setCurrent: (current: number) => void;
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
      setDataPersonneMorale: (dataPersonneMorale: IPersonneMorale) =>
        set({ dataPersonneMorale }),

      setDataChoixMembre: (dataChoixMembre: IChoixMembre) =>
        set({ dataChoixMembre }),
      setDataPersonnePhysique: (dataPersonnePhysique: IPersonnePhysique) =>
        set({ dataPersonnePhysique }),
      setDataTypePersonne: (dataTypePersonne: ITypePersonne) =>
        set({ dataTypePersonne }),
      setCurrent: (current: number) => set({ current }),
    }),
    {
      name: "dataStore",
    }
  )
);

export default useDataStore;
