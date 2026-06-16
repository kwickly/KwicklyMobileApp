import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { Settings, CreditCard, Clock, LogOut, ChevronRight } from 'lucide-react-native';

export default function ProfileScreen() {
  const MenuRow = ({ icon, title }: { icon: React.ReactNode, title: string }) => (
    <TouchableOpacity className="flex-row items-center justify-between bg-white p-4 rounded-2xl mb-3 shadow-sm border border-slate-100">
      <View className="flex-row items-center">
        <View className="bg-slate-50 p-2 rounded-xl mr-3">
          {icon}
        </View>
        <Text className="text-base font-medium text-slate-800">{title}</Text>
      </View>
      <ChevronRight color="#cbd5e1" size={20} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView className="px-4 py-6">
        <View className="items-center mb-8">
          <View className="w-24 h-24 bg-indigo-100 rounded-full items-center justify-center mb-4">
            <Text className="text-3xl font-bold text-indigo-600">A</Text>
          </View>
          <Text className="text-2xl font-bold text-slate-900">Alex Customer</Text>
          <Text className="text-slate-500 mt-1">alex@example.com</Text>
        </View>

        <Text className="text-lg font-bold text-slate-900 mb-3 px-1">Account</Text>
        <MenuRow icon={<Clock color="#64748b" size={22} />} title="Order History" />
        <MenuRow icon={<CreditCard color="#64748b" size={22} />} title="Payment Methods" />
        <MenuRow icon={<Settings color="#64748b" size={22} />} title="Settings" />

        <TouchableOpacity className="flex-row items-center justify-center p-4 mt-6 bg-red-50 rounded-2xl border border-red-100">
          <LogOut color="#ef4444" size={20} />
          <Text className="text-red-500 font-bold ml-2">Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
