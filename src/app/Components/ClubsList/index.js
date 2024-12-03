import { Button } from "@nextui-org/react";
import React from "react";

const array = [
    {
        id: 1,
        title: 'VFC Mindense',
        image: 'https://fpfimagehandler.fpf.pt/ScoreImageHandler.ashx?type=Organization&id=1609',
        country: 'Portugal',
    },
    {
        id: 2,
        title: 'VFC Mindense',
        image: 'https://fpfimagehandler.fpf.pt/ScoreImageHandler.ashx?type=Organization&id=1609',
        country: 'Portugal',
    },
    {
        id: 3,
        title: 'VFC Mindense',
        image: 'https://fpfimagehandler.fpf.pt/ScoreImageHandler.ashx?type=Organization&id=1609',
        country: 'Portugal',
    },
    {
        id: 4,
        title: 'VFC Mindense',
        image: 'https://fpfimagehandler.fpf.pt/ScoreImageHandler.ashx?type=Organization&id=1609',
        country: 'Portugal',
    },
    {
        id: 5,
        title: 'VFC Mindense',
        image: 'https://fpfimagehandler.fpf.pt/ScoreImageHandler.ashx?type=Organization&id=1609',
        country: 'Portugal',
    },
    {
        id: 6,
        title: 'VFC Mindense',
        image: 'https://fpfimagehandler.fpf.pt/ScoreImageHandler.ashx?type=Organization&id=1609',
        country: 'Portugal',
    },
    {
        id: 7,
        title: 'VFC Mindense',
        image: 'https://fpfimagehandler.fpf.pt/ScoreImageHandler.ashx?type=Organization&id=1609',
        country: 'Portugal',
    },
    {
        id: 8,
        title: 'VFC Mindense',
        image: 'https://fpfimagehandler.fpf.pt/ScoreImageHandler.ashx?type=Organization&id=1609',
        country: 'Portugal',
    },
    {
        id: 9,
        title: 'VFC Mindense',
        image: 'https://fpfimagehandler.fpf.pt/ScoreImageHandler.ashx?type=Organization&id=1609',
        country: 'Portugal',
    },
    {
        id: 10,
        title: 'VFC Mindense',
        image: 'https://fpfimagehandler.fpf.pt/ScoreImageHandler.ashx?type=Organization&id=1609',
        country: 'Portugal',
    },
];

export default function ClubsList() {
    return (
        <div className="w-full px-12 py-12">
            {/* Grid com responsividade ajustada */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                {/* Renderizando os itens do array dinamicamente */}
                {array.map((item) => (
                    <div key={item.id} className="flex items-center shadow-sm rounded-lg p-1">
                        {/* Foto à esquerda */}
                        <div className="p-1">
                            <img src={item.image} alt={item.title} className="w-12 h-12 object-cover rounded-full" />
                        </div>

                        {/* Texto à direita */}
                        <div className="ml-2">
                            <h1 className="text-xs font-semibold">{item.title}</h1>
                            <p className="text-xs text-gray-500">{item.country}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
