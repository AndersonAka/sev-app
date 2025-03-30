import { Flex, Radio, DatePicker, DatePickerProps } from 'antd'
import React, { useState } from 'react'
import dayjs from 'dayjs';

interface Props {
    handleRadioChange: (value: string) => void
    handleRadioChange2: (value: string) => void
    onChangeDate: DatePickerProps['onChange']
    choix: string
    modePaiement: string
}
// const dateFormat = 'YYYY-MM-DD';
const RadioGroupPayerMaintenantPlusTard = ({ handleRadioChange, handleRadioChange2, onChangeDate, choix, modePaiement }: Props) => {
    // const [date, setDate] = useState<dayjs.Dayjs | null>(null); // Valeur initiale modifiée
    // const formattedDateDebut = date?.format('YYYY-MM-DD');
    // Définir la plage de date min et max pour la sélection
    const minDate = dayjs().subtract(0, 'day'); // Aujourd'hui -1 jour
    const disabledDate = (current: dayjs.Dayjs) => {
        return current && (current < minDate); // Désactiver les dates en dehors de l'intervalle
    };
    return (
        <>
            <Flex vertical gap="middle">
                <Radio.Group
                    size='small'
                    name="radiogroup1"
                    defaultValue={choix ? choix : ''}
                    onChange={e => handleRadioChange(e.target.value)}
                >
                    <div className='w-full flex flex-col  p-2 justify-center'>
                        <Radio value="1">
                            <span className="block">Payer maintenant</span>
                            {choix === '1' ? (
                                <div className='w-full flex flex-col'>
                                    <Radio.Group
                                        size='small'
                                        name="radiogroup2"
                                        defaultValue={modePaiement ? modePaiement : ''}
                                        onChange={e => handleRadioChange2(e.target.value)}
                                    >
                                        <div className='w-full flex flex-col p-2 justify-center'>
                                            <Radio value="m">
                                                <span className="block">Par mobile money</span>
                                            </Radio>
                                            <Radio value="v">
                                                <span className="block">Par virement bancaire</span>
                                            </Radio>
                                        </div>
                                    </Radio.Group>
                                </div>
                            ) : null}
                        </Radio>
                        {/* <Radio value="2">
                            <div className='w-full flex flex-col md:flex-row space-x-2'>
                                <span className="block">Payer plus tard</span>
                                {choix === '2' ? (
                                    <div className='w-'>
                                        <DatePicker disabledDate={disabledDate} onChange={onChangeDate} placeholder='Choisir une date' style={{ width: 150 }} />
                                    </div>
                                ) : null}
                            </div>
                        </Radio> */}
                    </div>
                </Radio.Group>
            </Flex>
        </>
    )
}

export default RadioGroupPayerMaintenantPlusTard