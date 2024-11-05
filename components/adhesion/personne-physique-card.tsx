import { IPersonnePhysique } from '@/helpers/interface'
import { personnePhysiqueSchema } from '@/helpers/schema'
import { Button, Input } from 'antd'
import { Formik } from 'formik'
import ChoixMembre from './membre-card'
import useDataStore from '@/store/dataStore'
import AdhesionCollecte from '../collecte/adhesion-collecte'

interface Props {
    prev: () => void
    next: () => void
    adhesionCollecte?: boolean
}

const PersonnePhysique = ({ prev, next, adhesionCollecte }: Props) => {
    const { dataPersonnePhysique, setCurrent, setDataPersonnePhysique } = useDataStore()

    const initialValues: IPersonnePhysique = {
        nom: dataPersonnePhysique?.nom || null,
        prenom: dataPersonnePhysique?.prenom || null,
        lieuDeResidence: dataPersonnePhysique?.lieuDeResidence || null,
        eglise: dataPersonnePhysique?.eglise || null,
        profession: dataPersonnePhysique?.profession || null,
        telephone: dataPersonnePhysique?.telephone || null,
    }

    const handleSubmit = async (value: IPersonnePhysique) => {
        setDataPersonnePhysique(value)
        setCurrent(1);
        next()
    }

    const retour = () => {
        setCurrent(1);
        prev()
    }

    return (
        <div className='space-y-2 overflow-y-auto'>
            <span className='text-lg text-center '> Veuillez renseigner les informations ci-dessous</span><br />
            <span className='text-sm text-center'>*Personne physique</span>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={personnePhysiqueSchema}
            >
                {({ values, errors, touched, handleSubmit, handleChange }) => (
                    <form onSubmit={handleSubmit} >
                        <div className='flex flex-col space-y-2 p-2'>
                            <div className=' flex flex-col md:flex-row justify-between md:space-x-2'>
                                <div className='w-full md:w-1/2'>
                                    <label className="block text-sm md:text-lg font-medium text-dark ">
                                        Nom*
                                    </label>
                                    <Input
                                        type="text"
                                        name='nom'
                                        placeholder="Nom"
                                        allowClear
                                        value={values.nom!}
                                        onChange={handleChange}
                                        style={{ height: 35 }}
                                        status={errors.nom && touched.nom ? 'error' : ''}
                                    />
                                    {errors.nom && touched.nom && <p className='text-red-500'>{errors.nom}</p>}
                                </div>
                                <div className=' w-full md:w-1/2'>
                                    <label className="block text-sm md:text-lg font-medium text-dark ">
                                        Prenom*
                                    </label>
                                    <Input
                                        type="text"
                                        name='prenom'
                                        placeholder="Prenom"
                                        allowClear
                                        value={values.prenom!}
                                        onChange={handleChange}
                                        style={{ height: 35 }}
                                        status={errors.prenom && touched.prenom ? 'error' : ''}
                                    />
                                    {errors.prenom && touched.prenom && <p className='text-red-500'>{errors.prenom}</p>}
                                </div>
                            </div >
                            <div className='flex flex-col md:flex-row justify-between md:space-x-2'>
                                <div className='w-full md:w-1/2'>
                                    <label className="block text-sm md:text-lg font-medium text-dark ">
                                        Lieu de résidence
                                    </label>
                                    <Input
                                        type="text"
                                        name='lieuDeResidence'
                                        placeholder="Lieu de résidence"
                                        allowClear
                                        value={values.lieuDeResidence!}
                                        onChange={handleChange}
                                        style={{ height: 35 }}
                                    />
                                </div>
                                <div className='w-full md:w-1/2'>
                                    <label className="block text-sm md:text-lg font-medium text-dark ">
                                        Eglise fréquentée actuellement
                                    </label>
                                    <Input
                                        type="text"
                                        name='eglise'
                                        placeholder="Eglise fréquentée"
                                        allowClear
                                        value={values.eglise!}
                                        onChange={handleChange}
                                        style={{ height: 35 }}
                                    />
                                </div>
                            </div >
                            <div className=' flex flex-col md:flex-row justify-between md:space-x-2'>
                                <div className='w-full md:w-1/2'>
                                    <label className="block text-sm md:text-lg font-medium text-dark ">
                                        Profession
                                    </label>
                                    <Input
                                        type="text"
                                        name='profession'
                                        placeholder="Profession"
                                        allowClear
                                        value={values.profession!}
                                        onChange={handleChange}
                                        style={{ height: 35 }}
                                    />
                                </div>
                                <div className='w-full md:w-1/2'>
                                    <label className="block text-sm md:text-lg font-medium text-dark ">
                                        N° de téléphone* (WhatSapp)
                                    </label>
                                    <Input
                                        type="text"
                                        name='telephone'
                                        onChange={handleChange}
                                        value={values.telephone!}
                                        placeholder="N° de téléphone"
                                        allowClear
                                        style={{ height: 35 }}
                                        status={errors.telephone && touched.telephone ? 'error' : ''}
                                    />
                                    {errors.telephone && touched.telephone && <p className='text-red-500'>{errors.telephone}</p>}
                                </div>
                            </div >
                            <div className='mb-3 flex flex-col md:flex-row justify-between md:space-x-2'>
                                {!adhesionCollecte ? (<><ChoixMembre /></>) : (<>
                                    <AdhesionCollecte />
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
                                <Button
                                    type='primary'
                                    onClick={() => handleSubmit()}
                                    style={{ marginTop: 20, height: 35, width: 150, fontSize: 15, backgroundColor: 'brown' }}
                                >
                                    Suivant
                                </Button>
                            </div>
                        </div>
                    </form>
                )}

            </Formik>
        </div>
    )
}

export default PersonnePhysique