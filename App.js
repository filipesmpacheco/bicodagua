import { Bell, Droplet, Settings } from 'lucide-react-native';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

// Custom Hooks & Styles
import { useWaterTracker } from './src/hooks/useWaterTracker';
import { styles } from './src/styles/dashboardStyles';
import { theme } from './src/styles/theme';

// Components
import ActivityLog from './src/components/ActivityLog';
import ProgressRing from './src/components/ProgressRing';
import QuickAdd from './src/components/QuickAdd';
import TabBar from './src/components/TabBar';

export default function App() {
    const {
        currentWater,
        dailyGoal,
        progress,
        remaining,
        logs,
        motivationalMsg,
        addWater
    } = useWaterTracker();

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.safeArea}>

                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.logoContainer}>
                        <View style={styles.iconWrapper}>
                            <Droplet size={24} color={theme.colors.primary} fill={theme.colors.primary} />
                        </View>
                        <Text style={styles.headerTitle}>Bico d'Água</Text>
                    </View>
                    <TouchableOpacity style={{ padding: 8 }}>
                        <Settings size={24} color={theme.colors.textLight} />
                    </TouchableOpacity>
                </View>

                <ScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={[styles.mainContent, { paddingBottom: 100 }]}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Greeting */}
                    <View style={styles.greetingSection}>
                        <Text style={styles.greetingText}>Olá, Bernardino!</Text>
                        <Text style={styles.subGreeting}>{motivationalMsg}</Text>
                    </View>

                    {/* Progress Card */}
                    <View style={styles.progressCard}>
                        <ProgressRing progress={progress} />

                        <View style={styles.progressStats}>
                            <Text style={styles.currentAmount}>{currentWater} ml</Text>
                            <Text style={styles.goalText}>Meta Diária: {dailyGoal} ml</Text>
                            <Text style={[
                                styles.remainingText,
                                remaining === 0 && { color: theme.colors.success }
                            ]}>
                                {remaining > 0 ? `Faltam ${remaining} ml` : "Meta Atingida! 🎉"}
                            </Text>
                        </View>
                    </View>

                    {/* Reminder Banner */}
                    <View style={styles.reminderBanner}>
                        <Bell size={20} color={theme.colors.success} />
                        <Text style={styles.reminderText}>
                            Próximo lembrete às <Text style={styles.bold}>15:30</Text>. Mantenha o ritmo!
                        </Text>
                    </View>

                    {/* Quick Registration */}
                    <View style={{ marginBottom: theme.spacing.l }}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Registro Rápido</Text>
                            <TouchableOpacity>
                                <Text style={styles.customizeText}>Personalizar</Text>
                            </TouchableOpacity>
                        </View>
                        <QuickAdd onAdd={addWater} />
                    </View>

                    {/* Activity Log */}
                    <View>
                        <Text style={styles.sectionTitle}>Hoje</Text>
                        <View style={{ marginTop: theme.spacing.m }}>
                            <ActivityLog logs={logs} />
                        </View>
                    </View>

                </ScrollView>
            </SafeAreaView>

            {/* Tab Bar Navigation */}
            <TabBar />

        </View>
    );
}
