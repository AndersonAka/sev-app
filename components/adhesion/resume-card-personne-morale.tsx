import { IPersonneMorale } from '@/helpers/interface'
import React from 'react'

const ResumeCardPersonneMorale = ({ personneMorale }: { personneMorale: IPersonneMorale }) => {
    return (
        <div className='flex flex-col space-y-2 rounded-lg border p-3'>
            <div className='flex flex-row justify-between space-x-2'>
                <div className='w-1/2'>
                    <span className="block text-lg">
                        Raison sociale
                    </span>
                    <span className='text-xl font-medium'>
                        {personneMorale?.raisonSociale}
                    </span>
                </div>
                <div className='w-1/2'>
                    <span className="block text-lg">
                        Personne de référence
                    </span>
                    <span className='text-xl font-medium'>
                        {personneMorale?.personneDeReference}
                    </span>
                </div>
            </div >

            <div className='flex flex-row justify-between space-x-2'>
                <div className='w-1/2'>
                    <span className="block text-lg">
                        Fonction
                    </span>
                    <span className='text-xl font-medium'>
                        {personneMorale?.fonction}
                    </span>
                </div>
                <div className='w-1/2'>
                    <span className="block text-lg">
                        Adresse email
                    </span>
                    <span className='text-xl font-medium'> {personneMorale?.adresseEmail}
                    </span>
                </div>
            </div >
            <div className='flex flex-row justify-between space-x-2'>
                <div className='w-1/2'>
                    <span className="block text-lg">
                        N° de téléphone (WhatSapp)
                    </span>
                    <span className='text-xl font-medium'>
                        {personneMorale?.telephone}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default ResumeCardPersonneMorale