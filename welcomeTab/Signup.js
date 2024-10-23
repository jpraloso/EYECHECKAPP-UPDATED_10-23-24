import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import COLORS from '../colors';
import Button from '../Button';
import { supabase } from '../lib/supabase';

const CustomAlert = ({ visible, message, onClose }) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
    >
      <View style={styles.modalOverlay}>
        <View style={styles.alertContainer}>
          <Ionicons name="warning-outline" size={50} color="#F9D648" />
          <Text style={styles.alertTitle}>Email error</Text>
          <Text style={styles.alertMessage}>{message}</Text>

          <TouchableOpacity onPress={onClose} style={styles.okButton}>
            <Text style={styles.okButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  async function signUpWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password
    });

    if (error) {
      setAlertMessage(`Email address "${email}" cannot be used as it is not authorized.`);
      setAlertVisible(true);
      setLoading(false);
    } else {
      navigation.navigate('Main');
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ flex: 1, marginHorizontal: 22 }}>
        <View style={{ marginVertical: 22 }}>
          <Text style={{
            fontSize: 22,
            fontWeight: 'bold',
            marginVertical: 12,
            color: COLORS.black
          }}>
            Create Account
          </Text>
          <Text style={{
            fontSize: 16,
            color: COLORS.black
          }}>Check your Visual Acuity Today!</Text>
        </View>

        {/* Input fields for first name, last name, email, password */}
        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: '400', marginVertical: 8 }}>First Name</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder='First Name'
              onChangeText={setFName}
              value={fName}
              placeholderTextColor={COLORS.black}
              style={{ width: '100%' }}
            />
          </View>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: '400', marginVertical: 8 }}>Last Name</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder='Last Name'
              onChangeText={setLName}
              value={lName}
              placeholderTextColor={COLORS.black}
              style={{ width: '100%' }}
            />
          </View>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: '400', marginVertical: 8 }}>Email address</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder='Enter your email address'
              onChangeText={setEmail}
              value={email}
              placeholderTextColor={COLORS.black}
              keyboardType='email-address'
              style={{ width: '100%' }}
            />
          </View>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: '400', marginVertical: 8 }}>Password</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder='Enter your password'
              onChangeText={setPassword}
              value={password}
              placeholderTextColor={COLORS.black}
              secureTextEntry={!isPasswordShown}
              style={{ width: '100%' }}
            />
            <TouchableOpacity
              onPress={() => setIsPasswordShown(!isPasswordShown)}
              style={{ position: 'absolute', right: 10 }}
            >
              <Ionicons name={isPasswordShown ? 'eye' : 'eye-off'} size={22} color={COLORS.black} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Checkbox
            value={isChecked}
            onValueChange={setIsChecked}
            color={isChecked ? COLORS.primary : COLORS.grey}
          />
          <Text style={{ fontSize: 16, color: COLORS.grey, marginLeft: 8 }}>
            I agree with
            <TouchableOpacity onPress={() => navigation.navigate('Terms')}>
              <Text style={{ color: COLORS.primary, fontSize: 16, marginLeft: 8 }}> Terms</Text>
            </TouchableOpacity> and
            <TouchableOpacity onPress={() => navigation.navigate('PrivacyPolicyScreen')}>
              <Text style={{ color: COLORS.primary, fontSize: 16, marginLeft: 8 }}> Privacy</Text>
            </TouchableOpacity>
          </Text>
        </View>

        <View style={{ marginTop: 18 }}>
          {loading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : (
            <Button title='Sign Up' filled onPress={signUpWithEmail} />
          )}
        </View>

        <View style={{ flexDirection: 'row', marginTop: 12, justifyContent: 'center' }}>
          <Text style={{ fontSize: 16, color: COLORS.black }}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{
              fontSize: 16,
              color: COLORS.primary,
              fontWeight: 'bold',
              marginLeft: 4
            }}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Custom Alert Modal */}
      <CustomAlert
        visible={alertVisible}
        message={alertMessage}
        onClose={() => setAlertVisible(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    height: 48,
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 22,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  alertContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  alertTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#000',
  },
  alertMessage: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    marginVertical: 10,
  },
  okButton: {
    marginTop: 20,
    backgroundColor: '#A6EBB7',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  okButtonText: {
    color: '#000',
    fontSize: 16,
  },
});

export default Signup;
