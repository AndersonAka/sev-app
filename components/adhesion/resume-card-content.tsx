'use client'
import { getCurrentDateTime, identifiantClientApi, retournerChoixMembre } from '@/helpers/fonctions'
import { IPersonneMorale, IPersonnePhysique } from '@/helpers/interface'
import useDataStore from '@/store/dataStore'
import { Button, message } from 'antd'
import ResumeCardPersonneMorale from './resume-card-personne-morale'
import ResumeCardPersonnePhysique from './resume-card-personne-physique'
import { useRouter } from 'next/navigation'
import { use, useEffect, useState } from 'react'
import { hashCode } from '@/helpers/encodeHash'
import axios from 'axios';

interface Props {
    typePersonne: string
    personnePhysique?: IPersonnePhysique
    personneMorale?: IPersonneMorale
    next: () => void
    prev: () => void
    modeCollecte?: boolean
}

const ResumeCardContent = ({ typePersonne, personnePhysique, personneMorale, modeCollecte, next, prev }: Props) => {
    const { dataTypePersonne, dataChoixMembre, setCurrent, dataEngagementCollecte, setDataMotEnregistrement, dataChoixModePaiement } = useDataStore()

    const retour = () => {
        setCurrent(2)
        prev()
    }
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const suivant = async () => {
        setLoading(true)
        await getTokenApiVerolive()
        setLoading(false)
        // setLoading(true)
        //Si le modde de paiement est par mobile money
        // if ((dataEngagementCollecte.option === "1" && dataEngagementCollecte.modePaiement === "m") || (dataChoixModePaiement.optionPaiement === "1" && dataChoixModePaiement.modePaiement === "m")) {
        //     router.push('/paiement')
        //     return
        // }
        // if ((dataEngagementCollecte.option === "2") || (dataChoixModePaiement.optionPaiement === "2")) {
        //     setDataMotEnregistrement({ titre: "Enregistrement effectué avec succès!", texte: "L'ONG SEMENCE POUR LA VIE vous remercie pour votre soutien financier!" })
        //     router.push('/remerciement')
        //     return
        // }
        // setCurrent(2)
        // setLoading(false)
        // next()
    }

    const getTokenApiVerolive = async () => {
        const timeLess = getCurrentDateTime()
        const BearToken = hashCode(identifiantClientApi.reference, identifiantClientApi.cle, timeLess)
        try {
            const response = await axios.post('https://verolive-secure.com/apiverolive/_get_token',
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Cross-Origin": "*",
                        "Access-Control-Allow-Origin": "*",
                        "Authorization": `Bearer ${BearToken}`
                    },
                    data: {
                        "client": identifiantClientApi.reference,
                        "timeless": timeLess
                    }
                }
            )
            console.log(response.data)
        } catch (e) {
            console.log(e)
        }
    }


    useEffect(() => {
        router.prefetch('/remerciement')
        router.prefetch('/paiement')
    })

    return (
        <div className='flex flex-col space-y-3 '>
            <span className='text-lg font-medium '>Résumer des informations</span>
            <div className='flex flex-row justify-between space-x-2'>
                <div className='w-1/2'>
                    <span className="block text-lg ">
                        {typePersonne}
                    </span>
                </div>
            </div>
            <div className='flex flex-col space-y-2 rounded-lg border p-3'>

                {dataTypePersonne.typePersonne === "1" && <ResumeCardPersonnePhysique personnePhysique={personnePhysique!} />}
                {dataTypePersonne.typePersonne === "2" && <ResumeCardPersonneMorale personneMorale={personneMorale!} />}

                {!modeCollecte ? (
                    <>
                        <div className='p-2 bg-red-50 text-red-400 flex rounded-lg flex-col justify-between '>
                            <span className=' text-xl font-medium'>{dataChoixMembre?.type === "m" ? "Membre" : "Donateur"}</span>
                            <span className='text-xl font-medium'>
                                {dataChoixMembre?.type === "d" ?
                                    (
                                        <>
                                            <span className='text-lg italic'>{retournerChoixMembre(dataChoixMembre?.option!)} {dataChoixMembre?.option === 'd' ? `${dataChoixMembre?.montant} F CFA/mois` : null}</span><br />
                                            <span className='text-lg italic'></span><br />
                                        </>) : <>
                                        <div className='flex flex-col space-y-2'>
                                            <span className='text-lg italic'>Droit d\'adhésion (10.000 F CFA)</span>
                                            <span className='text-lg italic'>Cotisation mensuelle (10.000 F CFA / mois)</span>
                                        </div>
                                    </>
                                }
                            </span>
                            {dataChoixModePaiement.optionPaiement && (
                                <>
                                    <div className='flex flex-row space-x-2 text-xl font-medium'>
                                        {dataChoixModePaiement.optionPaiement === '1' ? 'Paiement immédiat: ' : `Délai de paiement: ${dataChoixModePaiement.date}`}
                                        <span className='text-xl font-medium'>{dataChoixModePaiement.
                                            optionPaiement === '1' && dataChoixModePaiement.modePaiement === 'v' ? ' Virement bancaire' : dataChoixModePaiement.optionPaiement === '1' && dataChoixModePaiement.modePaiement === 'm' ? ` Mobile money` : null}</span>
                                    </div>
                                </>)}
                        </div>
                    </>
                ) : (
                    <>
                        <div className='p-2 bg-red-50 text-red-400 flex rounded-lg flex-col justify-between space-y-2'>
                            <span className='text-xl font-medium'>Engagement</span>
                            <span className='text-xl font-medium'>{`${dataEngagementCollecte.montant} FCFA`}</span>
                            {dataEngagementCollecte.option && (
                                <div className='flex flex-row space-x-2 text-xl font-medium'>
                                    {dataEngagementCollecte.option === '1' ? 'Paiement immédiat: ' : `Délai de paiement: ${dataEngagementCollecte.date}`}
                                    <span className='text-xl font-medium'>{dataEngagementCollecte.option === '1' && dataEngagementCollecte.modePaiement === 'v' ? ' Virement bancaire' : dataEngagementCollecte.option === '1' && dataEngagementCollecte.modePaiement === 'm' ? ` Mobile money` : null}</span>
                                </div>
                            )}

                        </div>
                    </>)}

            </div>

            <div className='flex  justify-center md:justify-end space-x-2'>
                <Button
                    type='default'
                    onClick={() => retour()}
                    style={{ marginTop: 20, height: 35, width: 150, fontSize: 15 }}
                >
                    Retour
                </Button>
                {!modeCollecte ?
                    (
                        <>
                            <Button
                                type='primary'
                                onClick={() => suivant()}
                                style={dataChoixModePaiement.optionPaiement === "1" ? { marginTop: 20, height: 35, width: 150, fontSize: 15, backgroundColor: 'maroon' } : { marginTop: 20, height: 35, width: 150, fontSize: 15, backgroundColor: 'green' }}
                                loading={loading}
                            >
                                {dataChoixModePaiement.optionPaiement === "1" ? "Paiement" : "Enregitrer"}
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                type='primary'
                                onClick={() => suivant()}
                                style={dataEngagementCollecte.option === "1" ? { marginTop: 20, height: 35, width: 150, fontSize: 15, backgroundColor: 'maroon' } : { marginTop: 20, height: 35, width: 150, fontSize: 15, backgroundColor: 'green' }}
                                loading={loading}
                            >
                                {dataEngagementCollecte.option === "1" ? "Paiement" : "Enregitrer"}
                            </Button>
                        </>)}

            </div>
        </div>
    )
}

export default ResumeCardContent


export const resumeCardPersonneMorale = () => {
    return (
        <>
        </>
    )
}

