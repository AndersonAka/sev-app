import React, { useState } from 'react';
import { Card, Divider, Flex, Radio } from 'antd';
import ChexBoxMembre from './checkbox-membre';
import ChexBoxDonateur from './checkbox-donateur';
import useDataStore from '@/store/dataStore';
import { IChoixMembre } from '@/helpers/interface';



const ChoixMembre = () => {

    const [option, setOption] = useState('');
    const { dataChoixMembre, setDataChoixMembre } = useDataStore()

    const options = [
        { label: 'Membre', value: 'm' },
        { label: 'Donateur', value: 'd' },
    ];

    const afficherOption = (value: string) => {
        setOption(value)
        const choix: IChoixMembre = {
            type: value
        }
        setDataChoixMembre(choix)
    }

    const choixDonateur = (value: string) => {
        const choix: IChoixMembre = {
            type: option,
            option: value
        }
        setOption(choix.option!)
        setDataChoixMembre(choix)
    }

    return (
        <div className='p-4 w-full border rounded-lg space-y-3'>
            <Flex vertical gap="middle" >
                <span>Vous souhaitez devenir :</span>
                <Radio.Group
                    block
                    options={options}
                    defaultValue={dataChoixMembre.type}
                    optionType="button"
                    buttonStyle="solid"
                    size='middle'
                    onChange={(e) => afficherOption(e.target.value)}
                />
            </Flex>
            <Divider />
            {option === 'm' || dataChoixMembre.type === 'm' ?
                <div className='flex flex-col p-2 justify-center'>
                    <span className='text-black italic'>Droit d\'adhésion (10.000 F CFA)</span>
                    <span className='text-black italic'>Cotisation mensuelle (10.000 F CFA / mois)</span>
                </div> :
                option === 'd' || dataChoixMembre.type === 'd' ?
                    <ChexBoxDonateur onSelected={choixDonateur} value={dataChoixMembre.option ? dataChoixMembre.option : ""} />
                    :
                    null
            }
        </div>
    );
};

export default ChoixMembre;