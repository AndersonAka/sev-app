"use client";
import { useMemo, useState } from 'react';
import ImageTitre from '../communs/image-titre';
import TypePersonne from './type-personne-card';
import { Button, message, Steps, theme } from 'antd';
import PersonnePhysique from './personne-physique-card';
import MoyenDePaiment from './moyen-paiement-card';
const AdhesionWrapper = () => {
    const steps = useMemo(() => [
        {
            title: 'Etape 1',
            content: <TypePersonne />,
        },
        {
            title: 'Etape 2',
            content: <PersonnePhysique />,
        },
        {
            title: 'Etape 3',
            content: <MoyenDePaiment />,
        },
    ], []);

    const { token } = theme.useToken();
    const [current, setCurrent] = useState(0);

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const items = steps.map((item) => ({ key: item.title, title: item.title }));

    return (
        <div className="flex flex-col bg-gray-1 items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]"
        >
            <div className="w-1/2 flex flex-col bg-white shadow-xl justify-center rounded-[10px] overflow-auto">
                <span className='p-2 mb-5 rounded-t-sm md:text-2xl text-center text-white font-semibold bg-green-600 '>
                    {"L'EVANGILE AU SERVICE DE LA COMMUNAUTE"}
                </span>
                <ImageTitre />

                <div className="grid grid-cols-1 p-5">
                    <div className="flex flex-col gap-9">
                        {/* <!-- Input Fields --> */}
                        <div className="rounded-[10px] border  bg-white  border-green-600  shadow-card">
                            <div className="border-b border-stroke px-6.5 p-4 dark:border-dark-3">
                                <h3 className="font-medium text-dark dark:text-white">
                                    ADHESIONS / DONS
                                </h3>
                                <span> Bulletin d'adhésion</span>

                            </div>
                            <div className="flex flex-col gap-5.5 p-6.5 pb-3 ">
                                <Steps current={current} items={items} />
                                <div >{steps[current].content}</div>
                                <div style={{ marginTop: 24 }}>
                                    {current < steps.length - 1 && (
                                        // <button className="flex justify-center rounded-[7px] bg-primary p-[13px] font-medium text-white hover:bg-opacity-90" onClick={() => next()}>
                                        //     Suivant
                                        // </button>
                                        <Button type="primary" onClick={() => next()}>
                                            Suivant
                                        </Button>
                                    )}
                                    {current === steps.length - 1 && (
                                        <Button type="primary" onClick={() => message.success('Processing complete!')}>
                                            Terminer
                                        </Button>
                                    )}
                                    {current > 0 && (
                                        <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                                            Retour
                                        </Button>
                                    )}
                                </div>
                                {/* <PersonnePhysique /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">

            </footer> */}
        </div>
    )
}

export default AdhesionWrapper