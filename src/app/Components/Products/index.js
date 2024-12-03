import { Button, Chip } from "@nextui-org/react";
import React from "react";

const array = [
    {
        id: 1,
        title: 'Sócios',
        text: 'texto de teste, olare texto de texte, lare, texto de tesge, fgdfgdfgdf, gdfgdfgodf, dfgdfgdfg, odfgdfgdfgdfg',
        image: '/slack.jpg',
        type: "Plugin"
    },
    {
        id: 2,
        title: 'Sócios',
        text: 'texto de teste, olare texto de texte, lare, texto de tesge, fgdfgdfgdf, gdfgdfgodf, dfgdfgdfg, odfgdfgdfgdfg',
        image: '/slack.jpg',
        type: "Library"
    },
    {
        id: 3,
        title: 'Sócios',
        text: 'texto de teste, olare texto de texte, lare, texto de tesge, fgdfgdfgdf, gdfgdfgodf, dfgdfgdfg, odfgdfgdfgdfg',
        image: '/slack.jpg',
        type: "Plugin"
    },
    {
        id: 4,
        title: 'Sócios',
        text: 'texto de teste, olare texto de texte, lare, texto de tesge, fgdfgdfgdf, gdfgdfgodf, dfgdfgdfg, odfgdfgdfgdfg',
        image: '/slack.jpg',
        type: "Plugin"
    },
    {
        id: 5,
        title: 'Sócios',
        text: 'texto de teste, olare texto de texte, lare, texto de tesge, fgdfgdfgdf, gdfgdfgodf, dfgdfgdfg, odfgdfgdfgdfg',
        image: '/slack.jpg',
        type: "Plugin"
    },
    {
        id: 6,
        title: 'Sócios',
        text: 'texto de teste, olare texto de texte, lare, texto de tesge, fgdfgdfgdf, gdfgdfgodf, dfgdfgdfg, odfgdfgdfgdfg',
        image: '/slack.jpg',
        type: "Plugin"
    },
]

export default function Products() {
    return (
        <div className="px-12 py-12"> {/* Background color lightgray */}
            <h1 className="text-3xl font-bold mb-8">Produtos</h1>
            <p className="text-lg mb-8">Conquista uma base fiel e associados</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {array.map((item) => (
                    <div key={item.id} className="flex flex-col md:flex-row items-center p-6 rounded">
                        {/* Imagem à esquerda */}
                        <div className="mb-4 md:mb-0 md:mr-6">
                            <img src={item.image} alt={item.title} className="w-24 h-24 object-cover rounded" />
                        </div>
                        {/* Texto à direita */}
                        <div className="text-left">
                            <h2 className="text-2xl font-bold mb-3">{item.title}</h2>
                            <p className="text-sm text-gray-700 mb-3">{item.text}</p>
                            <Chip color="warning" variant="shadow">{item.type}</Chip>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
