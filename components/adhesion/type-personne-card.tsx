import React from 'react'
import SelectGroupTwo from '../FormElements/SelectGroup/SelectGroupTwo'
import { Button, Select } from 'antd'
import { ITypePersonne } from '@/helpers/interface'



const TypePersonne = () => {

    const initialValues: ITypePersonne = {
        typePersonne: ''
    }

    const next = (value: number) => {

    }

    return (
        <>
            <div className='flex flex-col space-y-2'>
                <span className='text-lg text-center'> Veuillez choisir le type de personne</span>
                <label className="block text-lg font-medium text-dark dark:text-white">
                    Type de personne
                </label>
                <Select
                    style={{ height: 50 }}
                    placeholder="Choisir le type de personne"
                    options={[
                        {
                            value: '1',
                            label: 'Personne physique',
                        },
                        {
                            value: '2',
                            label: 'Personne morale',
                        },
                    ]}
                />
                <div className='flex justify-end'>
                    <Button
                        variant='solid'
                        type='primary'
                        onClick={() => alert('Suivant')}
                        style={{ marginTop: 20 }}
                    >
                        Suivant
                    </Button>
                </div>
            </div>
            {/* <button className="flex w-full justify-center md:text-xl rounded-[7px] bg-primary p-[13px] font-medium text-white hover:bg-opacity-90">
                Suivant
            </button> */}
        </>
    )
}

export default TypePersonne