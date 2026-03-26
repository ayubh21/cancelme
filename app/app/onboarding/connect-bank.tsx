import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Brand } from '@/constants/theme';

export default function ConnectBankScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={s.container} edges={['top', 'bottom']}>
      <View style={s.illustrationArea}>
        <Text style={s.brandName}>CancelMe</Text>
        <BankIllustration />
      </View>

      <View style={s.content}>
        <TouchableOpacity style={s.backBtn} onPress={() => router.back()}>
          <Text style={s.backBtnText}>←</Text>
        </TouchableOpacity>

        <View style={s.textBlock}>
          <Text style={s.step}>Final Step</Text>
          <Text style={s.title}>Connect your bank to reveal the truth</Text>
          <Text style={s.subtitle}>
            We'll scan your transactions and surface every subscription — including the ones you've forgotten.
          </Text>
        </View>

        <View style={s.bullets}>
          <Bullet icon="🔒" text="Read-only access — we can never move your money" />
          <Bullet icon="🏦" text="Powered by Plaid, trusted by millions" />
          <Bullet icon="🫥" text="We never store your bank credentials" />
        </View>

        <View style={s.bottom}>
          <ProgressDots total={4} current={4} />
          <TouchableOpacity
            style={s.primaryBtn}
            onPress={() => router.push('/onboarding/create-account')}
            activeOpacity={0.85}
          >
            <Text style={s.primaryBtnText}>Connect my bank</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/onboarding/create-account')} activeOpacity={0.7}>
            <Text style={s.skipText}>Skip for now — I'll add manually</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

function BankIllustration() {
  return (
    <View style={il.container}>
      <View style={il.bankCard}>
        <View style={il.cardTop}>
          <View style={il.chip} />
          <Text style={il.cardNetwork}>●●●●</Text>
        </View>
        <Text style={il.cardNumber}>•••• •••• •••• 4242</Text>
        <View style={il.cardBottom}>
          <Text style={il.cardLabel}>LINKED ACCOUNT</Text>
          <View style={il.shieldBadge}>
            <Text style={il.shieldText}>🔒 Secure</Text>
          </View>
        </View>
      </View>
      <View style={il.scanBar}>
        <View style={il.scanLine} />
        <Text style={il.scanText}>Scanning for subscriptions...</Text>
      </View>
      <View style={il.foundRow}>
        <FoundPill label="Netflix" />
        <FoundPill label="Spotify" />
        <FoundPill label="+9 more" highlight />
      </View>
    </View>
  );
}

function FoundPill({ label, highlight }: { label: string; highlight?: boolean }) {
  return (
    <View style={[il.foundPill, highlight && il.foundPillHighlight]}>
      <Text style={[il.foundPillText, highlight && il.foundPillTextHighlight]}>{label}</Text>
    </View>
  );
}

function Bullet({ icon, text }: { icon: string; text: string }) {
  return (
    <View style={s.bullet}>
      <Text style={s.bulletIcon}>{icon}</Text>
      <Text style={s.bulletText}>{text}</Text>
    </View>
  );
}

function ProgressDots({ total, current }: { total: number; current: number }) {
  return (
    <View style={s.dots}>
      {Array.from({ length: total }).map((_, i) => (
        <View key={i} style={[s.dot, i + 1 <= current ? s.dotActive : s.dotInactive]} />
      ))}
    </View>
  );
}

const il = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  bankCard: {
    width: 260,
    backgroundColor: '#1C1C1E',
    borderRadius: 20,
    padding: 20,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 8,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chip: {
    width: 32,
    height: 24,
    borderRadius: 5,
    backgroundColor: '#D4AF37',
  },
  cardNetwork: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.5)',
    letterSpacing: 2,
  },
  cardNumber: {
    fontSize: 15,
    color: '#fff',
    letterSpacing: 3,
    fontWeight: '500',
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardLabel: {
    fontSize: 9,
    color: 'rgba(255,255,255,0.5)',
    letterSpacing: 1.5,
    fontWeight: '600',
  },
  shieldBadge: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  shieldText: {
    fontSize: 11,
    color: '#fff',
    fontWeight: '500',
  },
  scanBar: {
    width: 260,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  scanLine: {
    width: '100%',
    height: 3,
    borderRadius: 1.5,
    backgroundColor: Brand.primaryLight,
    overflow: 'hidden',
  },
  scanText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  foundRow: {
    flexDirection: 'row',
    gap: 8,
  },
  foundPill: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  foundPillHighlight: {
    backgroundColor: Brand.primary,
  },
  foundPillText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
  },
  foundPillTextHighlight: {
    color: '#fff',
  },
});

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  illustrationArea: {
    flex: 1,
    backgroundColor: Brand.illustrationBg,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    overflow: 'hidden',
  },
  brandName: {
    position: 'absolute',
    top: 20,
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    letterSpacing: 0.3,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 16,
    gap: 16,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Brand.illustrationBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backBtnText: {
    fontSize: 18,
    color: '#374151',
    fontWeight: '600',
  },
  textBlock: {
    gap: 6,
  },
  step: {
    fontSize: 12,
    fontWeight: '600',
    color: Brand.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
    lineHeight: 32,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  bullets: {
    gap: 10,
  },
  bullet: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  bulletIcon: {
    fontSize: 18,
    width: 28,
    textAlign: 'center',
  },
  bulletText: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
    fontWeight: '500',
  },
  bottom: {
    gap: 12,
    alignItems: 'center',
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
  },
  skipText: {
    fontSize: 13,
    color: '#9CA3AF',
    fontWeight: '500',
  },
});
