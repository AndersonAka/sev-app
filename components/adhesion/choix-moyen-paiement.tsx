'use client'

import React from 'react';
import { Input, QRCode, Space, Flex, Radio } from 'antd';
import Image from 'next/image';
import useDataStore from '@/store/dataStore';
import { IChoixMoyenPaiement } from '@/helpers/interface';
const ChoixMoyenPaiement = () => {
    const { setDataChoixPaiement } = useDataStore()

    const choix = (value: string) => {
        const chx: IChoixMoyenPaiement = {
            option: value,
            numero: ''
        }
        setDataChoixPaiement(chx)
    }

    return (
        <div className='flex flex-col space-y-5'>
            <Radio.Group
                size='large'
                name="radiogroup"
                // defaultValue={value}
                onChange={e => choix(e.target.value)}
            >
                <div className='flex flex-col p-2 items-center justify-center space-y-4'>
                    <Radio value="1">
                        <Image
                            width={100}
                            height={100}
                            src="/images/logoWave.webp"
                            alt="logo wave"
                        />
                    </Radio>
                    <Radio value="2">
                        <Image
                            width={100}
                            height={100}
                            src="/images/logoOm.webp"
                            alt="logo orange money"
                        />
                    </Radio>
                    <Radio value="3">
                        <Image
                            width={100}
                            height={100}
                            src="/images/logoMtnOm.webp"
                            alt="logo mtn momo"
                        /></Radio>
                    <Radio value="4">
                        <Image
                            width={100}
                            height={100}
                            src="/images/logoMoovOm.webp"
                            alt="logo flooz"
                        /></Radio>
                </div>
            </Radio.Group>
        </div>
    );
};

export default ChoixMoyenPaiement;