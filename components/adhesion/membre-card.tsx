import { IChoixMembre } from '@/helpers/interface';
import useDataStore from '@/store/dataStore';
import { Divider, Flex, Radio } from 'antd';
import { useState } from 'react';
import ChexBoxDonateur from './checkbox-donateur';

interface Props {
    handleMembre: (choixMembre: IChoixMembre) => void
    choixMembre: IChoixMembre
}
const ChoixMembre = ({ handleMembre, choixMembre }: Props) => {

    const [option, setOption] = useState<IChoixMembre>(choixMembre);

    // const { dataChoixMembre, setDataChoixMembre } = useDataStore()

    const options = [
        { label: 'Membre', value: 'm' },
        { label: 'Donateur', value: 'd' },
    ];

    const afficherOption = (value: string) => {
        const membre: IChoixMembre = {
            type: value,
            passe: value === 'm'
        }
        setOption(membre)
        handleMembre(membre)
        // setDataChoixMembre(choix)
    }

    const choixDonateur = (value: string) => {
        const membre: IChoixMembre = {
            type: option.type,
            option: value,
            passe: true
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
            {option.type === 'm' || choixMembre.type === 'm' ?
                <div className='flex flex-col p-2 justify-center'>
                    <span className='text-black italic'>Droit d\'adhésion (10.000 F CFA)</span>
                    <span className='text-black italic'>Cotisation mensuelle (10.000 F CFA / mois)</span>
                </div> :
                option.type === 'd' || choixMembre.type === 'd' ?
                    <ChexBoxDonateur onSelected={choixDonateur} onSelectedDiamant={choixDonateurdiamant} value={choixMembre.option!} />
                    :
                    null
            }
        </div>
    );
};

export default ChoixMembre;