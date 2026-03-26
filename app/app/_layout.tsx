import AsyncStorage from '@react-native-async-storage/async-storage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Redirect, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

const queryClient = new QueryClient();

export const unstable_settings = {
  anchor: '(tabs)',
};

export const ONBOARDED_KEY = 'hasOnboarded';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [ready, setReady] = useState(false);
  const [hasOnboarded, setHasOnboarded] = useState<boolean | null>(null);

  useEffect(() => {
    if(__DEV__) {
     setHasOnboarded(false) 
     setReady(true);
    }
    AsyncStorage.getItem(ONBOARDED_KEY).then((value: string | null) => {
      setHasOnboarded(value === 'true');
      setReady(true);
    });
  }, []);

  if (!ready) {
    return (
      <View style={{ flex: 1, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: '#fff', fontSize: 34, fontWeight: '800', letterSpacing: 1.5 }}>
          CancelMe
        </Text>
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="onboarding" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
        {!hasOnboarded && <Redirect href="/onboarding" />}
        <StatusBar style="auto" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
