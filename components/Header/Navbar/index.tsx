"use client";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import Link from "next/link";
import { usePathname } from "next/navigation";
export const NavLink = ({
  href,
  pathname,
  children,
}: {
  href: string;
  pathname: string;
  children?: React.ReactNode;
}) => {
  const active = href === pathname;
  const styles = {
    ...(active && { className: "text-blue-600 font-bold" }),
  };

  const navStyle = navigationMenuTriggerStyle(styles as any);

  return (
    <Link href={href} legacyBehavior passHref>
      <NavigationMenuLink className={navStyle}>
        <span className="w-24">{children}</span>
      </NavigationMenuLink>
    </Link>
  );
};
export default function Navbar() {
  const pathname = usePathname();
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="h-14">
            CodeCruncher
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuIndicator />
            <NavLink href="/" pathname={pathname}>
              Home
            </NavLink>
            <NavLink href="/docs" pathname={pathname}>
              Docs
            </NavLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
