'use client'
import { getCurrentDateTime, identifiantClientApi, retournerChoixMembre, valeurMontantSansFrais } from '@/helpers/fonctions'
import { IPersonneMorale, IPersonnePhysique } from '@/helpers/interface'
import useDataStore from '@/store/dataStore'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { Button, Switch } from 'antd'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import FraisPaiementCpt from '../communs/frais-paiement-cpt'
import ResumeCardPersonneMorale from './resume-card-personne-morale'
import ResumeCardPersonnePhysique from './resume-card-personne-physique'

interface Props {
    typePersonne: string
    personnePhysique?: IPersonnePhysique
    personneMorale?: IPersonneMorale
    next: () => void
    prev: () => void
    modeCollecte?: boolean
}

const ResumeCardContent = ({ typePersonne, personnePhysique, personneMorale, modeCollecte, next, prev }: Props) => {
    const { dataTypePersonne, dataChoixMembre, setCurrent, dataEngagementCollecte, setDataMotEnregistrement, dataChoixModePaiement, activeFrais, setActiveFrais, montantApayer, setMontantApayer: setMotantApayer } = useDataStore()
    const [active, setActive] = useState(false)

    const retour = () => {
        setCurrent(2)
        prev()
    }
    const router = useRouter()

    const [loading, setLoading] = useState(false)

    const suivant = async () => {
        // setLoading(true)
        setLoading(true)
        // Si le modde de paiement est par mobile money
        if ((dataEngagementCollecte.option === "1" && dataEngagementCollecte.modePaiement === "m") || (dataChoixModePaiement.optionPaiement === "1" && dataChoixModePaiement.modePaiement === "m")) {
            await getTokenApiVerolive()
            setLoading(false)
            return
        }
        if ((dataEngagementCollecte.option === "2") || (dataChoixModePaiement.optionPaiement === "2")) {
            setDataMotEnregistrement({ titre: "Enregistrement effectué avec succès!", texte: "L'ONG SEMENCE POUR LA VIE vous remercie pour votre soutien financier!" })
            router.push('/remerciement')
            return
        }
        setCurrent(2)
        setLoading(false)
        next()
    }
    const getTokenApiVerolive = async () => {
        try {
            const response = await axios.get('/api/getVeroliveToken', {
                params: {
                    reference: identifiantClientApi.reference,
                    cle: identifiantClientApi.cle,
                },
            });
            if (response.data.status === 1) {
                // setAccessToken(response.data.access_token)
                const reponseApiPaiement = await getPayementApiVerolive(response.data.access_token, montantApayer!)
                if (reponseApiPaiement && reponseApiPaiement.data.status === 3) {
                    router.push(reponseApiPaiement.data.url)
                    return
                }
            }
        } catch (error) {
            console.error('Erreur lors de la récupération du token:', error);
        }
    }

    const getPayementApiVerolive = async (accessToken: string, motant: string) => {
        const timeless = getCurrentDateTime();
        const numTel = personnePhysique?.telephone || personneMorale?.telephone
        const reference = "SEV" + numTel + timeless
        try {
            const response = await axios.get('/api/paiement', {
                params: {
                    reference: reference,
                    montant: motant,
                    accessToken: accessToken
                },
            });
            console.log('Token data:', response.data);
            return response
        } catch (error) {
            console.error('Erreur lors de la création du token:', error);
        }
    }

    const payerLesFrais = async (value: boolean) => {
        setActive(value)
        setActiveFrais(value)
        if (!value) {
            const initMontant = dataEngagementCollecte.montant! || dataChoixMembre.montant!
            setMotantApayer(initMontant!.toString())
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
                        <div className='p-2 bg-green-50 text-green-900 flex rounded-lg flex-col space-y-2 '>
                            <span className='text-lg font-medium'>{dataChoixMembre?.type === "m" ? "Membre" : "Donateur"}</span>
                            <div className='text-lg font-medium'>
                                {dataChoixMembre?.type === "d" ?
                                    (
                                        <>
                                            <span className='text-lg italic'>{retournerChoixMembre(dataChoixMembre?.option!)} {dataChoixMembre?.option === 'd' ? `${dataChoixMembre?.montant} F CFA/mois` : null}</span><br />
                                            <span className='text-lg italic'></span><br />
                                        </>) : <>
                                        <div className='flex flex-col space-y-2'>
                                            <span className='text-lg italic'>Droit d'adhésion (10.000 F CFA)</span>
                                            <span className='text-lg italic'>Cotisation mensuelle (10.000 F CFA / mois)</span>
                                        </div>
                                    </>
                                }

                            </div>
                            {dataChoixModePaiement.optionPaiement && (
                                <div className='flex flex-col space-y-2'>
                                    <div className='flex flex-row space-x-2 text-lg font-medium'>
                                        {dataChoixModePaiement.optionPaiement === '1' ? 'Paiement immédiat: ' : `Délai de paiement: ${dataChoixModePaiement.date}`}
                                        <span className='text-lg font-medium'>{dataChoixModePaiement.
                                            optionPaiement === '1' && dataChoixModePaiement.modePaiement === 'v' ? ' Virement bancaire' : dataChoixModePaiement.optionPaiement === '1' && dataChoixModePaiement.modePaiement === 'm' ? ` Mobile money` : null}</span>
                                    </div>
                                </div>)}
                            {dataChoixModePaiement.optionPaiement === "1" && dataChoixModePaiement.modePaiement === 'm' ? (
                                <div className='flex flex-col space-y-2'>
                                    <div className='flex flex-row space-x-2'>
                                        <span>Payer les frais ?</span>
                                        <Switch
                                            checkedChildren={<CheckOutlined />}
                                            unCheckedChildren={<CloseOutlined />}
                                            defaultChecked={activeFrais}
                                            onChange={(checked) => payerLesFrais(checked)}
                                        />
                                    </div>
                                    <FraisPaiementCpt active={activeFrais} montant={dataChoixMembre.montant!} />
                                </div>
                            ) : null}
                        </div>

                    </>
                ) : (
                    <>
                        <div className='p-2 bg-green-50 text-green-900 flex rounded-lg flex-col justify-between space-y-2'>
                            <span className='text-xl font-medium'>Engagement</span>
                            <span className='text-xl font-medium'>{`${dataEngagementCollecte.montant} FCFA`}</span>
                            {dataEngagementCollecte.option && (
                                <div className='flex flex-row space-x-2 text-xl font-medium'>
                                    {dataEngagementCollecte.option === '1' ? 'Paiement immédiat: ' : `Délai de paiement: ${dataEngagementCollecte.date}`}
                                    <span className='text-xl font-medium'>{dataEngagementCollecte.option === '1' && dataEngagementCollecte.modePaiement === 'v' ? ' Virement bancaire' : dataEngagementCollecte.option === '1' && dataEngagementCollecte.modePaiement === 'm' ? ` Mobile money` : null}</span>
                                </div>
                            )}
                            {dataEngagementCollecte.option === "1" && dataEngagementCollecte.modePaiement === 'm' ? (
                                <div className='flex flex-col space-y-2'>
                                    <div className='flex flex-row space-x-2'>
                                        <span>Payer les frais ?</span>
                                        <Switch
                                            checkedChildren={<CheckOutlined />}
                                            unCheckedChildren={<CloseOutlined />}
                                            defaultChecked={activeFrais}
                                            onChange={(checked) => payerLesFrais(checked)}
                                        />
                                    </div>
                                    <FraisPaiementCpt active={activeFrais} montant={dataEngagementCollecte.montant!} />
                                </div>
                            ) : null}
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


