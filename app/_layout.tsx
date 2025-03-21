import { useEffect } from 'react';
import { Stack, useSegments, useRootNavigation } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useSession } from '@/lib/auth';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export default function RootLayout() {
  useFrameworkReady();
  const { session, loading } = useSession();
  const segments = useSegments();
  const rootNavigation = useRootNavigation();

  useEffect(() => {
    if (!loading && rootNavigation?.isReady()) {
      const inAuthGroup = segments[0] === '(auth)';
      
      if (session && inAuthGroup) {
        // Rediriger vers l'app si l'utilisateur est connecté et sur une page d'auth
        rootNavigation.replace('/(tabs)');
      } else if (!session && !inAuthGroup) {
        // Rediriger vers la connexion si l'utilisateur n'est pas connecté et n'est pas sur une page d'auth
        rootNavigation.replace('/sign-in');
      }
    }
  }, [session, loading, segments, rootNavigation]);

  // Pendant le chargement, on montre un indicateur
  if (loading || !rootNavigation?.isReady()) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});