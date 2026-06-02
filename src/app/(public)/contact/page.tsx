"use client";

import { useState } from "react";
import { Instagram, Mail, Phone, Send, Check } from "lucide-react";
import { EMAIL_USER, PHONE_NUMBER, LINKS } from "@/mocks";
import { Reveal } from "@/components/common/reveal";

const services = [
  "Custom Illustrations",
  "Book & Editorial Illustrations",
  "Character Design",
  "Brand Illustrations",
  "Digital Art Commissions",
];

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitMessage("Thank you for your message! I'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: EMAIL_USER,
      subtitle: "I typically respond within 24 hours",
      href: `mailto:${EMAIL_USER}`,
    },
    {
      icon: Instagram,
      title: "Behance",
      value: "View my portfolio",
      subtitle: "Daily art updates",
      href: LINKS.behance,
    },
    {
      icon: Phone,
      title: "Phone",
      value: PHONE_NUMBER,
      subtitle: "Mon–Fri, 9AM–6PM (GMT+7)",
      href: `tel:${PHONE_NUMBER.replace(/\s/g, "")}`,
    },
  ];

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder-white/30 outline-none transition-colors focus:border-[var(--accent)] focus:bg-white/[0.05]";

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <Reveal className="max-w-3xl">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[var(--accent)]">
          Get in touch
        </p>
        <h1 className="font-display text-4xl leading-tight text-white sm:text-6xl">
          Let&apos;s work <span className="text-gradient">together</span>
        </h1>
        <p className="mt-6 text-xl leading-relaxed text-white/55">
          Have a project in mind? I&apos;d love to hear about it and bring your
          creative vision to life.
        </p>
      </Reveal>

      <div className="mt-16 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        {/* Form */}
        <Reveal className="rounded-3xl border border-white/10 bg-white/[0.02] p-8">
          {submitMessage && (
            <div className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-emerald-300">
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500">
                <Check className="h-5 w-5 text-white" />
              </span>
              <span>{submitMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm text-white/60">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm text-white/60">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="mb-2 block text-sm text-white/60">
                Subject *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className={inputClass}
                placeholder="Project inquiry, collaboration, etc."
              />
            </div>

            <div>
              <label htmlFor="message" className="mb-2 block text-sm text-white/60">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className={`${inputClass} resize-none`}
                placeholder="Tell me about your project, timeline and any requirements..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-4 text-sm font-medium text-black transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Send message
                </>
              )}
            </button>
          </form>
        </Reveal>

        {/* Info */}
        <Reveal stagger className="space-y-4">
          {contactInfo.map((info) => (
            <a
              key={info.title}
              href={info.href}
              target={info.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-white/20 hover:bg-white/[0.04]"
            >
              <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] text-white">
                <info.icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-medium text-white">{info.title}</h3>
                <p className="text-white/70">{info.value}</p>
                <p className="mt-1 text-sm text-white/40">{info.subtitle}</p>
              </div>
            </a>
          ))}

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <h3 className="mb-4 font-medium text-white">What I can help with</h3>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s} className="flex items-center gap-3 text-white/60">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default ContactPage;
