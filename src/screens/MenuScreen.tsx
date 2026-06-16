import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import api from '../services/api';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
}

interface Category {
  id: string;
  name: string;
  items: MenuItem[];
}

export default function MenuScreen() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      // Assuming kwickly-api provides a /menu/categories endpoint that aggregates items
      const res = await api.get('/menu/categories');
      setCategories(res.data);
    } catch (e) {
      console.error('Failed to fetch menu', e);
      // Fallback dummy data if API is not running during review
      setCategories([
        {
          id: 'cat-1',
          name: 'Signature Bowls',
          items: [
            { id: '1', name: 'Spicy Chicken Bowl', description: 'Grilled chicken, brown rice, spicy mayo', price: 12.99 },
            { id: '2', name: 'Tofu Power Bowl', description: 'Crispy tofu, quinoa, fresh greens', price: 11.99 }
          ]
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-slate-50 justify-center items-center">
        <ActivityIndicator size="large" color="#4f46e5" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView className="px-4 py-6">
        <Text className="text-2xl font-bold text-slate-900 mb-6">Our Menu</Text>
        
        {categories.map((category) => (
          <View key={category.id} className="mb-6">
            <Text className="text-lg font-bold text-slate-800 mb-3">{category.name}</Text>
            {category.items?.map((item) => (
              <TouchableOpacity key={item.id} className="flex-row bg-white p-4 rounded-2xl mb-3 shadow-sm border border-slate-100">
                <View className="flex-1 justify-center">
                  <Text className="font-bold text-slate-900 text-base">{item.name}</Text>
                  {item.description ? (
                    <Text className="text-slate-500 text-sm mt-1">{item.description}</Text>
                  ) : null}
                  <Text className="text-indigo-600 font-bold mt-2">${item.price.toFixed(2)}</Text>
                </View>
                <View className="w-20 h-20 bg-slate-100 rounded-xl ml-4" />
              </TouchableOpacity>
            ))}
            {(!category.items || category.items.length === 0) && (
              <Text className="text-slate-500 italic">No items in this category.</Text>
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
