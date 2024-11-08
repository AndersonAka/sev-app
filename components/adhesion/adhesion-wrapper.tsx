"use client";
import useDataStore from '@/store/dataStore';
import { message, Steps } from 'antd';
import MoyenPaiement from './moyen-paiement-card';
import PersonneWrapper from './personne-wrapper';
import ResumeCard from './resume-card';
import TypePersonne from './type-personne-card';
import ApiPaiementCard from '../communs/api-paiement-card';
import { useEffect } from 'react';
const AdhesionWrapper = () => {
    // const [current, setCurrent] = useState(0);
    const { current, setCurrent, setTypeOperation } = useDataStore()

    const next = async () => {
        if (current === steps.length - 1) {
            message.success('Adhésion enregistrée');
            return
        }
        setCurrent(current + 1);
    };
    const prev = async () => {
        setCurrent(current - 1);
    };
    const steps = [
        {
            title: 'Etape 1',
            content: <TypePersonne next={next} />,
        },
        {
            title: 'Etape 2',
            content: <PersonneWrapper next={next} prev={prev} />,
        },
        {
            title: 'Etape 3',
            content: <ResumeCard next={next} prev={prev} />,
        },
        // {
        //     title: 'Etape 4',
        //     content: <MoyenPaiement next={next} prev={prev} />,
        // },
        {
            title: 'Etape 4',
            content: <ApiPaiementCard next={next} prev={prev} />,
        },
    ];


    const items = steps.map((item) => ({ key: item.title, title: item.title }));

    useEffect(() => {
        setTypeOperation("adhesion")
    }, [])
    return (
        <div className="flex flex-col bg-gray-100 items-center min-h-screen  sm:p-12 font-sans">
            <div className="flex flex-col bg-white shadow-xl justify-center max-w-3xl w-full overflow-auto">
                {/* <span className="p-4 md:p-6 mb-5 rounded-t-lg text-lg md:text-2xl text-center text-white font-semibold bg-green-900">
                    {"L'EVANGILE AU SERVICE DE LA COMMUNAUTE"}
                </span> */}

                <div className="p-2 sm:p-4">
                    <div className="flex flex-col gap-6">
                        {/* Section d'adhésion/donations */}
                        <div className="bg-white">
                            <div className="border-b text-center px-5 py-2 rounded-t-lg">
                                <h3 className="text-sm md:text-lg font-medium text-gray-800">
                                    ADHESION / DONATIONS
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
        </div >

    )
}

export default AdhesionWrapper