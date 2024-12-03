'use client';

import Image from "next/image";
import { useSelector, useDispatch } from 'react-redux';
import {Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import ProtectedRoute from '../Components/protectedRoute/protectedRoute'

import {
	addVal,
  menosVal,
  valorAtualContador
} from '../../../slices/contador';

import React , {useEffect } from "react"

export default function Home() {
  const dispatch = useDispatch();

  let valor = useSelector(valorAtualContador);

  useEffect(() => {
    console.log("teste " + valor)
  }, [valor])


  return (
    <ProtectedRoute>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        
        <h1>Valor atual:</h1>
        <p>{valor}</p>
        <Button onClick={() =>dispatch(menosVal())}> Menos</Button>
        <Button onClick={() =>dispatch(addVal())}> Mais</Button>
        </main>
      </div>
    </ProtectedRoute>
  );
}
