
'use client'
import useDataStore from '@/store/dataStore'
import React, { useMemo, useState } from 'react'
import WavePaiementCard from './wave-paiement-card'
import OrangePaiementCard from './orange-paiement-card'
import MtnPaiementCard from './mtn-paiement-card'
import MoovPaiementCard from './moov-paiement-card'
import { Button } from 'antd'
interface Props {
    next: () => void
    prev: () => void
}
const ApiPaiementCard = ({ next, prev }: Props) => {
    const { setCurrent, dataChoixPaiement } = useDataStore()
    const [choixPaiement, setChoixPaimenet] = useState<number>(Number(dataChoixPaiement.option))

    const suivant = () => {
        setCurrent(4);
        next()
    }

    const retour = () => {
        setCurrent(4);
        prev()
    }

    const items = useMemo(() => [
        {
            key: '1',
            content: <WavePaiementCard />,
        },
        {
            key: '2',
            content: <OrangePaiementCard />,
        },
        {
            key: '3',
            content: <MtnPaiementCard />,
        },
        {
            key: '4',
            content: <MoovPaiementCard />,
        },
    ], [dataChoixPaiement.option])

    return (
        <div className='flex flex-col items-center'>
            <div className='p-3 flex flex-col items-center justify-center space-y-3 border rounded-lg'>
                <div className='text-xl font-medium text-center '>
                    Paiement Sécurisé
                </div>
                {items[Number(dataChoixPaiement.option) - 1].content}
                <div className='w-full flex flex-row items-center space-x-2'>
                    <Button
                        type='default'
                        className='w-full'
                        onClick={() => retour()}
                        style={{ padding: 20, height: 35, width: 150, fontSize: 15 }}
                    >
                        Annuler
                    </Button>

                    <Button
                        type='primary'
                        className='w-full'
                        // onClick={() => suivant()}
                        style={{ padding: 20, height: 35, width: 150, fontSize: 15, backgroundColor: 'green' }}
                    >
                        Paiement
                    </Button>
                </div>
            </div>


        </div>
    )

    // switch (dataChoixPaiement.option) {
    //     case 'wave':
    //         return (
    //             <div>
    //                 <WavePaiementCard />
    //             </div>
    //         )
    //     case 'orange':
    //         return (
    //             <div>
    //                 Orange Paiement Card
    //             </div>
    //         )
    //     case 'mtn':
    //         return (
    //             <div>
    //                 Mtn Paiement Card
    //             </div>
    //         )
    //     case 'moov':
    //         return (
    //             <div>
    //                 Moov Paiement card
    //             </div>
    //         )
    // }

}

export default ApiPaiementCard