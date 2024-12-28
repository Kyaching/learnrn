import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Button from '../../components/Button/Button';
import SocialLogin from '../LoginScreen/SocialLogin';

const SignUpScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.loginText}>Create Account</Text>

      <View
        style={{marginTop: 20, width: '100%', alignItems: 'center', gap: 25}}>
        <TextInput
          placeholder="Enter Email"
          style={styles.inputField}
          inputMode="text"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Enter Password"
          style={styles.inputField}
          inputMode="text"
          secureTextEntry={true}
        />
        <TextInput
          placeholder="Confirm Password"
          style={styles.inputField}
          inputMode="text"
          secureTextEntry={true}
        />
      </View>
      <View
        style={{
          alignItems: 'flex-end',
          justifyContent: 'center',
          width: '100%',
        }}>
        <TouchableOpacity style={{paddingHorizontal: 20, paddingVertical: 10}}>
          <Text style={{color: '#176FF2'}}>Forget your Password?</Text>
        </TouchableOpacity>
      </View>
      <Button label={'Sign Up'} />
      <Button
        label={'Already have an account?'}
        style={{backgroundColor: 'white'}}
        variant="secondary"
      />
      <SocialLogin />
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    fontSize: 34,
    color: '#176FF2',
    fontWeight: 'bold',
  },
  inputField: {
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: '#F1F4FF',
    width: '90%',
    height: 48,
    padding: 8,
    borderColor: '#176FF2',
  },
});
