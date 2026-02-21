import { useState } from 'react';
import {
  Alert,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  StatusBar,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import { ROUTES } from '../../utils';

const PRIMARY = '#6A1B9A';       // Deep Purple (from logo)
const LIGHT_PURPLE = '#8E24AA';  // Accent
const BACKGROUND = '#F5F5FA';    // Soft background

const Login = () => {
  const [emailAdd, setEmailAdd] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={PRIMARY} barStyle="light-content" />

      {/* Logo */}
      <Image
        source={require('../../assets/secondary_logo.png')} // adjust path if needed
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Card Container */}
      <View style={styles.card}>
        <Text style={styles.title}>Login</Text>

        <CustomTextInput
          label={'Email Address'}
          placeholder={'Enter your email'}
          value={val => setEmailAdd(val)}
          containerStyle={styles.inputContainer}
          labelStyle={styles.label}
          textStyle={styles.inputText}
        />

        <CustomTextInput
          label={'Password'}
          placeholder={'Enter your password'}
          value={val => setPassword(val)}
          containerStyle={styles.inputContainer}
          labelStyle={styles.label}
          textStyle={styles.inputText}
        />

        <CustomButton
          label={'LOGIN'}
          containerStyle={styles.button}
          textStyle={styles.buttonText}
          onPress={() => {
            if (emailAdd === '' || password === '') {
              Alert.alert('Missing Fields', 'Please enter email and password.');
              return;
            }
          }}
        />

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Not registered yet?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(ROUTES.REGISTER)}
          >
            <Text style={styles.registerLink}> Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  logo: {
    width: 180,
    height: 120,
    marginBottom: 20,
  },

  card: {
    width: '100%',
    backgroundColor: '#ffffff',
    padding: 25,
    borderRadius: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },

  title: {
    fontSize: 24,
    fontWeight: '800',
    color: PRIMARY,
    marginBottom: 20,
    textAlign: 'center',
  },

  inputContainer: {
    marginBottom: 15,
  },

  label: {
    fontSize: 16,
    fontWeight: '600',
    color: PRIMARY,
  },

  inputText: {
    fontSize: 16,
  },

  button: {
    marginTop: 10,
    backgroundColor: PRIMARY,
    borderRadius: 30,
    paddingVertical: 15,
  },

  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 18,
  },

  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },

  registerText: {
    color: '#555',
  },

  registerLink: {
    color: LIGHT_PURPLE,
    fontWeight: '700',
  },
});