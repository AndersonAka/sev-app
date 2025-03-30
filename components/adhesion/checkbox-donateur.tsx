'use client'

import React, { useState } from 'react';
import { Flex, Input, Radio } from 'antd';

interface Props {
    onSelected: (value: string) => void
    onSelectedDiamant: (value: string) => void
    value: string
}

const CheckBoxDonateur = ({ onSelected, value, onSelectedDiamant }: Props) => {
    const [inputValue, setInputValue] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const choix = (value: string) => {
        // let montant: string = '';
        if (value !== 'd') {
            setInputValue(''); // Réinitialise l'input si ce n'est pas "Diamant"
        }
        onSelected(value)
    }
    const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInputValue(newValue);
        // Vérification si le montant est supérieur à 100.000
        const numericValue = parseFloat(newValue);
        if (numericValue <= 100000) {
            setError("Le montant doit être supérieur à 100.000 F CFA.");
        } else {
            setError(null);
            onSelectedDiamant(newValue); // Appelle onSelected avec la valeur de l'input
        }

    };

    return (
        <Flex vertical gap="middle">
            <Radio.Group
                size='large'
                name="radiogroup"
                defaultValue={value}
                onChange={e => choix(e.target.value)}
            >
                <div className='flex flex-col p-2'>
                    {/* <div className='flex flex-col'> */}
                    <Radio value="b">
                        Bronze (20.000 F CFA/mois)
                    </Radio>
                    <Radio value="a">Argent (50.000 F CFA/mois)</Radio>
                    {/* </div> */}
                    {/* <div className='flex flex-col'> */}
                    <Radio value="o">Or (100.000 F CFA/mois)</Radio>
                    <Radio value="d">
                        Diamant (+100.000 F CFA/mois) <br />
                        {value === 'd' ? (
                            <div>
                                <Input
                                    type="number"
                                    placeholder="Montant"
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    style={{ width: 100, marginInlineStart: 10 }}
                                />
                                {error && <p style={{ color: 'red', fontSize: '0.875rem' }}>{error}</p>}
                            </div>
                        ) : null}
                    </Radio>
                    {/* </div> */}
                </div>
            </Radio.Group>
        </Flex>
    )
};

export default CheckBoxDonateur;