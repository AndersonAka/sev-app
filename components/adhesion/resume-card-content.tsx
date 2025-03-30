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
import { enregistrementAdhesion, enregistrementCollecte } from '@/action/operations'
import dayjs from 'dayjs'

interface Props {
    typePersonne: string
    personnePhysique?: IPersonnePhysique
    personneMorale?: IPersonneMorale
    next: () => void
    prev: () => void
    modeCollecte?: boolean
}

const ResumeCardContent = ({ typePersonne, personnePhysique, personneMorale, modeCollecte, next, prev }: Props) => {
    const { typeOperation, dataTypePersonne, dataChoixMembre, setCurrent, dataEngagementCollecte, setDataMotEnregistrement, dataChoixModePaiement, activeFrais, setActiveFrais, montantApayer, setMontantApayer: setMotantApayer, dataPersonneMorale, dataPersonnePhysique } = useDataStore()
    const [active, setActive] = useState(false)

    const retour = () => {
        setCurrent(2)
        prev()
    }
    const router = useRouter()

    const [loading, setLoading] = useState(false)

    const suivant = async () => {
        setLoading(true)

        // Génération du code de référence unique
        const timestamp = new Date().getTime();
        const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase();
        const referenceSev = `SEV-${timestamp}-${randomStr}`;

        if ((dataEngagementCollecte.option === "1" && dataEngagementCollecte.modePaiement === "m") || (dataChoixModePaiement.optionPaiement === "1" && dataChoixModePaiement.modePaiement === "m")) {
            // await enregistrementPaiementMobileMoney(referenceSev, referenceSev)
            setLoading(false)
            router.push('/remerciement');
            return
        }

        if ((dataEngagementCollecte.option === "2") || (dataChoixModePaiement.optionPaiement === "2")) {
            const typePaiement = "differe"
            const statusPaiement = "en attente"
            setDataMotEnregistrement({ titre: "Enregistrement effectué avec succès!", texte: "L'ONG SEMENCE POUR LA VIE vous remercie pour votre soutien financier!" })
            router.push('/remerciement')
            // try {
            //     let response = null
            //     const typePersonne = dataTypePersonne.typePersonne === "1" ? "personnePhysique" : "personneMorale"
            //     if (typeOperation === 'collecte') {
            //         response = await enregistrementCollecte({
            //             typeOperation,
            //             typePersonne,
            //             typePaiement,
            //             datePaiement: dataEngagementCollecte.date!,
            //             montantEngagement: dataEngagementCollecte.montant!,
            //             statusPaiement,
            //             typeMembre: dataEngagementCollecte.option,
            //             modePaiement: dataEngagementCollecte.modePaiement,
            //             referencePaiement: "",
            //             optionMembreDonateur: dataEngagementCollecte.option,
            //             PersonneMorale: dataPersonneMorale,
            //             personnePhysique: dataPersonnePhysique,
            //             referenceVerolive: "",
            //             montantPayer: ""
            //         })
            //     } else {
            //         response = await enregistrementAdhesion({
            //             typeOperation,
            //             typePersonne,
            //             typePaiement,
            //             datePaiement: dataChoixModePaiement.date!,
            //             montantEngagement: dataChoixMembre.montant!,
            //             statusPaiement,
            //             typeMembre: dataChoixMembre.type,
            //             modePaiement: dataChoixModePaiement.modePaiement,
            //             referencePaiement: "",
            //             optionMembreDonateur: dataChoixModePaiement.optionPaiement,
            //             PersonneMorale: dataPersonneMorale,
            //             personnePhysique: dataPersonnePhysique,
            //             referenceVerolive: "",
            //             montantPayer: ""
            //         })
            //     }
            //     if (response.data) {
            //         setDataMotEnregistrement({ titre: "Enregistrement effectué avec succès!", texte: "L'ONG SEMENCE POUR LA VIE vous remercie pour votre soutien financier!" })
            //         router.push('/remerciement')
            //     }
            // } catch (error) {
            //     alert('Une erreur s\'est produite')
            //     setLoading(false)
            //     console.log(error)
            // }
            return
        }
        setCurrent(2)
        setLoading(false)
        next()
    }
    const getTokenApiVerolive = async () => {
        try { //
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getVeroliveToken`, {
                params: {
                    reference: identifiantClientApi.reference,
                    cle: identifiantClientApi.cle,
                },
            });
            if (response.data.status === 1) {
                // setAccessToken(response.data.access_token)
                const timeless = getCurrentDateTime();
                // const numTel = personnePhysique?.telephone || personneMorale?.telephone
                let referenceSev = "S" + timeless
                const reponseApiPaiement = await getPayementApiVerolive(referenceSev, response.data.access_token, montantApayer!)
                if (reponseApiPaiement && reponseApiPaiement.data.status === 3) {
                    referenceSev = referenceSev + reponseApiPaiement.data.reference
                    await enregistrementPaiementMobileMoney(reponseApiPaiement.data.reference, referenceSev)
                    router.push(reponseApiPaiement.data.url)
                    return
                }
            }
        } catch (error) {
            // console.error('Erreur lors de la récupération du token:', error);
        }
    }

    const enregistrementPaiementMobileMoney = async (referenceVerolive: string, referenceSev: string) => {
        const date = dayjs(new Date()).format('YYYY-MM-DD')
        const statusPaiement = "en attente"
        const typePaiement = "immediat"
        const montant = dataEngagementCollecte.montant
        const typePersonne = dataTypePersonne.typePersonne === "1" ? "personnePhysique" : "personneMorale"
        let response = null
        if (typeOperation === 'collecte') {
            response = await enregistrementCollecte({
                typeOperation,
                typePersonne,
                typePaiement,
                datePaiement: date,
                montantEngagement: montant,
                statusPaiement,
                typeMembre: dataEngagementCollecte.option,
                modePaiement: dataEngagementCollecte.modePaiement!,
                referencePaiement: referenceSev,
                optionMembreDonateur: dataEngagementCollecte.option!,
                PersonneMorale: dataPersonneMorale,
                personnePhysique: dataPersonnePhysique,
                referenceVerolive,
                montantPayer: montant!
            })
        } else {
            response = await enregistrementAdhesion({
                typeOperation,
                typePersonne,
                typePaiement,
                datePaiement: date,
                montantEngagement: dataChoixMembre.montant!,
                statusPaiement,
                typeMembre: dataChoixMembre.type,
                modePaiement: dataChoixModePaiement.modePaiement!,
                referencePaiement: referenceSev,
                optionMembreDonateur: dataChoixModePaiement.optionPaiement!,
                PersonneMorale: dataPersonneMorale,
                personnePhysique: dataPersonnePhysique,
                referenceVerolive,
                montantPayer: dataChoixMembre.montant!
            })
        }
        console.log(response)
        if (response?.data) {
            router.push('/remerciement');
        }
    }

    const getPayementApiVerolive = async (referenceSev: string, accessToken: string, motant: string) => {
        try {
            const response = await axios.get('/api/paiement', {
                params: {
                    reference: referenceSev,
                    montant: motant,
                    accessToken: accessToken
                },
            });
            return response
        } catch (error) {
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
                            {/* {dataEngagementCollecte.option === "1" && dataEngagementCollecte.modePaiement === 'm' ? (
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
                            ) : null} */}
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


