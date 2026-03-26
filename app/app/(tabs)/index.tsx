import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Brand } from '@/constants/theme';

export default function HomeScreen() {
  return (
    <SafeAreaView style={s.container} edges={['top']}>
      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        <View style={s.header}>
          <View>
            <Text style={s.greeting}>Good morning</Text>
            <Text style={s.userName}>Welcome back</Text>
          </View>
          <View style={s.notifBtn}>
            <Text style={s.notifIcon}>🔔</Text>
          </View>
        </View>

        {/* <View style={s.summaryCard}>
          <Text style={s.summaryLabel}>Total monthly spend</Text>
          <Text style={s.summaryAmount}>$0.00</Text>
          <View style={s.summaryPills}>
            <Pill label="0 active" />
            <Pill label="$0 savings found" />
          </View>
        </View> */}

        <Section title="Upcoming Renewals">
          <EmptyState
            icon="📅"
            text="No upcoming renewals"
            sub="Connect your bank or add subscriptions manually."
          />
        </Section>

        <Section title="Recent Subscriptions">
          <EmptyState
            icon="💳"
            text="No subscriptions yet"
            sub="We'll detect them automatically once your bank is connected."
          />
        </Section>

        <TouchableOpacity style={s.addBtn} activeOpacity={0.85}>
          <Text style={s.addBtnText}>+ Add subscription manually</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={s.section}>
      <View style={s.sectionHeader}>
        <Text style={s.sectionTitle}>{title}</Text>
        <TouchableOpacity>
          <Text style={s.seeAll}>See all →</Text>
        </TouchableOpacity>
      </View>
      {children}
    </View>
  );
}

function Pill({ label }: { label: string }) {
  return (
    <View style={s.pill}>
      <Text style={s.pillText}>{label}</Text>
    </View>
  );
}

function EmptyState({ icon, text, sub }: { icon: string; text: string; sub: string }) {
  return (
    <View style={s.emptyState}>
      <Text style={s.emptyIcon}>{icon}</Text>
      <Text style={s.emptyText}>{text}</Text>
      <Text style={s.emptySub}>{sub}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Brand.illustrationBg,
  },
  scroll: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    gap: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
  },
  greeting: {
    fontSize: 13,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  userName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
    letterSpacing: -0.3,
  },
  notifBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  notifIcon: {
    fontSize: 18,
  },
  summaryCard: {
    backgroundColor: Brand.primary,
    borderRadius: 22,
    padding: 24,
    gap: 6,
  },
  summaryLabel: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '500',
  },
  summaryAmount: {
    fontSize: 44,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: -2,
  },
  summaryPills: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  pill: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  pillText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
  section: {
    gap: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  seeAll: {
    fontSize: 13,
    color: Brand.primary,
    fontWeight: '600',
  },
  emptyState: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    gap: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  emptyIcon: {
    fontSize: 28,
    marginBottom: 4,
  },
  emptyText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#374151',
  },
  emptySub: {
    fontSize: 13,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 18,
  },
  addBtn: {
    height: 54,
    backgroundColor: Brand.primary,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
});
