"use client"

import { IPersonnePhysique } from '@/helpers/interface'
import useDataStore from '@/store/dataStore'
import React, { useEffect, useState } from 'react'
import ResumeCardContent from './resume-card-content'
interface Props {
    next: () => void
    prev: () => void
}

const ResumeCard = ({ next, prev }: Props) => {
    const { dataTypePersonne, dataPersonnePhysique, dataChoixMembre } = useDataStore()
    const [typePersonne, setTypePersonne] = useState("")
    const [personnePhysique, setPersonnePhysique] = useState<IPersonnePhysique>()
    const [loading, setLoading] = useState(true)

    const recupererOption = async () => {
        setLoading(true)
        switch (dataTypePersonne?.typePersonne) {
            case "1":
                setTypePersonne("Personne physique")
                setPersonnePhysique(dataPersonnePhysique)
            case "2":
                setTypePersonne("Personne morale")
            default:
                break;
        }
        setLoading(false)
    }
    useEffect(() => {
        recupererOption()
    }, [dataTypePersonne, dataPersonnePhysique])


    return (
        <>
            {loading ? <>Chargement ...</> : <ResumeCardContent next={next} prev={prev} typePersonne={typePersonne} personnePhysique={personnePhysique!} />}
        </>
    )
}

export default ResumeCard