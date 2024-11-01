import React from 'react'
import SelectGroupTwo from '../FormElements/SelectGroup/SelectGroupTwo'
import ChoixMembre from './membre-card'

const PersonneMorale = () => {
    return (
        <>
            <span className='text-lg text-center'> Veuillez renseigner les informations ci-dessous</span><br />
            <span className='text-sm text-center'>*Personne morale</span>
            <div className='flex flex-col space-y-2 rounded-lg border p-3'>
                <div className='flex flex-row justify-between space-x-2'>
                    <div className='w-1/2'>
                        <label className="mb-3 block text-lg font-medium text-dark ">
                            Raison sociale
                        </label>
                        <input
                            type="text"
                            className="w-full rounded-lg border border-gray-200 bg-white p-3 text-sm"
                            placeholder="Nom"
                        />
                    </div>
                    <div className='w-1/2'>
                        <label className="mb-3 block text-lg font-medium text-dark ">
                            Personne de référence
                        </label>
                        <input
                            type="text"
                            className="w-full rounded-lg border border-gray-200 bg-white p-3 text-sm"
                            placeholder="Prenom"
                        />
                    </div>
                </div >

                <div className='flex flex-row justify-between space-x-2'>
                    <div className='w-1/2'>
                        <label className="mb-3 block text-lg font-medium text-dark ">
                            Fonction
                        </label>
                        <input
                            type="text"
                            className="w-full rounded-lg border border-gray-200 bg-white p-3 text-sm"
                            placeholder="Lieu de résidence"
                        />
                    </div>
                    <div className='w-1/2'>
                        <label className="mb-3 block text-lg font-medium text-dark ">
                            Adresse email
                        </label>
                        <input
                            type="text"
                            className="w-full rounded-lg border border-gray-200 bg-white p-3 text-sm"
                            placeholder="Eglise fréquentée"
                        />
                    </div>
                </div >
                <div className='flex flex-row justify-between space-x-2'>
                    <div className='w-1/2'>
                        <label className="mb-3 block text-lg font-medium text-dark ">
                            N° de téléphone (WhatSapp)
                        </label>
                        <input
                            type="text"
                            className="w-full rounded-lg border border-gray-200 bg-white p-3 text-sm"
                            placeholder="N° de téléphone"
                        />
                    </div>
                </div >
                <div className='flex flex-row justify-between space-x-2'>
                    <ChoixMembre />
                </div >
            </div>
        </>
    )
}

export default PersonneMorale