'use cliet'

import useDataStore from '@/store/dataStore'
import React from 'react'
import PersonnePhysique from './personne-physique-card'
import PersonneMorale from './personne-morale-card'

interface Props {
    next: () => void
    prev: () => void
}
const PersonneWrapper = ({ next, prev }: Props) => {
    const { dataTypePersonne } = useDataStore()

    switch (dataTypePersonne?.typePersonne) {
        case "1":
            return (
                <PersonnePhysique next={next} prev={prev} />
            )
        case "2":
            return (
                <PersonneMorale />
            )
        default:
            break;
    }
}

export default PersonneWrapper