import React from 'react';
import { Input, QRCode, Space } from 'antd';

const QrCodeMobileMoney: React.FC = () => {
    const [text, setText] = React.useState('07 07 88 94 49');

    return (
        <div className='flex flex-wrap space-x-5'>
            <Space direction="vertical" align="center">
                <label className="block text-lg font-medium text-dark"> Orange Money</label>
                <QRCode value={text || '-'} />
                <p>07 07 88 94 49</p>
            </Space >

            <Space direction="vertical" align="center">
                <label className="block text-lg font-medium text-dark"> Mtn Money</label>
                <QRCode value={text || '-'} />
                <p>07 07 88 94 49</p>
            </Space >

            <Space direction="vertical" align="center">
                <label className="block text-lg font-medium text-dark"> Moov Money</label>
                <QRCode value={text || '-'} />
                <p>07 07 88 94 49</p>
            </Space >

            <Space direction="vertical" align="center">
                <label className="block text-lg font-medium text-dark">Wave</label>
                <QRCode value={text || '-'} />
                <p>07 07 88 94 49</p>
            </Space >
        </div>
    );
};

export default QrCodeMobileMoney;