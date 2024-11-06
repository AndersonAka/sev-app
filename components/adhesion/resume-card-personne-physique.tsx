import { IPersonnePhysique } from "@/helpers/interface"
import { Col, Row } from "antd"


const ResumeCardPersonnePhysique = ({ personnePhysique }: { personnePhysique: IPersonnePhysique }) => {
    const style: React.CSSProperties = { background: '#0092ff', padding: '8px 0', };
    return (
        <>
            <div className='flex flex-col space-y-2  p-3'>
                <div className='flex flex-col md:flex-row justify-between md:space-x-2'>
                    <div className='flex flex-col md:w-1/2'>
                        <span className="md:text-lg">
                            Nom
                        </span>
                        <span className='text-xl font-medium'>
                            {personnePhysique?.nom}
                        </span>
                    </div>
                    <div className='md:w-1/2'>
                        <span className="md:text-lg">
                            Prenom(s)
                        </span>
                        <span className='text-xl font-medium'>
                            {personnePhysique?.prenom}
                        </span>
                    </div>
                </div >

                <div className='flex flex-col md:flex-row justify-between md:space-x-2'>
                    <div className='flex flex-col md:w-1/2'>
                        <span className="md:text-lg">
                            Lieu de résidence
                        </span>
                        <span className='text-xl font-medium'>
                            {personnePhysique?.lieuDeResidence}
                        </span>
                    </div>
                    <div className='flex flex-col md:w-1/2'>
                        <span className="md:text-lg">
                            Eglise
                        </span>
                        <span className='text-xl font-medium'> {personnePhysique?.eglise}
                        </span>
                    </div>
                </div >
                <div className='flex flex-col md:flex-row justify-between md:space-x-2'>
                    <div className='flex flex-col md:w-1/2'>
                        <span className="md:text-lg">
                            Profession
                        </span>
                        <span className='text-xl font-medium'>
                            {personnePhysique?.profession}
                        </span>
                    </div>
                    <div className='flex flex-col md:w-1/2'>
                        <span className="md:text-lg">
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