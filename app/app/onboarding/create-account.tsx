
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewToken,
  
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Brand } from '@/constants/theme';
import { register } from '@/api/auth';

const { width: W } = Dimensions.get('window');

// ─── Main carousel ─────────────────────────────────────────────────
export default function OnboardingCarousel() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [authBody, setAuthBody] = useState({
    email: '',
    password: '',
    name: ''
  })
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')


  const flatListRef = useRef<FlatList>(null);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems[0]?.index != null) {
        setActiveIndex(viewableItems[0].index);
      }
    }
  ).current;

  const onSubmit = async () => {
    await register(authBody)  
  }

  return (
    <SafeAreaView style={s.container} edges={['top', 'bottom']}>
      <View style={s.bottom}>
        <Text>Email</Text>
        <TextInput style={s.textInput}>Email</TextInput>
        <TextInput>Password</TextInput>
      </View>

      <View style={s.bottom}>
        <View style={s.dots}>
        </View>
        <TouchableOpacity
          style={s.primaryBtn}
          onPress={() => router.push('/onboarding/subscription-interval')}
          activeOpacity={0.85}
        >
          <Text style={s.primaryBtnText}>Create Account</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.replace('/(tabs)')} activeOpacity={0.7}>
          <Text style={s.signInText}>Already have an account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// ─── Illustration styles ───────────────────────────────────────────
const il = StyleSheet.create({
  // Orbital hub (slide 1)
  orbitContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orbitRing: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
    borderStyle: 'dashed',
  },
  dashedCurve: {
    position: 'absolute',
    top: 50,
    right: 30,
    gap: 6,
  },
  dashDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Brand.primary,
    opacity: 0.3,
  },
  centerHub: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 6,
    zIndex: 10,
  },
  centerHubAmount: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
    letterSpacing: -1,
  },
  centerHubLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    fontWeight: '500',
    marginTop: -2,
  },
  serviceBubble: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  serviceLetter: {
    color: '#fff',
    fontWeight: '800',
  },
  amountBadge: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  amountBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#374151',
  },
  squiggle: {
    position: 'absolute',
    bottom: 40,
    right: 30,
    flexDirection: 'row',
    gap: 4,
  },
  squiggleDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },

  // Alert card (slide 2)
  alertContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  alertCard: {
    width: 270,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 18,
    gap: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 6,
    zIndex: 10,
  },
  alertHeader: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  alertIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Brand.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Brand.primary,
    borderWidth: 2,
    borderColor: '#fff',
  },
  alertHeaderText: {
    flex: 1,
    gap: 2,
  },
  alertTag: {
    fontSize: 9,
    fontWeight: '700',
    color: Brand.primary,
    letterSpacing: 0.8,
  },
  alertTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },
  alertDivider: {
    height: 1,
    backgroundColor: '#F3F4F6',
  },
  alertRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  alertAmount: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
    letterSpacing: -0.5,
  },
  alertActions: {
    flexDirection: 'row',
    gap: 8,
  },
  alertKeep: {
    backgroundColor: '#ECFDF5',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  alertKeepText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#059669',
  },
  alertCancel: {
    backgroundColor: '#FEF2F2',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  alertCancelText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#EF4444',
  },
  miniCal: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 6,
    gap: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    zIndex: 10,
  },
  miniCalDay: {
    width: 42,
    height: 48,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  miniCalDayActive: {
    backgroundColor: Brand.primary,
  },
  miniCalDayLetter: {
    fontSize: 10,
    color: '#9CA3AF',
    fontWeight: '600',
  },
  miniCalDayLetterActive: {
    color: 'rgba(255,255,255,0.8)',
  },
  miniCalDayNum: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  miniCalDayNumActive: {
    color: '#fff',
  },

  // Savings (slide 3)
  savingsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  savingsCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    width: 240,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 6,
    zIndex: 10,
    gap: 2,
  },
  savingsEmoji: {
    fontSize: 28,
    marginBottom: 4,
  },
  savingsLabel: {
    fontSize: 10,
    color: '#9CA3AF',
    fontWeight: '700',
    letterSpacing: 1,
  },
  savingsAmount: {
    fontSize: 56,
    fontWeight: '800',
    color: Brand.primary,
    letterSpacing: -3,
  },
  savingsYear: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
    marginBottom: 4,
  },
  savingsDivider: {
    width: '100%',
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 8,
  },
  cancelledRow: {
    flexDirection: 'row',
    gap: 6,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  cancelledPill: {
    backgroundColor: '#FEE2E2',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  cancelledPillText: {
    fontSize: 11,
    color: '#EF4444',
    fontWeight: '700',
    textDecorationLine: 'line-through',
  },
  savingsChip: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    zIndex: 10,
  },
  savingsChipText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#10B981',
  },
});

// ─── Screen styles ─────────────────────────────────────────────────
const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  slide: {
    width: W,
    flex: 1,
  },
  illustrationArea: {
    flex: 1.15,
    backgroundColor: Brand.illustrationBg,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    overflow: 'hidden',
  },
  brandName: {
    position: 'absolute',
    top: 16,
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    letterSpacing: 0.3,
    zIndex: 20,
  },
  textArea: {
    flex: 0.85,
    paddingHorizontal: 28,
    paddingTop: 28,
    gap: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#111827',
    lineHeight: 40,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: '#6B7280',
    lineHeight: 22,
  },
  bottom: {
    paddingHorizontal: 28,
    paddingBottom: 20,
    gap: 14,
    alignItems: 'center',
    marginTop: "auto"
  },
  dots: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 4,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  dotActive: {
    width: 24,
    backgroundColor: Brand.primary,
  },
  dotInactive: {
    width: 8,
    backgroundColor: '#E5E7EB',
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
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  signInText: {
    fontSize: 15,
    fontWeight: '600',
    color: Brand.primary,
    textDecorationLine: "underline"
  },
  alreadyHaveAnAccount: {
    fontSize: 15,
    fontWeight: '600',
    color: "grey",
  },

textInput: {
    borderColor: "black",
    borderTopWidth: 1,
    borderBottomWidth: 1  
}

});
