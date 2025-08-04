import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-white relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Get in Touch
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Reach out to us with any questions. We're here to support your learning journey.
          </p>
        </div>

        {/* Grid layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Contact Info */}
          <div className="space-y-8">
            {[
              {
                icon: Mail,
                title: 'Email Us',
                value: 'support@queryverse.cdac.in',
                color: 'from-purple-100 to-purple-200',
                iconColor: 'text-purple-600',
              },
              {
                icon: Phone,
                title: 'Call Us',
                value: '+91 20 2570 4000',
                color: 'from-blue-100 to-blue-200',
                iconColor: 'text-blue-600',
              },
              {
                icon: MapPin,
                title: 'Visit Us',
                value: 'CDAC Pune, Ganeshkhind Road, Pune - 411007',
                color: 'from-green-100 to-green-200',
                iconColor: 'text-green-600',
              },
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-5">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-inner`}>
                  <item.icon className={`${item.iconColor}`} size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                  <p className="text-gray-600">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200 hover:shadow-2xl transition duration-300">
            <form className="space-y-6">
              {['Name', 'Email'].map((label, index) => (
                <div key={index}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
                  <input
                    type={label === 'Email' ? 'email' : 'text'}
                    placeholder={`Your ${label}`}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  rows={4}
                  placeholder="Type your message here..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
