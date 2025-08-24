import { View, Text, FlatList, Image } from 'react-native';
import travelGroups from '../data/travelGroups';
import { Ionicons } from '@expo/vector-icons';
const TravelGroups = () => {
  return (
    <View className='mt-5 ml-1 mb-4'>
      <Text className='text-lg font-pbold ml-4 my-2'>Top Travel Groups</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={travelGroups ?? []}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className='flex flex-row items-center border-2 border-[#f3f3f3] shadow-sm shadow-main bg-white h-32 w-72 rounded-lg ml-1 p-1 mb-4'>
            <View className=' rounded-lg mr-2'>
              <Image
                source={{
                  uri: 'https://media.istockphoto.com/id/587892720/vector/africa-single-states-political-map.jpg?s=1024x1024&w=is&k=20&c=c_EqMIEm6JykhsFyxSJACL-xVT76FtK_wCVu_3m5OWA=',
                }}
                className='w-20 h-full'
                resizeMode='cover'
                style={{ borderRadius: 10, overflow: 'hidden' }}
              />
            </View>
            <View className='flex ml-3'>
              <Text className='font-pbold text-black text-sm'>{item.name}</Text>

              <View className='flex flex-row items-center gap-1 mt-2'>
                <Ionicons name='star' size={20} color='#FFD700' />
                <Text className='text-lg font-pbold'>{item.rating}</Text>
                <Text className='text-sm font-pbold text-gray-300'>
                  ({item.reviews})Reviews
                </Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};
export default TravelGroups;
