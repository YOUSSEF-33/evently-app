"use client";
import Link from "next/link";
import React from "react";
import { headerLinks } from "@/constants";
import { usePathname } from "next/navigation";

const NavItems = () => {
  const path = usePathname();
  return (
    <div className="">
      <ul className="flex justify-between md:items-center md:flex-row flex-col gap-5">
        {headerLinks.map((item) => {
          const isActive = path === item.route;
          return (
        <li key={item.label} className={`text-lg ${isActive && "text-primary-500"}`}>
              <Link href={item.route}>{item.label}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default NavItems;
