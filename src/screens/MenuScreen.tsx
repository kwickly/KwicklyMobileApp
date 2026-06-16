import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';

export default function MenuScreen() {
  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView className="px-4 py-6">
        <Text className="text-2xl font-bold text-slate-900 mb-6">Our Menu</Text>
        
        {['Bowls', 'Wraps', 'Drinks', 'Sides'].map((category) => (
          <View key={category} className="mb-6">
            <Text className="text-lg font-bold text-slate-800 mb-3">{category}</Text>
            {[1, 2].map((item) => (
              <TouchableOpacity key={item} className="flex-row bg-white p-4 rounded-2xl mb-3 shadow-sm border border-slate-100">
                <View className="flex-1 justify-center">
                  <Text className="font-bold text-slate-900 text-base">Delicious Item {item}</Text>
                  <Text className="text-slate-500 text-sm mt-1">A very tasty description goes here.</Text>
                  <Text className="text-indigo-600 font-bold mt-2">$9.99</Text>
                </View>
                <View className="w-20 h-20 bg-slate-100 rounded-xl ml-4" />
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
