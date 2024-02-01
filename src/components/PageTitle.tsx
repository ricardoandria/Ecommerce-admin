import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { title } from "process";
import React from "react";

type Props = {
  title: string;
  className?: string;
};

const PageTitle = ({ title, className }: Props) => {
  const { theme } = useTheme();
  return (
    <h1
      className={cn(
        `text-2xl, font-semibold ${
          theme !== "light" ? "text-white" : "text-black"
        }`,
        className
      )}
    >
      {title}
    </h1>
  );
};

export default PageTitle;
