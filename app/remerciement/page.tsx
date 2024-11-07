"use client"

import ResultCpt from '@/components/communs/result-cpt'
import useDataStore from '@/store/dataStore'
import React, { use } from 'react'

const PageRemerciement = () => {
    const { dataMotEnregistrement } = useDataStore()
    return (
        <div className='w-full  flex justify-center items-center'>
            <ResultCpt titre="Enregistrement effectué avec succès!" texte="L'ONG SEMENCE POUR LA VIE vous remercie pour votre soutien financier!" />
        </div>
    )
}

export default PageRemerciement