import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";

export type CardProps = {
  label: string;
  icon: LucideIcon;
  amount: string;
  description: string;
};

const Card = (props: CardProps) => {
  const { theme } = useTheme();
  return (
    <CardContent>
      <section className="flex justify-between gap-2">
        <p
          className={`text-sm ${
            theme !== "light" ? "text-white" : "text-black"
          }`}
        >
          {props.label}
        </p>
        <props.icon
          className={`${theme !== "light" ? "text-white" : "text-black"} h-4
          w-4
          text-gray-400`}
        />
      </section>
      <section
        className={`${
          theme !== "light" ? "text-white" : "text-black"
        } flex flex-col gap-1`}
      >
        <h2 className=" text-2xl font-semibold">{props.amount}</h2>
        <p className="text-xs text-gray-500">{props.description}</p>
      </section>
    </CardContent>
  );
};

export const CardContent = (props: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={cn(
        "flex w-full flex-col gap-3 rounded-xl border p-5 shadow",
        props.className
      )}
    />
  );
};

export default Card;
