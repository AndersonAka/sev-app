import { IPersonneMorale } from '@/helpers/interface'
import { personneMoraleSchema } from '@/helpers/schema'
import useDataStore from '@/store/dataStore'
import { Button, Input } from 'antd'
import { Formik } from 'formik'
import ChoixMembreMorale from './membre-morale-card'
interface Props {
    prev: () => void
    next: () => void
}
const PersonneMorale = ({ prev, next }: Props) => {
    const { setCurrent, setDataPersonneMorale } = useDataStore()

    const initialValues: IPersonneMorale = {
        raisonSociale: null,
        personneDeReference: null,
        fonction: null,
        adresseEmail: null,
        telephone: null
    }

    const handleSubmit = async (value: IPersonneMorale) => {
        setDataPersonneMorale(value)
        setCurrent(1)
        next()
    }

    const retour = () => {
        setCurrent(1);
        prev()
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
                {({ values, errors, touched, handleSubmit, handleChange }) => (
                    <form onSubmit={handleSubmit}>
                        <div className='flex flex-col space-y-2 rounded-lg border p-3'>
                            <div className='flex flex-row justify-between space-x-2'>
                                <div className='w-1/2'>
                                    <label className="mb-3 block text-lg font-medium text-dark ">
                                        Raison sociale*
                                    </label>
                                    <Input
                                        type="text"
                                        name='raisonSociale'
                                        placeholder="Raison sociale"
                                        allowClear
                                        onChange={handleChange}
                                        style={{ height: 35 }}
                                        status={errors.raisonSociale && touched.raisonSociale ? 'error' : ''}
                                    />
                                    {errors.raisonSociale && touched.raisonSociale && (
                                        <div className="text-red-500">{errors.raisonSociale}</div>
                                    )}
                                </div>
                                <div className='w-1/2'>
                                    <label className="mb-3 block text-lg font-medium text-dark ">
                                        Personne de référence*
                                    </label>
                                    <Input
                                        type="text"
                                        name='personneDeReference'
                                        placeholder="Personne de référence"
                                        allowClear
                                        onChange={handleChange}
                                        style={{ height: 35 }}
                                        status={errors.personneDeReference && touched.personneDeReference ? 'error' : ''}
                                    />
                                    {errors.personneDeReference && touched.personneDeReference && (
                                        <div className="text-red-500">{errors.personneDeReference}</div>
                                    )}
                                </div>
                            </div >

                            <div className='flex flex-row justify-between space-x-2'>
                                <div className='w-1/2'>
                                    <label className="mb-3 block text-lg font-medium text-dark ">
                                        Fonction*
                                    </label>
                                    <Input
                                        type="text"
                                        name='fonction'
                                        placeholder="Fonction"
                                        allowClear
                                        onChange={handleChange}
                                        style={{ height: 35 }}
                                        status={errors.fonction && touched.fonction ? 'error' : ''}
                                    />
                                    {errors.fonction && touched.fonction && (
                                        <div className="text-red-500">{errors.fonction}</div>
                                    )}
                                </div>
                                <div className='w-1/2'>
                                    <label className="mb-3 block text-lg font-medium text-dark ">
                                        Adresse email
                                    </label>
                                    <Input
                                        type="text"
                                        name='adresseEmail'
                                        placeholder="Adresse email"
                                        allowClear
                                        onChange={handleChange}
                                        style={{ height: 35 }}
                                    />
                                </div>
                            </div >
                            <div className='flex flex-row justify-between space-x-2'>
                                <div className='w-1/2'>
                                    <label className="mb-3 block text-lg font-medium text-dark ">
                                        N° de téléphone* (WhatSapp)
                                    </label>
                                    <Input
                                        type="text"
                                        placeholder="N° de téléphone"
                                        allowClear
                                        onChange={handleChange}
                                        style={{ height: 35 }}
                                        status={errors.telephone && touched.telephone ? 'error' : ''}
                                    />
                                    {errors.telephone && touched.telephone && (
                                        <div className="text-red-500">{errors.telephone}</div>
                                    )}
                                </div>
                            </div >
                            <div className='flex flex-row justify-between space-x-2'>
                                <ChoixMembreMorale />
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

export default PersonneMorale