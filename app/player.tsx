import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Theme } from '@/constants/Theme';
import { ChevronLeft, Clock, Flag, ChevronRight } from 'lucide-react-native';

const QUESTIONS = [
  {
    id: 1,
    title: 'Quantum Mechanics',
    question: 'Which of the following principles states that it is impossible to simultaneously know both the exact position and momentum of a particle?',
    options: [
      { id: 'A', text: 'Pauli Exclusion Principle' },
      { id: 'B', text: 'Heisenberg Uncertainty Principle' },
      { id: 'C', text: 'Schrödinger’s Cat' },
      { id: 'D', text: 'Einstein’s Relativity' }
    ]
  },
  {
    id: 2,
    title: 'Thermodynamics',
    question: 'The Second Law of Thermodynamics states that the total entropy of an isolated system can never decrease over time. What does this imply for heat flow?',
    options: [
      { id: 'A', text: 'Heat flows from cold to hot naturally' },
      { id: 'B', text: 'Energy is always conserved' },
      { id: 'C', text: 'No engine is 100% efficient' },
      { id: 'D', text: 'Absolute zero is reachable' }
    ]
  },
  {
    id: 3,
    title: 'Electromagnetism',
    question: 'Which law describes the relationship between the number of loops in a coil and the induced voltage when the magnetic flux through it changes?',
    options: [
      { id: 'A', text: 'Faraday’s Law of Induction' },
      { id: 'B', text: 'Ohm’s Law' },
      { id: 'C', text: 'Ampere’s Law' },
      { id: 'D', text: 'Coulomb’s Law' }
    ]
  },
  {
    id: 4,
    title: 'Special Relativity',
    question: 'What happens to the mass of an object as its velocity approaches the speed of light, according to relativistic principles?',
    options: [
      { id: 'A', text: 'The mass decreases linearly' },
      { id: 'B', text: 'The mass remains constant for all observers' },
      { id: 'C', text: 'The apparent mass increases significantly' },
      { id: 'D', text: 'The mass converts entirely to sound waves' }
    ]
  },
  {
    id: 5,
    title: 'Nuclear Physics',
    question: 'Which type of radiation has the highest penetration power and requires lead or concrete for effective shielding?',
    options: [
      { id: 'A', text: 'Alpha particles' },
      { id: 'B', text: 'Beta particles' },
      { id: 'C', text: 'Gamma rays' },
      { id: 'D', text: 'Ultraviolet rays' }
    ]
  }
];

