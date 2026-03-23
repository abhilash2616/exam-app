import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Theme } from '@/constants/Theme';
import { ChevronLeft } from 'lucide-react-native';
import { CustomDropdown } from '@/components/CustomDropdown';

// TypeScript Interfaces
interface RegistrationFormData {
  registrationNo: string;
  mobileNo: string;
  course: string | null;
  batch: string | null;
  session: string | null;
  semester: string | null;
  examType: string | null;
  center: string | null;
}

const EXAM_CENTERS = [
  'Kolkata (Main Campus)',
  'Delhi (Zonal Office)',
  'Mumbai (Cyber Center)',
  'Bangalore (Tech Park)',
  'Chennai (Harbor Point)'
];
const COURSES = [
  'B.A',
  'B.Sc',
  'B.Com',
  'BBA',
  'BCA'
];
const BATCHES = [
  '2022',
  '2023',
  '2024',
  '2025',
  '2026'
];
const SESSIONS = [
  'Spring',
  'Summer',
  'Autumn',
  'Winter',
];
const SEMESTERS = [
  '1st',
  '2nd',
  '3rd',
  '4th',
  '5th',
  '6th',
  '7th',
  '8th',
];
const EXAM_TYPES = [
  'Regular',
  'Advanced'
];


type FormErrors = Partial<Record<keyof RegistrationFormData, string>>;

