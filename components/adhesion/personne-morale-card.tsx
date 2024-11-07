
'use client'
import { IAdhesionCollecte, IChoixMembre, IPersonneMorale } from '@/helpers/interface'
import { personneMoraleSchema } from '@/helpers/schema'
import useDataStore from '@/store/dataStore'
import { Button, Input } from 'antd'
import { Formik } from 'formik'
import { useState } from 'react'
import { PhoneInput } from 'react-international-phone'
import AdhesionCollecte from '../collecte/adhesion-collecte'
import ChoixMembreMorale from './membre-morale-card'
interface Props {
    prev: () => void
    next: () => void
    modeCollecte?: boolean
}
const PersonneMorale = ({ prev, next, modeCollecte }: Props) => {
    const { setCurrent, dataPersonneMorale, dataEngagementCollecte, dataChoixMembre, setDataChoixMembre, setDataEngagementCollecte, setDataPersonneMorale, dataChoixModePaiement } = useDataStore()
    const [isDisabled, setIsDisabled] = useState(!dataEngagementCollecte.option && !dataEngagementCollecte.date && !dataEngagementCollecte.modePaiement)
    const [isDisabledMembre, setIsDisabledMembre] = useState(!dataChoixMembre.type || !dataChoixMembre.passe || !dataChoixModePaiement.optionPaiement)
    const [errorChoixModePaiement, setErrorChoixModePaiement] = useState('')

    const initialValues: IPersonneMorale = {
        raisonSociale: dataPersonneMorale.raisonSociale || null,
        personneDeReference: dataPersonneMorale.personneDeReference || null,
        fonction: dataPersonneMorale.fonction || null,
        adresseEmail: dataPersonneMorale.adresseEmail || null,
        telephone: dataPersonneMorale.telephone || ''
    }

    const handleSubmit = async (value: IPersonneMorale) => {
        setErrorChoixModePaiement('')
        //on n'est pas en mode collecte
        if (!modeCollecte) {
            if (!dataChoixModePaiement.optionPaiement || dataChoixModePaiement.modePaiement === '' || (dataChoixModePaiement.optionPaiement === '1' && !dataChoixModePaiement.modePaiement) || (dataChoixModePaiement.optionPaiement === '2' && !dataChoixModePaiement.date)) {
                setErrorChoixModePaiement('Choisir une option')
                return
            }
        }
        else {
            if (!dataEngagementCollecte.option || dataEngagementCollecte.option === '' || (dataEngagementCollecte.option === '1' && !dataEngagementCollecte.modePaiement) || (dataEngagementCollecte.option === '2' && !dataEngagementCollecte.date)) {
                setErrorChoixModePaiement('Choisir une option')
                return
            }
        }
        setDataPersonneMorale(value)
        setCurrent(1)
        next()
    }

    const retour = () => {  
        setCurrent(1);
        prev()
    }

    const handleEngagement = (collecteEngagement: IAdhesionCollecte) => {
        setDataEngagementCollecte(collecteEngagement)
        if (collecteEngagement.option && collecteEngagement.date) {
            setIsDisabled(false)
        } else {
            setIsDisabled(true)
        }
    }

    const handleMembre = (choixMembre: IChoixMembre) => {
        setDataChoixMembre(choixMembre)
        if (choixMembre.type && choixMembre.passe) {
            setIsDisabledMembre(false)
        } else {
            setIsDisabledMembre(true)
        }
    }

    return (
        <div className='space-y-2 overflow-y-auto'>
            <span className='text-lg text-center'> Veuillez renseigner les informations ci-dessous</span><br />
            <span className='text-sm text-center'>*Personne morale</span>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={personneMoraleSchema}
            >
                {({ values, errors, touched, handleSubmit, handleChange, setFieldValue }) => (
                    <form onSubmit={handleSubmit}>
                        <div className='flex flex-col space-y-2 p-2'>
                            <div className=' flex flex-col md:flex-row justify-between md:space-x-2'>
                                <div className='w-full md:w-1/2'>
                                    <label className="mb-3 block text-lg font-medium text-dark ">
                                        Raison sociale*
                                    </label>
                                    <Input
                                        type="text"
                                        name='raisonSociale'
                                        placeholder="Raison sociale"
                                        allowClear
                                        value={values.raisonSociale!}
                                        onChange={handleChange}
                                        style={{ height: 35 }}
                                        status={errors.raisonSociale && touched.raisonSociale ? 'error' : ''}
                                    />
                                    {errors.raisonSociale && touched.raisonSociale && (
                                        <div className="text-red-500">{errors.raisonSociale}</div>
                                    )}
                                </div>
                                <div className='w-full md:w-1/2'>
                                    <label className="mb-3 block text-lg font-medium text-dark ">
                                        Personne de référence*
                                    </label>
                                    <Input
                                        type="text"
                                        name='personneDeReference'
                                        placeholder="Personne de référence"
                                        allowClear
                                        onChange={handleChange}
                                        value={values.personneDeReference!}
                                        style={{ height: 35 }}
                                        status={errors.personneDeReference && touched.personneDeReference ? 'error' : ''}
                                    />
                                    {errors.personneDeReference && touched.personneDeReference && (
                                        <div className="text-red-500">{errors.personneDeReference}</div>
                                    )}
                                </div>
                            </div >

                            <div className='flex flex-col md:flex-row justify-between md:space-x-2'>
                                <div className='w-full md:w-1/2'>
                                    <label className="mb-3 block text-lg font-medium text-dark ">
                                        Fonction*
                                    </label>
                                    <Input
                                        type="text"
                                        name='fonction'
                                        placeholder="Fonction"
                                        allowClear
                                        onChange={handleChange}
                                        value={values.fonction!}
                                        style={{ height: 35 }}
                                        status={errors.fonction && touched.fonction ? 'error' : ''}
                                    />
                                    {errors.fonction && touched.fonction && (
                                        <div className="text-red-500">{errors.fonction}</div>
                                    )}
                                </div>
                                <div className='w-full md:w-1/2'>
                                    <label className="mb-3 block text-lg font-medium text-dark ">
                                        Adresse email
                                    </label>
                                    <Input
                                        type="text"
                                        name='adresseEmail'
                                        placeholder="Adresse email"
                                        allowClear
                                        onChange={handleChange}
                                        value={values.adresseEmail!}
                                        style={{ height: 35 }}
                                        status={errors.adresseEmail && touched.adresseEmail ? 'error' : ''}
                                    />
                                    {errors.adresseEmail && touched.adresseEmail && (
                                        <div className="text-red-500">{errors.adresseEmail}</div>
                                    )}
                                </div>
                            </div >

                            <div className='flex flex-row justify-between space-x-2'>
                                <div className='w-full md:w-1/2'>
                                    <label className="text-sm md:text-lg font-medium text-dark ">
                                        N° de téléphone* (WhatSapp)
                                    </label>
                                    <PhoneInput
                                        preferredCountries={['ci']}
                                        hideDropdown
                                        defaultCountry="ci"
                                        placeholder='+225 00 00 00 00'
                                        style={errors.telephone && touched.telephone ? { border: '1px solid red', borderRadius: 5 } : {}}
                                        disableDialCodePrefill
                                        value={values.telephone!}
                                        onChange={(values) => setFieldValue('telephone', values)}
                                        inputClassName="w-full border rounded-lg" // Input plein avec style
                                    />
                                    {errors.telephone && touched.telephone && <p className='text-red-500'>{errors.telephone}</p>}
                                </div>
                            </div>
                            <div className='flex flex-col justify-between space-x-2'>
                                {!modeCollecte ? (<><ChoixMembreMorale handleMembre={handleMembre} choixMembre={dataChoixMembre} errorChoixModePaiement={errorChoixModePaiement} /></>) : (<>
                                    <AdhesionCollecte handleEngagement={handleEngagement} collecteEngagement={dataEngagementCollecte} errorChoixModePaiement={errorChoixModePaiement} />
                                </>)}
                            </div >

                            <div className=' flex justify-end space-x-2'>
                                <Button
                                    type='default'
                                    onClick={() => retour()}
                                    style={{ marginTop: 20, height: 35, width: 150, fontSize: 15 }}
                                >
                                    Retour
                                </Button>
                                {modeCollecte ?
                                    (
                                        <>
                                            <Button
                                                type='primary'
                                                onClick={() => handleSubmit()}
                                                style={dataEngagementCollecte.option === "1" ? { marginTop: 20, height: 35, width: 150, fontSize: 15, backgroundColor: 'maroon' } : { marginTop: 20, height: 35, width: 150, fontSize: 15, backgroundColor: 'green' }}
                                                disabled={modeCollecte ? isDisabled : isDisabledMembre}
                                            >
                                                {dataEngagementCollecte.option === "1" ? "Suivant" : "Enregitrer"}
                                            </Button>
                                        </>
                                    ) :
                                    (
                                        <>
                                            <Button
                                                type='primary'
                                                onClick={() => handleSubmit()}
                                                style={{ marginTop: 20, height: 35, width: 150, fontSize: 15, backgroundColor: 'maroon' }}
                                                disabled={modeCollecte ? isDisabled : isDisabledMembre}
                                            >
                                                Suivant
                                            </Button>
                                        </>)
                                }
                            </div>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    )
}

export default PersonneMorale