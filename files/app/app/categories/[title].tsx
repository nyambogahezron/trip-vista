import { Stack, router, useLocalSearchParams } from 'expo-router';
import { View, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import Listing from '../../components/ListingCard';
import listingData from '../../data/listingsData';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
const { width } = Dimensions.get('window');

const CategoriesDetails = () => {
	const { title } = useLocalSearchParams();
	const listing = listingData.filter((item) => item.category === title);

	return (
		<SafeAreaView className='flex-1'>
			<Stack.Screen
				options={{
					headerShadowVisible: false,
					headerTitle: `${title}`,
					headerTitleAlign: 'center',
					headerTitleStyle: { color: '#333' },
					headerStyle: { backgroundColor: '#f2f2f3' },
					headerLeft: () => (
						<TouchableOpacity
							onPress={() => router.back()}
							style={{
								backgroundColor: 'rgba(255,255,255,0.7)',
								borderRadius: 10,
								padding: 4,
							}}
						>
							<View className='bg-[#fffefe] p-[8] rounded-[10px]'>
								<Feather name='arrow-left' size={20} />
							</View>
						</TouchableOpacity>
					),
				}}
			/>
			<View className='mt-[-30px] bg-bgColor items-center'>
				<FlatList
					data={listing}
					keyExtractor={(item) => item.id.toString()}
					showsVerticalScrollIndicator={false}
					renderItem={({ item }) => (
						<Listing
							id={item.id}
							name={item.name}
							price={item.price}
							location={item.location}
							image={item.image}
							customCardStyle='w-full m-1'
							width={width}
							customImageStyle='h-60 w-full'
						/>
					)}
				/>
			</View>
		</SafeAreaView>
	);
};
export default CategoriesDetails;
