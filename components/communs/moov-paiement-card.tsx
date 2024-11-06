'use client'
import { Button, Flex, Input } from 'antd'
import Image from 'next/image';
import React, { useState } from 'react';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import CurrencyInput from 'react-currency-input-field';
import type { GetProps } from 'antd';

type OTPProps = GetProps<typeof Input.OTP>;;
const MoovPaiementCard = () => {

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

    const onChangeOpt: OTPProps['onChange'] = (text) => {
        console.log('onChange:', text);
    };

    const sharedProps: OTPProps = {
        onChange: onChangeOpt,
    };

    return (
        < >
            <div className='text-xl font-medium text-center '>
                <Image src="/images/logoMoovOm.webp" alt="logo wave" width={150} height={100} style={{ borderRadius: '20%' }} />
            </div>
            <Flex vertical gap={32}>
                <div className='w-full'>
                    <label className="block text-sm md:text-lg  font-medium text-dark ">
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

                {/* <div className='flex flex-col items-center'>
                    <label className=" text-sm md:text-lg font-medium text-dark ">
                        Code de validation,exécutez la syntaxe suivante :
                    </label>
                    <span className='text-xl font-bold'>#144*82</span>
                </div> */}

                <div className='flex flex-col'>
                    <label className="block text-sm md:text-lg font-medium text-dark ">
                        Entrer le Code de validation
                    </label>
                    <div className='w-full flex flex-row justify-center'>
                        <Input.OTP length={4} {...sharedProps} style={{ width: '100%' }} />
                    </div>
                </div>

                <div className='flex flex-col'>
                    <label className="block text-sm md:text-lg font-medium text-dark ">
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

            </Flex >
        </>

    )
}

export default MoovPaiementCard