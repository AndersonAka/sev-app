'use client'
import { IAdhesionCollecte } from '@/helpers/interface';
import { DatePickerProps, Flex, Input, Radio, DatePicker } from 'antd'
import React, { useState } from 'react'
import CurrencyInput from 'react-currency-input-field';
import RadioGroupPayerMaintenantPlusTard from '../communs/radio-payer-maintenant-plustard-cpt';

interface Props {
    handleEngagement: (collecteEngagement: IAdhesionCollecte) => void
    collecteEngagement?: IAdhesionCollecte
}

const AdhesionCollecte = ({ collecteEngagement, handleEngagement }: Props) => {

    const [choix, setChoix] = useState(collecteEngagement?.option ? collecteEngagement?.option : '');
    const [montant, setMontant] = useState(collecteEngagement?.montant ? collecteEngagement?.montant : '');
    const [date, setDate] = useState<string | string[]>(collecteEngagement?.date ? collecteEngagement?.date : '');
    const [modePaiement, setModePaiement] = useState(collecteEngagement?.modePaiement ? collecteEngagement?.modePaiement : '');
    const [erreur, setErreur] = useState<string | null>(null);

    const onChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
        setDate(dateString);
        handleRadioChange(choix, dateString.toString())
    };

    const handleRadioChange = (value: string, dateString?: string, modePaiement?: string) => {
        setChoix(value);
        if (Number(montant) >= 1000) {
            const collecte: IAdhesionCollecte = {
                option: value,
                montant: montant,
                date: value === '1' ? new Date().toString() : dateString!,
                modePaiement: value === '1' ? modePaiement : 'p'
            }
            handleEngagement(collecte)
        }
    };

    const handleRadioChange2 = (modePaiement?: string) => {
        setModePaiement(modePaiement!);
        handleRadioChange(choix, new Date().toString(), modePaiement)
    };

    const handleMontantChange = (value: string) => {
        setMontant(value);
        if (value && Number(value) < 1000) {
            setErreur("Le montant doit être supérieur ou égale à 1000 F CFA.");
        } else {
            setErreur(null);
        }
    };

    return (
        <div className='space-y-2 overflow-y-auto '>
            <span className='text-lg font-medium text-center text-red'>
                Je m’engage à apporter une contribution pour la collecte de fonds initiée par l’ONG Semence
                pour la Vie à hauteur de :
            </span>
            <br />
            <div className='flex flex-row justify-between space-x-2'>
                <div className='w-full'>
                    <label className="mb-3 block text-lg font-medium text-dark">
                        Montant*
                    </label>
                    <CurrencyInput
                        id="input-example"
                        name="input-name"
                        placeholder="Entrer le montant"
                        decimalsLimit={2}
                        suffix='FCFA'
                        value={montant}
                        onValueChange={(values) => handleMontantChange(values!)}
                        className='w-full border p-2 rounded-lg'
                    />
                    {erreur && <p style={{ color: 'red', fontSize: '0.875rem' }}>{erreur}</p>}
                </div>
            </div>
            {montant && Number(montant) >= 1000 && (
                <div className='w-full flex flex-col space-y-2'>
                    <RadioGroupPayerMaintenantPlusTard handleRadioChange={handleRadioChange} handleRadioChange2={handleRadioChange2} onChangeDate={onChangeDate} choix={choix} modePaiement={modePaiement} />
                </div>
            )}
        </div >
    )
}

export default AdhesionCollecte