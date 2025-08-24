import React from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import listingData from '../../data/listingsData';
import {
  Feather,
  FontAwesome,
  FontAwesome5,
  Ionicons,
} from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { StatusBar } from 'expo-status-bar';
import Animated, {
  SlideInDown,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';
import images from '../../constants/images';

const { width } = Dimensions.get('window');
const IMG_HEIGHT = 320;

const DetailsPage = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const listing = listingData.find((item) => item.id.toString());
  const router = useRouter();

  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    };
  });

  if (!listing) {
    return (
      <View className='flex-1 justify-center items-center'>
        <Text>Listing not found</Text>
      </View>
    );
  }

  return (
    <>
      <StatusBar style='auto' />
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: '',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {}}
              style={{
                backgroundColor: 'rgba(255,255,255,0.5)',
                borderRadius: 10,
                padding: 4,
              }}
            >
              <View className='bg-white p-[6] rounded-[10px]'>
                <Ionicons name='bookmark-outline' size={20} />
              </View>
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{
                backgroundColor: 'rgba(255,255,255,0.5)',
                borderRadius: 10,
                padding: 4,
              }}
            >
              <View className='bg-white p-[6] rounded-[10px]'>
                <Feather name='arrow-left' size={20} />
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <View className='flex-1 bg-white'>
        <Animated.ScrollView
          ref={scrollRef}
          contentContainerStyle={{ paddingBottom: 150 }}
        >
          <Animated.Image
            source={{ uri: images[listing.image as keyof typeof images] }}
            className=''
            style={[styles.image, imageAnimatedStyle]}
          />
          <View className='p-5 bg-white'>
            <Text className='text-2xl font-psemibold text-black leading-[0.5]'>
              {listing.name}
            </Text>
            <View className='flex-row mt-2 items-center'>
              <FontAwesome5
                name='map-marker-alt'
                size={18}
                color={Colors.primaryColor}
              />
              <Text className='text-sm ml-1 text-black'>
                {listing.location}
              </Text>
            </View>
            <View className='flex-row my-5 justify-between'>
              <View className='flex-row'>
                <View className='bg-[#f4f4f4] px-[5px] py-2 my-5 rounded-lg mr-1 items-center'>
                  <Ionicons name='time' size={18} color={Colors.primaryColor} />
                </View>
                <View className='mt-5'>
                  <Text className='text-[12px] text-gray-400'>Duration</Text>
                  <Text className='text-sm font-pregular'>
                    {listing.duration} Days
                  </Text>
                </View>
              </View>
              <View className='flex-row'>
                <View className='bg-[#f4f4f4] px-[5px] py-2 my-5 rounded-lg mr-1 items-center'>
                  <FontAwesome
                    name='users'
                    size={18}
                    color={Colors.primaryColor}
                  />
                </View>
                <View className='mt-5'>
                  <Text className='text-[12px] text-gray-400'>Person</Text>
                  <Text className='text-sm font-pregular'>{listing.price}</Text>
                </View>
              </View>
              <View className='flex-row'>
                <View className='bg-[#f4f4f4] px-[5px] py-2 my-5 rounded-lg mr-1 items-center'>
                  <Ionicons name='star' size={18} color={Colors.primaryColor} />
                </View>
                <View className='mt-5'>
                  <Text className='text-[12px] text-gray-400'>Rating</Text>
                  <Text className='text-sm font-pregular'>
                    {listing.rating} Days
                  </Text>
                </View>
              </View>
            </View>

            <Text
              style={{ letterSpacing: 0.5 }}
              className='text-[16px] text-black leading-6 '
            >
              {listing.description}
            </Text>
          </View>
        </Animated.ScrollView>
      </View>

      {/* listings details footer buttons */}
      <Animated.View
        entering={SlideInDown.delay(200)}
        className='absolute flex-1 flex-row w-full bottom-0 p-5 pb-6 gap-1'
        style={{ width: width }}
      >
        <TouchableOpacity
          onPress={() => {}}
          className='flex-2 w-3/4 bg-main p-5 rounded-lg items-center'
        >
          <Text className='text-white text-[16px] font-pregular uppercase '>
            Book Now
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {}}
          className='bg-black p-5 rounded-lg items-center w-3/12'
        >
          <Text className='text-white text-[16px] font-pregular uppercase'>
            ${listing.price}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};

export default DetailsPage;

const styles = StyleSheet.create({
  image: {
    width: width,
    height: IMG_HEIGHT,
  },
});
