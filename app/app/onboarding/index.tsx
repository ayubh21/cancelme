import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewToken,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Brand } from '@/constants/theme';

const { width: W } = Dimensions.get('window');

const SLIDES = [
  {
    id: '1',
    title: 'See where your\nmoney disappears',
    subtitle: 'The average person pays for 12+ subscriptions. Half are completely forgotten about.',
  },
  {
    id: '2',
    title: 'Never get caught\noff guard again',
    subtitle: 'Get smart alerts before every renewal. You decide — keep it or cancel it.',
  },
  {
    id: '3',
    title: 'Stop wasting\n$624 every year',
    subtitle: "That's how much the average person wastes on unused subscriptions annually.",
  },
];

// ─── Slide 1: Orbital subscription hub ─────────────────────────────
function Illustration1() {
  const services = [
    { letter: 'N', color: '#E50914', size: 44, top: 20,  left: 40 },
    { letter: 'S', color: '#1DB954', size: 38, top: 15,  left: 200 },
    { letter: 'A', color: '#00A8E1', size: 42, top: 130, left: 230 },
    { letter: 'Y', color: '#FF0000', size: 34, top: 170, left: 30 },
    { letter: 'D', color: '#7B68EE', size: 30, top: 85,  left: 250 },
    { letter: 'H', color: '#1DB954', size: 28, top: 50,  left: 130 },
  ];

  return (
    <View style={il.orbitContainer}>
      {/* Decorative orbit rings */}
      <View style={[il.orbitRing, { width: 200, height: 200, borderRadius: 100 }]} />
      <View style={[il.orbitRing, { width: 280, height: 280, borderRadius: 140 }]} />

      {/* Decorative dashed curve */}
      <View style={il.dashedCurve}>
        {Array.from({ length: 8 }).map((_, i) => (
          <View key={i} style={il.dashDot} />
        ))}
      </View>

      {/* Center hub */}
      <View style={il.centerHub}>
        <Text style={il.centerHubAmount}>$127</Text>
        <Text style={il.centerHubLabel}>/month</Text>
      </View>

      {/* Floating service bubbles */}
      {services.map((s, i) => (
        <View
          key={i}
          style={[
            il.serviceBubble,
            {
              width: s.size,
              height: s.size,
              borderRadius: s.size / 2,
              backgroundColor: s.color,
              top: s.top,
              left: s.left,
            },
          ]}
        >
          <Text style={[il.serviceLetter, { fontSize: s.size * 0.42 }]}>{s.letter}</Text>
        </View>
      ))}

      {/* Floating amount badges */}
      <View style={[il.amountBadge, { top: 65, left: 20 }]}>
        <Text style={il.amountBadgeText}>$15.99</Text>
      </View>
      <View style={[il.amountBadge, { top: 120, left: 170 }]}>
        <Text style={il.amountBadgeText}>$9.99</Text>
      </View>

      {/* Decorative squiggle accent */}
      <View style={il.squiggle}>
        <View style={[il.squiggleDot, { backgroundColor: Brand.primary }]} />
        <View style={[il.squiggleDot, { backgroundColor: Brand.primary, opacity: 0.5 }]} />
        <View style={[il.squiggleDot, { backgroundColor: Brand.primary, opacity: 0.25 }]} />
      </View>
    </View>
  );
}

