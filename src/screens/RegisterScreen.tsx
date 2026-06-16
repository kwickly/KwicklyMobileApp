import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { useAuthStore } from '../store/useAuthStore';

export default function RegisterScreen({ navigation }: any) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register, isLoading } = useAuthStore();
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      setError('');
      await register(name, email, password);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 justify-center px-6"
      >
        <View className="mb-10">
          <Text className="text-4xl font-extrabold text-indigo-600 mb-2">Create Account</Text>
          <Text className="text-xl text-slate-500 font-medium">Join Kwickly today.</Text>
        </View>

        {error ? (
          <View className="bg-red-50 border border-red-200 p-3 rounded-xl mb-6">
            <Text className="text-red-600 text-sm">{error}</Text>
          </View>
        ) : null}

        <View className="mb-4">
          <Text className="text-slate-700 font-bold mb-2 ml-1">Full Name</Text>
          <TextInput
            className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 text-base text-slate-900"
            value={name}
            onChangeText={setName}
            placeholder="John Doe"
          />
        </View>

        <View className="mb-4">
          <Text className="text-slate-700 font-bold mb-2 ml-1">Email</Text>
          <TextInput
            className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 text-base text-slate-900"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="john@example.com"
          />
        </View>

        <View className="mb-8">
          <Text className="text-slate-700 font-bold mb-2 ml-1">Password</Text>
          <TextInput
            className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 text-base text-slate-900"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity 
          className={`bg-indigo-600 py-4 rounded-2xl items-center shadow-lg shadow-indigo-600/30 ${isLoading ? 'opacity-70' : ''}`}
          onPress={handleRegister}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-bold text-lg">Sign Up</Text>
          )}
        </TouchableOpacity>

        <View className="flex-row justify-center mt-6">
          <Text className="text-slate-500">Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text className="text-indigo-600 font-bold">Sign In</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
