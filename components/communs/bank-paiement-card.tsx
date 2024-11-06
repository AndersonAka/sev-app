'use client'
import { Button, Flex, Input } from 'antd'
import Image from 'next/image';
import React, { useState } from 'react';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import CurrencyInput from 'react-currency-input-field';
const BankPaiementCard = () => {

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        console.log('Change:', e.target.value);
    };
    const [phone, setPhone] = useState("");
    const handlePhoneChange = (value: string) => {
        // Limite la longueur du numéro ivoirien à 13 caractères (incluant +225)
        // if (value.replace(/^\+225|\D/g, '').length <= 10) {
        setPhone(value);
        // }
    };

    return (
        <>
            <div className='text-xl font-medium text-center mb-4'>
                <Image src="/images/logoBank.webp" alt="logo Bank" width={100} height={100} />
            </div>
            <Flex vertical gap={32}>
                <div className='w-full'>
                    <span className="block text-sm md:text-lg font-bold text-dark ">
                        ONG SEMENCE POUR LA VIE <br />
                        Compte UBA : CI150 01001 101100005956 78
                    </span>
                </div>
                <div className='flex flex-col'>
                    <label className="block text-sm md:text-lg font-medium text-dark ">
                        Référence du virement ou du dépôt
                    </label>
                    <Input />
                </div>
            </Flex >
        </>

    )
}

export default BankPaiementCard