export default function RegistrationScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [agreed, setAgreed] = useState(false);
  
  // Consolidated Form State
  const [formData, setFormData] = useState<RegistrationFormData>({
    registrationNo: '',
    mobileNo: '',
    course: null,
    batch: null,
    session: null,
    semester: null,
    examType: null,
    center: null,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [candidateName, setCandidateName] = useState('');

  // Update specific fields and clear their errors
  const updateField = <K extends keyof RegistrationFormData>(field: K, value: RegistrationFormData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }

    // Simulate name lookup on registration number change
    if (field === 'registrationNo') {
      if (value && String(value).length > 5) {
        setCandidateName('ABHILASH'); // Mock lookup
      } else {
        setCandidateName('');
      }
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.registrationNo.trim()) newErrors.registrationNo = 'Registration number is required';
    if (!formData.mobileNo.trim()) {
      newErrors.mobileNo = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.mobileNo)) {
      newErrors.mobileNo = 'Enter a valid 10-digit mobile number';
    }
    
    if (!formData.course) newErrors.course = 'Required';
    if (!formData.batch) newErrors.batch = 'Required';
    if (!formData.session) newErrors.session = 'Required';
    if (!formData.semester) newErrors.semester = 'Required';
    if (!formData.examType) newErrors.examType = 'Required';
    if (!formData.center) newErrors.center = 'Required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = () => {
    if (validate() && agreed) {
      router.push({
        pathname: '/exam-info',
        params: { course: formData.course }
      } as any);
    }
  };

  const isFormComplete = Object.values(formData).every(val => val !== null && val !== '') && agreed;

  return (
    <View className="flex-1 bg-white">
      <ScrollView 
        contentContainerStyle={{ paddingHorizontal: Theme.spacing.padding, paddingTop: insets.top + 10, paddingBottom: insets.bottom + 40 }}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity 
          className="mb-8 p-1 -ml-1 self-start"
          onPress={() => router.back()}
        >
          <ChevronLeft color={Theme.colors.text} size={28} />
        </TouchableOpacity>
        
        <View className="mb-8 items-center">
          <Text className="text-[32px] font-black mb-2 text-center" style={{ color: Theme.colors.text, fontFamily: 'Poppins-Bold' }}>
            Registration
          </Text>
          <Text className="text-base text-center leading-6 font-medium px-4" style={{ color: Theme.colors.secondaryText, fontFamily: 'Poppins' }}>
            Please fill in your details correctly to start the examination session
          </Text>
        </View>

        <View className="mb-6 gap-y-6">
          <View>
            <View 
              className="flex-row items-center border rounded-lg px-5 py-0.5"
              style={{ borderColor: errors.registrationNo ? '#EF4444' : Theme.colors.border }}
            >
              <TextInput
                placeholder="Enter Registration No."
                value={formData.registrationNo}
                onChangeText={(val) => updateField('registrationNo', val)}
                className="flex-1 h-12 text-base font-normal"
                placeholderTextColor={Theme.colors.secondaryText}
                style={{ fontFamily: 'Poppins' }}
              />
            </View>
            <Text className="text-[12px] font-normal mt-2.5 uppercase tracking-widest px-1" style={{ color: Theme.colors.text, fontFamily: 'Poppins-Bold' }}>
              Candidate Name : <Text className="text-green-600 font-normal">{candidateName}</Text>
            </Text>
            {errors.registrationNo && <Text className="text-red-500 text-[10px] mt-1 px-1 font-medium">{errors.registrationNo}</Text>}
          </View>

          <View>
            <View 
              className="flex-row items-center border rounded-lg px-5 py-0.5"
              style={{ borderColor: errors.mobileNo ? '#EF4444' : Theme.colors.border }}
            >
              <TextInput
                placeholder="Enter Your Mobile No."
                keyboardType="number-pad"
                maxLength={10}
                value={formData.mobileNo}
                onChangeText={(val) => updateField('mobileNo', val)}
                className="flex-1 h-12 text-base font-normal"
                placeholderTextColor={Theme.colors.secondaryText}
                style={{ fontFamily: 'Poppins' }}
              />
            </View>
            {errors.mobileNo && <Text className="text-red-500 text-[10px] mt-1 px-1 font-medium">{errors.mobileNo}</Text>}
          </View>

          <CustomDropdown 
            placeholder="Select Course"
            options={COURSES}
            selected={formData.course}
            onSelect={(val) => updateField('course', val)}
            error={errors.course}
            className="h-12"
          />
          <CustomDropdown 
            placeholder="Select Batch"
            options={BATCHES}
            selected={formData.batch}
            onSelect={(val) => updateField('batch', val)}
            error={errors.batch}
            className="h-12"
          />
          <CustomDropdown 
            placeholder="Session"
            options={SESSIONS}
            selected={formData.session}
            onSelect={(val) => updateField('session', val)}
            error={errors.session}
            className="h-12"
          />
          <CustomDropdown 
            placeholder="Semester"
            options={SEMESTERS}
            selected={formData.semester}
            onSelect={(val) => updateField('semester', val)}
            error={errors.semester}
            className="h-12"
          />
          <CustomDropdown 
            placeholder="Exam Type"
            options={EXAM_TYPES}
            selected={formData.examType}
            onSelect={(val) => updateField('examType', val)}
            error={errors.examType}
            className="h-12"
          />
          <CustomDropdown 
            placeholder="Center"
            options={EXAM_CENTERS}
            selected={formData.center}
            onSelect={(val) => updateField('center', val)}
            error={errors.center}
            className="h-12"
          />
        </View>

        <View className="flex-row items-start mb-6 px-1">
          <TouchableOpacity 
            activeOpacity={0.8}
            className="w-7 h-7 rounded-lg border-2 items-center justify-center mr-4"
            style={{ 
              borderColor: agreed ? Theme.colors.primary : Theme.colors.border,
              backgroundColor: agreed ? Theme.colors.primary : 'transparent'
            }}
            onPress={() => setAgreed(!agreed)}
          >
            {agreed && <View className="w-2.5 h-2.5 rounded-full bg-white" />}
          </TouchableOpacity>
          <Text className="flex-1 text-[13px] leading-[22px] font-semibold" style={{ color: Theme.colors.secondaryText, fontFamily: 'Poppins' }}>
            I agree with the <Text className="font-extrabold underline" style={{ color: Theme.colors.primary }}>Exam Rules</Text> and <Text className="font-extrabold underline" style={{ color: Theme.colors.primary }}>Privacy Policy</Text>.
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleRegister}
          disabled={!isFormComplete}
          className="w-full h-18 py-3 rounded-lg items-center justify-center shadow-sm shadow-gray-500/10"
          style={{ 
            backgroundColor: isFormComplete ? Theme.colors.primary : Theme.colors.disabled,
            shadowColor: Theme.colors.primary,
            shadowOpacity: isFormComplete ? 0.35 : 0
          }}
        >
          <Text className="text-white text-lg font-black tracking-wider" style={{ fontFamily: 'Poppins-Bold' }}>
            Continue To Exam
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
