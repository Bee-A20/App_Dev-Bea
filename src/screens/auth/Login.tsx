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
import { userLogin, resetLogin } from '../../app/reducers/auth';
import { AuthNavigationProp } from '../../navigations/AuthNav';

const PRIMARY = '#6A1B9A';
const LIGHT_PURPLE = '#8E24AA';
const BACKGROUND = '#F5F5FA';

interface AuthState {
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

const Login: React.FC = () => {
  const [emailAdd, setEmailAdd] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigation = useNavigation<AuthNavigationProp>();
  const dispatch = useDispatch();
  const { isLoading, isError, errorMessage } = useSelector(
    (state: any) => state.auth
  ) as AuthState;

  useEffect(() => {
    dispatch(resetLogin());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      Alert.alert(
        'Invalid Credentials',
        errorMessage || 'Please check your username and password.'
      );
    }
  }, [isError]);

  const handleLogin = () => {
    if (!emailAdd || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    dispatch(
      userLogin({
        username: emailAdd,
        password: password,
      })
    );
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      scrollEnabled={false}
    >
      <StatusBar backgroundColor={PRIMARY} barStyle="light-content" />

      {/* Logo */}
      <Image
        source={require('../../assets/secondary_logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Card Container */}
      <View style={styles.card}>
        <Text style={styles.title}>Login</Text>

        <CustomTextInput
          label={'Username'}
          placeholder={'Enter your username'}
          value={setEmailAdd}
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

        <CustomButton
          label={'LOGIN'}
          containerStyle={styles.button}
          textStyle={styles.buttonText}
          onPress={handleLogin}
          loading={isLoading}
        />

        <TouchableOpacity onPress={() => navigation.navigate(ROUTES.REGISTER)}>
          <View style={{ alignItems: 'center', marginTop: 16 }}>
            <Text style={styles.registerText}>
              Don't have an account? <Text style={{ color: PRIMARY, fontWeight: '700' }}>Register</Text>
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
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 30,
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
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
  },
  inputText: {
    fontSize: 14,
  },
  button: {
    marginTop: 20,
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
  registerText: {
    fontSize: 14,
    color: '#666',
  },
});

export default Login;
