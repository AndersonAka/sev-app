'use cliet'

import useDataStore from '@/store/dataStore'
import React from 'react'
import PersonnePhysique from './personne-physique-card'
import PersonneMorale from './personne-morale-card'

interface Props {
    next: () => void
    prev: () => void
    adhesionCollecte?: boolean
}
const PersonneWrapper = ({ next, prev, adhesionCollecte }: Props) => {
    const { dataTypePersonne } = useDataStore()

    switch (dataTypePersonne?.typePersonne) {
        case "1":
            return (
                <PersonnePhysique next={next} prev={prev} adhesionCollecte={adhesionCollecte} />
            )
        case "2":
            return (
                <PersonneMorale next={next} prev={prev} adhesionCollecte={adhesionCollecte} />
            )
        default:
            break;
    }
}

export default PersonneWrapper