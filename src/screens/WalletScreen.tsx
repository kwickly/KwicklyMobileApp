import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ActivityIndicator } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useAuthStore } from '../store/useAuthStore';
import api from '../services/api';

export default function WalletScreen() {
  const { token } = useAuthStore();
  const [balance, setBalance] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBalance();
  }, []);

  const fetchBalance = async () => {
    try {
      const res = await api.get('/wallet/balance');
      setBalance(res.data.balance || 0);
    } catch (e) {
      console.error('Failed to fetch wallet balance', e);
      setBalance(0); // Fallback
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <View className="flex-1 px-4 py-8 items-center justify-center">
        
        <View className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 items-center w-full max-w-sm border border-slate-100">
          <Text className="text-2xl font-bold text-slate-900 mb-2">Scan to Redeem</Text>
          <Text className="text-slate-500 text-center mb-8">Show this QR code at any Kwickly location to redeem your Pro Meal.</Text>
          
          <View className="p-4 bg-white rounded-2xl border-4 border-indigo-50 shadow-sm min-h-[200px] min-w-[200px] items-center justify-center">
            {token ? (
              <QRCode
                value={token}
                size={200}
                color="#0f172a"
                backgroundColor="white"
              />
            ) : (
              <ActivityIndicator color="#4f46e5" />
            )}
          </View>

          <View className="mt-8 pt-6 border-t border-slate-100 w-full flex-row justify-between items-center">
            <Text className="text-slate-500 font-medium">Pro Meal Balance</Text>
            {isLoading ? (
              <ActivityIndicator size="small" color="#4f46e5" />
            ) : (
              <Text className="text-2xl font-bold text-indigo-600">{balance}</Text>
            )}
          </View>
        </View>

      </View>
    </SafeAreaView>
  );
}
