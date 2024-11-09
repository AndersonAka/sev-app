"use client";
import { useEffect, useMemo, useState } from 'react';
import ImageTitre from '../communs/image-titre';
import { Button, message, Steps, theme } from 'antd';
import TypePersonne from '../adhesion/type-personne-card';
import PersonnePhysique from '../adhesion/personne-physique-card';
import MoyenPaiement from '../adhesion/moyen-paiement-card';
import PersonneWrapper from '../adhesion/personne-wrapper';
import ResumeCard from '../adhesion/resume-card';
import useDataStore from '@/store/dataStore';
import ApiPaiementCard from '../communs/api-paiement-card';
import ResultCpt from '../communs/result-cpt';

const CollecteWrapper = () => {
    // const [current, setCurrent] = useState(0);
    const { current, setCurrent, dataEngagementCollecte, setTypeOperation } = useDataStore();

    const next = () => {
        if (current === steps.length - 1) {
            message.success('Adhésion enregistrée');
            return
        }

        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };
    useEffect(() => {
        setTypeOperation("collecte")
    }, [])
    const steps = useMemo(() => [
        {
            title: 'Etape 1',
            content: <TypePersonne next={next} />,
        },
        {
            title: 'Etape 2',
            content: <PersonneWrapper next={next} prev={prev} modeCollecte={true} />,
        },
        {
            title: 'Etape 3',
            content: <ResumeCard next={next} prev={prev} modeCollecte={true} />,
        },
        // {
        //     title: 'Etape 4',
        //     content: dataEngagementCollecte.option === "1" ? <MoyenPaiement next={next} prev={prev} /> : <ResultCpt titre='Votre engagement a bien été enregistré!' />,
        // },

        {
            title: 'Etape 4',
            content: <ApiPaiementCard next={next} prev={prev} />,
        },
    ], [current, dataEngagementCollecte.option]);

    const items = steps.map((item) => ({ key: item.title, title: item.title }));

    return (
        <div className="flex flex-col bg-gray-100 items-center min-h-screen  sm:p-12 font-sans">
            <div className="flex flex-col bg-white shadow-xl justify-center max-w-3xl w-full overflow-auto">
                {/* <span className="hidden md:block p-2 md:p-4  rounded-t-lg text-sm md:text-xl text-center text-white font-semibold bg-green-900">
                    {"L'EVANGILE AU SERVICE DE LA COMMUNAUTE"}
                </span> */}
                <div className="md:p-2">
                    <div className="flex flex-col gap-6">
                        {/* Section d'adhésion/donations */}
                        <div className="bg-white">
                            <div className="border-b text-center px-5 py-2 rounded-t-lg">
                                <h3 className="text-sm md:text-lg font-medium text-gray-800">
                                    COLLECTE DE FONDS POUR EQUIPEMENTS LOGISTIQUES
                                </h3>
                            </div>
                            <div className="flex flex-col gap-6 p-6">
                                <div className='hidden'>
                                    <Steps type="navigation" current={current} items={items} />
                                </div>
                                <div>{steps[current].content}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CollecteWrapper