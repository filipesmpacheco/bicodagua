import { useRouter } from 'expo-router';
import { Bell, Droplet, Edit2, Settings } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

// Shared State & Styles
import { useWater } from '@/src/hooks/WaterContext';
import { styles as globalStyles } from '@/src/styles/dashboardStyles';
import { theme } from '@/src/styles/theme';

// Components
import ActivityLog from '@/src/components/ActivityLog';
import ProgressRing from '@/src/components/ProgressRing';
import QuickAdd from '@/src/components/QuickAdd';

function InputModal({ isVisible, onClose, onConfirm, title, placeholder, initialValue = "" }: any) {
  const [value, setValue] = useState(initialValue);

  // Sync internal state when initialValue changes or modal opens
  React.useEffect(() => {
    if (isVisible) {
      setValue(initialValue);
    }
  }, [isVisible, initialValue]);

  const handleConfirm = () => {
    onConfirm(value);
    onClose();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={modalStyles.overlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={modalStyles.container}
        >
          <View style={modalStyles.modalContent}>
            <Text style={modalStyles.title}>{title}</Text>
            <TextInput
              style={modalStyles.input}
              placeholder={placeholder}
              value={value}
              onChangeText={setValue}
              keyboardType="number-pad"
              autoFocus={true}
            />
            <View style={modalStyles.buttonGroup}>
              <TouchableOpacity style={modalStyles.cancelButton} onPress={onClose}>
                <Text style={modalStyles.cancelText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={modalStyles.confirmButton} onPress={handleConfirm}>
                <Text style={modalStyles.confirmText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: theme.colors.text,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    padding: 15,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: theme.colors.text,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmButton: {
    flex: 1,
    padding: 15,
    backgroundColor: theme.colors.primary,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelText: {
    fontWeight: '700',
    color: theme.colors.textLight,
  },
  confirmText: {
    fontWeight: '700',
    color: '#FFFFFF',
  }
});

export default function HomeScreen() {
  const {
    currentWater,
    dailyGoal,
    setDailyGoal,
    progress,
    remaining,
    logs,
    motivationalMsg,
    addWater,
    removeWater
  } = useWater();

  const router = useRouter();
  const [isWaterModalOpen, setIsWaterModalOpen] = useState(false);
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);

  const handleManualAddConfirm = (value: string) => {
    const amount = parseInt(value, 10);
    if (!isNaN(amount) && amount > 0) {
      addWater(amount);
    } else {
      Alert.alert('Erro', 'Por favor, insira um valor válido.');
    }
  };

  const handleGoalEditConfirm = (value: string) => {
    const goal = parseInt(value, 10);
    if (!isNaN(goal) && goal >= 500) {
      setDailyGoal(goal);
    } else {
      Alert.alert('Erro', 'A meta deve ser de pelo menos 500ml.');
    }
  };

  return (
    <View style={globalStyles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={globalStyles.safeArea}>

        {/* Header */}
        <View style={globalStyles.header}>
          <View style={globalStyles.logoContainer}>
            <View style={globalStyles.iconWrapper}>
              <Droplet size={24} color={theme.colors.primary} fill={theme.colors.primary} />
            </View>
            <Text style={globalStyles.headerTitle}>Bico d'Água</Text>
          </View>
          <TouchableOpacity
            style={{ padding: 8 }}
            onPress={() => router.push('/(tabs)/settings')}
          >
            <Settings size={24} color={theme.colors.textLight} />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={[globalStyles.mainContent, { paddingBottom: 100 }]}
          showsVerticalScrollIndicator={false}
        >
          {/* Greeting */}
          <View style={globalStyles.greetingSection}>
            <Text style={globalStyles.greetingText}>Olá, Bernardino! 👋</Text>
            <Text style={globalStyles.subGreeting}>{motivationalMsg}</Text>
          </View>

          {/* Progress Card */}
          <View style={globalStyles.progressCard}>
            <ProgressRing progress={progress} />

            <View style={globalStyles.progressStats}>
              <Text style={globalStyles.currentAmount}>{currentWater} ml</Text>

              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Text style={globalStyles.goalText}>Meta Diária: {dailyGoal} ml</Text>
                <TouchableOpacity onPress={() => setIsGoalModalOpen(true)}>
                  <Edit2 size={14} color={theme.colors.primary} />
                </TouchableOpacity>
              </View>

              <Text style={[
                globalStyles.remainingText,
                remaining === 0 && { color: theme.colors.success }
              ]}>
                {remaining > 0 ? `Faltam ${remaining} ml` : "Meta Atingida! 🎉"}
              </Text>
            </View>
          </View>

          {/* Reminder Banner */}
          <View style={globalStyles.reminderBanner}>
            <Bell size={20} color={theme.colors.success} />
            <Text style={globalStyles.reminderText}>
              Próximo lembrete às <Text style={globalStyles.bold}>15:30</Text>. Mantenha o ritmo!
            </Text>
          </View>

          {/* Quick Registration */}
          <View style={{ marginBottom: theme.spacing.l }}>
            <View style={globalStyles.sectionHeader}>
              <Text style={globalStyles.sectionTitle}>Registro Rápido</Text>
              <TouchableOpacity onPress={() => setIsWaterModalOpen(true)}>
                <Text style={globalStyles.customizeText}>Personalizar</Text>
              </TouchableOpacity>
            </View>
            <QuickAdd onAdd={addWater} />
          </View>

          {/* Activity Log */}
          <View>
            <Text style={globalStyles.sectionTitle}>Hoje</Text>
            <View style={{ marginTop: theme.spacing.m }}>
              <ActivityLog logs={logs} onRemove={removeWater} />
            </View>
          </View>

        </ScrollView>

        <InputModal
          isVisible={isWaterModalOpen}
          onClose={() => setIsWaterModalOpen(false)}
          onConfirm={handleManualAddConfirm}
          title="Adicionar Água"
          placeholder="Ex: 350"
        />

        <InputModal
          isVisible={isGoalModalOpen}
          onClose={() => setIsGoalModalOpen(false)}
          onConfirm={handleGoalEditConfirm}
          title="Editar Meta Diária"
          placeholder="Ex: 2500"
          initialValue={dailyGoal.toString()}
        />

      </SafeAreaView>
    </View>
  );
}
