'use client'
import { Button, Flex, Input } from 'antd'
import Image from 'next/image';
import React, { useState } from 'react';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import CurrencyInput from 'react-currency-input-field';
const WavePaiementCard = () => {

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
        <div className='p-3 flex flex-col items-center justify-center space-y-3 border rounded-lg'>
            <span className='text-xl font-medium text-center'>
                <Image src="/images/logoWave.webp" alt="logo wave" width={150} height={100} />
            </span>
            <Flex vertical gap={32}>
                <div className='w-full'>
                    <label className="block text-lg font-medium text-dark ">
                        Entrer votre numéro de téléphone
                    </label>
                    <PhoneInput
                        preferredCountries={['ci']}
                        hideDropdown
                        defaultCountry="ci"
                        value={phone}
                        onChange={handlePhoneChange}
                        inputClassName="w-full border rounded-lg" // Input plein avec style
                    />
                </div>
                <div className='flex flex-col'>
                    <label className="block text-lg font-medium text-dark ">
                        Montant à débiter
                    </label>
                    <CurrencyInput
                        id="input-example"
                        name="input-name"
                        placeholder="Entrer le montant à débiter"
                        decimalsLimit={2}
                        suffix='FCFA'
                        onValueChange={(value, name, values) => console.log(value, name, values)}
                        className='border p-2 rounded-lg'
                    />
                </div>

                <div className='w-full flex flex-col items-center'>
                    <Button
                        type='primary'
                        className='w-full'
                        // onClick={() => suivant()}
                        style={{ padding: 20, height: 35, width: 150, fontSize: 15, backgroundColor: 'green' }}
                    >
                        Suivant
                    </Button>
                </div>
            </Flex >
        </div>

    )
}

export default WavePaiementCard