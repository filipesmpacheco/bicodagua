import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { theme } from '../styles/theme';

const QuickAdd = ({ onAdd }) => {
    const options = [
        { label: 'Copo', amount: 200 },
        { label: 'Garrafa', amount: 350 },
        { label: 'Squeeze', amount: 500 },
    ];

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.container}
        >
            {options.map((option) => (
                <TouchableOpacity
                    key={option.amount}
                    style={styles.card}
                    onPress={() => onAdd(option.amount)}
                    activeOpacity={0.7}
                >
                    <Text style={styles.amountText}>{option.amount}ml</Text>
                    <Text style={styles.labelText}>{option.label.toUpperCase()}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: 12,
        paddingBottom: 8,
    },
    card: {
        minWidth: 100,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: theme.colors.border,
        padding: theme.spacing.m,
        borderRadius: theme.borderRadius.l,
        alignItems: 'flex-start',
    },
    amountText: {
        fontSize: 20,
        fontWeight: '700',
        color: '#334155',
    },
    labelText: {
        fontSize: 10,
        fontWeight: '700',
        color: theme.colors.textLight,
        marginTop: 2,
    },
});

export default QuickAdd;
