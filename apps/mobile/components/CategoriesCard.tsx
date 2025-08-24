import { Link } from 'expo-router';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import images from '../constants/images';
const CategoriesCard = ({ item }) => {
  return (
    <>
      <Link href={`/categories/${item.title}`} asChild>
        <TouchableOpacity className='flex-1 m-2 h-36 rounded-lg overflow-hidden'>
          <ImageBackground
            source={{ uri: images[item.image as keyof typeof images] }}
            className='flex-1 justify-end opacity-90 bg-green-50'
          >
            <View className='bg-bgColor bg-opacity-30 p-2 flex-row justify-between items-center'>
              <Text className='text-black text-[16px] font-pbold'>
                {item.title}
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </Link>
    </>
  );
};

export default CategoriesCard;
