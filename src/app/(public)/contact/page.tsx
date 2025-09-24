"use client";
import { useState } from "react";
import { Instagram, Mail, Phone } from "lucide-react";

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
        "Thank you for your message! I&apos;ll get back to you soon."
      );
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1000);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
          Let&apos;s Work Together
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Have a project in mind? I&apos;d love to hear about it and bring your
          creative vision to life.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-16">
        {/* Contact Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Send me a message
          </h2>

          {submitMessage && (
            <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-lg text-green-700">
              {submitMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700 mb-2"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-colors"
                placeholder="Project inquiry, collaboration, etc."
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-2"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-colors resize-none"
                placeholder="Tell me about your project, timeline, budget, and any specific requirements..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-pink-500 text-white py-4 px-6 rounded-lg font-medium hover:bg-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="space-y-8">
          {/* Contact Details */}
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Get in touch
            </h2>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-pink-200 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-pink-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Email</h3>
                  <p className="text-gray-600">contact@lannguyen.com</p>
                  <p className="text-sm text-gray-500 mt-1">
                    I typically respond within 24 hours
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-200 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Instagram className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Social Media</h3>
                  <p className="text-gray-600">@lan_illustration</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Follow for daily art updates
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-200 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Phone</h3>
                  <p className="text-gray-600">+84 123 456 789</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Available Mon-Fri, 9AM-6PM (GMT+7)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Project Types */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              What I can help with
            </h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="w-2 h-2 bg-pink-400 rounded-full mr-3"></span>
                <span className="text-gray-600">Custom Illustrations</span>
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-pink-400 rounded-full mr-3"></span>
                <span className="text-gray-600">
                  Book & Editorial Illustrations
                </span>
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-pink-400 rounded-full mr-3"></span>
                <span className="text-gray-600">Character Design</span>
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-pink-400 rounded-full mr-3"></span>
                <span className="text-gray-600">Brand Illustrations</span>
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-pink-400 rounded-full mr-3"></span>
                <span className="text-gray-600">Digital Art Commissions</span>
              </div>
            </div>
          </div>

          {/* Response Time */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 text-center">
            <h3 className="font-semibold text-gray-800 mb-2">
              Quick Response Guaranteed
            </h3>
            <p className="text-sm text-gray-600">
              I aim to respond to all inquiries within 24 hours. For urgent
              projects, please mention it in your message.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
