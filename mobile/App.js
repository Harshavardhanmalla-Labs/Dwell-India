import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import LiveVerificationScreen from './screens/LiveVerificationScreen';
import ProjectProfileScreen from './screens/ProjectProfileScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Home');

  if (currentScreen === 'Verification') {
    return <LiveVerificationScreen onComplete={() => setCurrentScreen('Home')} />;
  }

  if (currentScreen === 'Project') {
    return <ProjectProfileScreen onBack={() => setCurrentScreen('Home')} />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.hero}>
        <Text style={styles.tagline}>VERIFIED OWNER MARKETPLACE</Text>
        <Text style={styles.title}>DWELL INDIA</Text>
        <Text style={styles.subtitle}>Direct. Verified. Secure.</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.buttonPrimary} onPress={() => setCurrentScreen('Verification')}>
          <Text style={styles.buttonText}>Verify My Property</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.buttonSecondary, { marginTop: 10 }]}
          onPress={() => setCurrentScreen('Project')}
        >
          <Text style={[styles.buttonText, styles.textDark]}>View Builder Projects</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.buttonSecondary, { marginTop: 10, borderColor: '#3b82f6' }]}
          onPress={() => { }}
        >
          <Text style={[styles.buttonText, { color: '#3b82f6' }]}>Developer Dashboard</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.features}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>100% Verified</Text>
          <Text style={styles.cardText}>Every owner is Aadhaar verified.</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Direct Deal</Text>
          <Text style={styles.cardText}>No broker commissions.</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  hero: {
    alignItems: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  tagline: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2563eb',
    letterSpacing: 1,
    marginBottom: 10,
  },
  title: {
    fontSize: 42,
    fontWeight: '900',
    color: '#0f172a',
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 18,
    color: '#64748b',
    marginTop: 5,
  },
  actions: {
    width: '100%',
    paddingHorizontal: 30,
    gap: 15,
    marginBottom: 40,
  },
  buttonPrimary: {
    backgroundColor: '#2563eb',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonSecondary: {
    backgroundColor: '#fff',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  textDark: {
    color: '#0f172a',
  },
  features: {
    flexDirection: 'row',
    gap: 15,
    paddingHorizontal: 20,
  },
  card: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 5,
    color: '#0f172a',
  },
  cardText: {
    fontSize: 14,
    color: '#64748b',
  },
});
