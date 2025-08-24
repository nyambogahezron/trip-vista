import React from 'react';
import { Text, ActivityIndicator, TouchableOpacity } from 'react-native';

interface CustomButtonProps {
  title: string;
  customStyles?: string;
  handlePress: () => void;
  textStyles?: string;
  isLoading?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  customStyles = '',
  handlePress,
  textStyles = '',
  isLoading = false,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      className={`py-3 px-7 rounded-md mb-2.5 ${customStyles} ${
        isLoading ? 'opacity-50' : ''
      }`}
      activeOpacity={0.8}
      disabled={isLoading}
    >
      <Text className={`text-white text-lg text-center ${textStyles}`}>
        {title}
      </Text>
      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color='#fff'
          size='small'
          className='ml-2'
        />
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
