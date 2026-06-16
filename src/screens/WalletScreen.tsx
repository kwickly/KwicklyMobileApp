import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default function WalletScreen() {
  // In reality, this would come from the global Zustand store and be an encrypted JWT/Token
  const mockCustomerToken = 'KWICKLY-CUST-883921-TOKEN';

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <View className="flex-1 px-4 py-8 items-center justify-center">
        
        <View className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 items-center w-full max-w-sm border border-slate-100">
          <Text className="text-2xl font-bold text-slate-900 mb-2">Scan to Redeem</Text>
          <Text className="text-slate-500 text-center mb-8">Show this QR code at any Kwickly location to redeem your Pro Meal.</Text>
          
          <View className="p-4 bg-white rounded-2xl border-4 border-indigo-50 shadow-sm">
            <QRCode
              value={mockCustomerToken}
              size={200}
              color="#0f172a"
              backgroundColor="white"
            />
          </View>

          <View className="mt-8 pt-6 border-t border-slate-100 w-full flex-row justify-between items-center">
            <Text className="text-slate-500 font-medium">Pro Meal Balance</Text>
            <Text className="text-2xl font-bold text-indigo-600">12</Text>
          </View>
        </View>

      </View>
    </SafeAreaView>
  );
}
