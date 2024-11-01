'use client'
import React, { useState } from 'react';
import { Button, Card } from 'antd';
import QrCodeMobileMoney from './qr-code';
import useDataStore from '@/store/dataStore';


interface Props {
    next: () => void
    prev: () => void
}

const MoyenPaiement = ({ next, prev }: Props) => {
    const { setCurrent } = useDataStore()
    const [activeTabKey1, setActiveTabKey1] = useState<string>('vm');

    const tabList = [
        {
            key: 'vm',
            tab: 'Virement ou chèque',
        },
        {
            key: 'mm',
            tab: 'Mobile Money',
        },
    ];

    const contentList: Record<string, React.ReactNode> = {
        vm: <>
            <p>ONG SEMENCE POUR LA VIE</p>
            <br />
            <p className='font-bold'>Compte UBA: CI150 01001 101100005956 78</p>
        </>,
        mm:
            <>
                <QrCodeMobileMoney />
            </>,
    };
    const onTab1Change = (key: string) => {
        setActiveTabKey1(key);
    };

    const suivant = () => {
        setCurrent(3);
        next()
    }

    const retour = () => {
        setCurrent(3);
        prev()
    }

    return (
        <>
            <Card
                style={{ width: '100%' }}
                title="Moyen de paiement : "
                extra={<a href="#">More</a>}
                tabList={tabList}
                activeTabKey={activeTabKey1}
                onTabChange={onTab1Change}
            >
                {contentList[activeTabKey1]}
            </Card>
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
                    style={{ marginTop: 20, height: 35, width: 150, fontSize: 15, backgroundColor: 'brown' }}
                >
                    Terminer
                </Button>
            </div>
        </>
    );
};

export default MoyenPaiement;