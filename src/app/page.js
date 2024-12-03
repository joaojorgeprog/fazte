'use client';

import MainScreen from './Components/MainScreen/index'
import ClubsLis from './Components/ClubsList/index'
import Products from './Components/Products/index'
import Condictions from './Components/Condictions/index'
import { Divider } from "@nextui-org/react";

export default function Home() {

  return (
    <div>
        <MainScreen />
        {false && <ClubsLis />}
        
        <Products />
        <Divider className="my-4" />
        <Condictions />
        <Divider className="my-4" />
    </div>
  );
}
