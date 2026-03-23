import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Theme } from '@/constants/Theme';
import { Calendar, Clock, ShieldCheck, ChevronLeft, BookOpen, GraduationCap, ArrowRight } from 'lucide-react-native';

const { width } = Dimensions.get('window');

/**
 * EXAM INFO SCREEN - UX OPTIMIZED FOR EDUCATION 
 * Focus: High trust, clarity, and personalized candidate experience.
 */
export default function ExamInfoScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { course } = useLocalSearchParams<{ course: string }>();

  const examDetails = [
    { 
      icon: BookOpen, 
      label: 'COURSE', 
      value: course || 'Not Selected',
      description: 'Program context'
    },
    { 
      icon: Calendar, 
      label: 'SCHEDULE', 
      value: '25 MAR 2026',
      description: 'Exam slot date'
    },
    { 
      icon: Clock, 
      label: 'DURATION', 
      value: '120 MIN',
      description: 'Auto-submit on'
    },
    { 
      icon: ShieldCheck, 
      label: 'SECURITY', 
      value: 'READY',
      description: 'Secure Mode v1.2'
    }
  ];

  return (
    <View className="flex-1 bg-white">
      {/* Dynamic Background Pattern (Subtle) */}
      <View 
        className="absolute top-0 w-full h-72 opacity-5"
        style={{ backgroundColor: Theme.colors.primary }}
      />
      
      <ScrollView 
        contentContainerStyle={{ 
          paddingBottom: insets.bottom + 40,
          flexGrow: 1
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Navigation & Header Space */}
        <View style={{ paddingTop: insets.top + 12 }} className="px-6 mb-6 flex-row items-center justify-between">
          <TouchableOpacity 
            className="w-11 h-11 rounded-2xl items-center justify-center border"
            style={{ borderColor: Theme.colors.border }}
            onPress={() => router.back()}
          >
            <ChevronLeft color={Theme.colors.text} size={22} />
          </TouchableOpacity>
          <View className="bg-green-50 px-3 py-1 rounded-full border border-green-100">
            <Text className="text-[9px] font-black text-green-700 uppercase tracking-widest" style={{ fontFamily: 'Poppins-Bold' }}>
              • VALIDATED
            </Text>
          </View>
        </View>

        {/* Candidate Profile Hero */}
        <View className="px-6 mb-6 items-center">
          <View 
            className="w-20 h-20 rounded-[28px] items-center justify-center mb-4 shadow-lg"
            style={{ 
              backgroundColor: Theme.colors.primary,
              shadowColor: Theme.colors.primary,
              shadowOpacity: 0.2,
              shadowRadius: 10,
              transform: [{ rotate: '4deg' }]
            }}
          >
            <View style={{ transform: [{ rotate: '-4deg' }] }}>
              <GraduationCap color="white" size={32} strokeWidth={2.5} />
            </View>
          </View>
          
          <Text className="text-[28px] font-black tracking-tight" style={{ color: Theme.colors.text, fontFamily: 'Poppins-Bold' }}>
            Abhilash
          </Text>
          <Text className="text-[13px] font-medium opacity-50 text-center px-12" style={{ color: Theme.colors.secondaryText, fontFamily: 'Poppins' }}>
            Academic profile linked to server.
          </Text>
        </View>

        {/* Exam Information Cards Grid */}
        <View className="px-6 mb-4">
          <Text className="text-[10px] font-black uppercase tracking-[2.5px] mb-4 opacity-40 px-1" style={{ fontFamily: 'Poppins-Bold' }}>
            Session Details
          </Text>
          
          <View className="flex-row flex-wrap justify-between gap-y-3">
            {examDetails.map((item, index) => (
              <View 
                key={index} 
                className="w-[48%] bg-white rounded-3xl p-4 border border-gray-100 shadow-sm shadow-black/5"
                style={{ minHeight: 110 }}
              >
                <View 
                  className="w-10 h-10 rounded-xl items-center justify-center mb-3 border border-blue-50"
                  style={{ backgroundColor: Theme.colors.accentBackground }}
                >
                  <item.icon color={Theme.colors.primary} size={20} strokeWidth={3} />
                </View>
                
                <Text 
                  className="text-[9px] font-black uppercase tracking-[1.5px] mb-0.5 opacity-60"
                  style={{ color: Theme.colors.secondaryText, fontFamily: 'Poppins-Bold' }}
                >
                  {item.label}
                </Text>
                
                <Text 
                  className="text-base font-black leading-5 mb-0.5"
                  style={{ color: Theme.colors.text, fontFamily: 'Poppins-Bold' }}
                >
                  {item.value}
                </Text>
                
                <Text 
                  className="text-[9px] font-bold opacity-30"
                  style={{ fontFamily: 'Poppins' }}
                >
                  {item.description}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Action Button & Disclaimer */}
        <View className="px-6 mt-6">
          <View className="bg-gray-50 border border-gray-100 rounded-2xl p-3 mb-6 flex-row items-center">
             <View className="w-7 h-7 rounded-lg bg-red-50 items-center justify-center mr-3">
               <ShieldCheck color="#EF4444" size={14} strokeWidth={3} />
             </View>
             <Text className="flex-1 text-[10px] font-bold leading-4 uppercase tracking-tighter" style={{ color: Theme.colors.secondaryText, fontFamily: 'Poppins' }}>
               PROCTORED MODE ACTIVE • SECURE SESSION
             </Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push('/terms' as any)}
            className="w-full h-16 rounded-lg overflow-hidden flex-row items-center justify-center"
            style={{ 
              backgroundColor: Theme.colors.primary,
              shadowColor: Theme.colors.primary,
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.2,
              shadowRadius: 10,
              elevation: 6
            }}
          >
            <Text className="text-white text-sm font-black tracking-[1.5px] mr-3 uppercase" style={{ fontFamily: 'Poppins-Bold' }}>
              Proceed to Exam
            </Text>
            <ArrowRight color="white" size={18} strokeWidth={4} />
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}
