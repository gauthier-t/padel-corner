import { supabase } from './supabase';
import { useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { Platform } from 'react-native';

export function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Récupérer la session au chargement
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // S'abonner aux changements de session
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return { session, loading };
}

export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    return { data, error: null };
  } catch (error: any) {
    console.error('Error signing in:', error.message);
    return { 
      data: null, 
      error: new Error(error.message === 'Invalid login credentials' 
        ? 'Email ou mot de passe incorrect'
        : 'Une erreur est survenue lors de la connexion'
      )
    };
  }
}

export async function signUp(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: Platform.OS === 'web' && typeof window !== 'undefined' 
          ? window.location.origin 
          : undefined,
      },
    });

    if (error) throw error;

    if (!data?.user) {
      throw new Error('Une erreur est survenue lors de la création du compte');
    }

    return { data, error: null };
  } catch (error: any) {
    console.error('Error signing up:', error.message);
    return { 
      data: null, 
      error: new Error(
        error.message === 'User already registered'
          ? 'Un compte existe déjà avec cet email'
          : 'Une erreur est survenue lors de la création du compte'
      )
    };
  }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}