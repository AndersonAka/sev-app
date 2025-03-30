"use client"

import React from 'react';
import { Button } from 'antd';
import { FaCheckCircle, FaHome, FaExternalLinkAlt } from 'react-icons/fa';
import Link from 'next/link';

export default function RemerciementPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white via-green-50 to-green-100 p-4">
            <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 text-center space-y-6">
                <div className="flex justify-center">
                    <FaCheckCircle className="w-20 h-20 text-green-500" />
                </div>

                <h1 className="text-3xl font-bold text-gray-800">
                    Merci pour votre Enregistrement !
                </h1>

                <p className="text-lg text-gray-600">
                    Votre transaction a été enregistrée avec succès. Pour finaliser votre paiement, veuillez cliquer sur le lien ci-dessous :
                </p>

                <div className="my-6 flex flex-col items-center justify-center space-y-4">
                    <Link
                        href="https://pay.wave.com/m/M_ci_cC7FvlOn1ZTZ/c/ci/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-green-700 text-white px-8 py-3 rounded-full hover:bg-green-800 transition-all duration-300 hover:shadow-lg hover:scale-105 text-lg font-medium"
                    >
                        Finaliser le paiement
                        <FaExternalLinkAlt className="w-4 h-4" />
                    </Link>
                    <Link href="/">
                        <Button
                            type="primary"
                            icon={<FaHome />}
                            className="bg-amber-800 hover:bg-amber-900 border-none h-12 px-8 text-lg font-medium rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center gap-2"
                        >
                            Retour à l'accueil
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}