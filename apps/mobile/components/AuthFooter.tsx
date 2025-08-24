import { router } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

interface AuthFooterProps {
  desc: string;
  title: string;
  link: string;
  linkText?: string | null;
}

const AuthFooter: React.FC<AuthFooterProps> = ({
  desc,
  title,
  link,
  linkText,
}) => {
  return (
    <>
      <View className='flex flex-row gap-2 align-center my-4 mx-auto'>
        <Text className='text-center text-gray-400'>{desc}</Text>
        <TouchableOpacity onPress={() => router.push(`${link}`)}>
          <Text className='text-blue-500 text-center'>{title}</Text>
        </TouchableOpacity>
      </View>
      <Text className='text-center text-gray-400 my-4'>or sign in with</Text>
      <View className='flex-row justify-center'>
        <TouchableOpacity className='mr-4'>
          <Image
            source={require('../assets/images/facebook.jpg')}
            className='w-8 h-8 rounded-full'
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require('../assets/images/google.png')}
            className='w-8 h-8 rounded-full'
          />
        </TouchableOpacity>
      </View>
    </>
  );
};
export default AuthFooter;
