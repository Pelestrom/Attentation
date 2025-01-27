import React, { useState } from 'react';
import { Mic, MicOff } from 'lucide-react';
import useSound from 'use-sound';
import clickSound from '../assets/sounds/click.mp3';

interface VoiceSearchProps {
  onSearchChange: (value: string) => void;
}

export const VoiceSearch: React.FC<VoiceSearchProps> = ({ onSearchChange }) => {
  const [isListening, setIsListening] = useState(false);
  const [playClick] = useSound(clickSound, { volume: 0.5 });

  const startListening = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.lang = 'fr-FR';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        playClick();
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        onSearchChange(transcript);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    }
  };

  return (
    <button
      onClick={startListening}
      className={`p-2 rounded-full transition-all duration-200 ${
        isListening ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
      } hover:scale-110`}
      title="Recherche vocale"
    >
      {isListening ? (
        <MicOff className="w-5 h-5 animate-pulse" />
      ) : (
        <Mic className="w-5 h-5" />
      )}
    </button>
  );
};