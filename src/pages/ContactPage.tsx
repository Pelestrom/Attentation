import React, { useState } from 'react';
import { Send, Mail, Phone, MapPin, User } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Envoyer le mail via l'API de votre choix
    window.location.href = `mailto:contact@absencemanager.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(formData.message)}`;
  };

  const teamMembers = [
    {
      name: "Sarah Benali",
      role: "Lead Developer",
      email: "sarah.benali@absencemanager.com",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop"
    },
    {
      name: "Thomas Dubois",
      role: "UI/UX Designer",
      email: "thomas.dubois@absencemanager.com",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-fadeIn">
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Notre équipe</h2>
          <div className="grid gap-6">
            {teamMembers.map((member, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300
                  transform hover:scale-[1.02] animate-slideUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                    <p className="text-gray-600">{member.role}</p>
                    <a 
                      href={`mailto:${member.email}`}
                      className="text-orange-500 hover:text-orange-600 flex items-center mt-2"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      {member.email}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 space-y-6">
            <div className="flex items-center space-x-4 text-gray-600">
              <div className="p-3 bg-gray-100 rounded-full">
                <MapPin className="w-6 h-6 text-orange-500" />
              </div>
              <p>123 Rue de l'Innovation, 75000 Paris</p>
            </div>
            <div className="flex items-center space-x-4 text-gray-600">
              <div className="p-3 bg-gray-100 rounded-full">
                <Phone className="w-6 h-6 text-orange-500" />
              </div>
              <p>+33 1 23 45 67 89</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Contactez-nous</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom complet
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 
                    focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 
                    focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sujet
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 
                  focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 
                  focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 
                transform transition-all duration-200 hover:scale-[1.02] flex items-center justify-center space-x-2"
            >
              <Send className="w-5 h-5" />
              <span>Envoyer le message</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};