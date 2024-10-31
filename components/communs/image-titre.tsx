import React from 'react'
import Image, { StaticImageData } from 'next/image';
import logoSev from '@/public/images/logosev.webp';

interface Props {
    image?: string | StaticImageData
    width?: number
    height?: number
}

const ImageTitre = ({ image = logoSev, width = 200, height = 50 }: Props) => {
    return (
        < div className="image-container flex justify-center" >
            <Image
                src={image}
                alt="sev-semence pour la vie"
                width={width}
                height={height}
                priority
                className="rounded-md shadow-lg"
                placeholder="blur"
            />
        </ div>
    )
}

export default ImageTitre