
'use client'
import useDataStore from '@/store/dataStore'
import React from 'react'
import WavePaiementCard from './wave-paiement-card'
interface Props {
    next: () => void
    prev: () => void
}
const ApiPaiementCard = ({ next, prev }: Props) => {
    const { setCurrent, dataChoixPaiement } = useDataStore()

    const suivant = () => {
        setCurrent(4);
        next()
    }

    const retour = () => {
        setCurrent(4);
        prev()
    }

    switch (dataChoixPaiement.option) {
        case 'wave':
            return (
                <div>
                    <WavePaiementCard />
                </div>
            )
        case 'orange':
            return (
                <div>
                    Orange Paiement Card
                </div>
            )
        case 'mtn':
            return (
                <div>
                    Mtn Paiement Card
                </div>
            )
        case 'moov':
            return (
                <div>
                    Moov Paiement card
                </div>
            )
    }

}

export default ApiPaiementCard