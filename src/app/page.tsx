"use client";
import Barchart from "@/components/Barchart";
import Card, { CardContent, CardProps } from "@/components/Card";
import PageTitle from "@/components/PageTitle";
import SalesCard, { SalesProps } from "@/components/SalesCard";
import { DollarSign, Users, CreditCard, Activity } from "lucide-react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Howl, Howler } from "howler";

const cardData: CardProps[] = [
  {
    label: "Total des Revenus",
    amount: "45 231 890 Ar",
    description: "+20.1% du mois dernier",
    icon: DollarSign,
  },
  {
    label: "Abonnements",
    amount: "+2350",
    description: "+180.1% du mois dernier",
    icon: Users,
  },
  {
    label: "Ventes",
    amount: "+12,234",
    description: "+19% du mois dernier",
    icon: CreditCard,
  },
  {
    label: "Actif maintenant",
    amount: "+573",
    description: "+201 depuis la dernière heure",
    icon: Activity,
  },
];
const uesrSalesData: SalesProps[] = [
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    saleAmount: "+15.000.000 Ar",
  },
  {
    name: "Jackson Lee",
    email: "isabella.nguyen@email.com",
    saleAmount: "+15.000.000 Ar",
  },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    saleAmount: "+15.000.000 Ar",
  },
  {
    name: "William Kim",
    email: "will@email.com",
    saleAmount: "+15.000.000 Ar",
  },
  {
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    saleAmount: "+15.000.000 Ar",
  },
];

const sound = new Howl({
  src: ["sound.mp3"],
  volume: 1,
});

const playSound = () => {
  sound.play();
};

export default function Home() {
  const { setTheme, theme } = useTheme();

  const handleChangeTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    playSound();
  };

  return (
    <div
      className={`flex flex-col gap-5 w-full ${
        theme === "dark" ? "text-white" : "text-black"
      }`}
    >
      <div className="flex justify-between items-center">
        <PageTitle title="Dashboard" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <SunIcon
                className={`h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 `}
              />
              <MoonIcon
                className={`absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 `}
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
      </div>
      <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">
        {cardData.map((items, index) => (
          <Card
            key={index}
            label={items.label}
            icon={items.icon}
            amount={items.amount}
            description={items.description}
          />
        ))}
      </section>
      <section className="grid grid-cols-1 gap-4 transition-all lg:grid-cols-2">
        <CardContent>
          <p className="p-4 font-semibold">Aperçu</p>
          <Barchart />
        </CardContent>
        <CardContent>
          <section>
            <p>Ventes récentes</p>
            <p className="text-sm text-gray-400">
              Vous avez réalisé 265 ventes ce mois-ci
            </p>
          </section>
          {uesrSalesData.map((d, i) => (
            <SalesCard
              key={i}
              email={d.email}
              name={d.name}
              saleAmount={d.saleAmount}
            />
          ))}
        </CardContent>
      </section>
    </div>
  );
}
