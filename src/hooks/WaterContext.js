import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const WaterContext = createContext();

export const WaterProvider = ({ children, initialGoal = 2500 }) => {
    const [currentWater, setCurrentWater] = useState(0);
    const [dailyGoal, setDailyGoal] = useState(initialGoal);
    const [logs, setLogs] = useState([]);

    const addWater = useCallback((amount) => {
        setCurrentWater((prev) => prev + amount);

        const now = new Date();
        const newLog = {
            id: Math.random().toString(36).substr(2, 9),
            amount,
            time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setLogs((prev) => [newLog, ...prev]);
    }, []);

    const removeWater = useCallback((logId) => {
        setLogs((prevLogs) => {
            const logToRemove = prevLogs.find(log => log.id === logId);
            if (logToRemove) {
                setCurrentWater((prevCurrent) => Math.max(0, prevCurrent - logToRemove.amount));
                return prevLogs.filter(log => log.id !== logId);
            }
            return prevLogs;
        });
    }, []);

    const progress = useMemo(() => {
        const percent = (currentWater / dailyGoal) * 100;
        return Math.min(percent, 100);
    }, [currentWater, dailyGoal]);

    const remaining = useMemo(() => {
        return Math.max(dailyGoal - currentWater, 0);
    }, [currentWater, dailyGoal]);

    const motivationalMsg = useMemo(() => {
        if (remaining > 0) {
            return "Vamos juntos bater essa meta?";
        }
        return "Parabéns! Hidratação em dia.";
    }, [remaining]);

    const value = {
        currentWater,
        dailyGoal,
        setDailyGoal,
        progress,
        remaining,
        logs,
        motivationalMsg,
        addWater,
        removeWater,
    };

    return <WaterContext.Provider value={value}>{children}</WaterContext.Provider>;
};

export const useWater = () => {
    const context = useContext(WaterContext);
    if (!context) {
        throw new Error('useWater must be used within a WaterProvider');
    }
    return context;
};
