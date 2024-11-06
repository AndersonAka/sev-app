import React, { useState } from 'react';
import { Card, Divider, Flex, Radio } from 'antd';
import ChexBoxMembre from './checkbox-membre';
import ChexBoxDonateur from './checkbox-donateur';
import useDataStore from '@/store/dataStore';
import { IChoixMembre } from '@/helpers/interface';

interface Props {
    handleMembre: (choixMembre: IChoixMembre) => void
    choixMembre: IChoixMembre
}
const ChoixMembreMorale = ({ handleMembre, choixMembre }: Props) => {

    const { dataChoixMembre, setDataChoixMembre } = useDataStore()
    const [option, setOption] = useState<IChoixMembre>(choixMembre);

    const options = [
        { label: 'Donateur', value: 'd' },
    ];

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
        const membre: IChoixMembre = {
            type: option.type,
            option: value,
            passe: value !== 'd'
        }
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
            {option.type === 'd' || dataChoixMembre.type === 'd' ?
                <ChexBoxDonateur onSelected={choixDonateur} value={dataChoixMembre.option!} onSelectedDiamant={choixDonateurdiamant} />
                :
                null}
        </div>
    );
};

export default ChoixMembreMorale;