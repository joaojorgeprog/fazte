import { Button } from "@nextui-org/react";
import React from "react";
import { LuFacebook, LuInstagram, LuTwitter, LuLinkedin } from "react-icons/lu";
import Image from "next/image"; // Usando o componente Image do Next.js para otimizar imagens

export default function Footer() {
    return (
        <div className="flex flex-col sm:flex-row w-full py-6 px-8 space-y-4 sm:space-y-0 sm:space-x-4">
            {/* Div 1: Contactos (centralizado no mobile) */}
            <div className="w-full sm:w-1/3 p-2 flex flex-col items-center sm:items-start">
                <h1 className="text-lg font-semibold mb-2 text-center sm:text-left">Contactos</h1>
                <p className="text-sm mb-1 text-center sm:text-left">+351 914 588 367</p>
                <p className="text-sm mb-1 text-center sm:text-left">geral@refield.app</p>
                <p className="text-sm mb-2 text-center sm:text-left">Portugal</p>
                <Image src="/slack.png" alt="Logo" width={80} height={80} />
            </div>

            {/* Div 2: Direitos Autorais */}
            <div className="w-full sm:w-1/3 p-2 flex items-end justify-center">
                <p className="text-center text-sm">&copy; 2024 ReField</p>
            </div>

            {/* Div 3: Formulário de Contato e Redes Sociais */}
            <div className="w-full sm:w-1/3 p-2">
                {/* Formulário de contato */}
                <div className="mb-2">
                    <input
                        placeholder="Número de telefone"
                        className="w-full p-2 mb-2 text-sm border border-gray-300 rounded"
                    />
                    <Button className="w-full text-sm" auto color="primary">Quero ser Contactado</Button>
                </div>

                {/* Redes sociais alinhadas à direita */}
                <div className="flex justify-end space-x-3 text-lg">
                    <LuFacebook />
                    <LuInstagram />
                    <LuTwitter />
                    <LuLinkedin />
                </div>
            </div>
        </div>
    );
}
