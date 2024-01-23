"use client";

import Link from "next/link";
import { ChevronDown, LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NavProps {
  isCollapsed: boolean;
  links: {
    title: string;
    label?: string;
    icon: LucideIcon;
    variant: "default" | "ghost";
    href: string;
    subMenu?: {
      title?: string;
      label?: string;
      icon?: LucideIcon;
      variant?: "default" | "ghost";
      href: string;
    }[];
  }[];
}

export function Nav({ links, isCollapsed }: NavProps) {
  const pathName = usePathname();
  const { theme } = useTheme();
  const [submenuToggle, setSubmenuToggle] = useState(false);

  const toggleSubMenu = () => {
    setSubmenuToggle(!submenuToggle);
  };
  useEffect(() => {
    if (
      pathName === "/products/productsManagement" ||
      pathName === "/products/editProduct"
    ) {
      setSubmenuToggle(true);
    }
  }, [pathName]);

  return (
    <TooltipProvider>
      <div
        data-collapsed={isCollapsed}
        className={`group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2 ${
          theme === "dark" ? "text-white" : "text-black"
        }`}
      >
        <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
          {links.map((link, index) =>
            isCollapsed ? (
              <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href={link.href}
                    className={cn(
                      buttonVariants({
                        variant: link.href === pathName ? "default" : "ghost",
                        size: "icon",
                      }),
                      "h-9 w-9",
                      link.variant === "default" &&
                        "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                    )}
                  >
                    <link.icon className="h-4 w-4" />
                    <span className="sr-only">{link.title}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="flex items-center gap-4"
                >
                  {link.title}
                  {link.label && (
                    <span className="ml-auto text-muted-foreground">
                      {link.label}
                    </span>
                  )}
                </TooltipContent>
              </Tooltip>
            ) : (
              <>
                <Link
                  key={index}
                  href={link.href}
                  className={cn(
                    buttonVariants({
                      variant: link.href === pathName ? "default" : "ghost",
                      size: "sm",
                    }),
                    link.variant === "default" &&
                      "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                    "justify-start transition-all duration-300 delay-300"
                  )}
                >
                  <div
                    className="flex items-center justify-between w-full transition-all duration-300 delay-300"
                    onClick={toggleSubMenu}
                  >
                    <div className="flex items-center ">
                      <link.icon className="mr-2 h-4 w-4" />
                      {link.title}
                    </div>
                    {link.subMenu ? (
                      <ChevronDown
                        className={` ${
                          submenuToggle
                            ? "transition-all duration-150 delay-150"
                            : "-rotate-90 transition-all duration-300 delay-300"
                        } `}
                      />
                    ) : (
                      ""
                    )}
                  </div>

                  {link.label && (
                    <span
                      className={cn(
                        "ml-auto",
                        link.variant === "default" &&
                          "text-background dark:text-white"
                      )}
                    >
                      {link.label}
                    </span>
                  )}
                </Link>
                <AnimatePresence>
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 105 },
                      visible: { opacity: 1.5, y: 0 },
                    }}
                    initial={submenuToggle ? "visible" : "hidden"}
                    animate={submenuToggle ? "visible" : "hidden"}
                    className="w-10"
                  >
                    {link.subMenu && submenuToggle
                      ? link.subMenu.map((item, i) => (
                          <Link
                            key={i}
                            href={link.href + "/" + item.href}
                            className={cn(
                              buttonVariants({
                                variant:
                                  link.href + "/" + item.href === pathName
                                    ? "default"
                                    : "ghost",
                                size: "sm",
                              }),
                              item.variant === "default" &&
                                "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                              "justify-start ml-6 "
                            )}
                          >
                            <div className="flex gap-1 items-center">
                              <div className=" w-2 h-2 bg-[#0c142c] rounded-full"></div>
                              {item.title}
                            </div>

                            {item.label && (
                              <span
                                className={cn(
                                  "ml-auto",
                                  link.variant === "default" &&
                                    "text-background dark:text-white"
                                )}
                              >
                                {item.label}
                              </span>
                            )}
                          </Link>
                        ))
                      : ""}
                  </motion.div>
                </AnimatePresence>
              </>
            )
          )}
        </nav>
      </div>
    </TooltipProvider>
  );
}
