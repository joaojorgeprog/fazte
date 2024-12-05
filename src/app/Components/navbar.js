'use client'; 

import React, { useEffect, useState } from "react";
import {Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import {AcmeLogo} from "../icons/AcmeLogo.jsx";
import ThemeSwitcher from "./ThemeSwitcher"
import { useModal } from '../Provider';
import LoginModal from './Modals/login/page.js';
import RegisterModal from './Modals/register/page.js';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User} from "@nextui-org/react";
import { getSession } from 'next-auth/react';
import { signOut } from "next-auth/react"

import {
    fetchMenus,
    selectMenus,
    clearDataMenus
  } from '../../../slices/menus';


import {
    fetchUserData,
    selectUserInfo,
    selectErrorUserInfo 
} from '../../../slices/user';

const session = await getSession();

export default function App({auth}) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [haveLogin, setHaveLogin] = useState(false)
  const [activeMenu, setActiveMenu] = useState("/")
  const dispatch = useDispatch();
  const router = useRouter();

  let userInfo = useSelector(selectUserInfo);

  let menus = useSelector(selectMenus);

  const { openModal } = useModal();

  useEffect(() => {
    console.log("session")
    console.log(session)
  }, [session])

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  /*
  useEffect(() => {
    //execeuta oiniciar a pagina
    dispatch(fetchValidateLogin())
  }, [])

  */
  useEffect(() => {

    if(auth) {
      console.log("auth")
      console.log(auth)
      //ir buscar menus
      dispatch(fetchMenus())
      dispatch(fetchUserData())
    }
  }, [auth])



  const changeMenu = (rota) => {
    setActiveMenu(rota)
    router.push(rota);
  }

  const isActiveCheck = (route) => {
    return router.pathname === route
  };

  const clickLogin = () => {
    window.gtag('event', 'click', {
      event_category: 'Button',    // Categoria do evento
      event_label: 'Click Button Login', // Rótulo do evento
      value: 1                     // Valor opcional
    });

    openModal('loginModal')
  }

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>
        {true && menus.map((item, index) => (
          <NavbarItem key={`${item.tabName}-${index}`}>
            <Button variant={activeMenu == item.route ? "bordered" : ""} color={activeMenu == item.route ? "primary" : "foreground"} onClick={() =>changeMenu(item.route)}>
              {item.tabName}
            </Button>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        {!auth &&
            <NavbarItem className="lg:flex">
            <Button onPress={() => clickLogin()} color="primary">Login</Button>
            </NavbarItem>
        }
        <LoginModal modalName={"loginModal"} />

        {auth && 
          <Dropdown placement="bottom-start">
            <DropdownTrigger>
              <User
                as="button"
                avatarProps={{
                  isBordered: true,
                  src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
                }}
                className="transition-transform"
                description={auth?.user.email || "Undefined"}
                name={auth?.user.name || "Undefined"}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="User Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-bold">Signed in as</p>
                <p className="font-bold">@tonyreichert</p>
              </DropdownItem>
              <DropdownItem key="settings">
                My Settings
              </DropdownItem>
              <DropdownItem key="team_settings">Team Settings</DropdownItem>
              <DropdownItem key="analytics">
                Analytics
              </DropdownItem>
              <DropdownItem key="system">System</DropdownItem>
              <DropdownItem key="configurations">Configurations</DropdownItem>
              <DropdownItem key="help_and_feedback">
                Help & Feedback
              </DropdownItem>
              <DropdownItem key="logout" color="danger" onPress={() => signOut()}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        }
        
        
        <NavbarItem>
            <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
