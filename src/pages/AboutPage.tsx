import React from 'react';
import { BookOpen, CheckCircle, HelpCircle } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Gestion des présences",
      description: "Suivez facilement les présences et absences des étudiants en temps réel."
    },
    {
      icon: CheckCircle,
      title: "Scan RFID",
      description: "Système de badge RFID pour un pointage automatique et sécurisé."
    }
  ];

  const faqs = [
    {
      question: "Comment fonctionne le système RFID ?",
      answer: "Les étudiants scannent leur badge à l'entrée et à la sortie de l'établissement. Le système enregistre automatiquement l'heure et le lieu."
    },
    {
      question: "Comment justifier une absence ?",
      answer: "Les justificatifs doivent être présentés au service de scolarité qui mettra à jour le statut de l'absence."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-fadeIn">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">À propos d'AbsenceManager</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Une solution moderne pour la gestion des présences dans les établissements d'enseignement
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300
                transform hover:scale-[1.02] animate-slideUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-orange-100 rounded-full">
                  <Icon className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600 mt-2">{feature.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-gray-50 rounded-xl p-8 mb-16 animate-fadeIn">
        <div className="flex items-center space-x-3 mb-8">
          <HelpCircle className="w-6 h-6 text-orange-500" />
          <h2 className="text-2xl font-bold text-gray-800">FAQ</h2>
        </div>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-lg shadow animate-slideUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};