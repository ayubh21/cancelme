import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Brand } from '@/constants/theme';

type Option = {
  id: string;
  label: string;
  emoji: string;
  sublabel: string;
};

const OPTIONS: Option[] = [
  { id: '1-3',  emoji: '😌', label: '1 – 3',   sublabel: 'Just the essentials' },
  { id: '4-7',  emoji: '🤔', label: '4 – 7',   sublabel: "It's manageable" },
  { id: '8-12', emoji: '😬', label: '8 – 12',  sublabel: "It's adding up..." },
  { id: '13+',  emoji: '🤯', label: '13+',      sublabel: "I've honestly lost count" },
  { id: 'idk',  emoji: '🫠', label: 'No idea',  sublabel: 'Help me find out!' },
];

export default function SubscriptionCountScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <SafeAreaView style={s.container} edges={['top', 'bottom']}>
      <View style={s.inner}>
        <TouchableOpacity style={s.backBtn} onPress={() => router.back()}>
          <Text style={s.backBtnText}>←</Text>
        </TouchableOpacity>

        <View style={s.header}>
          <Text style={s.step}>Question 1 of 2</Text>
          <Text style={s.title}>How many subscriptions do you think you're paying for?</Text>
          <Text style={s.subtitle}>
            Most people guess low. We'll show you the real number once you connect your bank.
          </Text>
        </View>

        <View style={s.options}>
          {OPTIONS.map((opt) => (
            <TouchableOpacity
              key={opt.id}
              style={[s.option, selected === opt.id && s.optionSelected]}
              onPress={() => setSelected(opt.id)}
              activeOpacity={0.7}
            >
              <Text style={s.optionEmoji}>{opt.emoji}</Text>
              <View style={s.optionText}>
                <Text style={[s.optionLabel, selected === opt.id && s.optionLabelSelected]}>
                  {opt.label}
                </Text>
                <Text style={s.optionSublabel}>{opt.sublabel}</Text>
              </View>
              <View style={[s.radio, selected === opt.id && s.radioSelected]}>
                {selected === opt.id && <View style={s.radioInner} />}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={s.bottom}>
          <ProgressDots total={4} current={2} />
          <TouchableOpacity
            style={[s.primaryBtn, !selected && s.primaryBtnDisabled]}
            onPress={() => selected && router.push('/onboarding/spending-habits')}
            activeOpacity={0.85}
          >
            <Text style={s.primaryBtnText}>Continue</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/onboarding/spending-habits')} activeOpacity={0.7}>
            <Text style={s.skipText}>Skip this step ×</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
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

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inner: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 16,
    gap: 20,
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
  header: {
    gap: 8,
  },
  step: {
    fontSize: 12,
    fontWeight: '600',
    color: Brand.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#111827',
    lineHeight: 34,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  options: {
    flex: 1,
    gap: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Brand.illustrationBg,
    borderRadius: 14,
    padding: 14,
    gap: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionSelected: {
    backgroundColor: Brand.primaryLight,
    borderColor: Brand.primary,
  },
  optionEmoji: {
    fontSize: 24,
    width: 36,
    textAlign: 'center',
  },
  optionText: {
    flex: 1,
    gap: 1,
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  optionLabelSelected: {
    color: Brand.primaryDark,
  },
  optionSublabel: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: Brand.primary,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Brand.primary,
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
  primaryBtnDisabled: {
    opacity: 0.4,
  },
  primaryBtnText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },
  skipText: {
    fontSize: 14,
    color: '#9CA3AF',
    fontWeight: '500',
  },
});
