import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, Text, Image } from 'react-native';

interface AuthHeaderInterface {
  title: string;
}

const AuthHeader: React.FC<AuthHeaderInterface> = ({ title }) => {
  return (
    <>
      <View className='relative flex-1 items-center justify-center '>
        <LinearGradient
          colors={['#ff7f36', '#f4f4f4']}
          className='absolute left-0 right-0 top-0 h-[300px] rounded-b-[35px] '
        />
        <View className='relative bg-transparent rounded-full h-20 w-20 p-1 m-4 '>
          <Image
            source={require('../assets/images/logo.png')}
            className='w-16 h-16 rounded-full absolute  bg-white m-auto ml-1 mt-2'
          />
        </View>
        <View className='mt-8'>
          <Text className='text-white text-3xl font-pbold'>{title}</Text>
        </View>
      </View>
    </>
  );
};

export default AuthHeader;
