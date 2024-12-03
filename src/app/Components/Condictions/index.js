import { Button } from "@nextui-org/react";
import React from "react";
import { FaUsers } from "react-icons/fa";
import { IoMdArrowRoundUp, IoMdArrowRoundDown } from "react-icons/io";
import { HiOutlineFingerPrint } from "react-icons/hi2";
import { FaCheck } from "react-icons/fa";

const array = [
    {
        id: 1,
        title: 'Adesão Gratis'
    },
    {
        id: 2,
        title: 'Importação de sócios atuais'
    },
    {
        id: 3,
        title: 'Valor % de crescimento'
    },
    {
        id: 4,
        title: 'Suporte 24/7'
    },
]

export default function Condictions() {
    return (
        <div className="px-12 py-12">
            {/* Flexbox para dividir em 50% cada seção */}
            <div className="flex mb-8">
                <div className="w-1/2 flex items-center">
                    <HiOutlineFingerPrint size={80} className="mr-4 text-3xl" />
                    <h1 className="text-3xl font-bold">
                        O clube ao lado de <br /> quem o vive
                    </h1>
                </div>

                {/* Lista de condições ocupando o outro 50% */}
                <div className="w-1/2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {array.map((item) => (
                            <div key={item.id} className="flex items-center p-4 rounded-md">
                                <FaCheck className="mr-4 text-green-500 text-2xl" />
                                {/* Tamanho do texto reduzido */}
                                <h3 className="text-sm">{item.title}</h3>  {/* Ajuste o tamanho aqui */}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
