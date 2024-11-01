import { Input } from 'antd'
import React from 'react'

const AdhesionCollecte = () => {
    return (
        <div className='space-y-2 overflow-y-auto'>
            <span className='text-lg text-center '> Je m’engage à apporter une contribution pour la collecte de fonds initiée par l’ONG Semence
                pour la Vie à hauteur de : </span><br />
            <div className='flex flex-row justify-between space-x-2'>
                <div className='w-1/2'>
                    <label className="mb-3 block text-lg font-medium text-dark ">
                        Montant
                    </label>
                    <Input
                        type="text"
                        name='montant'
                        placeholder="Montant (FCFA)"
                        allowClear
                        // value={values.nom!}
                        // onChange={handleChange}
                        style={{ height: 35 }}
                    // status={errors.nom && touched.nom ? 'error' : ''}
                    />
                    {/* {errors.nom && touched.nom && <p className='text-red-500'>{errors.nom}</p>} */}
                </div>
                <div className='w-1/2'>
                    <label className="mb-3 block text-lg font-medium text-dark ">
                        Au plus tard le
                    </label>
                    <Input
                        type="text"
                        name='date'
                        placeholder="Date"
                        allowClear
                        // value={values.nom!}
                        // onChange={handleChange}
                        style={{ height: 35 }}
                    // status={errors.nom && touched.nom ? 'error' : ''}
                    />
                    {/* {errors.nom && touched.nom && <p className='text-red-500'>{errors.nom}</p>} */}
                </div>

            </div>
        </div >
    )
}

export default AdhesionCollecte