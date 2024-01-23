"use client";
import React, { useEffect, useState } from "react";
import { Nav } from "./ui/Nav";
import {
  LayoutDashboard,
  UserRound,
  ShoppingBag,
  GanttChartSquare,
  Settings,
  ChevronRight,
} from "lucide-react";
import { Button } from "./ui/button";
import { useWindowWidth } from "@react-hook/window-size";
import { usePathname } from "next/navigation";

type Props = {};

export default function SideNavbar({}: Props) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const onlyWidth = useWindowWidth();
  const pathname = usePathname();
  const mobileSize = onlyWidth < 768;
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`relative min-w-[80px] md:min-w-[250px] border-r px-3 pb-10 pt-24 ${
        isCollapsed && "md:min-w-[80px]"
      }`}
    >
      {!mobileSize && (
        <div className="absolute top-3 right-[-20px]">
          <Button
            variant="secondary"
            className=" rounded-full p-2 "
            onClick={toggleSidebar}
          >
            <ChevronRight />
          </Button>
        </div>
      )}
      <Nav
        isCollapsed={mobileSize ? true : isCollapsed}
        links={[
          {
            title: "Tableau de bord",
            href: "/",
            icon: LayoutDashboard,
            variant: "default",
          },
          {
            title: "Utilisateurs",
            href: "/users",
            icon: UserRound,
            variant: "ghost",
          },
          {
            title: "Commandes",
            href: "/orders",
            icon: ShoppingBag,
            variant: "ghost",
          },
          {
            title: "Produits",
            href: "/products",
            icon: GanttChartSquare,
            variant: "ghost",
          },
          {
            title: "Parametre",
            href: "/settings",
            icon: Settings,
            variant: "ghost",
          },
        ]}
      />
    </div>
  );
}
