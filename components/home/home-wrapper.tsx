// "use client";

// import React from "react";
// import ImageTitre from "../communs/image-titre";
// import { useRouter } from "next/navigation";

// const HomeWrapper = () => {
//     const router = useRouter();

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-200 to-green-600 p-6 sm:p-10 font-sans">
//             <main className="flex flex-col items-center gap-8 w-full max-w-2xl bg-white rounded-xl shadow-lg overflow-hidden">
//                 <header className="w-full bg-green-600 p-4 text-center text-white font-semibold text-2xl md:text-3xl">
//                     {"L'EVANGILE AU SERVICE DE LA COMMUNAUTE"}
//                 </header>
//                 <ImageTitre />
//                 <div className="flex flex-col items-center text-center px-6 py-4 space-y-4">
//                     <p className="text-lg md:text-2xl font-medium text-gray-700">
//                         Bienvenu-e, faites une action pour l'avancement de votre communauté
//                     </p>
//                     <div className="flex flex-col sm:flex-row sm:space-x-4 w-full">
//                         <button
//                             className="w-full sm:w-1/2 bg-green-600 text-white text-lg font-semibold rounded-lg py-3 hover:bg-green-700 transition"
//                             onClick={() => router.push("/adhesion")}
//                         >
//                             ADHESION / DONS
//                         </button>
//                         <button
//                             className="w-full sm:w-1/2 bg-green-600 text-white text-lg font-semibold rounded-lg py-3 mt-4 sm:mt-0 hover:bg-green-700 transition"
//                             onClick={() => router.push("/collecte")}
//                         >
//                             COLLECTE DE FONDS
//                         </button>
//                     </div>
//                 </div>
//             </main>
//         </div>
//     );
// };

// export default HomeWrapper;


"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ImageTitre from "../communs/image-titre";
import useDataStore from "@/store/dataStore";

const HomePage = () => {
    const router = useRouter();
    const { setCurrent } = useDataStore();

    useEffect(() => {
        setCurrent(0);
    }, []);

    return (
        <div className="h-full flex flex-col">
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
                        <button
                            className="bg-amber-800 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm sm:text-base"
                            onClick={() => router.push("/adhesion")}
                        >
                            Adhésion
                        </button>
                        <button
                            className="bg-amber-800 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm sm:text-base"
                            onClick={() => router.push("/collecte")}
                        >
                            Collecte de Fonds
                        </button>
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
                        className="shadow-lg"
                    />
                </div>
            </div>
        </div>


    );
};

export default HomePage;
