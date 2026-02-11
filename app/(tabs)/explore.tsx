import { Calendar } from 'lucide-react-native';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View
} from 'react-native';

// Shared State & Styles
import { useWater } from '@/src/hooks/WaterContext';
import { styles } from '@/src/styles/dashboardStyles';
import { theme } from '@/src/styles/theme';

// Components
import ActivityLog from '@/src/components/ActivityLog';

export default function HistoryScreen() {
  const { logs, removeWater } = useWater();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea}>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={styles.iconWrapper}>
              <Calendar size={24} color={theme.colors.primary} />
            </View>
            <Text style={styles.headerTitle}>Histórico</Text>
          </View>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={[styles.mainContent, { paddingBottom: 100 }]}
          showsVerticalScrollIndicator={false}
        >
          {/* Summary Section or Motivation */}
          <View style={styles.greetingSection}>
            <Text style={styles.greetingText}>Seu Registro 📈</Text>
            <Text style={styles.subGreeting}>Acompanhe cada gota consumida hoje.</Text>
          </View>

          {/* Activity Log */}
          <View>
            <Text style={styles.sectionTitle}>Registros de Hoje</Text>
            <View style={{ marginTop: theme.spacing.m }}>
              <ActivityLog logs={logs} onRemove={removeWater} />
            </View>
          </View>

          {logs.length > 0 && (
            <View style={{ marginTop: 40, padding: 20, backgroundColor: theme.colors.primaryLight, borderRadius: 20 }}>
              <Text style={{ color: theme.colors.primaryDark, fontWeight: '700', textAlign: 'center' }}>
                Total acumulado: {logs.reduce((acc: number, log: any) => acc + log.amount, 0)} ml
              </Text>
            </View>
          )}

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
