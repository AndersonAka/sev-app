import React from 'react';
import { Flex, Radio } from 'antd';

interface Props {
    onSelected: (value: string) => void
    value: string
}


const CheckBoxDonateur = ({ onSelected, value }: Props) => {

    const choix = (value: string) => {
        onSelected(value)
    }

    return (
        <Flex vertical gap="middle">
            <Radio.Group
                size='large'
                name="radiogroup"
                defaultValue={value}
                onChange={e => choix(e.target.value)}
            >
                <div className='flex flex-row p-2 justify-center'>
                    <div className='flex flex-col'>
                        <Radio value="b">
                            Bronze (20.000 F CFA/mois)
                        </Radio>
                        <Radio value="a">Argent (10.000 F CFA/mois)</Radio>
                    </div>
                    <div className='flex flex-col'>
                        <Radio value="o">Or (100.000 F CFA/mois)</Radio>
                        <Radio value="d">Diamant (+100.000 F CFA/mois)</Radio>
                    </div>
                </div>
            </Radio.Group>
        </Flex>
    )
};

export default CheckBoxDonateur;