import React, { useState } from 'react';
import { Card } from 'antd';
import ChexBoxMembre from './checkbox-membre';
import ChexBoxDonateur from './checkbox-donateur';

const tabList = [
    {
        key: 'membre',
        tab: 'Membre',
    },
    {
        key: 'donateur',
        tab: 'Donateur',
    },
];

const contentList: Record<string, React.ReactNode> = {
    membre: <>
        <ChexBoxMembre />
    </>,
    donateur: <>
        <ChexBoxDonateur /></>,
};

const ChoixMembre: React.FC = () => {
    const [activeTabKey1, setActiveTabKey1] = useState<string>('membre');

    const onTab1Change = (key: string) => {
        setActiveTabKey1(key);
    };

    return (
        <>
            <Card
                style={{ width: '100%' }}
                title="Souhaitez vous devenir : "
                tabList={tabList}
                activeTabKey={activeTabKey1}
                onTabChange={onTab1Change}
            >
                {contentList[activeTabKey1]}
            </Card>
        </>
    );
};

export default ChoixMembre;