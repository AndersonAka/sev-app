import React from 'react';
import { Checkbox } from 'antd';
import type { GetProp } from 'antd';

const onChange: GetProp<typeof Checkbox.Group, 'onChange'> = (checkedValues) => {
    console.log('checked = ', checkedValues);
};

const plainOptions = ['Bronze (20.000 F CFA/mois)', 'Argent(10.000 F CFA/mois)', 'Or(100.000 F CFA/mois)', 'Diamant(+100.000 F CFA/mois)'];



const ChexBoxDonateur: React.FC = () => (
    <>
        <Checkbox.Group options={plainOptions} onChange={onChange} />
    </>
);

export default ChexBoxDonateur;