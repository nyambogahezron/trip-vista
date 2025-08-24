import { View, Text, FlatList, Image } from 'react-native';
import Listing from './ListingCard';
import { useEffect, useState } from 'react';
import { ListingProps, ListingsProps } from '@/types';
import { useGlobalContext } from '@/context/GlobalContext';

export default function Listings({
	selectedCategory,
	customCardStyle,
	customImageStyle,
	horizontal,
}: ListingsProps) {
	const [data, setData] = useState<ListingProps[]>([]);
	const { listingsData } = useGlobalContext();

	useEffect(() => {
		// filter data based on selected category
		if (selectedCategory === 'All') {
			setData(listingsData);
			return;
		}
		const selectedData = listingsData.filter(
			(item: ListingProps) => item.category === selectedCategory
		);
		setData(selectedData);
	}, [selectedCategory]);

	return (
		<View className='flex ml-2'>
			<FlatList
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
				data={data ?? []}
				horizontal={horizontal}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => (
					<Listing
						item={item}
						key={item.id}
						customCardStyle={customCardStyle}
						customImageStyle={customImageStyle}
					/>
				)}
				ListEmptyComponent={() => (
					<View className='flex flex-1 items-center ml-8 p-0 justify-center w-64 h-52 '>
						<Image
							source={require('../assets/images/notFound.png')}
							resizeMode='contain'
							className='w-full'
						/>
						<Text className='font-pbold text-main'>
							No Listings Found for {selectedCategory}
						</Text>
					</View>
				)}
			/>
		</View>
	);
}
