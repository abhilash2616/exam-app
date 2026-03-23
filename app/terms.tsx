import { useRouter } from 'expo-router';
import { Check, ChevronLeft, ShieldAlert } from 'lucide-react-native';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Theme } from '@/constants/Theme';

export default function TermsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [agreed, setAgreed] = useState(false);

  const terms = [
    { title: 'Data Privacy', content: 'Your personal data and exam results will be stored securely and will not be shared with third parties.' },
    { title: 'Anti-Cheating Policy', content: 'Any attempt to use external resources, communication devices, or screen recording will result in immediate disqualification.' },
    { title: 'Technical Requirements', content: 'Ensure your device has at least 50% battery or is plugged into a power source. Stable internet is mandatory.' },
    { title: 'Exam Duration', content: 'The timer starts the moment you click "Start Exam". No pauses are allowed during the session.' },
    { title: 'Final Submission', content: 'Answers are auto-submitted when the time expires. Always manually submit if you finish early.' }
  ];

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 px-6 pb-10" style={{ paddingTop: insets.top + 10 }}>
        {/* Header */}
        <View className="flex-row items-center pt-4 pb-10 mb-4 border-b border-gray-100">
          <TouchableOpacity onPress={() => router.back()} className="mr-6">
            <ChevronLeft color={Theme.colors.text} size={28} />
          </TouchableOpacity>
          <Text className="text-2xl font-extrabold" style={{ color: Theme.colors.text }}>
            Terms & Conditions
          </Text>
        </View>

        {/* Content */}
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          <View className="bg-blue-50/50 p-5 rounded-2xl mb-10 flex-row items-center border border-blue-100">
            <ShieldAlert color={Theme.colors.primary} size={24} className="mr-4" />
            <Text className="flex-1 text-sm font-bold leading-5" style={{ color: Theme.colors.primary }}>
              Please read each point carefully before proceeding to the examination.
            </Text>
          </View>

          {terms.map((term, index) => (
            <View key={index} className="mb-10 last:mb-0">
              <View className="flex-row items-center mb-3">
                <View
                  className="w-8 h-8 rounded-lg items-center justify-center mr-4"
                  style={{ backgroundColor: Theme.colors.success }}
                >
                  <Text className="text-white text-sm font-bold">{index + 1}</Text>
                </View>
                <Text className="text-lg font-extrabold" style={{ color: Theme.colors.text }}>
                  {term.title}
                </Text>
              </View>
              <Text
                className="text-base font-medium leading-7 pl-12"
                style={{ color: Theme.colors.secondaryText }}
              >
                {term.content}
              </Text>
            </View>
          ))}
        </ScrollView>

        {/* Bottom Pinned Controls */}
        <View className="pt-8 border-t border-gray-100">
          <TouchableOpacity
            className="flex-row items-center mb-8 bg-gray-50 p-5 rounded-2xl border"
            style={{ borderColor: agreed ? Theme.colors.primary : Theme.colors.border }}
            activeOpacity={0.7}
            onPress={() => setAgreed(!agreed)}
          >
            <View
              className="w-7 h-7 rounded-lg border-2 items-center justify-center mr-4"
              style={{
                borderColor: agreed ? Theme.colors.primary : Theme.colors.border,
                backgroundColor: agreed ? Theme.colors.primary : 'white'
              }}
            >
              {agreed && <Check color="white" size={18} strokeWidth={3} />}
            </View>
            <Text className="flex-1 text-sm font-bold leading-5" style={{ color: Theme.colors.text }}>
              I have read and agree to all the terms listed above for this exam session.
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push('/player' as any)}
            disabled={!agreed}
            className="w-full h-16 rounded-2xl items-center justify-center shadow-lg"
            style={{
              backgroundColor: agreed ? Theme.colors.primary : Theme.colors.disabled,
              shadowColor: Theme.colors.primary,
              shadowOpacity: agreed ? 0.3 : 0
            }}
          >
            <Text className="text-white text-lg font-bold uppercase tracking-widest">
              Start Final Exam
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
