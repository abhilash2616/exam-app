import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Theme } from '@/constants/Theme';
import { Calendar, Clock, ShieldCheck, ChevronLeft, BookOpen } from 'lucide-react-native';

export default function ExamInfoScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { course } = useLocalSearchParams<{ course: string }>();

  const examDetails = [
    { icon: BookOpen, label: 'SELECTED COURSE', value: course || 'Not Selected' },
    { icon: Calendar, label: 'EXAMINATION DATE', value: '25th March 2026' },
    { icon: Clock, label: 'DURATION', value: '120 Minutes' },
    { icon: ShieldCheck, label: 'SECURITY STATUS', value: 'SECURE SESSION READY' }
  ];

  return (
    <View className="flex-1 bg-white">
      <ScrollView 
        contentContainerStyle={{ paddingHorizontal: Theme.spacing.padding, paddingTop: insets.top + 10, paddingBottom: insets.bottom + 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Navigation */}
        <TouchableOpacity 
          className="mb-8 p-1 -ml-1 self-start"
          onPress={() => router.back()}
        >
          <ChevronLeft color={Theme.colors.text} size={28} />
        </TouchableOpacity>

        {/* Welcome Section */}
        <View className="mb-8 items-start px-1">
          <Text className="text-[12px] font-black uppercase tracking-[3px] mb-2" style={{ color: Theme.colors.secondaryText, fontFamily: 'Poppins-Bold' }}>
            Candidate Profile
          </Text>
          <Text className="text-[32px] font-black" style={{ color: Theme.colors.text, fontFamily: 'Poppins-Bold' }}>
            Abhilash
          </Text>
          <Text className="text-base font-normal mt-1" style={{ color: Theme.colors.secondaryText, fontFamily: 'Poppins' }}>
            Verified Student Account
          </Text>
        </View>

        {/* Info Card */}
        <View 
          className="bg-white rounded-2xl p-6 mb-10 shadow-sm shadow-gray-500/10 border"
          style={{ borderColor: Theme.colors.border }}
        >
          {examDetails.map((item, index) => (
            <View key={index} className={`flex-row items-center ${index !== examDetails.length - 1 ? 'mb-8' : ''}`}>
              <View 
                className="w-12 h-12 rounded-xl items-center justify-center mr-4"
                style={{ backgroundColor: Theme.colors.accentBackground }}
              >
                <item.icon color={Theme.colors.primary} size={22} strokeWidth={2.5} />
              </View>
              <View className="flex-1">
                <Text 
                  className="text-[10px] font-black uppercase tracking-widest mb-1"
                  style={{ color: Theme.colors.secondaryText, fontFamily: 'Poppins-Bold' }}
                >
                  {item.label}
                </Text>
                <Text 
                  className="text-base font-bold"
                  style={{ color: Theme.colors.text, fontFamily: 'Poppins' }}
                >
                  {item.value}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Action Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.push('/terms' as any)}
          className="w-full h-18 py-3 rounded-lg items-center justify-center shadow-sm shadow-gray-500/10"
          style={{ 
            backgroundColor: Theme.colors.primary,
            shadowColor: Theme.colors.primary,
            shadowOpacity: 0.2
          }}
        >
          <Text className="text-white text-lg font-black tracking-wider" style={{ fontFamily: 'Poppins-Bold' }}>
            View Exam Instructions
          </Text>
        </TouchableOpacity>

        {/* Bottom Tip */}
        <View className="mt-10 px-4 py-4 rounded-xl bg-gray-50 border border-gray-100">
           <Text className="text-[11px] text-center font-bold leading-5 uppercase tracking-tighter" style={{ color: Theme.colors.secondaryText, fontFamily: 'Poppins' }}>
              PROCTORED SESSION • DO NOT MINIMIZE APP
           </Text>
        </View>
      </ScrollView>
    </View>
  );
}
