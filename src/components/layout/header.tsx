"use client";
import { cn } from "@/lib/utils";
import { LINKS, PERSONAL } from "@/mocks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export const Header = () => {
  const pathname = usePathname();

  const menu = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="w-full flex flex-col items-center justify-center sticky top-0 bg-transparent z-20 h-[131px] max-sm:h-[110px]">
      <div className="max-w-[1200px] w-full flex flex-col relative px-4 max-sm:px-2 py-4 max-sm:py-2">
        <div className="flex items-center w-full relative min-h-[48px]">
          <div className="mx-auto text-center text-3xl max-sm:text-lg font-bold tracking-widest whitespace-nowrap">
            {PERSONAL}
          </div>
          <a
            href={LINKS.behance}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute right-0 max-sm:hidden hover:rotate-360 transition-transform duration-300"
          >
            <Image
              src="/images/behance.png"
              className="sm:size-[40px]"
              alt="Behance Logo"
              width={40}
              height={40}
            />
          </a>
        </div>
        <nav className="h-[40px] max-sm:h-[36px] w-full flex flex-wrap justify-center items-center">
          {menu.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={cn(
                "mx-4 max-sm:mx-2 my-1 text-[20px] max-sm:text-[14px]",
                {
                  "font-bold underline underline-offset-4":
                    pathname === item.path,
                  "font-normal": pathname !== item.path,
                }
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};
