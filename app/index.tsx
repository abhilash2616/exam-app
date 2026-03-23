import { useRouter } from 'expo-router';
import { Info } from 'lucide-react-native';
import React from 'react';
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function ExamIntroScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const notices = [
    'This is a Percentile based examination.',
    'Try to attend the maximum number of questions you can.',
    'In case of network issues, students can retake the exam maximum 3 times. The time would be calculated based on the remaining portion.',
    'Students may also opt for retaking the exam in full. However, while retaking the exam in the third attempt if he faces any network issue he will not get any further attempt and that will stand as final and the marks obtained in the previous exam will stand cancelled.',
    'Please fill-up the form carefully as filing up wrong information will result in cancellation of the exam.',
    'Once the exam starts students will get 30 minutes to answer the maximum number of questions.',
    'A 3 minutes review screen is added to review/modify the answers submitted during the exam after the exam completion or time up.'
  ];

  return (
    <View className="flex-1 bg-gray-50" style={{ paddingTop: insets.top }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: insets.bottom + 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-2 pt-4 flex-1">
          <View className="bg-white rounded-xl overflow-hidden shadow-2xl shadow-black/10">
            <View className="bg-[#DEE8FE] pl-6 flex-row items-center justify-between">
              <View className="flex-1 pr-4">
                <Text className="text-[25px] font-bold text-[#4B6BDB] mb-2 leading-tight">
                  Semester Exam Test
                </Text>
                <Text className="text-[#6482EE]/80 text-base font-medium">
                  Fill detail to continue.
                </Text>
              </View>
              <View className="w-40 h-32">
                <Image
                  source={require('../assets/images/banner.png')}
                  className="w-full h-full"
                  resizeMode="contain"
                />
              </View>
            </View>

            <View
              className="absolute left-6 w-28 h-28 rounded-full border-[2px] border-white items-center justify-center overflow-hidden"
              style={{ top: 85, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 10 }}
            >
              <Image
                source={require('../assets/images/logo.png')}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>
            <View className="pt-24 px-8 pb-10">
              <Text className="text-2xl font-bold text-[#374151] mb-6">
                Important Notice:
              </Text>
              <View className="gap-y-4 mb-10">
                {notices.map((notice, index) => (
                  <View key={index} className="flex-row items-start px-2">
                    <Info size={13} color="#1B1464" style={{ marginTop: 3, marginRight: 10 }} />
                    <Text className="flex-1 text-[15px] leading-[22px] font-medium text-gray-600">
                      {notice}
                    </Text>
                  </View>
                ))}
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => router.push('/registration' as any)}
                className="w-full py-3 rounded-lg bg-[#1B1464] items-center justify-center shadow-lg shadow-blue-500/20"
              >
                <Text className="text-white text-lg shadow-lg shadow-gray-500/20 font-bold">
                  Continue
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="mt-4 items-center">
            <Text className="text-sm font-medium text-gray-400">
              © {new Date().getFullYear()} Semester Exam Test.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}