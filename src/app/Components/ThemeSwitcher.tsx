// app/components/ThemeSwitcher.tsx
"use client";

import {useTheme} from "next-themes";
import { useEffect, useState } from "react";
import {Switch} from "@nextui-org/react";
import {MoonIcon} from "../icons/MoonIcon";
import {SunIcon} from "../icons/SunIcon";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if(!mounted) return null

  const changeButton = (val) => {
    console.log("val")
    console.log(val)
    if (val == 'light') {
        setTheme('dark')
    } else {
        setTheme('light')
    }
  }

  return (
    <>
        <Switch
            onValueChange={() => changeButton(theme)}
            isSelected={theme && theme == 'dark' ? false : true}
            size="md"
            color="success"
            startContent={<SunIcon />}
            endContent={<MoonIcon />}
            >
        </Switch>
    </>
  )
};