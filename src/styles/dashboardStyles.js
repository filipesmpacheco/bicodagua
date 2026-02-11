import { StyleSheet } from 'react-native';
import { theme } from './theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    safeArea: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: theme.spacing.m,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: theme.colors.text,
        marginLeft: 12,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconWrapper: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#dbeafe', // blue-100
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainContent: {
        padding: theme.spacing.m,
    },
    greetingSection: {
        marginBottom: theme.spacing.l,
    },
    greetingText: {
        fontSize: 28,
        fontWeight: '700',
        color: theme.colors.text,
    },
    subGreeting: {
        fontSize: 16,
        color: theme.colors.textLight,
        marginTop: 4,
    },
    progressCard: {
        backgroundColor: theme.colors.primaryLight,
        borderRadius: theme.borderRadius.xl,
        padding: theme.spacing.xl,
        alignItems: 'center',
        marginBottom: theme.spacing.m,
    },
    progressStats: {
        marginTop: theme.spacing.l,
        alignItems: 'center',
    },
    currentAmount: {
        fontSize: 32,
        fontWeight: '700',
        color: theme.colors.primaryDark,
    },
    goalText: {
        fontSize: 16,
        color: theme.colors.textLight,
        fontWeight: '500',
    },
    remainingText: {
        fontSize: 14,
        color: theme.colors.primary,
        fontWeight: '600',
        marginTop: 4,
    },
    reminderBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.successBackground,
        padding: theme.spacing.m,
        borderRadius: theme.borderRadius.l,
        borderWidth: 1,
        borderColor: '#d1fae5', // emerald-100
        marginBottom: theme.spacing.l,
    },
    reminderText: {
        marginLeft: 12,
        fontSize: 14,
        color: '#065f46', // emerald-800
        fontWeight: '500',
        flex: 1,
    },
    bold: {
        fontWeight: '700',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.m,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: '700',
        color: theme.colors.text,
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
    customizeText: {
        color: theme.colors.primary,
        fontSize: 12,
        fontWeight: '700',
    }
});
