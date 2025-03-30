"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ImageTitre from "../communs/image-titre";
import useDataStore from "@/store/dataStore";
import Link from "next/link";
import { Button } from "antd";
import { FaHandHoldingHeart, FaUsers, FaHandshake, FaLeaf } from "react-icons/fa";
import Footer from "../communs/footer";

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
        resetStore()
        router.prefetch("/adhesion");
        router.prefetch("/collecte");
    }, []);

    const valeurs = [
        {
            icone: <FaHandHoldingHeart className="w-12 h-12 text-green-600" />,
            titre: "Solidarité",
            description: "Nous croyons en la force de la communauté et de l'entraide mutuelle."
        },
        {
            icone: <FaUsers className="w-12 h-12 text-green-600" />,
            titre: "Inclusion",
            description: "Chacun a sa place dans notre communauté, quelles que soient ses origines."
        },
        {
            icone: <FaHandshake className="w-12 h-12 text-green-600" />,
            titre: "Engagement",
            description: "Nous nous engageons pour un monde plus juste et plus durable."
        },
        {
            icone: <FaLeaf className="w-12 h-12 text-green-600" />,
            titre: "Durabilité",
            description: "Nos actions sont pensées pour un impact positif sur le long terme."
        }
    ];

    return (
        <div className="min-h-screen flex flex-col overflow-y-auto bg-gradient-to-br from-white via-green-50 to-green-100">
            {/* Main Content */}
            <div className="flex-grow">
                <div className="flex items-center flex-col lg:flex-row container mx-auto px-4 py-8">
                    {/* Left Section */}
                    <div className="flex flex-col justify-center items-center sm:items-start p-6 sm:p-10 space-y-6 sm:space-y-8 max-w-full lg:max-w-xl mx-auto">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 leading-snug sm:leading-tight animate-fade-in">
                            Bienvenue à la Communauté des Semeurs!
                        </h2>
                        <p className="text-lg sm:text-xl lg:text-2xl font-satoshi text-gray-700 leading-relaxed animate-fade-in-up">
                            Bienvenu-e, contribuez à soutenir les actions en faveur des communautés.<br />
                            Que vous souhaitiez adhérer, faire un don, ou participer aux
                            événements, il y a une place pour vous.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto">
                            <Button
                                disabled={loadingAdhesion || loadingCollecte}
                                loading={loadingAdhesion}
                                onClick={handleAdhesion}
                                className="w-full sm:w-auto bg-green-700 hover:bg-green-800 text-white border-none h-12 px-8 text-lg font-medium rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center gap-2"
                            >
                                <FaHandshake className="w-5 h-5" />
                                Adhésion
                            </Button>
                            <Button
                                disabled={loadingAdhesion || loadingCollecte}
                                loading={loadingCollecte}
                                onClick={handleCollecte}
                                className="w-full sm:w-auto bg-green-700 hover:bg-green-800 text-white border-none h-12 px-8 text-lg font-medium rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center gap-2"
                            >
                                <FaHandHoldingHeart className="w-5 h-5" />
                                Collecte de Fonds
                            </Button>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="hidden lg:flex flex-1 justify-end items-center p-8">
                        <div className="relative w-full h-[600px] rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
                            <Image
                                src={'/images/landingpage.webp'}
                                alt="sev-logo"
                                fill
                                priority
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>

                {/* Section Nos Valeurs */}
                <div className="container mx-auto px-4 py-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12 animate-fade-in">
                        Nos Valeurs
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {valeurs.map((valeur, index) => (
                            <div
                                key={index}
                                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="flex flex-col items-center text-center space-y-4">
                                    {valeur.icone}
                                    <h3 className="text-xl font-bold text-gray-800">{valeur.titre}</h3>
                                    <p className="text-gray-600">{valeur.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default HomePage;
