"use client";

import { LINKS, PERSONAL } from "@/mocks";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export const Footer = () => {
  const socialLinks = [
    { name: "Behance", href: LINKS.behance },
    { name: "Facebook", href: LINKS.facebook },
    { name: "LinkedIn", href: LINKS.linkedin },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full py-8 mt-auto"
    >
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex flex-col items-center gap-4">
          {/* Main info */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-gray-600"
            style={{ fontFamily: "Patrick Hand, cursive" }}
          >
            <span>2025</span>
            <span className="text-pink-300">|</span>
            <span className="font-semibold text-gray-700">{PERSONAL}</span>
            <span className="text-pink-300">|</span>
            <span>PROFESSIONAL ILLUSTRATOR</span>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex items-center gap-4"
          >
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="text-gray-500 hover:text-pink-500 transition-colors px-3 py-1 rounded-full hover:bg-pink-50"
                style={{ fontFamily: "Patrick Hand, cursive" }}
              >
                {link.name}
              </motion.a>
            ))}
          </motion.div>

          {/* Made with love */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex items-center gap-1 text-sm text-gray-400"
            style={{ fontFamily: "Patrick Hand, cursive" }}
          >
            <span>Made with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
            </motion.div>
            <span>in Vietnam</span>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
};
