import { View, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Stack, router } from 'expo-router';
import categoriesData from '../../data/categoriesData';
import CategoriesCard from '../../components/CategoriesCard';

const Categories = () => {
  // return all expect for all categories
  const filteredCategoriesData = categoriesData.filter(
    (category) => category.title !== 'All'
  );
  return (
    <SafeAreaView className='flex-1 bg-bgColor'>
      <Stack.Screen
        options={{
          headerTitleAlign: 'center',
          statusBarStyle: 'dark',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              className='bg-white bg-opacity-50 rounded-lg p-1 '
            >
              <View className='bg-gray-200 ml-2 p-2 rounded-lg'>
                <Feather name='arrow-left' size={20} />
              </View>
            </TouchableOpacity>
          ),
          headerTitleStyle: {
            color: '#333',
            fontSize: 20,
            fontWeight: 'bold',
            alignSelf: 'center',
          },
        }}
      />

      <View className='flex-1  bg-white'>
        <FlatList
          data={filteredCategoriesData}
          renderItem={CategoriesCard}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={{ paddingHorizontal: 8 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};
export default Categories;
