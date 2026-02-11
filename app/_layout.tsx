import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRootNavigationState, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { AuthProvider, useAuth } from '@/src/hooks/AuthContext';
import { WaterProvider } from '@/src/hooks/WaterContext';

export const unstable_settings = {
  anchor: '(tabs)',
};


function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const navigationState = useRootNavigationState();

  useEffect(() => {
    // Wait for the navigation state to be ready
    if (!navigationState?.key) return;

    const inAuthGroup = segments[0] === '(tabs)';

    // Use a small delay to ensure the layout is fully committed
    const timer = setTimeout(() => {
      if (!isAuthenticated && inAuthGroup) {
        // Only redirect if we're not already on the login page
        router.replace('/login');
      } else if (isAuthenticated && segments[0] === 'login') {
        // Redirection to home if already logged in
        router.replace('/(tabs)');
      }
    }, 1);

    return () => clearTimeout(timer);
  }, [isAuthenticated, segments, navigationState?.key, router]);

  return <>{children}</>;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      <AuthGuard>
        <WaterProvider>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack>
              <Stack.Screen name="login" options={{ headerShown: false }} />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
            </Stack>
            <StatusBar style="auto" />
          </ThemeProvider>
        </WaterProvider>
      </AuthGuard>
    </AuthProvider>
  );
}
