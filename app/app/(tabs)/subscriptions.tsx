import Ionicons from '@expo/vector-icons/Ionicons';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { fetchSubscriptions } from '@/api/subscriptions';
import type { Subscription } from '@/types/subscription';

export default function SubscriptionsScreen() {
  const [search, setSearch] = useState('');

  const { data, isLoading, isError, error, refetch } = useQuery<Subscription[]>({
    queryKey: ['subscriptions'],
    queryFn: fetchSubscriptions,
    initialData: [] as Subscription[]
  });



  const filtered = search
    ? data.filter(
        (s) =>
          s.subscriptionType.toLowerCase().includes(search.toLowerCase()) ||
          s.status.toLowerCase().includes(search.toLowerCase())
      )
    : data;

  return (
    <SafeAreaView style={s.container} edges={['top']}>
      {/* Header */}
      <View style={s.header}>
        <View style={s.headerSide} />
        <Text style={s.headerTitle}>Subscriptions</Text>
        <View style={s.headerSide}>
          <TouchableOpacity style={s.moreBtn}>
            <Ionicons name="ellipsis-horizontal" size={20} color="#111827" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search */}
      <View style={s.searchWrap}>
        <View style={s.searchBar}>
          <Ionicons name="search" size={17} color="#9CA3AF" />
          <TextInput
            style={s.searchInput}
            placeholder="Search"
            placeholderTextColor="#9CA3AF"
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      {/* Content */}
      {isLoading ? (
        <View style={s.centered}>
          <ActivityIndicator size="large" color="#9CA3AF" />
        </View>
      ) : isError ? (
        <View style={s.centered}>
          <Text style={s.errorText}>{error.message}</Text>
          <TouchableOpacity style={s.retryBtn} onPress={() => refetch()}>
            <Text style={s.retryBtnText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : filtered.length === 0 ? (
        <View style={s.centered}>
          <Text style={s.emptyText}>
            {search ? 'No results found' : 'No subscriptions yet'}
          </Text>
        </View>
      ) : (
        <View style={s.listCard}>
          <FlatList
            data={filtered}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={Divider}
            renderItem={({ item }) => <SubscriptionRow item={item} />}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

function SubscriptionRow({ item }: { item: Subscription }) {
  const price = item.price ? parseFloat(item.price) : 0;

  return (
    <TouchableOpacity style={s.row} activeOpacity={0.6}>
      <View style={s.rowIconWrap}>
        <Text style={s.rowInitial}>
          {item.subscriptionType.charAt(0).toUpperCase()}
        </Text>
      </View>

      <View style={s.rowInfo}>
        <Text style={s.rowName}>{item.subscriptionType}</Text>
        <Text style={s.rowPlan}>{item.status} • {item.currency}</Text>
      </View>

      <View style={s.rowRight}>
        <Text style={s.rowPrice}>
          {item.currency === 'USD' ? '$' : item.currency}
          {price % 1 === 0 ? price : price.toFixed(2)}
        </Text>
        <Ionicons name="chevron-forward" size={16} color="#D1D5DB" />
      </View>
    </TouchableOpacity>
  );
}

function Divider() {
  return <View style={s.divider} />;
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 10,
  },
  headerSide: {
    width: 40,
    alignItems: 'flex-end',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#111827',
    textAlign: 'center',
  },
  moreBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Search
  searchWrap: {
    paddingHorizontal: 16,
    paddingBottom: 14,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 40,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#111827',
    paddingVertical: 0,
  },

  // States
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  errorText: {
    fontSize: 15,
    color: '#EF4444',
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  retryBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#111827',
    borderRadius: 10,
  },
  retryBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyText: {
    fontSize: 15,
    color: '#9CA3AF',
  },

  // Card container for the list
  listCard: {
    flex: 1,
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },

  // Row
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 14,
  },
  rowIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  rowInitial: {
    fontSize: 18,
    fontWeight: '700',
    color: '#6B7280',
  },
  rowInfo: {
    flex: 1,
    gap: 2,
  },
  rowName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  rowPlan: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  rowPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },

  // Divider
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 16,
  },
});