// ─── Slide 2: Smart alert card + calendar ──────────────────────────
function Illustration2() {
  return (
    <View style={il.alertContainer}>
      {/* Decorative ring */}
      <View style={[il.orbitRing, { width: 240, height: 240, borderRadius: 120 }]} />

      <View style={il.alertCard}>
        <View style={il.alertHeader}>
          <View style={il.alertIconWrap}>
            <Text style={{ fontSize: 18 }}>🔔</Text>
            <View style={il.alertBadge} />
          </View>
          <View style={il.alertHeaderText}>
            <Text style={il.alertTag}>RENEWAL ALERT</Text>
            <Text style={il.alertTitle}>Netflix renews tomorrow</Text>
          </View>
        </View>
        <View style={il.alertDivider} />
        <View style={il.alertRow}>
          <Text style={il.alertAmount}>$15.99</Text>
          <View style={il.alertActions}>
            <View style={il.alertKeep}><Text style={il.alertKeepText}>Keep</Text></View>
            <View style={il.alertCancel}><Text style={il.alertCancelText}>Cancel</Text></View>
          </View>
        </View>
      </View>

      {/* Mini calendar below */}
      <View style={il.miniCal}>
        {['M', 'T', 'W', 'T', 'F'].map((d, i) => (
          <View key={i} style={[il.miniCalDay, i === 2 && il.miniCalDayActive]}>
            <Text style={[il.miniCalDayLetter, i === 2 && il.miniCalDayLetterActive]}>{d}</Text>
            <Text style={[il.miniCalDayNum, i === 2 && il.miniCalDayNumActive]}>{14 + i}</Text>
          </View>
        ))}
      </View>

      {/* Decorative squiggle */}
      <View style={[il.squiggle, { bottom: 30, left: 20 }]}>
        <View style={[il.squiggleDot, { backgroundColor: '#3B82F6' }]} />
        <View style={[il.squiggleDot, { backgroundColor: '#3B82F6', opacity: 0.5 }]} />
      </View>
    </View>
  );
}

// ─── Slide 3: Savings counter ──────────────────────────────────────
function Illustration3() {
  return (
    <View style={il.savingsContainer}>
      <View style={[il.orbitRing, { width: 220, height: 220, borderRadius: 110 }]} />

      <View style={il.savingsCard}>
        <Text style={il.savingsEmoji}>🎉</Text>
        <Text style={il.savingsLabel}>POTENTIAL SAVINGS</Text>
        <Text style={il.savingsAmount}>$624</Text>
        <Text style={il.savingsYear}>per year</Text>
        <View style={il.savingsDivider} />
        <View style={il.cancelledRow}>
          <CancelledPill label="Hulu" />
          <CancelledPill label="Calm" />
          <CancelledPill label="Duolingo" />
        </View>
      </View>

      {/* Floating savings chips */}
      <View style={[il.savingsChip, { top: 20, right: 20 }]}>
        <Text style={il.savingsChipText}>+$52/mo</Text>
      </View>
      <View style={[il.savingsChip, { bottom: 40, left: 10 }]}>
        <Text style={il.savingsChipText}>3 cancelled</Text>
      </View>

      <View style={[il.squiggle, { top: 30, right: 50 }]}>
        <View style={[il.squiggleDot, { backgroundColor: '#10B981' }]} />
        <View style={[il.squiggleDot, { backgroundColor: '#10B981', opacity: 0.5 }]} />
        <View style={[il.squiggleDot, { backgroundColor: '#10B981', opacity: 0.25 }]} />
      </View>
    </View>
  );
}

function CancelledPill({ label }: { label: string }) {
  return (
    <View style={il.cancelledPill}>
      <Text style={il.cancelledPillText}>{label}</Text>
    </View>
  );
}

const ILLUSTRATIONS = [Illustration1, Illustration2, Illustration3];

// ─── Main carousel ─────────────────────────────────────────────────
export default function OnboardingCarousel() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems[0]?.index != null) {
        setActiveIndex(viewableItems[0].index);
      }
    }
  ).current;

  return (
    <SafeAreaView style={s.container} edges={['top', 'bottom']}>
      <FlatList
        ref={flatListRef}
        data={SLIDES}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        style={{ flex: 1 }}
        renderItem={({ item, index }) => {
          const Illus = ILLUSTRATIONS[index];
          return (
            <View style={s.slide}>
              <View style={s.illustrationArea}>
                <Text style={s.brandName}>CancelMe</Text>
                <Illus />
              </View>
              <View style={s.textArea}>
                <Text style={s.title}>{item.title}</Text>
                <Text style={s.subtitle}>{item.subtitle}</Text>
              </View>
            </View>
          );
        }}
      />

      <View style={s.bottom}>
        <View style={s.dots}>
          {SLIDES.map((_, i) => (
            <View
              key={i}
              style={[s.dot, i === activeIndex ? s.dotActive : s.dotInactive]}
            />
          ))}
        </View>
        <TouchableOpacity
          style={s.primaryBtn}
          onPress={() => router.push('/onboarding/subscription-interval')}
          activeOpacity={0.85}
        >
          <Text style={s.primaryBtnText}>Get Started</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.replace('/(tabs)')} activeOpacity={0.7}>
          <Text style={s.signInText}>Sign In</Text>
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
  },
});