export default function ExamPlayerScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(7200);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    if (!selectedOption) return;
    if (currentQuestionIdx < QUESTIONS.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
      setSelectedOption(null);
    } else {
      router.push('/completion');
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx(prev => prev - 1);
      setSelectedOption(null);
    }
  };

  const current = QUESTIONS[currentQuestionIdx];
  const progress = ((currentQuestionIdx + 1) / QUESTIONS.length) * 100;

  if (!current) return null;

  return (
    <View className="flex-1 bg-white">
      {/* Header Bar */}
      <View style={{ paddingTop: insets.top }}>
        <View className="flex-row items-center justify-between px-6 py-5 border-b border-gray-100">
          <View className="flex-1">
            <Text className="text-xl font-black tracking-tight" style={{ color: Theme.colors.text, fontFamily: 'Poppins-Bold' }}>
              Advanced Physics
            </Text>
            <Text className="text-[10px] font-black uppercase tracking-[2px] mt-0.5 opacity-50" style={{ color: Theme.colors.secondaryText, fontFamily: 'Poppins-Bold' }}>
              SECTION 01 • Q {currentQuestionIdx + 1}/{QUESTIONS.length}
            </Text>
          </View>
          <View 
            className="flex-row items-center px-4 py-2 rounded-xl border border-blue-100"
            style={{ backgroundColor: Theme.colors.accentBackground }}
          >
            <Clock color={Theme.colors.primary} size={16} className="mr-2" />
            <Text className="text-blue-700 font-black text-sm" style={{ fontFamily: 'Poppins-Bold' }}>{formatTime(timeLeft)}</Text>
          </View>
        </View>
      </View>

      {/* Progress Bar */}
      <View className="h-1 w-full bg-gray-50">
        <View 
          className="h-full rounded-r-full"
          style={{ width: `${progress}%`, backgroundColor: Theme.colors.primary }} 
        />
      </View>

      <ScrollView className="flex-1 p-6" showsVerticalScrollIndicator={false}>
        {/* Topic Badge */}
        <View className="bg-gray-100 self-start px-3 py-1.5 rounded-lg mb-6">
          <Text className="text-[10px] text-gray-500 font-black uppercase tracking-widest" style={{ fontFamily: 'Poppins-Bold' }}>{current.title}</Text>
        </View>

        {/* Question Paragraph */}
        <Text className="text-[22px] font-black leading-9 mb-10" style={{ color: Theme.colors.text, fontFamily: 'Poppins-Bold' }}>
          {current.question}
        </Text>

        {/* Option Select */}
        <View className="gap-y-4 pb-20">
          {current.options.map((option) => (
            <TouchableOpacity
              key={option.id}
              onPress={() => setSelectedOption(option.id)}
              activeOpacity={0.8}
              className={`flex-row items-center p-5 rounded-2xl border-2 ${
                selectedOption === option.id 
                  ? 'border-blue-600 bg-blue-50/50' 
                  : 'border-gray-50 bg-white'
              }`}
            >
              <View 
                className={`w-10 h-10 rounded-xl items-center justify-center mr-5 border-2 ${
                  selectedOption === option.id 
                    ? 'border-blue-600 bg-blue-600' 
                    : 'border-gray-100'
                }`}
              >
                <Text className={`text-sm font-black ${selectedOption === option.id ? 'text-white' : 'text-gray-400'}`} style={{ fontFamily: 'Poppins-Bold' }}>
                  {option.id}
                </Text>
              </View>
              <Text className={`flex-1 text-base font-bold ${selectedOption === option.id ? 'text-blue-900' : 'text-gray-500'}`} style={{ fontFamily: 'Poppins' }}>
                {option.text}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Sticky Bottom Bar */}
      <View className="flex-row items-center justify-between px-6 pb-12 pt-6 border-t border-gray-50 bg-white">
        <TouchableOpacity 
          className="flex-row items-center px-4 h-14 rounded-xl bg-gray-50 border border-gray-100"
        >
          <Flag color={Theme.colors.secondaryText} size={20} className="mr-2" strokeWidth={2.5} />
          <Text className="text-gray-500 font-black uppercase tracking-widest text-[10px]" style={{ fontFamily: 'Poppins-Bold' }}>Flag</Text>
        </TouchableOpacity>

        <View className="flex-row items-center gap-x-3">
          <TouchableOpacity 
            onPress={handlePrevious}
            disabled={currentQuestionIdx === 0}
            className={`w-14 h-14 rounded-xl items-center justify-center border ${currentQuestionIdx === 0 ? 'border-gray-50 opacity-30' : 'border-gray-200 bg-white'}`}
          >
            <ChevronLeft color={Theme.colors.text} size={24} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleNext}
            activeOpacity={0.8}
            disabled={!selectedOption}
            className="h-14 px-10 rounded-xl flex-row items-center justify-center shadow-sm"
            style={{ 
              backgroundColor: selectedOption ? Theme.colors.primary : Theme.colors.disabled,
              shadowColor: Theme.colors.primary,
              shadowOpacity: selectedOption ? 0.2 : 0
            }}
          >
            <Text className="text-white text-sm font-black uppercase tracking-wider mr-2" style={{ fontFamily: 'Poppins-Bold' }}>
              {currentQuestionIdx < QUESTIONS.length - 1 ? 'Next Question' : 'Submit Exam'}
            </Text>
            <ChevronRight color="white" size={18} strokeWidth={3} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
