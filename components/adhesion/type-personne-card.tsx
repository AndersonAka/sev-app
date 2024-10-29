import React from 'react'
import SelectGroupTwo from '../FormElements/SelectGroup/SelectGroupTwo'

const TypePersonne = () => {
    return (
        <>
            <div className='flex flex-col'>
                <span className='text-lg text-center'> Veuillez choisir le type de personne</span>
                <label className="mb-3 block text-lg font-medium text-dark dark:text-white">
                    Type de personne
                </label>
                <SelectGroupTwo />
            </div>
            {/* <button className="flex w-full justify-center md:text-xl rounded-[7px] bg-primary p-[13px] font-medium text-white hover:bg-opacity-90">
                Suivant
            </button> */}
        </>
    )
}

export default TypePersonne