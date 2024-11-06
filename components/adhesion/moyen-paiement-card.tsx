'use client'
import React, { useState } from 'react';
import { Button, Card } from 'antd';
import ChoixMoyenPaiement from './choix-moyen-paiement';
import useDataStore from '@/store/dataStore';


interface Props {
    next: () => void
    prev: () => void
}

const MoyenPaiement = ({ next, prev }: Props) => {
    const { setCurrent } = useDataStore()
    const [activeTabKey1, setActiveTabKey1] = useState<string>('mm');
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
                // tabList={tabList}
                // activeTabKey={activeTabKey1}
                onTabChange={onTab1Change}
            >
                <ChoixMoyenPaiement />
            </Card>
            <div className='flex justify-end space-x-2'>
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
                    Suivant
                </Button>
            </div>
        </>
    );
};

export default MoyenPaiement;