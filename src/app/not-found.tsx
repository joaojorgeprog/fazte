// app/Components/Tentaste/Tentaste.js

import Image from 'next/image'; // Importando a imagem do Next.js
import Link from 'next/link'; // Importando o Link do Next.js
import React from 'react';

const Tentaste = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100"> {/* Centraliza verticalmente */}
            <Image 
                src="/404.png" // Caminho para a imagem na pasta public
                alt="404" // Texto alternativo para a imagem
                width={500} // Defina a largura desejada
                height={500} // Defina a altura desejada
                className="mb-4" // Margem inferior
            />
            <Link href="/">
                <button className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                    Voltar para a página inicial
                </button>
            </Link>
        </div>
    );
};

export default Tentaste;
