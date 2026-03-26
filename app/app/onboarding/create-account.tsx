
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { register } from '@/api/auth';
import { Brand } from '@/constants/theme';

export default function CreateAccount() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [focused, setFocused] = useState<'email' | 'password' | 'confirm' | null>(null);

  const onSubmit = async () => {
    await register({ email, password, name: '' });
    router.push('/onboarding/subscription-interval');
  };

  return (
    <SafeAreaView style={s.container} edges={['top', 'bottom']}>
      {/* Logo */}
      <View style={s.logoWrap}>
        <View style={s.logoCircle}>
          <MaterialIcons name="account-balance-wallet" size={28} color={Brand.primary} />
        </View>
      </View>

      {/* Heading */}
      <Text style={s.title}>Sign Up to cancelme</Text>

      {/* Form */}
      <View style={s.form}>
        {/* Email */}
        <View style={s.fieldGroup}>
          <Text style={s.label}>Email Address</Text>
          <View style={[s.inputWrap, focused === 'email' && s.inputWrapFocused]}>
            <MaterialIcons name="email" size={18} color="#9CA3AF" style={s.inputIcon} />
            <TextInput
              style={s.input}
              placeholder="Enter your email address..."
              placeholderTextColor="#9CA3AF"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              onFocus={() => setFocused('email')}
              onBlur={() => setFocused(null)}
            />
          </View>
        </View>

        {/* Password */}
        <View style={s.fieldGroup}>
          <Text style={s.label}>Password</Text>
          <View style={[s.inputWrap, focused === 'password' && s.inputWrapFocused]}>
            <MaterialIcons name="lock" size={18} color="#9CA3AF" style={s.inputIcon} />
            <TextInput
              style={s.input}
              placeholder="Enter your password..."
              placeholderTextColor="#9CA3AF"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              onFocus={() => setFocused('password')}
              onBlur={() => setFocused(null)}
            />
            <TouchableOpacity onPress={() => setShowPassword(v => !v)} style={s.eyeBtn}>
              <MaterialIcons
                name={showPassword ? 'visibility' : 'visibility-off'}
                size={18}
                color="#9CA3AF"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Confirm Password */}
        <View style={s.fieldGroup}>
          <Text style={s.label}>Confirm Password</Text>
          <View style={[s.inputWrap, focused === 'confirm' && s.inputWrapFocused]}>
            <MaterialIcons name="lock" size={18} color="#9CA3AF" style={s.inputIcon} />
            <TextInput
              style={s.input}
              placeholder="Enter your password..."
              placeholderTextColor="#9CA3AF"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirm}
              onFocus={() => setFocused('confirm')}
              onBlur={() => setFocused(null)}
            />
            <TouchableOpacity onPress={() => setShowConfirm(v => !v)} style={s.eyeBtn}>
              <MaterialIcons
                name={showConfirm ? 'visibility' : 'visibility-off'}
                size={18}
                color="#9CA3AF"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Actions */}
      <View style={s.actions}>
        <TouchableOpacity style={s.primaryBtn} onPress={onSubmit} activeOpacity={0.85}>
          <Text style={s.primaryBtnText}>Create Account</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.replace('/(tabs)')} activeOpacity={0.7}>
          <Text style={s.linkText}>I Already Have Account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 28,
    paddingBottom: 65,
  },
  logoWrap: {
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 24,
  },
  logoCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Brand.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '500',
    color: '#111827',
    textAlign: 'center',
    letterSpacing: -0.5,
    marginBottom: 32,
  },
  form: {
    gap: 20,
  },
  fieldGroup: {
    gap: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 20,
    paddingHorizontal: 14,
    height: 52,
    backgroundColor: '#fff',
  },
  inputWrapFocused: {
    borderWidth: 0,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#111827',
    borderRadius: 20,
  },
  eyeBtn: {
    padding: 4,
  },
  actions: {
    marginTop: 'auto',
    paddingBottom: 16,
    gap: 16,
    alignItems: 'center',
  },
  primaryBtn: {
    width: '100%',
    height: 56,
    backgroundColor: Brand.primary,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  linkText: {
    fontSize: 15,
    fontWeight: '600',
    color: Brand.primary,
    textDecorationLine: 'underline',
  },
});
