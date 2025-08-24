import { Ionicons } from '@expo/vector-icons';
import { View, TextInput } from 'react-native';
const SearchInput = () => {
	return (
		<View className='flex-1 flex-row items-center mx-4 p-2 bg-white rounded-lg shadow-md'>
			<Ionicons name='search-outline' size={18} color='#000' />
			<TextInput
				placeholder='Search place...'
				className='flex-1 ml-2 text-gray-700 font-rbold text-base'
			/>
		</View>
	);
};
export default SearchInput;
