import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage Keys
const QUIZ_HISTORY_KEY = 'quiz_history';
const DAILY_STATS_KEY = 'daily_stats';

// Helper to get KST date string
const getKSTDateString = () => {
    const now = new Date();
    const kstOffset = 9 * 60 * 60 * 1000;
    const kstDate = new Date(now.getTime() + kstOffset);
    return kstDate.toISOString().split('T')[0]; // YYYY-MM-DD
};

// Save quiz history to local storage
export const saveQuizHistory = async (userId, category, score, totalQuestions, status = 'completed') => {
    try {
        const today = getKSTDateString();
        const timestamp = new Date().toISOString();

        // Create history entry
        const historyEntry = {
            id: `${userId}_${timestamp}`,
            userId,
            date: today,
            timestamp,
            category,
            score,
            totalQuestions,
            status,
            accuracy: totalQuestions > 0 ? (score / totalQuestions) * 100 : 0
        };

        // 1. Save to detailed history
        const existingHistory = await AsyncStorage.getItem(QUIZ_HISTORY_KEY);
        const historyArray = existingHistory ? JSON.parse(existingHistory) : [];
        historyArray.unshift(historyEntry); // Add to beginning

        // Keep only last 500 entries to prevent storage overflow
        if (historyArray.length > 500) {
            historyArray.pop();
        }

        await AsyncStorage.setItem(QUIZ_HISTORY_KEY, JSON.stringify(historyArray));

        // 2. Update daily stats
        const dailyStatsRaw = await AsyncStorage.getItem(DAILY_STATS_KEY);
        const dailyStats = dailyStatsRaw ? JSON.parse(dailyStatsRaw) : {};

        // Create userId stats if not exists
        if (!dailyStats[userId]) {
            dailyStats[userId] = {};
        }

        // Create date stats if not exists
        if (!dailyStats[userId][today]) {
            dailyStats[userId][today] = {
                totalAttempts: 0,
                totalScore: 0,
                totalQuestions: 0,
                categories: {}
            };
        }

        const dayStats = dailyStats[userId][today];
        dayStats.totalAttempts += 1;
        dayStats.totalScore += score;
        dayStats.totalQuestions += totalQuestions;
        dayStats.lastUpdated = timestamp;

        // Update category stats
        if (!dayStats.categories[category]) {
            dayStats.categories[category] = { attempts: 0, totalScore: 0, totalQuestions: 0 };
        }
        dayStats.categories[category].attempts += 1;
        dayStats.categories[category].totalScore += score;
        dayStats.categories[category].totalQuestions += totalQuestions;

        await AsyncStorage.setItem(DAILY_STATS_KEY, JSON.stringify(dailyStats));

        console.log("Quiz history saved successfully (local)");

    } catch (error) {
        console.error("Error saving quiz history:", error);
    }
};

// Get monthly history for calendar display
export const getMonthlyHistory = async (userId, year, month) => {
    try {
        const dailyStatsRaw = await AsyncStorage.getItem(DAILY_STATS_KEY);
        const dailyStats = dailyStatsRaw ? JSON.parse(dailyStatsRaw) : {};

        if (!dailyStats[userId]) {
            return {};
        }

        const userStats = dailyStats[userId];
        const result = {};

        // Filter by year-month
        const monthPrefix = `${year}-${String(month).padStart(2, '0')}`;

        Object.keys(userStats).forEach(dateStr => {
            if (dateStr.startsWith(monthPrefix)) {
                result[dateStr] = userStats[dateStr];
            }
        });

        return result;
    } catch (error) {
        console.error("Error fetching monthly history:", error);
        return {};
    }
};

// Get detailed logs for a specific day
export const getDailyLogs = async (userId, dateStr) => {
    try {
        const historyRaw = await AsyncStorage.getItem(QUIZ_HISTORY_KEY);
        const historyArray = historyRaw ? JSON.parse(historyRaw) : [];

        // Filter by userId and date
        const dayLogs = historyArray.filter(entry =>
            entry.userId === userId && entry.date === dateStr
        );

        return dayLogs;
    } catch (error) {
        console.error("Error fetching daily logs:", error);
        return [];
    }
};

// Get all history for a user
export const getAllHistory = async (userId) => {
    try {
        const historyRaw = await AsyncStorage.getItem(QUIZ_HISTORY_KEY);
        const historyArray = historyRaw ? JSON.parse(historyRaw) : [];

        return historyArray.filter(entry => entry.userId === userId);
    } catch (error) {
        console.error("Error fetching all history:", error);
        return [];
    }
};

// Clear all history (for testing)
export const clearAllHistory = async () => {
    try {
        await AsyncStorage.removeItem(QUIZ_HISTORY_KEY);
        await AsyncStorage.removeItem(DAILY_STATS_KEY);
        console.log("All history cleared");
    } catch (error) {
        console.error("Error clearing history:", error);
    }
};
