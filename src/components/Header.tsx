"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { Howl, Howler } from "howler";
import { useRouter } from "next/router";
import Link from "next/link";
import { Search } from "lucide-react";
import { Input } from "./ui/input";

interface headerProps {
  title?: string;
}
const sound = new Howl({
  src: ["sound.mp3"],
  volume: 1,
});

const playSound = () => {
  sound.play();
};

const Header: React.FC<headerProps> = ({ title }) => {
  const { setTheme, theme } = useTheme();

  const handleChangeTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    playSound();
  };
  return (
    <div className="w-full">
      <div className="flex items-end justify-between ">
        <h2 className=" text-2xl font-semibold">{title}</h2>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <SunIcon
                  className={`h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 `}
                />
                <MoonIcon
                  className={`absolute  h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 ${
                    theme === "dark" && "text-white"
                  }`}
                />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleChangeTheme}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleChangeTheme}>
                Dark
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="w-[40px] h-[40px] rounded-full ">
            <Link href="/profile">
              <Image
                src={
                  "https://buffer.com/resources/content/images/resources/wp-content/uploads/2015/03/adjust-tie.jpeg"
                }
                width={40}
                height={40}
                alt="pdp"
                className="w-[40px] h-[40px] rounded-full border border-gray-600 border-2 object-cover"
              />
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between items-center md:flex-row">
        <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <form>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search" className="pl-8" />
            </div>
          </form>
        </div>
        <div
          className={` ${
            theme === "dark" ? "bg-white" : "bg-[#0c142c]"
          } px-4 py-2 w-[300px] rounded-sm text-center`}
        >
          <h2
            className={`${theme === "dark" ? "text-[#0c142c]" : "text-white"}`}
          >
            January 22,2024 22:52 pm
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Header;
