import { Calendar, Home, Plus, Sliders, User } from 'lucide-react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../styles/theme';

const TabBar = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.tabItem}>
                <Home size={24} color={theme.colors.primary} />
                <Text style={[styles.tabLabel, { color: theme.colors.primary }]}>Início</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tabItem}>
                <Calendar size={24} color={theme.colors.textLight} />
                <Text style={styles.tabLabel}>Histórico</Text>
            </TouchableOpacity>

            <View style={styles.fabContainer}>
                <TouchableOpacity style={styles.fab} activeOpacity={0.8}>
                    <Plus size={32} color="#FFFFFF" />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.tabItem}>
                <User size={24} color={theme.colors.textLight} />
                <Text style={styles.tabLabel}>Perfil</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tabItem}>
                <Sliders size={24} color={theme.colors.textLight} />
                <Text style={styles.tabLabel}>Ajustes</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#f1f5f9',
        paddingHorizontal: 24,
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    tabItem: {
        alignItems: 'center',
        gap: 4,
    },
    tabLabel: {
        fontSize: 10,
        fontWeight: '700',
        color: theme.colors.textLight,
    },
    fabContainer: {
        position: 'relative',
        top: -24,
    },
    fab: {
        backgroundColor: theme.colors.primary,
        width: 56,
        height: 56,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: theme.colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
});

export default TabBar;
