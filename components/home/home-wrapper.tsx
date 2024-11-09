
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ImageTitre from "../communs/image-titre";
import useDataStore from "@/store/dataStore";
import Link from "next/link";
import { Button } from "antd";

const HomePage = () => {
    const router = useRouter();
    const { resetStore, setTypeOperation } = useDataStore();
    const [loadingAdhesion, setLoadingAdhesion] = useState(false);
    const [loadingCollecte, setLoadingCollecte] = useState(false);

    const handleAdhesion = () => {
        setLoadingAdhesion(true)
        setTypeOperation("adhesion")
        router.push("/adhesion")
    }

    const handleCollecte = () => {
        setLoadingCollecte(true)
        setTypeOperation("collecte")
        router.push("/collecte")
    }


    useEffect(() => {
        // Préchargez les routes de destination
        resetStore()
        router.prefetch("/adhesion");
        router.prefetch("/collecte");
    }, []);

    return (
        <div className="min-h-screen flex flex-col justify-center overflow-y-auto">
            {/* Main Content */}
            <div className="flex items-center  flex-col lg:flex-row">
                {/* Left Section */}
                <div className="flex flex-col justify-center items-center sm:items-start p-6 sm:p-10 space-y-4 sm:space-y-6 max-w-full lg:max-w-xl mx-auto">
                    {/* <ImageTitre width={250} /> */}
                    <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-gray-800 leading-snug sm:leading-tight">
                        Bienvenue à la Communauté des Semeurs!
                    </h2>
                    <p className="text-md sm:text-lg lg:text-xl font-satoshi text-gray-700">
                        Bienvenu-e, contribuez à soutenir les actions en faveur des communautés.<br />
                        Que vous souhaitiez adhérer, faire un don, ou participer aux
                        événements, il y a une place pour vous.
                    </p>
                    <div className="flex space-x-3 sm:space-x-4">
                        {/* Utilisation de Link pour le préchargement */}
                        {/* <Link href="/adhesion" prefetch>
                            <button className="bg-amber-800 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm sm:text-base">

                            </button>
                        </Link>
                        <Link href="/collecte" prefetch>
                            <button className="bg-amber-800 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm sm:text-base">
                                Collecte de Fonds
                            </button>
                        </Link> */}
                        <Button disabled={loadingAdhesion || loadingCollecte} loading={loadingAdhesion} onClick={handleAdhesion} style={{ marginTop: 20, height: 35, width: 150, fontSize: 15, backgroundColor: 'brown', color: 'white', borderRadius: 10, padding: 10 }}>
                            Adhésion
                        </Button>
                        <Button disabled={loadingAdhesion || loadingCollecte} loading={loadingCollecte} onClick={handleCollecte} style={{ marginTop: 20, height: 35, width: 150, fontSize: 15, backgroundColor: 'brown', color: 'white', borderRadius: 10, padding: 10 }}>
                            Collecte de Fonds
                        </Button>
                    </div>
                </div>

                {/* Right Image (visible on large screens and above)  bg-gradient-to-br from-white to-green-200 */}
                <div className="hidden lg:flex flex-1 justify-end items-center p-8 bg-cover">
                    <Image
                        src={'/images/landingpage.webp'}
                        alt="sev-logo"
                        width={1000}
                        height={500}
                        priority
                    // className="shadow-lg"
                    />
                </div>
            </div>
        </div>


    );
};

export default HomePage;
