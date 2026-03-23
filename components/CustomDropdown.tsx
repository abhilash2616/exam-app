import { Check, ChevronDown, X } from 'lucide-react-native';
import React, { useState } from 'react';
import { FlatList, Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Theme } from '@/constants/Theme';

interface DropdownProps {
  placeholder: string;
  options: string[];
  selected: string | null;
  onSelect: (value: string) => void;
  error?: string;
  className?: string;
}

export function CustomDropdown({ placeholder, options, selected, onSelect, error, className }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const insets = useSafeAreaInsets();

  return (
    <View className="z-40">
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setIsOpen(true)}
        className={`flex-row items-center justify-between border rounded-lg px-4 ${className || 'h-14'}`}
        style={{ borderColor: error ? '#EF4444' : Theme.colors.border }}
      >
        <Text
          className={`text-base font-medium ${selected ? 'text-gray-900' : 'text-gray-400'}`}
          style={{ fontFamily: 'Poppins' }}
        >
          {selected || placeholder}
        </Text>
        <ChevronDown color={Theme.colors.secondaryText} size={20} />
      </TouchableOpacity>
      {error && <Text className="text-red-500 text-[10px] mt-1 px-1 font-bold">{error}</Text>}

      <Modal
        visible={isOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <Pressable
          className="flex-1 bg-black/50 justify-end"
          onPress={() => setIsOpen(false)}
        >
          <View
            className="bg-white rounded-t-3xl pt-8 px-6 overflow-hidden shadow-2xl"
            style={{ paddingBottom: insets.bottom + 20 }}
          >
            {/* Header Handle */}
            <View className="items-center mb-6">
              <View className="w-12 h-1.5 bg-gray-200 rounded-full" />
            </View>

            <View className="flex-row justify-between items-center mb-8">
              <Text className="text-xl font-bold" style={{ color: Theme.colors.text, fontFamily: 'Poppins-Bold' }}>
                {placeholder}
              </Text>
              <TouchableOpacity onPress={() => setIsOpen(false)} className="p-2 -mr-2">
                <X color={Theme.colors.secondaryText} size={24} />
              </TouchableOpacity>
            </View>

            <FlatList
              data={options}
              keyExtractor={(item) => item}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 10 }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    onSelect(item);
                    setIsOpen(false);
                  }}
                  className={`py-4 rounded-xl px-4 mb-2 flex-row items-center justify-between ${selected === item ? 'bg-blue-50' : 'bg-transparent'}`}
                >
                  <Text
                    className={`text-base ${selected === item ? 'text-blue-700 font-bold' : 'text-gray-700'}`}
                    style={{ fontFamily: 'Poppins' }}
                  >
                    {item}
                  </Text>
                  {selected === item && <Check color={Theme.colors.primary} size={20} strokeWidth={3} />}
                </TouchableOpacity>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
