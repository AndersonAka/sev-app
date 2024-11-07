
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

const ResultCpt = ({ titre = 'Paiement effectué avec succès!', texte = "L'ONG SEMENCE POUR LA VIE vous remercie pour votre soutien financier!" }: Props) => {
    const { resetStore, dataMotEnregistrement } = useDataStore()

    const router = useRouter();
    const handleClick = () => {
        resetStore();
        router.push('/');

    }
    useEffect(() => {
        // Préchargez les routes de destination
        resetStore()
        router.prefetch("/");
    }, []);
    return (
        <Result
            status="success"
            title={<>
                <span className='text-lg md:text-xl font-semibold'>{!dataMotEnregistrement.titre ? titre : dataMotEnregistrement.titre}</span>
            </>}
            subTitle={<><span className='text-lg md:text-xl font-semibold'>{!dataMotEnregistrement.texte ? texte : dataMotEnregistrement.texte}</span></>}
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