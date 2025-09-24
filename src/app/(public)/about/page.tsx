import Image from "next/image";
import Link from "next/link";

const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
          About Me
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Hello, I&apos;m Lan - a passionate illustrator and digital artist
          based in Vietnam, creating vibrant artworks that tell stories and
          capture emotions.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid md:grid-cols-2 gap-16 items-center mb-16">
        {/* Artist Photo */}
        <div className="order-2 md:order-1">
          <div className="aspect-[4/5] bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl shadow-lg overflow-hidden">
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              <Image
                src="/images/profile.jpg"
                alt="Artist Photo"
                className="object-cover w-full h-auto"
                width={400}
                height={500}
              />
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="order-1 md:order-2 space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              My Journey
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              My artistic journey began with a simple love for colors and
              storytelling. What started as childhood sketches has evolved into
              a professional practice of creating illustrations that bridge the
              gap between imagination and reality.
            </p>
            <p className="text-gray-600 leading-relaxed">
              I specialize in digital illustration, character design, and
              editorial artwork. My work is inspired by everyday moments,
              cultural heritage, and the beauty found in ordinary life.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              Specialties
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-pink-400 rounded-full mr-3"></span>
                Digital Illustration
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-pink-400 rounded-full mr-3"></span>
                Character Design
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-pink-400 rounded-full mr-3"></span>
                Editorial Artwork
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-pink-400 rounded-full mr-3"></span>
                Book Illustration
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Skills & Process */}
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-8 md:p-12 mb-16">
        <h2 className="text-3xl font-semibold text-center mb-12 text-gray-800">
          My Creative Process
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-pink-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💭</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">Inspiration</h3>
            <p className="text-gray-600 text-sm">
              I find inspiration in daily life, nature, and cultural stories
              that deserve to be told.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✏️</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">Sketching</h3>
            <p className="text-gray-600 text-sm">
              Every piece begins with rough sketches and concept development on
              paper.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-pink-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎨</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">Digital Magic</h3>
            <p className="text-gray-600 text-sm">
              I bring sketches to life using digital tools, adding colors,
              textures, and details.
            </p>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Let&apos;s Create Something Beautiful Together
        </h2>
        <p className="text-gray-600 mb-8 max-w-xl mx-auto">
          Whether you&apos;re looking for custom illustrations, character
          designs, or editorial artwork, I&apos;d love to hear about your
          project and bring your vision to life.
        </p>
        <div className="space-x-4">
          <a
            href="mailto:contact@example.com"
            className="inline-block bg-pink-500 text-white px-8 py-3 rounded-full font-medium hover:bg-pink-600 transition-colors"
          >
            Get In Touch
          </a>
          <Link
            href="/"
            className="inline-block border-2 border-pink-500 text-pink-500 px-8 py-3 rounded-full font-medium hover:bg-pink-500 hover:text-white transition-colors"
          >
            View Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
