import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ONBOARDED_KEY } from '@/app/_layout';
import { Brand } from '@/constants/theme';

export default function CompleteScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={s.container} edges={['top', 'bottom']}>
      <View style={s.illustrationArea}>
        <Text style={s.brandName}>CancelMe</Text>
        <CompleteIllustration />
      </View>

      <View style={s.content}>
        <Text style={s.title}>You're all set!</Text>
        <Text style={s.subtitle}>
          CancelMe is ready to help you take back control of your subscriptions.
        </Text>

        <View style={s.statsRow}>
          <StatCard value="12+" label="Avg subs found" />
          <View style={s.statDivider} />
          <StatCard value="$624" label="Avg yearly waste" />
          <View style={s.statDivider} />
          <StatCard value="1 tap" label="To cancel any sub" />
        </View>

        <View style={s.bottom}>
          <TouchableOpacity
            style={s.primaryBtn}
            onPress={async () => {
              await AsyncStorage.setItem(ONBOARDED_KEY, 'true');
              router.replace('/(tabs)');
            }}
            activeOpacity={0.85}
          >
            <Text style={s.primaryBtnText}>Start saving money  →</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

function CompleteIllustration() {
  return (
    <View style={il.container}>
      <View style={il.checkRing}>
        <View style={il.checkCircle}>
          <Text style={il.checkMark}>✓</Text>
        </View>
      </View>
      <View style={il.confettiRow}>
        {['#F97316', '#3B82F6', '#10B981', '#F59E0B', '#EF4444'].map((c, i) => (
          <View
            key={i}
            style={[
              il.confettiDot,
              {
                backgroundColor: c,
                transform: [{ rotate: `${i * 40}deg` }],
                marginTop: i % 2 === 0 ? 0 : 12,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <View style={s.statCard}>
      <Text style={s.statValue}>{value}</Text>
      <Text style={s.statLabel}>{label}</Text>
    </View>
  );
}

const il = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  checkRing: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: Brand.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: Brand.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Brand.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 6,
  },
  checkMark: {
    fontSize: 40,
    color: '#fff',
    fontWeight: '800',
  },
  confettiRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  confettiDot: {
    width: 10,
    height: 10,
    borderRadius: 2,
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
    paddingTop: 28,
    paddingBottom: 16,
    gap: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#111827',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: '#6B7280',
    lineHeight: 22,
  },
  statsRow: {
    backgroundColor: Brand.illustrationBg,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    gap: 3,
  },
  statDivider: {
    width: 1,
    height: 36,
    backgroundColor: '#E5E7EB',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: Brand.primary,
    letterSpacing: -0.5,
  },
  statLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 14,
  },
  bottom: {
    marginTop: 'auto',
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
});
