import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const LoadingScreen = () => {
  return (
    <View className='relative flex flex-1 h-full w-full bg-bgColor'>
      <View className='p-3 flex flex-row items-center justify-between'>
        <View className='w-10 h-10 rounded-full bg-white ' />
        <View
          style={{
            backgroundColor: '#fff',
            padding: 10,
            borderRadius: 10,
            shadowColor: '#171717',
            shadowOffset: { width: 2, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
          }}
        >
          <Ionicons name='notifications' size={28} color='#ccc' />
        </View>
      </View>
      <View className='ml-4 my-2 bg-gray-300 h-6 w-3/4' />

      <View className='flex-row my-3 mx-1'>
        <View className='flex-1 bg-gray-300 h-10 rounded-[10px] mr-3' />
        <View className='bg-gray-300 rounded-[10px] p-2 mr-3' />
      </View>
      <View>
        <View className='flex-row gap-2 my-2 mx-1'>
          <View className='bg-gray-300 h-10 w-20 rounded-lg' />
          <View className='bg-gray-300 h-10 w-20 rounded-lg' />
          <View className='bg-gray-300 h-10 w-20 rounded-lg' />
          <View className='bg-gray-300 h-10 w-20 rounded-lg' />
        </View>
        <View className='mx-1'>
          <View className='bg-gray-300 h-40 rounded-sm my-2' />
          <View className='bg-gray-300 h-40 rounded-sm my-2' />
        </View>
        <View className='mx-1'>
          <View className='bg-gray-300 h-20 rounded-sm my-2' />
        </View>
      </View>
    </View>
  );
};

export default LoadingScreen;
