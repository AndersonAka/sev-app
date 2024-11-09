
'use client'
import useDataStore from '@/store/dataStore'
import React, { useEffect, useMemo, useState } from 'react'
import WavePaiementCard from './wave-paiement-card'
import OrangePaiementCard from './orange-paiement-card'
import MtnPaiementCard from './mtn-paiement-card'
import MoovPaiementCard from './moov-paiement-card'
import { Button, message, Modal } from 'antd'
import Image from 'next/image'
import BankPaiementCard from './bank-paiement-card'
import { useRouter } from 'next/navigation'
import { ref } from 'yup'
import { enregistrementAdhesion, enregistrementCollecte } from '@/action/operations'
import dayjs from 'dayjs'
interface Props {
    next: () => void
    prev: () => void
}
const ApiPaiementCard = ({ next, prev }: Props) => {
    const { setCurrent, dataChoixPaiement, dataEngagementCollecte, setDataMotEnregistrement, dataChoixModePaiement, typeOperation, dataTypePersonne, dataChoixMembre, dataPersonneMorale, dataPersonnePhysique } = useDataStore()
    const [choixPaiement, setChoixPaimenet] = useState<number>(Number(dataChoixPaiement.option))
    const [loading, setLoading] = useState(false)
    const [referencePaieBanque, setReferencePaieBanque] = useState<string | null>(null)
    const [open, setOpen] = useState(false);
    const router = useRouter()

    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setOpen(false);
        suivant()
    };

    const handleCancel = () => {
        setOpen(false);
    };


    const suivant = async () => {
        if ((dataEngagementCollecte.option === "1" && dataEngagementCollecte.modePaiement === "v") || (dataChoixModePaiement.optionPaiement === "1" && dataChoixModePaiement.modePaiement === "v")) {
            setLoading(true)
            const typePaiement = "immediat"
            const date = dayjs(new Date()).format('YYYY-MM-DD')
            const statusPaiement = "en attente"
            const montant = dataEngagementCollecte.montant
            const typePersonne = dataTypePersonne.typePersonne === "1" ? "personnePhysique" : "personneMorale"
            //Cas 2 : paiement par virement bancaire
            let response = null
            if (typeOperation === 'collecte') {
                response = await enregistrementCollecte(typeOperation, typePersonne, typePaiement, date, montant!, statusPaiement, "", dataEngagementCollecte.modePaiement!, referencePaieBanque!, dataEngagementCollecte.option!, dataPersonneMorale, dataPersonnePhysique, "", montant!)
            } else {
                response = await enregistrementAdhesion(typeOperation!, typePersonne, typePaiement, date, dataChoixMembre.montant!, statusPaiement, "", dataChoixModePaiement.modePaiement!, referencePaieBanque!, dataChoixModePaiement.optionPaiement!, dataPersonneMorale, dataPersonnePhysique, "", dataChoixMembre.montant!)
            }
            setDataMotEnregistrement({ titre: "Enregistrement effectué avec succès!", texte: "L'ONG SEMENCE POUR LA VIE vous remercie pour votre soutien financier!" })
            router.push('/remerciement')
            return
        }
        // setCurrent(4);
        // next()
    }

    const retour = () => {
        setCurrent(4);
        prev()
    }

    const handleReference = (value: string) => {
        setReferencePaieBanque(value.trim() ? value.trim() : null)
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
        {
            key: '5',
            content: <BankPaiementCard handleRereference={handleReference} />,
        },
    ], [dataChoixPaiement.option])
    useEffect(() => {
        router.prefetch('/remerciement')
    })

    return (
        <div className='p-3 flex flex-col items-center border rounded-lg'>
            <div className='p-3 flex flex-col items-center justify-center space-y-3 '>
                <div className='p-2 w-full bg-gray-50  flex flex-row justify-center space-x-4 text-xl font-medium text-center '>
                    <Image src="/images/credit-card.webp" alt="credit card" width={50} height={100} />
                    <span className='self-center'>
                        Paiement Sécurisé
                    </span>
                </div>
                <div className='p-3 flex flex-col items-center justify-center space-y-3'>
                    {items[Number(4)].content}
                </div>
            </div>
            <div className='w-full flex flex-row items-center justify-center space-x-2'>
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
                    onClick={() => showModal()}
                    loading={loading}
                    style={{ padding: 20, height: 35, width: 150, fontSize: 15, backgroundColor: 'green' }}
                    disabled={loading || referencePaieBanque === null}
                >
                    Paiement
                </Button>
            </div>
            <Modal
                open={open}
                title="Confirmation"
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Confirmer"
                cancelText="Annuler"
                okButtonProps={{ style: { backgroundColor: 'red', color: 'white' } }}
                footer={(_, { OkBtn, CancelBtn }) => (
                    <>
                        <CancelBtn />
                        <OkBtn />
                    </>
                )}
            >
                <div className='flex flex-col justify-center'>
                    <p>Veuillez confirmer la référence de votre paiement:</p>
                    <p className='font-bold'>{referencePaieBanque?.toUpperCase()}</p>
                </div>
            </Modal>
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