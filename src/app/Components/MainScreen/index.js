import { Button } from "@nextui-org/react";
import React from "react";
// Importar ícones, se necessário
import { FaUsers } from "react-icons/fa";
import { IoMdArrowRoundUp, IoMdArrowRoundDown } from "react-icons/io";

export default function AssociatesStatistic() {
    return (
        <div className="w-full h-screen flex justify-center items-center bg-cover bg-center" style={{ backgroundImage: 'url(/public.jpg)' }}>
            <div className="text-center text-white p-8 rounded-lg">
                <h1 className="text-5xl font-bold mb-4">O clube ao lado de quem o vive</h1>
                <p className="text-xl mb-6 text-gray-300">Seja sócio e sinta a força de estar ao lado do clube em cada conquista. Aqui, você faz a diferença</p>
                <Button auto color="primary" size="xl">Sócio na Hora</Button>
            </div>
        </div>
    );
}
