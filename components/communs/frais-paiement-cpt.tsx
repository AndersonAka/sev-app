'use client'

import { calculFrais, calculTotal } from '@/helpers/fonctions'
import useDataStore from '@/store/dataStore'
import React, { useEffect, useState } from 'react'

interface Props {
    active: boolean,
    montant: string
}

const FraisPaiementCpt = ({ active, montant }: Props) => {
    const { montantApayer, setMontantApayer } = useDataStore()
    const [mont1, setMont1] = useState(montant)
    const [activeFrais, setActiveFrais] = useState(active)

    const retourneTotal = (mont: string) => {
        const t = calculTotal(mont)
        setMont1(t.toString())
        setMontantApayer(t.toString())
        // return t
    }

    useEffect(() => {
        if (active)
            retourneTotal(montant)
    }, [active])

    if (active) {
        return (
            <>
                <div className='flex flex-col space-y-2'>
                    <span>Frais de paiement : {calculFrais(montant!)} F CFA</span>
                    <span className='text-lg font-bold'>
                        Total à payer : {mont1} F CFA
                    </span>
                </div>
            </>
        )
    } else {
        null
    }

    // return (
    //     <>
    //         {active && (
    //             <div className='flex flex-row space-x-2'>
    //                 <span>Frais de paiement : {calculFrais(montant!)} F CFA</span>
    //                 <span className='text-lg font-bold'>
    //                     Total à payer : {calculTotal(montant!)} F CFA
    //                 </span>
    //             </div>)}
    //     </>
    // )
}

export default FraisPaiementCpt