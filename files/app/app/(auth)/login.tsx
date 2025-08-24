import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import CustomButton from '../../components/CustomButton';
import { router, Stack } from 'expo-router';
import AuthHeader from '../../components/AuthHeader';
import AuthFooter from '../../components/AuthFooter';

const Login = () => {
  return (
    <SafeAreaView className='flex-1 bg-white h-full'>
      <View className='flex-1 h-full'>
        <AuthHeader title='Sign In' />
        <View className='p-8'>
          <Text className='text-xl bg-gradient-to-t from-sky-500 to-indigo-300 font-pbold mt-4 text-center'>
            Welcome Back To TripVista
          </Text>

          <TextInput
            className='mt-8 border-b-2 border-gray-300 pb-2'
            placeholder='Email'
            secureTextEntry
          />

          <TextInput
            className='mt-8 border-b-2 border-gray-300 pb-2'
            placeholder='Password'
            secureTextEntry
          />
          <TextInput className='mt-8 border-b-2 border-gray-300 pb-2'
          placeholder='image'
           />
          <TouchableOpacity className='mt-2'>
            <Text className='text-blue-500'>Forgot Password?</Text>
          </TouchableOpacity>

          <CustomButton
            title='SIGN IN'
            handlePress={() => router.push('/home')}
            customStyles={
              'border bg-blue-800 py-3 mt-8 rounded-full items-center'
            }
            textStyles={'text-white text-lg'}
          />

          <AuthFooter
            title='Sign Up'
            desc={`Don't Have An Account?`}
            link='/register'
          />
        </View>
      </View>
      <StatusBar barStyle='light-content' backgroundColor='transparent' />
    </SafeAreaView>
  );
};

export default Login;
