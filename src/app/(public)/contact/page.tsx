"use client";

import { useState } from "react";
import { Instagram, Mail, Phone, Send, Sparkles, Check } from "lucide-react";
import { EMAIL_USER, PHONE_NUMBER } from "@/mocks";
import { motion } from "framer-motion";

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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitMessage(
        "Thank you for your message! I'll get back to you soon."
      );
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1000);
  };

  const services = [
    "Custom Illustrations",
    "Book & Editorial Illustrations",
    "Character Design",
    "Brand Illustrations",
    "Digital Art Commissions",
  ];

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: EMAIL_USER,
      subtitle: "I typically respond within 24 hours",
      color: "bg-pink-200",
      iconColor: "text-pink-600",
    },
    {
      icon: Instagram,
      title: "Social Media",
      value: "@lan_illustration",
      subtitle: "Follow for daily art updates",
      color: "bg-purple-200",
      iconColor: "text-purple-600",
    },
    {
      icon: Phone,
      title: "Phone",
      value: PHONE_NUMBER,
      subtitle: "Available Mon-Fri, 9AM-6PM (GMT+7)",
      color: "bg-green-200",
      iconColor: "text-green-600",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-green-100/80 text-green-600 rounded-full text-base font-medium mb-6"
        >
          <Sparkles className="w-4 h-4" />
          Get in Touch
          <Sparkles className="w-4 h-4" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-4xl md:text-5xl font-bold mb-6"
          style={{ fontFamily: "Pacifico, cursive" }}
        >
          <span className="bg-gradient-to-r from-green-500 via-teal-500 to-green-500 bg-clip-text text-transparent">
            Let&apos;s Work Together
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
          style={{ fontFamily: "Patrick Hand, cursive" }}
        >
          Have a project in mind? I&apos;d love to hear about it and bring your
          creative vision to life.
        </motion.p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-16">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="absolute -inset-4 bg-gradient-to-r from-pink-100 to-purple-100 rounded-3xl blur-xl opacity-40" />
          <div className="relative bg-white rounded-2xl shadow-xl p-8">
            <h2
              className="text-2xl font-semibold mb-6 text-gray-800"
              style={{ fontFamily: "Pacifico, cursive" }}
            >
              Send me a message
            </h2>

            {submitMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-green-100 border border-green-300 rounded-xl text-green-700 flex items-center gap-3"
              >
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <span style={{ fontFamily: "Patrick Hand, cursive" }}>
                  {submitMessage}
                </span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                    style={{ fontFamily: "Patrick Hand, cursive" }}
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                    placeholder="Your name"
                    style={{ fontFamily: "Patrick Hand, cursive" }}
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                    style={{ fontFamily: "Patrick Hand, cursive" }}
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                    placeholder="your.email@example.com"
                    style={{ fontFamily: "Patrick Hand, cursive" }}
                  />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-2"
                  style={{ fontFamily: "Patrick Hand, cursive" }}
                >
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                  placeholder="Project inquiry, collaboration, etc."
                  style={{ fontFamily: "Patrick Hand, cursive" }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                  style={{ fontFamily: "Patrick Hand, cursive" }}
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all resize-none bg-gray-50 focus:bg-white"
                  placeholder="Tell me about your project, timeline, budget, and any specific requirements..."
                  style={{ fontFamily: "Patrick Hand, cursive" }}
                />
              </motion.div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 px-6 rounded-xl font-medium hover:shadow-lg hover:shadow-pink-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                style={{ fontFamily: "Patrick Hand, cursive", fontSize: "1.1rem" }}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Contact Details */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-pink-100 to-purple-100 rounded-3xl blur-xl opacity-40" />
            <div className="relative bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-8">
              <h2
                className="text-2xl font-semibold mb-6 text-gray-800"
                style={{ fontFamily: "Pacifico, cursive" }}
              >
                Get in touch
              </h2>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                    className="flex items-start space-x-4 group cursor-pointer"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`w-12 h-12 ${info.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl transition-shadow`}
                    >
                      <info.icon className={`w-6 h-6 ${info.iconColor}`} />
                    </motion.div>
                    <div>
                      <h3
                        className="font-semibold text-gray-800"
                        style={{ fontFamily: "Pacifico, cursive" }}
                      >
                        {info.title}
                      </h3>
                      <p
                        className="text-gray-600"
                        style={{ fontFamily: "Patrick Hand, cursive" }}
                      >
                        {info.value}
                      </p>
                      <p
                        className="text-sm text-gray-500 mt-1"
                        style={{ fontFamily: "Patrick Hand, cursive" }}
                      >
                        {info.subtitle}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Project Types */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-3xl blur-xl opacity-30" />
            <div className="relative bg-white rounded-2xl shadow-xl p-8">
              <h3
                className="text-xl font-semibold mb-4 text-gray-800"
                style={{ fontFamily: "Pacifico, cursive" }}
              >
                What I can help with
              </h3>
              <div className="space-y-3">
                {services.map((service, index) => (
                  <motion.div
                    key={service}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.08 }}
                    whileHover={{ x: 5 }}
                    className="flex items-center group"
                  >
                    <motion.span
                      whileHover={{ scale: 1.5 }}
                      className="w-2 h-2 bg-pink-400 rounded-full mr-3 group-hover:bg-pink-500 transition-colors"
                    />
                    <span
                      className="text-gray-600 group-hover:text-pink-500 transition-colors"
                      style={{ fontFamily: "Patrick Hand, cursive" }}
                    >
                      {service}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Response Time */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl p-6 text-center border border-green-100"
          >
            <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-3">
              <Check className="w-6 h-6 text-green-600" />
            </div>
            <h3
              className="font-semibold text-gray-800 mb-2"
              style={{ fontFamily: "Pacifico, cursive" }}
            >
              Quick Response Guaranteed
            </h3>
            <p
              className="text-sm text-gray-600"
              style={{ fontFamily: "Patrick Hand, cursive" }}
            >
              I aim to respond to all inquiries within 24 hours. For urgent
              projects, please mention it in your message.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
