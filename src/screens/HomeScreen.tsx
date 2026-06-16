import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useAuthStore } from '../store/useAuthStore';

export default function HomeScreen() {
  const { user } = useAuthStore();

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView className="px-4 py-6">
        <View className="mb-6">
          <Text className="text-3xl font-bold text-slate-900 tracking-tight">Welcome Back,</Text>
          <Text className="text-xl font-medium text-slate-500">{user?.name || 'Guest'}</Text>
        </View>

        <View className="bg-indigo-600 rounded-3xl p-6 shadow-xl shadow-indigo-600/30 mb-8">
          <Text className="text-indigo-100 font-medium">Pro Meal Balance</Text>
          <Text className="text-white text-4xl font-bold mt-1">Ready</Text>
          <TouchableOpacity className="bg-white/20 px-4 py-2 rounded-full self-start mt-4">
            <Text className="text-white font-semibold">Redeem Now</Text>
          </TouchableOpacity>
        </View>

        <Text className="text-xl font-bold text-slate-900 mb-4">Featured Items</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-4 px-4 mb-8">
          {[1, 2, 3].map((i) => (
            <View key={i} className="w-64 bg-white rounded-3xl p-4 mr-4 shadow-sm border border-slate-100">
              <View className="h-32 bg-slate-100 rounded-2xl mb-4" />
              <Text className="text-lg font-bold text-slate-900">Spicy Chicken Bowl</Text>
              <Text className="text-indigo-600 font-bold mt-1">$12.99</Text>
            </View>
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}
