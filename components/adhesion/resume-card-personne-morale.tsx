import { IPersonneMorale } from '@/helpers/interface'
import React from 'react'

const ResumeCardPersonneMorale = ({ personneMorale }: { personneMorale: IPersonneMorale }) => {
    return (
        <>
            <div className='flex flex-row justify-between md:space-x-2'>
                <div className='flex flex-col md:w-1/2'>
                    <span className="md:text-lg">
                        Raison sociale
                    </span>
                    <span className='text-xl font-medium'>
                        {personneMorale?.raisonSociale}
                    </span>
                </div>
                <div className='flex flex-col md:w-1/2'>
                    <span className="md:text-lg">
                        Personne de référence
                    </span>
                    <span className='text-xl font-medium'>
                        {personneMorale?.personneDeReference}
                    </span>
                </div>
            </div >

            <div className='flex flex-row justify-between md:space-x-2'>
                <div className='flex flex-col md:w-1/2'>
                    <span className="md:text-lg">
                        Fonction
                    </span>
                    <span className='text-xl font-medium'>
                        {personneMorale?.fonction}
                    </span>
                </div>
                <div className='flex flex-col md:w-1/2'>
                    <span className="md:text-lg">
                        Adresse email
                    </span>
                    <span className='text-xl font-medium'> {personneMorale?.adresseEmail}
                    </span>
                </div>
            </div >
            <div className='flex flex-row justify-between md:space-x-2'>
                <div className='flex flex-col md:w-1/2'>
                    <span className="md:text-lg">
                        N° de téléphone (WhatSapp)
                    </span>
                    <span className='text-xl font-medium'>
                        {personneMorale?.telephone}
                    </span>
                </div>
            </div>
        </>
    )
}

export default ResumeCardPersonneMorale