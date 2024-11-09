'use client'
import { Button, Flex, Input } from 'antd'
import Image from 'next/image';
import React, { useState } from 'react';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import CurrencyInput from 'react-currency-input-field';
import { IBanquePaiement } from '@/helpers/interface';

interface Props {
    handleRereference: (value: string) => void;
}

const BankPaiementCard = ({ handleRereference }: Props) => {

    return (
        <>
            <div className='text-xl font-medium text-center mb-4'>
                <Image src="/images/logoBank.webp" alt="logo Bank" width={100} height={100} />
            </div>
            <Flex vertical gap={32}>
                <div className='flex flex-col justify-center items-center w-full text-sm md:text-lg font-bold text-dark '>
                    <span>
                        ONG SEMENCE POUR LA VIE
                    </span>
                    <span>
                        Compte UBA : CI150 01001 101100005956 78
                    </span>
                    <span>
                        IBAN CI93CI1500100110110000595678
                    </span>
                    <span> UBA SWIFT UNAFCIAB</span>
                </div>
                <div className='flex flex-col'>
                    <label className="block text-sm md:text-lg font-medium text-dark ">
                        Référence du virement ou du dépôt
                    </label>
                    <Input
                        className="w-full"
                        placeholder="Ex: 123456789"
                        onChange={(e) => handleRereference(e.target.value)}
                        style={{ textTransform: 'uppercase' }}
                    />
                </div>
            </Flex >
        </>

    )
}

export default BankPaiementCard