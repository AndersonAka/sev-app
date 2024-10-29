import React from 'react';
import { Checkbox } from 'antd';
import type { GetProp } from 'antd';

const onChange: GetProp<typeof Checkbox.Group, 'onChange'> = (checkedValues) => {
    console.log('checked = ', checkedValues);
};

const plainOptions = ['Droit d\'adhésion (10.000 F CFA)', 'Cotisation mensuelle (10.000 F CFA / mois)'];



const ChexBoxMembre: React.FC = () => (
    <>
        <Checkbox.Group options={plainOptions} onChange={onChange} />
    </>
);

export default ChexBoxMembre;