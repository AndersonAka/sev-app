import React, { useState } from 'react';
import { Card } from 'antd';
import QrCodeMobileMoney from './qr-code';

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


const MoyenPaiement: React.FC = () => {
    const [activeTabKey1, setActiveTabKey1] = useState<string>('vm');

    const onTab1Change = (key: string) => {
        setActiveTabKey1(key);
    };

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
        </>
    );
};

export default MoyenPaiement;