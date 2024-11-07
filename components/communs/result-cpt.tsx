
"use client"
import React, { useEffect } from 'react';
import { Button, Result } from 'antd';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import useDataStore from '@/store/dataStore';

interface Props {
    titre?: string
    texte?: string
}

const ResultCpt = ({ titre, texte = '' }: Props) => {
    const { resetStore, dataMotEnregistrement } = useDataStore()

    const router = useRouter();
    const handleClick = () => {
        resetStore();
        router.push('/');

    }
    useEffect(() => {
        // Préchargez les routes de destination
        router.prefetch("/");
    }, []);
    return (
        <Result
            status="success"
            title={!dataMotEnregistrement.titre ? titre : dataMotEnregistrement.titre}
            subTitle={!dataMotEnregistrement.texte ? texte : dataMotEnregistrement.texte}
            extra={[
                <Button
                    type="primary"
                    key="console"
                    style={{ marginTop: 20, height: 35, width: 150, fontSize: 15, backgroundColor: 'brown' }}
                    onClick={handleClick}>
                    Revenir à l'accueil
                </Button>,
            ]}
        />
    )
};

export default ResultCpt;