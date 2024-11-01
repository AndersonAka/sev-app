import { IPersonnePhysique } from "@/helpers/interface"


const ResumeCardPersonnePhysique = ({ personnePhysique }: { personnePhysique: IPersonnePhysique }) => {
    return (
        <>
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
            </div>
        </>
    )
}
export default ResumeCardPersonnePhysique   