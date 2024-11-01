"use client"

import { ITypePersonne } from '@/helpers/interface'
import { typePersonneSchema } from '@/helpers/schema'
import useDataStore from '@/store/dataStore'
import { Button, Select } from 'antd'
import { Form, Formik } from 'formik'

interface Props {
    next: () => void
}

const TypePersonne = ({ next }: Props) => {
    const { dataTypePersonne, setCurrent, setDataTypePersonne } = useDataStore()

    const initialValues: ITypePersonne = {
        typePersonne: dataTypePersonne?.typePersonne || null
    }

    const handleSubmit = async (value: ITypePersonne) => {
        setDataTypePersonne(value)
        setCurrent(0)
        next()
    }

    const options = [
        {
            value: '1',
            label: 'Personne physique',
        },
        {
            value: '2',
            label: 'Personne morale',
        },
    ];

    return (
        <>
            <div className='flex flex-col space-y-2'>
                <span className='text-lg text-center'> Veuillez choisir le type de personne</span>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={typePersonneSchema}
                >
                    {({ values, errors, touched, handleSubmit, setFieldValue }) => (
                        <Form className='flex flex-col'>
                            <div className='flex flex-col'>
                                <label className="block text-lg font-medium text-dark dark:text-white">
                                    Type de personne
                                </label>
                                <Select
                                    style={{ height: 50 }}
                                    placeholder="Choisir le type de personne"
                                    options={options}
                                    // Utiliser `values.typePersonne` pour définir la valeur du champ Select
                                    value={values.typePersonne}
                                    onChange={(value) => setFieldValue('typePersonne', value)}
                                    status={errors.typePersonne ? 'error' : ''}
                                />
                                {errors.typePersonne && touched.typePersonne && <div className="text-red-500">{errors.typePersonne}</div>}
                            </div>

                            <div className='flex justify-end'>
                                <Button
                                    type='primary'
                                    onClick={() => handleSubmit()}
                                    style={{ marginTop: 20, height: 35, width: 150, fontSize: 15, backgroundColor: 'brown' }}
                                >
                                    Suivant
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    )
}

export default TypePersonne