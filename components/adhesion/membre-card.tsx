import { IChoixMembre } from '@/helpers/interface';
import useDataStore from '@/store/dataStore';
import { Divider, Flex, Radio } from 'antd';
import { useState } from 'react';
import ChexBoxDonateur from './checkbox-donateur';



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
            type: dataChoixMembre.type,
            option: value
        }
        console.log(choix)
        // setOption(choix.option!)
        setDataChoixMembre(choix)
    }

    const choixDonateurdiamant = (value: string) => {
        const choix: IChoixMembre = {
            type: dataChoixMembre.type,
            option: dataChoixMembre.option,
            montant: value
        }
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
                    <ChexBoxDonateur onSelected={choixDonateur} onSelectedDiamant={choixDonateurdiamant} value={dataChoixMembre.option!} />
                    :
                    null
            }
        </div>
    );
};

export default ChoixMembre;