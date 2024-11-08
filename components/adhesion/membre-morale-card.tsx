import React, { useState } from 'react';
import { Card, DatePickerProps, Divider, Flex, Radio } from 'antd';
import ChexBoxMembre from './checkbox-membre';
import ChexBoxDonateur from './checkbox-donateur';
import useDataStore from '@/store/dataStore';
import { IChoixMembre, IChoixModePaiement } from '@/helpers/interface';
import RadioGroupPayerMaintenantPlusTard from '../communs/radio-payer-maintenant-plustard-cpt';

interface Props {
    handleMembre: (choixMembre: IChoixMembre) => void
    choixMembre: IChoixMembre
    errorChoixModePaiement?: string
}
const ChoixMembreMorale = ({ handleMembre, choixMembre, errorChoixModePaiement }: Props) => {

    const { dataChoixMembre, setDataChoixMembre, setMontantApayer } = useDataStore()
    const [option, setOption] = useState<IChoixMembre>(choixMembre);

    const { dataChoixModePaiement, setDataChoixModePaiement } = useDataStore()
    const [choixPaiement, setChoixPaiement] = useState(dataChoixModePaiement?.optionPaiement ? dataChoixModePaiement?.optionPaiement : '');
    const [modePaiement, setModePaiement] = useState(dataChoixModePaiement?.modePaiement ? dataChoixModePaiement?.modePaiement : '');
    const [date, setDate] = useState<string | string[]>(dataChoixModePaiement?.date ? dataChoixModePaiement?.date : '');

    const options = [
        { label: 'Donateur', value: 'd' },
    ];

    const onChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
        setDate(dateString);
        handleRadioChange(choixPaiement, dateString.toString())
    };

    const handleRadioChange = (value: string, dateString?: string, modePaiement?: string) => {
        setChoixPaiement(value); // option de paiement : 1:Paiement Maintenant, 2:Paiement Plus tard
        setModePaiement(modePaiement ? modePaiement : ''); // modde de paiement : m:Par mobile money, v:Par virement bancaire
        const _optionChoixMembre: IChoixModePaiement = {
            optionPaiement: value,
            modePaiement: value === '1' ? modePaiement : value === '2' ? 'p' : '', //p:plus tard
            date: value === '1' ? new Date().toString() : dateString!,
        }
        setDataChoixModePaiement(_optionChoixMembre)
        console.log(_optionChoixMembre)
    };

    const handleRadioChange2 = (modePaiement?: string) => {
        setModePaiement(modePaiement!);
        handleRadioChange(choixPaiement, '', modePaiement)
    };

    const afficherOption = (value: string) => {
        const membre: IChoixMembre = {
            type: value,
            passe: false
        }
        setOption(membre)
        handleMembre(membre)
        // setDataChoixMembre(choix)
    }

    const choixDonateur = (value: string) => {
        let mont = ''
        switch (value) {
            case 'b': //bronze
                mont = '20000'
                break;
            case 'a': //argent
                mont = '10000'
                break;
            case 'o':  //or
                mont = '100000'
                break;
            default:
                break;
        }

        const membre: IChoixMembre = {
            type: option.type,
            option: value,
            passe: value !== 'd',
            montant: mont
        }
        setMontantApayer(membre.montant!)
        setOption(membre)
        handleMembre(membre)
    }

    const choixDonateurdiamant = (value: string) => {
        const membre: IChoixMembre = {
            type: option.type,
            option: option.option,
            montant: value,
            passe: true
        }
        setMontantApayer(membre.montant!)
        // setDataChoixMembre(choix)
        setOption(membre)
        handleMembre(membre)
    }


    return (
        <div className='p-4 w-full border rounded-lg space-y-3'>
            <Flex vertical gap="middle" >
                <span>Vous souhaitez devenir :</span>
                <Radio.Group
                    block
                    options={options}
                    defaultValue={option.type}
                    optionType="button"
                    buttonStyle="solid"
                    size='middle'
                    onChange={(e) => afficherOption(e.target.value)}
                />
            </Flex>
            <Divider />
            <div className='flex flex-row justify-between space-x-2'>
                {option.type === 'd' || dataChoixMembre.type === 'd' ?
                    <ChexBoxDonateur onSelected={choixDonateur} value={dataChoixMembre.option!} onSelectedDiamant={choixDonateurdiamant} />
                    :
                    null}
                {option.type && (<>
                    <div className='flex flex-col justify-center space-y-2'>
                        <RadioGroupPayerMaintenantPlusTard handleRadioChange={handleRadioChange} handleRadioChange2={handleRadioChange2} onChangeDate={onChangeDate} choix={dataChoixModePaiement.optionPaiement!} modePaiement={dataChoixModePaiement.modePaiement!} />
                        {errorChoixModePaiement && <div className='text-red-500'>{errorChoixModePaiement}</div>}

                    </div>
                </>)}
            </div>
        </div>
    );
};

export default ChoixMembreMorale;