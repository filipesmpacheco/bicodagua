import { useAuth } from '@/src/hooks/AuthContext';
import { theme } from '@/src/styles/theme';
import { ChevronRight, LogOut, Settings as SettingsIcon, User } from 'lucide-react-native';
import React from 'react';
import {
    Alert,
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

export default function SettingsScreen() {
    const { user, logout } = useAuth();

    const handleLogout = () => {
        if (Platform.OS === 'web') {
            if (confirm('Tem certeza que deseja sair?')) {
                logout();
            }
        } else {
            Alert.alert(
                'Sair',
                'Tem certeza que deseja sair?',
                [
                    { text: 'Cancelar', style: 'cancel' },
                    { text: 'Sair', onPress: logout, style: 'destructive' },
                ]
            );
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Ajustes</Text>
                </View>

                <View style={styles.content}>
                    {/* User Profile Summary */}
                    <View style={styles.profileSection}>
                        <View style={styles.avatar}>
                            <User size={32} color={theme.colors.primary} />
                        </View>
                        <View>
                            <Text style={styles.userName}>{user?.name || 'Usuário'}</Text>
                            <Text style={styles.userEmail}>{user?.email || 'email@teste.com'}</Text>
                        </View>
                    </View>

                    {/* Settings Options */}
                    <View style={styles.section}>
                        <TouchableOpacity style={styles.option}>
                            <View style={styles.optionLeft}>
                                <SettingsIcon size={20} color={theme.colors.textLight} />
                                <Text style={styles.optionText}>Configurações da Conta</Text>
                            </View>
                            <ChevronRight size={20} color={theme.colors.border} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.option, styles.logoutOption]}
                            onPress={handleLogout}
                        >
                            <View style={styles.optionLeft}>
                                <LogOut size={20} color={theme.colors.danger || '#ef4444'} />
                                <Text style={[styles.optionText, styles.logoutText]}>Sair do Aplicativo</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    safeArea: {
        flex: 1,
    },
    header: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '800',
        color: theme.colors.text,
    },
    content: {
        padding: 20,
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 20,
        marginBottom: 20,
        gap: 15,
        borderWidth: 1,
        borderColor: '#f1f5f9',
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: theme.colors.primaryLight,
        alignItems: 'center',
        justifyContent: 'center',
    },
    userName: {
        fontSize: 18,
        fontWeight: '700',
        color: theme.colors.text,
    },
    userEmail: {
        fontSize: 14,
        color: theme.colors.textLight,
    },
    section: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#f1f5f9',
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 18,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    optionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    optionText: {
        fontSize: 16,
        fontWeight: '600',
        color: theme.colors.text,
    },
    logoutOption: {
        borderBottomWidth: 0,
    },
    logoutText: {
        color: '#ef4444',
    },
});
