"use client"

import React from 'react'
import ImageTitre from '../communs/image-titre'
import { useRouter } from 'next/navigation'

const HomeWrapper = () => {
    const router = useRouter()

    return (
        <div className="grid grid-rows-[20px_1fr_20px] bg-gray-1 items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]"
        >
            <main className="flex flex-col gap-8 row-start-2 items-center " >
                <div className='flex flex-row items-center'>
                </div>
                <div className="flex flex-col bg-white shadow-xl   justify-center rounded-[10px] ">
                    <span className='p-2 mb-5 rounded-t-sm md:text-3xl text-center text-white font-semibold bg-green-600 '>{"L'EVANGILE AU SERVICE DE LA COMMUNAUTE"}</span>
                    <ImageTitre />
                    <div className='p-5'>
                        <span className='p-2 md:text-3xl ont-semibold text-center mb-5'>
                            Bienvenu-e, faites une action pour l'avancement de votre communauté
                        </span>
                        <div className='pt-4 flex flex-row justify-center space-x-6'>
                            <button className="flex w-full text-xl justify-center bg-white shadow-2 rounded-[7px] p-[13px] font-medium  hover:bg-green-600 hover:text-white" onClick={()=>router.push('/adhesion')}>
                                ADHESION / DONS
                            </button>
                            <button className="flex w-full text-xl justify-center bg-white shadow-2 rounded-[7px] p-[13px] font-medium  hover:bg-green-600 hover:text-white" onClick={()=>router.push('/collecte')}>
                                COLLECTE DE FONDS
                            </button>
                        </div>
                    </div>
                </div>
            </main >
            {/* <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">

            </footer> */}
        </div>
    )
}

export default HomeWrapper