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

const PRIMARY = '#6A1B9A';
const LIGHT_PURPLE = '#8E24AA';
const BACKGROUND = '#F5F5FA';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [emailAdd, setEmailAdd] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={PRIMARY} barStyle="light-content" />

      {/* Logo */}
      <Image
        source={require('../../assets/secondary_logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Card Container */}
      <View style={styles.card}>
        <Text style={styles.title}>Register</Text>

        <CustomTextInput
          label={'Full Name'}
          placeholder={'Enter your full name'}
          value={val => setFullName(val)}
          containerStyle={styles.inputContainer}
          labelStyle={styles.label}
          textStyle={styles.inputText}
        />

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

        <CustomTextInput
          label={'Confirm Password'}
          placeholder={'Confirm your password'}
          value={val => setConfirmPassword(val)}
          containerStyle={styles.inputContainer}
          labelStyle={styles.label}
          textStyle={styles.inputText}
        />

        <CustomButton
          label={'REGISTER'}
          containerStyle={styles.button}
          textStyle={styles.buttonText}
          onPress={() => {
            if (!fullName || !emailAdd || !password || !confirmPassword) {
              Alert.alert('Missing Fields', 'Please fill in all fields.');
              return;
            }
            if (password !== confirmPassword) {
              Alert.alert('Password Mismatch', 'Passwords do not match.');
              return;
            }
          }}
        />

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate(ROUTES.LOGIN)}>
            <Text style={styles.loginLink}> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Register;

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

  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },

  loginText: {
    color: '#555',
  },

  loginLink: {
    color: LIGHT_PURPLE,
    fontWeight: '700',
  },
});