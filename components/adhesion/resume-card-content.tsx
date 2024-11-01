'use client'
import { retournerChoixMembre } from '@/helpers/fonctions'
import { IPersonnePhysique } from '@/helpers/interface'
import useDataStore from '@/store/dataStore'
import { Button, Divider } from 'antd'
import React from 'react'

interface Props {
    typePersonne: string
    personnePhysique: IPersonnePhysique
    next: () => void
    prev: () => void
}

const ResumeCardContent = ({ typePersonne, personnePhysique, next, prev }: Props) => {
    const { dataChoixMembre, setCurrent } = useDataStore()

    const retour = () => {
        setCurrent(2)
        prev()
    }


    const suivant = () => {
        setCurrent(2)
        next()
    }

    return (
        <div className='flex flex-col space-y-3 rounded-lg border p-3'>
            <span className='text-xl font-medium '>Résumer des informations</span>
            <div className='flex flex-row justify-between space-x-2'>
                <div className='w-1/2'>
                    <span className="block text-lg ">
                        Type de personne : {typePersonne}
                    </span>
                </div>
            </div>
            <div className='flex flex-col space-y-2 rounded-lg border p-3'>
                <div className='flex flex-row justify-between space-x-2'>
                    <div className='w-1/2'>
                        <span className="block text-lg">
                            Nom
                        </span>
                        <span className='text-xl font-medium'>
                            {personnePhysique?.nom}
                        </span>
                    </div>
                    <div className='w-1/2'>
                        <span className="block text-lg">
                            Prenom(s)
                        </span>
                        <span className='text-xl font-medium'>
                            {personnePhysique?.prenom}
                        </span>
                    </div>
                </div >

                <div className='flex flex-row justify-between space-x-2'>
                    <div className='w-1/2'>
                        <span className="block text-lg">
                            Lieu de résidence
                        </span>
                        <span className='text-xl font-medium'>
                            {personnePhysique?.lieuDeResidence}
                        </span>
                    </div>
                    <div className='w-1/2'>
                        <span className="block text-lg">
                            Eglise fréquentée actuellement
                        </span>
                        <span className='text-xl font-medium'> {personnePhysique?.eglise}
                        </span>
                    </div>
                </div >
                <div className='flex flex-row justify-between space-x-2'>
                    <div className='w-1/2'>
                        <span className="block text-lg">
                            Profession
                        </span>
                        <span className='text-xl font-medium'>
                            {personnePhysique?.profession}
                        </span>
                    </div>
                    <div className='w-1/2'>
                        <span className="block text-lg">
                            N° de téléphone (WhatSapp)
                        </span>
                        <span className='text-xl font-medium'>
                            {personnePhysique?.telephone}
                        </span>
                    </div>
                </div>
                <div className='p-2 bg-slate-50 flex rounded-lg flex-col justify-between space-y-2'>
                    <span>Vous souhaitez devenir :</span>
                    <span className='text-xl font-medium'>{dataChoixMembre?.type === "m" ? "Membre" : "Donateur"}</span>
                    <span className='text-xl font-medium'>{dataChoixMembre?.type === "d" ?
                        (
                            <>
                                <span className='text-lg italic'>{retournerChoixMembre(dataChoixMembre?.option!)}</span>
                            </>) : <>
                            <div className='flex flex-col space-y-2'>
                                <span className='text-lg italic'>Droit d\'adhésion (10.000 F CFA)</span>
                                <span className='text-lg italic'>Cotisation mensuelle (10.000 F CFA / mois)</span>
                            </div>
                        </>
                    }</span>
                </div>
            </div>

            <div className=' flex justify-end space-x-2'>
                <Button
                    type='default'
                    onClick={() => retour()}
                    style={{ marginTop: 20, height: 35, width: 150, fontSize: 15 }}
                >
                    Retour
                </Button>
                <Button
                    type='primary'
                    onClick={() => suivant()}
                    style={{ marginTop: 20, height: 35, width: 150, fontSize: 15, backgroundColor: 'brown' }}
                >
                    Suivant
                </Button>
            </div>
        </div>
    )
}

export default ResumeCardContent