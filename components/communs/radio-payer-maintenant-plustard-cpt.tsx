import { Flex, Radio, DatePicker, DatePickerProps } from 'antd'
import React from 'react'

interface Props {
    handleRadioChange: (value: string) => void
    handleRadioChange2: (value: string) => void
    onChangeDate: DatePickerProps['onChange']
    choix: string
    modePaiement: string
}

const RadioGroupPayerMaintenantPlusTard = ({ handleRadioChange, handleRadioChange2, onChangeDate, choix, modePaiement }: Props) => {
    return (
        <>
            <Flex vertical gap="middle">
                <Radio.Group
                    size='large'
                    name="radiogroup"
                    defaultValue={choix}
                    onChange={e => handleRadioChange(e.target.value)}
                >
                    <div className='w-full flex flex-col  p-2 justify-center'>
                        <Radio value="1">
                            <span className="block text-lg">Payer maintenant</span>
                            {choix === '1' ? (
                                <div className='w-full flex flex-col'>
                                    <Radio.Group
                                        size='small'
                                        name="radiogroup2"
                                        defaultValue={modePaiement}
                                        onChange={e => handleRadioChange2(e.target.value)}
                                    >
                                        <div className='w-full flex flex-col p-2 justify-center'>
                                            <Radio value="m">
                                                <span className="block text-lg">Par mobile money</span>
                                            </Radio>
                                            <Radio value="v">
                                                <span className="block text-lg">Par virement bancaire</span>
                                            </Radio>
                                        </div>
                                    </Radio.Group>
                                </div>
                            ) : null}
                        </Radio>
                        <Radio value="2">
                            <div className='w-full flex flex-col md:flex-row space-x-2'>
                                <span className="block text-lg">Payer plus tard</span>
                                {choix === '2' ? (
                                    <div className='w-'>
                                        <DatePicker onChange={onChangeDate} placeholder='Choisir une date' style={{ width: 150 }} />
                                        {/* {error && <p style={{ color: 'red', fontSize: '0.875rem' }}>{error}</p>} */}
                                    </div>
                                ) : null}

                            </div>
                        </Radio>
                    </div>
                </Radio.Group>
            </Flex>
        </>
    )
}

export default RadioGroupPayerMaintenantPlusTard