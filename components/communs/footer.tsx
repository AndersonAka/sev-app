import React from 'react';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* À propos */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold">À propos</h3>
                        <p className="text-gray-300">
                            La Communauté des Semeurs est une organisation dédiée à la solidarité et au développement durable.
                        </p>
                    </div>

                    {/* Liens rapides */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold">Liens rapides</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/adhesion" className="text-gray-300 hover:text-white transition-colors">
                                    Adhésion
                                </Link>
                            </li>
                            <li>
                                <Link href="/collecte" className="text-gray-300 hover:text-white transition-colors">
                                    Collecte de Fonds
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold">Contact</h3>
                        <ul className="space-y-2 text-gray-300">
                            <li>Email: info@semencepourlavie.org </li>
                            <li>Tél: +225 27 22 23 88 30 / 07 07 88 94 49</li>
                            <li>Adresse: Cocody Angré Star 6 lot 14, Abidjan, République de Côte d’Ivoire</li>
                        </ul>
                    </div>

                </div>

                {/* Copyright */}
                <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
                    <p>&copy; {new Date().getFullYear()} Communauté des Semeurs. Tous droits réservés.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 