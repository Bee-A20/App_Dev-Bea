import React, { useState, useEffect } from 'react';
import {
  Alert,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  StatusBar,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import { ROUTES } from '../../utils';
import { userRegister, resetLogin } from '../../app/reducers/auth';
import { AuthNavigationProp } from '../../navigations/AuthNav';

const PRIMARY = '#6A1B9A';
const LIGHT_PURPLE = '#8E24AA';
const BACKGROUND = '#F5F5FA';

interface AuthState {
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [agreedToTerms, setAgreedToTerms] = useState<boolean>(false);
  const navigation = useNavigation<AuthNavigationProp>();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state: any) => state.auth) as AuthState;

  useEffect(() => {
    dispatch(resetLogin());
  }, [dispatch]);

  const handleRegister = () => {
    if (!username || !email || !fullName || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (!agreedToTerms) {
      Alert.alert('Error', 'Please agree to the Terms and Conditions');
      return;
    }

    dispatch(
      userRegister({
        username,
        email,
        full_name: fullName,
        password,
      })
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
          label={'Username'}
          placeholder={'Enter your username'}
          value={setUsername}
          containerStyle={styles.inputContainer}
          labelStyle={styles.label}
          textStyle={styles.inputText}
        />

        <CustomTextInput
          label={'Email'}
          placeholder={'Enter your email'}
          value={setEmail}
          containerStyle={styles.inputContainer}
          labelStyle={styles.label}
          textStyle={styles.inputText}
        />

        <CustomTextInput
          label={'Full Name'}
          placeholder={'Enter your full name'}
          value={setFullName}
          containerStyle={styles.inputContainer}
          labelStyle={styles.label}
          textStyle={styles.inputText}
        />

        <CustomTextInput
          label={'Password'}
          placeholder={'Enter your password'}
          value={setPassword}
          containerStyle={styles.inputContainer}
          labelStyle={styles.label}
          textStyle={styles.inputText}
          secureTextEntry={true}
        />

        <CustomTextInput
          label={'Confirm Password'}
          placeholder={'Confirm your password'}
          value={setConfirmPassword}
          containerStyle={styles.inputContainer}
          labelStyle={styles.label}
          textStyle={styles.inputText}
          secureTextEntry={true}
        />

        <View style={styles.termsContainer}>
          <TouchableOpacity
            onPress={() => setAgreedToTerms(!agreedToTerms)}
            style={styles.checkbox}
          >
            <Text style={styles.checkboxText}>
              {agreedToTerms ? '☑' : '☐'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setAgreedToTerms(!agreedToTerms)}>
            <Text style={styles.termsText}>
              I agree to the Terms and Conditions
            </Text>
          </TouchableOpacity>
        </View>

        <CustomButton
          label={'REGISTER'}
          containerStyle={styles.button}
          textStyle={styles.buttonText}
          onPress={handleRegister}
          loading={isLoading}
        />

        <TouchableOpacity onPress={() => navigation.navigate(ROUTES.LOGIN)}>
          <View style={{ alignItems: 'center', marginTop: 16 }}>
            <Text style={styles.loginText}>
              Already have an account? <Text style={{ color: PRIMARY, fontWeight: '700' }}>Login</Text>
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: BACKGROUND,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: PRIMARY,
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 12,
  },
  label: {
    marginBottom: 6,
  },
  inputText: {
    fontSize: 14,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxText: {
    fontSize: 18,
  },
  termsText: {
    fontSize: 12,
    color: '#666',
  },
  button: {
    marginTop: 16,
    backgroundColor: PRIMARY,
    borderRadius: 15,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  loginText: {
    fontSize: 14,
    color: '#666',
  },
});

export default Register;
