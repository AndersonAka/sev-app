"use client";
import { useMemo, useState } from 'react';
import ImageTitre from '../communs/image-titre';
import { Button, message, Steps, theme } from 'antd';
import TypePersonne from '../adhesion/type-personne-card';
import PersonnePhysique from '../adhesion/personne-physique-card';
import MoyenPaiement from '../adhesion/moyen-paiement-card';
import PersonneWrapper from '../adhesion/personne-wrapper';
import ResumeCard from '../adhesion/resume-card';
const CollecteWrapper = () => {
    // const [current, setCurrent] = useState(0);
    const [current, setCurrent] = useState(0);

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

    const steps = [
        {
            title: 'Etape 1',
            content: <TypePersonne next={next} />,
        },
        {
            title: 'Etape 2',
            content: <PersonneWrapper next={next} prev={prev} adhesionCollecte={true} />,
        },
        {
            title: 'Etape 3',
            content: <ResumeCard next={next} prev={prev} />,
        },
        {
            title: 'Etape 4',
            content: <MoyenPaiement next={next} prev={prev} />,
        },
    ];

    const items = steps.map((item) => ({ key: item.title, title: item.title }));

    return (
        <div className="flex flex-col bg-gray-100 items-center min-h-screen p-6 sm:p-12 font-sans">
            <div className="flex flex-col bg-white shadow-xl justify-center rounded-lg max-w-3xl w-full overflow-auto">
                <span className="p-4 md:p-6 mb-5 rounded-t-lg text-lg md:text-2xl text-center text-white font-semibold bg-green-900">
                    {"L'EVANGILE AU SERVICE DE LA COMMUNAUTE"}
                </span>
                <div className="p-4 sm:p-8">
                    <div className="flex flex-col gap-6">
                        {/* Section d'adhésion/donations */}
                        <div className="rounded-lg border bg-white">
                            <div className="border-b border-gray-300 px-5 py-4 bg-gray-50 rounded-t-lg">
                                <h3 className="text-lg md:text-xl font-medium text-gray-800">
                                    COLLECTE DE FONDS POUR EQUIPEMENTS LOGISTIQUES
                                </h3>
                            </div>
                            <div className="flex flex-col gap-6 p-6">
                                <div className='hidden sm:block'>
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