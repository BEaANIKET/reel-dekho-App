import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import api from '../api/axios';
import {useDispatch} from 'react-redux';
import {fetchUser} from '../redux/slices/authSlices';

export const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      if (email == '' || password == '') {
        return setError('Email and password are required');
      }
      const response = await api.post('/auth/login', {email, password});
      dispatch(fetchUser());
      Alert.alert('Login Successful', 'You have logged in successfully!', [
        {text: 'OK'},
      ]);
      navigation.navigate('Main');
      console.log(response.data);
    } catch (error) {
      console.log(error?.response?.data);
      setError(error?.response?.data?.message);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        {/* <Image
          source={require('./assets/logo.svg')}
          style={styles.logo}
          resizeMode="contain"
        /> */}
        <Text style={styles.logoText}>REEL{'\n'}DEKHO</Text>
      </View>

      {/* Title */}
      <Text style={styles.title}>Sign in to your account</Text>

      {/* Form */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {error && (
          <Text style={{color: 'red', marginBottom: 10, textAlign: 'center'}}>
            {error}
          </Text>
        )}
        <TouchableOpacity
          disabled={loading}
          onPress={handleLogin}
          style={styles.button}>
          {loading ? (
            <Text style={styles.buttonText}>Loading...</Text>
          ) : (
            <Text style={styles.buttonText}>Sign in</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Social Divider */}
      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>Or Continue With Socials</Text>
        <View style={styles.divider} />
      </View>

      {/* Social Login */}
      <TouchableOpacity style={styles.socialButton}>
        <Text style={styles.socialButtonText}>Google</Text>
      </TouchableOpacity>

      {/* Bottom Links */}
      <View style={styles.bottomLinks}>
        <View style={styles.signupContainer}>
          <Text style={styles.bottomText}>Do not have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Main')}>
            <Text style={styles.link}>Signup</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Text style={[styles.link, styles.forgotPassword]}>
            forget password
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const SignupScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        {/* <Image
          source={require('./assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        /> */}
        <Text style={styles.logoText}>REEL{'\n'}DEKHO</Text>
      </View>

      {/* Title */}
      <Text style={styles.title}>Create an account</Text>

      {/* Form */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>
      </View>

      {/* Social Divider */}
      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>Or Continue With Socials</Text>
        <View style={styles.divider} />
      </View>

      {/* Social Login */}
      <TouchableOpacity style={styles.socialButton}>
        <Text style={styles.socialButtonText}>Google</Text>
      </TouchableOpacity>

      {/* Bottom Link */}
      <View style={styles.signupContainer}>
        <Text style={styles.bottomText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  logo: {
    width: 40,
    height: 40,
  },
  logoText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#0F172A',
  },
  form: {
    width: '100%',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  button: {
    backgroundColor: '#0F172A',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginTop: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#CBD5E1',
  },
  dividerText: {
    paddingHorizontal: 10,
    color: '#64748B',
    fontSize: 14,
  },
  socialButton: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  socialButtonText: {
    color: '#0F172A',
    fontWeight: '500',
    fontSize: 16,
  },
  bottomLinks: {
    marginTop: 20,
    alignItems: 'center',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  bottomText: {
    color: '#64748B',
    fontSize: 14,
  },
  link: {
    color: '#3B82F6',
    fontWeight: '500',
    fontSize: 14,
  },
  forgotPassword: {
    marginTop: 10,
  },
});
