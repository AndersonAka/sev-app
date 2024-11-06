'use client'
import { retournerChoixMembre } from '@/helpers/fonctions'
import { IPersonneMorale, IPersonnePhysique } from '@/helpers/interface'
import useDataStore from '@/store/dataStore'
import { Button, message } from 'antd'
import ResumeCardPersonneMorale from './resume-card-personne-morale'
import ResumeCardPersonnePhysique from './resume-card-personne-physique'

interface Props {
    typePersonne: string
    personnePhysique?: IPersonnePhysique
    personneMorale?: IPersonneMorale
    next: () => void
    prev: () => void
    modeCollecte?: boolean
}

const ResumeCardContent = ({ typePersonne, personnePhysique, personneMorale, modeCollecte, next, prev }: Props) => {
    const { dataTypePersonne, dataChoixMembre, setCurrent, dataEngagementCollecte, } = useDataStore()
    const retour = () => {
        setCurrent(2)
        prev()
    }

    const suivant = () => {
        setCurrent(2)
        next()
    }

    return (
        <div className='flex flex-col space-y-3 '>
            <span className='text-xl font-medium '>Résumer des informations</span>
            <div className='flex flex-row justify-between space-x-2'>
                <div className='w-1/2'>
                    <span className="block text-lg ">
                        {typePersonne}
                    </span>
                </div>
            </div>
            <div className='flex flex-col space-y-2 rounded-lg border p-3'>

                {dataTypePersonne.typePersonne === "1" && <ResumeCardPersonnePhysique personnePhysique={personnePhysique!} />}
                {dataTypePersonne.typePersonne === "2" && <ResumeCardPersonneMorale personneMorale={personneMorale!} />}

                {!modeCollecte ? (
                    <>
                        <div className='p-2 bg-slate-50 flex rounded-lg flex-col justify-between space-y-2'>
                            <span className='text-xl font-medium'>{dataChoixMembre?.type === "m" ? "Membre" : "Donateur"}</span>
                            <span className='text-xl font-medium'>{dataChoixMembre?.type === "d" ?
                                (
                                    <>
                                        <span className='text-lg italic'>{retournerChoixMembre(dataChoixMembre?.option!)} {dataChoixMembre?.option === 'd' ? `${dataChoixMembre?.montant} F CFA/mois` : null}</span><br />
                                        <span className='text-lg italic'></span><br />
                                    </>) : <>
                                    <div className='flex flex-col space-y-2'>
                                        <span className='text-lg italic'>Droit d\'adhésion (10.000 F CFA)</span>
                                        <span className='text-lg italic'>Cotisation mensuelle (10.000 F CFA / mois)</span>
                                    </div>
                                </>
                            }</span>
                        </div>
                    </>
                ) : (
                    <>
                        <div className='p-2 bg-red-50 flex rounded-lg flex-col justify-between space-y-2'>
                            <span className='text-xl text-red-400 font-medium'>Engagement</span>
                            <span className='text-xl text-red-400 font-medium'>{`${dataEngagementCollecte.montant} FCFA`}</span>
                            <span className='text-xl text-red-400 font-medium'>{dataEngagementCollecte.option === '1' ? 'Paiement immédiat' : `Délai de paiement: ${dataEngagementCollecte.date}`}</span>
                        </div>
                    </>)}

            </div>

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
                    onClick={() => suivant()}
                    style={dataEngagementCollecte.option === "1" ? { marginTop: 20, height: 35, width: 150, fontSize: 15, backgroundColor: 'maroon' } : { marginTop: 20, height: 35, width: 150, fontSize: 15, backgroundColor: 'green' }}
                >
                    {dataEngagementCollecte.option === "1" ? "Suivant" : "Enregitrer"}
                </Button>
            </div>
        </div>
    )
}

export default ResumeCardContent


export const resumeCardPersonneMorale = () => {
    return (
        <>
        </>
    )
}

