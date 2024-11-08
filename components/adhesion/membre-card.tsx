import { IChoixMembre, IChoixModePaiement } from '@/helpers/interface';
import { DatePickerProps, Divider, Flex, Radio } from 'antd';
import { useState } from 'react';
import ChexBoxDonateur from './checkbox-donateur';
import RadioGroupPayerMaintenantPlusTard from '../communs/radio-payer-maintenant-plustard-cpt';
import useDataStore from '@/store/dataStore';

interface Props {
    handleMembre: (choixMembre: IChoixMembre) => void
    choixMembre: IChoixMembre
    errorChoixModePaiement?: string
}
const ChoixMembre = ({ handleMembre, choixMembre, errorChoixModePaiement }: Props) => {
    const [optionChoixMembre, setOptionChoixMembre] = useState<IChoixMembre>(choixMembre);
    const { dataChoixModePaiement, setDataChoixModePaiement, setMontantApayer } = useDataStore()
    const [choixPaiement, setChoixPaiement] = useState(dataChoixModePaiement?.optionPaiement ? dataChoixModePaiement?.optionPaiement : '');
    const [modePaiement, setModePaiement] = useState(dataChoixModePaiement?.modePaiement ? dataChoixModePaiement?.modePaiement : '');
    const [date, setDate] = useState<string | string[]>(dataChoixModePaiement?.date ? dataChoixModePaiement?.date : '');
    // const { dataChoixMembre, setDataChoixMembre } = useDataStore()

    const options = [
        { label: 'Membre', value: 'm' },
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

    const afficherOption = (value: string, dateString?: string) => {
        setDataChoixModePaiement({ optionPaiement: null, modePaiement: null, date: null })
        const membre: IChoixMembre = {
            type: value,
            passe: value === 'm',
            montant: "10000"
        }
        setMontantApayer(membre.montant!)
        setOptionChoixMembre(membre)
        handleMembre(membre)
        //setDataChoixMembre(choix)
    }

    const choixDonateur = (value: string, dateString?: string) => {
        setDataChoixModePaiement({ optionPaiement: null, modePaiement: null, date: null })
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
            type: optionChoixMembre.type,
            option: value,
            passe: true,
            montant: mont
        }
        setMontantApayer(membre.montant!)
        setOptionChoixMembre(membre)
        handleMembre(membre)
    }

    const choixDonateurdiamant = (value: string, dateString?: string) => {
        setDataChoixModePaiement({ optionPaiement: null, modePaiement: null, date: null })
        const membre: IChoixMembre = {
            type: optionChoixMembre.type,
            option: optionChoixMembre.option,
            montant: value,
            passe: true
        }
        // setDataChoixMembre(choix)
        setMontantApayer(membre.montant!)
        setOptionChoixMembre(membre)
        handleMembre(membre)
    }

    return (
        <div className='p-4 w-full border rounded-lg space-y-3'>
            <Flex vertical gap="middle" >
                <span>Vous souhaitez devenir :</span>
                <Radio.Group
                    block
                    options={options}
                    defaultValue={optionChoixMembre.type}
                    optionType="button"
                    buttonStyle="solid"
                    size='middle'
                    onChange={(e) => afficherOption(e.target.value)}
                />
            </Flex>
            <Divider />
            <div className='flex flex-row justify-around'>
                {optionChoixMembre.type === 'm' || choixMembre.type === 'm' ?
                    <div className='flex flex-col p-2 justify-center'>
                        <span className='text-black italic'>Droit d\'adhésion (10.000 F CFA)</span>
                        <span className='text-black italic'>Cotisation mensuelle (10.000 F CFA / mois)</span>
                    </div> :
                    optionChoixMembre.type === 'd' || choixMembre.type === 'd' ?
                        <ChexBoxDonateur onSelected={choixDonateur} onSelectedDiamant={choixDonateurdiamant} value={choixMembre.option!} />
                        :
                        null
                }
                {optionChoixMembre.type && (<>
                    <div className='flex flex-col justify-center space-y-2'>
                        <RadioGroupPayerMaintenantPlusTard handleRadioChange={handleRadioChange} handleRadioChange2={handleRadioChange2} onChangeDate={onChangeDate} choix={dataChoixModePaiement.optionPaiement!} modePaiement={dataChoixModePaiement.modePaiement!} />
                        {errorChoixModePaiement && <div className='text-red-500'>{errorChoixModePaiement}</div>}
                    </div>
                </>)}

            </div>
        </div>
    );
};

export default ChoixMembre;