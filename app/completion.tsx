import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Theme } from '@/constants/Theme';
import { Check, ClipboardList, Clock, Shield, LogOut, LayoutDashboard } from 'lucide-react-native';

export default function ExamCompletionScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const summaryData = [
    { icon: ClipboardList, label: 'Candidate ID', value: 'REF-123456' },
    { icon: Clock, label: 'Exam Duration', value: '115 Minutes' },
    { icon: Shield, label: 'Submission Status', value: 'SECURELY SAVED' },
    { icon: Check, label: 'Questions Attempted', value: '100 / 100' }
  ];

  return (
    <View className="flex-1 bg-white">
      <ScrollView 
        contentContainerStyle={{ paddingHorizontal: Theme.spacing.padding, paddingTop: insets.top + 20, flexGrow: 1, paddingBottom: insets.bottom + 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Success Icon */}
        <View className="items-center mb-10 mt-10">
          <View 
            className="w-24 h-24 rounded-full items-center justify-center mb-8 shadow-sm shadow-blue-500/10"
            style={{ backgroundColor: Theme.colors.accentBackground }}
          >
            <View 
              className="w-16 h-16 rounded-full items-center justify-center border-4 border-white"
              style={{ backgroundColor: Theme.colors.primary }}
            >
              <Check color="white" size={32} strokeWidth={4} />
            </View>
          </View>
          <Text className="text-[32px] font-black mb-2 text-center" style={{ color: Theme.colors.text, fontFamily: 'Poppins-Bold' }}>
            Success!
          </Text>
          <Text className="text-base font-normal px-10 text-center opacity-60" style={{ color: Theme.colors.text, fontFamily: 'Poppins' }}>
            Your responses have been successfully transmitted and logged.
          </Text>
        </View>

        {/* Summary Card */}
        <View 
          className="bg-white rounded-2xl p-6 mb-12 shadow-sm shadow-gray-500/10 border"
          style={{ borderColor: Theme.colors.border }}
        >
          {summaryData.map((item, index) => (
            <View key={index} className={`flex-row items-center justify-between ${index !== summaryData.length - 1 ? 'mb-8' : ''}`}>
              <View className="flex-row items-center">
                <View 
                  className="w-10 h-10 rounded-xl items-center justify-center mr-4"
                  style={{ backgroundColor: Theme.colors.accentBackground }}
                >
                  <item.icon color={Theme.colors.primary} size={18} strokeWidth={2.5} />
                </View>
                <Text className="text-[10px] font-black opacity-50 uppercase tracking-widest" style={{ color: Theme.colors.text, fontFamily: 'Poppins-Bold' }}>
                  {item.label}
                </Text>
              </View>
              <Text className="text-sm font-black" style={{ color: Theme.colors.text, fontFamily: 'Poppins-Bold' }}>
                {item.value}
              </Text>
            </View>
          ))}
        </View>

        {/* Actions */}
        <View className="gap-y-4">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.replace('/' as any)}
            className="w-full h-18 py-3 rounded-lg items-center justify-center border-2 border-gray-100 flex-row gap-x-2"
          >
            <LayoutDashboard color={Theme.colors.text} size={20} strokeWidth={2.5} />
            <Text className="text-lg font-black tracking-wider" style={{ color: Theme.colors.text, fontFamily: 'Poppins-Bold' }}>
              Back to Dashboard
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.replace('/' as any)}
            className="w-full h-18 py-3 rounded-lg items-center justify-center flex-row gap-x-2 shadow-sm"
            style={{ 
              backgroundColor: Theme.colors.primary,
              shadowColor: Theme.colors.primary,
              shadowOpacity: 0.2
            }}
          >
            <LogOut color="white" size={20} strokeWidth={2.5} />
            <Text className="text-lg font-black text-white tracking-wider" style={{ fontFamily: 'Poppins-Bold' }}>
              Final Submission
            </Text>
          </TouchableOpacity>
        </View>

        {/* Support */}
        <View className="mt-12 items-center">
          <Text className="text-[11px] font-bold text-gray-400 text-center leading-5" style={{ fontFamily: 'Poppins' }}>
            Need technical assistance?{"\n"}
            <Text className="underline text-blue-600">examsupport@university.edu</Text>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
