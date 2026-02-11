import { Check, Trash2 } from 'lucide-react-native';
import { Alert, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../styles/theme';

const ActivityItem = ({ log, onRemove }) => {
    const handleDelete = () => {
        if (Platform.OS === 'web') {
            if (confirm(`Deseja remover o registro de ${log.amount}ml?`)) {
                onRemove(log.id);
            }
        } else {
            Alert.alert(
                'Remover Registro',
                `Deseja remover o registro de ${log.amount}ml?`,
                [
                    { text: 'Cancelar', style: 'cancel' },
                    { text: 'Remover', onPress: () => onRemove(log.id), style: 'destructive' },
                ]
            );
        }
    };

    return (
        <View style={styles.item}>
            <View style={styles.leftContent}>
                <View style={styles.iconCircle}>
                    <Check size={16} color={theme.colors.primary} />
                </View>
                <View>
                    <Text style={styles.amountText}>{log.amount}ml</Text>
                    <Text style={styles.timeText}>{log.time}</Text>
                </View>
            </View>
            <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
                <Trash2 size={18} color="#ef4444" />
            </TouchableOpacity>
        </View>
    );
};

const ActivityLog = ({ logs, onRemove }) => {
    if (logs.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Nenhum registro hoje ainda.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {logs.map((log) => (
                <ActivityItem key={log.id} log={log} onRemove={onRemove} />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: 12,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: theme.spacing.m,
        borderRadius: theme.borderRadius.l,
        borderWidth: 1,
        borderColor: theme.colors.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    leftContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    iconCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: theme.colors.primaryLight,
        alignItems: 'center',
        justifyContent: 'center',
    },
    amountText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#334155', // slate-700
    },
    timeText: {
        fontSize: 12,
        fontWeight: '500',
        color: theme.colors.textLight,
    },
    deleteButton: {
        padding: 8,
    },
    emptyContainer: {
        paddingVertical: 16,
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 14,
        color: theme.colors.textLight,
        fontStyle: 'italic',
    },
});

export default ActivityLog;
