import AsyncStorage from '@react-native-async-storage/async-storage';

const QUIZ_HISTORY_KEY = 'quiz_history';
const DAILY_STATS_KEY = 'daily_stats';

const parseStoredJson = (rawValue, fallbackValue) => {
    if (!rawValue) {
        return fallbackValue;
    }

    try {
        return JSON.parse(rawValue);
    } catch (error) {
        console.error("Error parsing stored JSON:", error);
        return fallbackValue;
    }
};

const getKSTDateString = () => {
    if (typeof Intl !== "undefined" && Intl.DateTimeFormat) {
        const parts = new Intl.DateTimeFormat("en-CA", {
            timeZone: "Asia/Seoul",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        }).formatToParts(new Date());

        const values = Object.fromEntries(
            parts
                .filter(({ type }) => type !== "literal")
                .map(({ type, value }) => [type, value])
        );

        return `${values.year}-${values.month}-${values.day}`;
    }

    return new Date(Date.now() + 9 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0];
};

export const saveQuizHistory = async (userId, category, score, totalQuestions, status = 'completed') => {
    try {
        const today = getKSTDateString();
        const timestamp = new Date().toISOString();

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

        const existingHistory = await AsyncStorage.getItem(QUIZ_HISTORY_KEY);
        const historyArray = parseStoredJson(existingHistory, []);
        historyArray.unshift(historyEntry);

        if (historyArray.length > 500) {
            historyArray.pop();
        }

        await AsyncStorage.setItem(QUIZ_HISTORY_KEY, JSON.stringify(historyArray));

        const dailyStatsRaw = await AsyncStorage.getItem(DAILY_STATS_KEY);
        const dailyStats = parseStoredJson(dailyStatsRaw, {});

        if (!dailyStats[userId]) {
            dailyStats[userId] = {};
        }

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

export const getMonthlyHistory = async (userId, year, month) => {
    try {
        const dailyStatsRaw = await AsyncStorage.getItem(DAILY_STATS_KEY);
        const dailyStats = parseStoredJson(dailyStatsRaw, {});

        if (!dailyStats[userId]) {
            return {};
        }

        const userStats = dailyStats[userId];
        const result = {};

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

export const getDailyLogs = async (userId, dateStr) => {
    try {
        const historyRaw = await AsyncStorage.getItem(QUIZ_HISTORY_KEY);
        const historyArray = parseStoredJson(historyRaw, []);

        const dayLogs = historyArray.filter(entry =>
            entry.userId === userId && entry.date === dateStr
        );

        return dayLogs;
    } catch (error) {
        console.error("Error fetching daily logs:", error);
        return [];
    }
};

export const getAllHistory = async (userId) => {
    try {
        const historyRaw = await AsyncStorage.getItem(QUIZ_HISTORY_KEY);
        const historyArray = parseStoredJson(historyRaw, []);

        return historyArray.filter(entry => entry.userId === userId);
    } catch (error) {
        console.error("Error fetching all history:", error);
        return [];
    }
};

export const getUserLifetimeStats = async (userId) => {
    const history = await getAllHistory(userId);
    const completedHistory = history.filter(entry => entry.status !== 'cancelled');
    const totalCorrectAnswers = completedHistory.reduce((sum, entry) => sum + (entry.score || 0), 0);
    const totalQuestions = completedHistory.reduce((sum, entry) => sum + (entry.totalQuestions || 0), 0);

    return {
        totalAttempts: history.length,
        completedAttempts: completedHistory.length,
        totalCorrectAnswers,
        totalQuestions,
        averageAccuracy: totalQuestions > 0 ? Math.round((totalCorrectAnswers / totalQuestions) * 100) : 0,
    };
};

export const clearAllHistory = async () => {
    try {
        await AsyncStorage.removeItem(QUIZ_HISTORY_KEY);
        await AsyncStorage.removeItem(DAILY_STATS_KEY);
        console.log("All history cleared");
    } catch (error) {
        console.error("Error clearing history:", error);
    }
};
