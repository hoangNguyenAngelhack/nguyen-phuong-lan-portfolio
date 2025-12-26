"use client";

import { cn } from "@/lib/utils";
import { LINKS, PERSONAL } from "@/mocks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";

export const Header = () => {
  const pathname = usePathname();

  const menu = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full flex flex-col items-center justify-center sticky top-0 bg-[#fffaf6]/80 backdrop-blur-md z-20 h-[131px] max-sm:h-[110px] border-b border-pink-100/50"
    >
      <div className="max-w-[1200px] w-full flex flex-col relative px-4 max-sm:px-2 py-4 max-sm:py-2">
        <div className="flex items-center w-full relative min-h-[48px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto text-center"
          >
            <Link href="/">
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="text-3xl max-sm:text-lg font-bold tracking-widest whitespace-nowrap bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 bg-clip-text text-transparent bg-[length:200%_auto] hover:animate-gradient cursor-pointer inline-block"
              >
                {PERSONAL}
              </motion.span>
            </Link>
          </motion.div>
          <motion.a
            href={LINKS.behance}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.1, rotate: 360 }}
            className="absolute right-0 max-sm:hidden"
          >
            <Image
              src="/images/behance.png"
              className="sm:size-[40px]"
              alt="Behance Logo"
              width={40}
              height={40}
            />
          </motion.a>
        </div>
        <nav className="h-[40px] max-sm:h-[36px] w-full flex flex-wrap justify-center items-center">
          {menu.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
            >
              <Link
                href={item.path}
                className={cn(
                  "relative mx-4 max-sm:mx-2 my-1 text-[20px] max-sm:text-[14px] transition-colors duration-300",
                  {
                    "font-bold text-pink-500": pathname === item.path,
                    "font-normal text-gray-600 hover:text-pink-400":
                      pathname !== item.path,
                  }
                )}
              >
                <motion.span
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="inline-block"
                >
                  {item.name}
                </motion.span>
                {pathname === item.path && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            </motion.div>
          ))}
        </nav>
      </div>
    </motion.header>
  );
};
