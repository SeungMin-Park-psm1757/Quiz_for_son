import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    SafeAreaView,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView
} from "react-native";
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { db } from "../config/firebaseConfig";
import { getMonthlyHistory } from "../services/historyService";

// Setup Korean Locale
LocaleConfig.locales['kr'] = {
    monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
    dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
    today: '오늘'
};
LocaleConfig.defaultLocale = 'kr';

const RecordsScreen = ({ navigation, route }) => {
    const userId = route.params?.userId || "jungwoo_explorer";
    // Initialize with KST date
    const kstOffset = 9 * 60 * 60 * 1000;
    const initialDate = new Date(new Date().getTime() + kstOffset).toISOString().split('T')[0];
    const [selectedDate, setSelectedDate] = useState(initialDate);
    const [monthlyData, setMonthlyData] = useState({});
    const [markedDates, setMarkedDates] = useState({});
    const [loading, setLoading] = useState(false);
    const [dailyLogs, setDailyLogs] = useState([]); // Detailed logs for the selected day

    const loadHistoryForMonth = async (date) => {
        setLoading(true);
        const year = date.year;
        const month = date.month;

        const data = await getMonthlyHistory(userId, year, month);
        setMonthlyData(data);

        // Process marked dates
        const marked = {};
        Object.keys(data).forEach(dateStr => {
            marked[dateStr] = { marked: true, dotColor: '#FF6347' };
            if (dateStr === selectedDate) {
                marked[dateStr] = { ...marked[dateStr], selected: true, selectedColor: '#FF6347' };
            }
        });
        // Ensure selected date is always marked as selected visually
        if (!marked[selectedDate]) {
            marked[selectedDate] = { selected: true, selectedColor: '#FF6347' };
        } else {
            marked[selectedDate].selected = true;
            marked[selectedDate].selectedColor = '#FF6347';
        }

        setMarkedDates(marked);
        setLoading(false);
    };

    // Load detailed logs for a specific day
    const loadDailyLogs = async (dateStr) => {
        try {
            const snapshot = await db.collection("quiz_history")
                .where("userId", "==", userId)
                .where("date", "==", dateStr)
                .orderBy("timestamp", "desc")
                .get();

            const logs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setDailyLogs(logs);
        } catch (error) {
            console.error("Error loading daily logs:", error);
        }
    };

    useEffect(() => {
        const today = new Date();
        loadHistoryForMonth({ year: today.getFullYear(), month: today.getMonth() + 1 });
        loadDailyLogs(selectedDate);
    }, []);

    const onDayPress = (day) => {
        setSelectedDate(day.dateString);

        // Update selection style
        const newMarked = { ...markedDates };
        // Clear previous selected
        Object.keys(newMarked).forEach(key => {
            if (newMarked[key].selected) {
                // Keep the dot if it had one
                const { selected, selectedColor, ...rest } = newMarked[key];
                newMarked[key] = rest;
            }
        });

        // Set new selected
        newMarked[day.dateString] = {
            ...(newMarked[day.dateString] || {}),
            selected: true,
            selectedColor: '#FF6347'
        };
        setMarkedDates(newMarked);

        // Fetch logs
        loadDailyLogs(day.dateString);
    };

    const renderDailyStats = () => {
        const dayData = monthlyData[selectedDate];
        if (!dayData && dailyLogs.length === 0) {
            return (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>이 날은 탐험 기록이 없어요! 🍃</Text>
                </View>
            );
        }

        return (
            <ScrollView style={styles.statsContainer}>
                {/* Summary Section - Compact One Line */}
                {dayData ? (
                    <View style={styles.summaryCard}>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryText}>📅 {selectedDate}</Text>
                            <Text style={styles.summaryTextDivider}>|</Text>
                            <Text style={styles.summaryText}>🐟 정답(물고기): {dayData.totalScore || 0}</Text>
                            <Text style={styles.summaryTextDivider}>|</Text>
                            <Text style={styles.summaryText}>📝 푼 문제: {dayData.totalQuestions || 0}</Text>
                        </View>
                    </View>
                ) : (
                    <View style={styles.summaryCard}>
                        <Text style={styles.noDataText}>이 날은 탐험을 쉬었어요! ⛺</Text>
                    </View>
                )}

                {/* Detailed Logs */}
                <Text style={styles.logTitle}>📜 상세 기록</Text>
                {dailyLogs.map((log, index) => (
                    <View key={log.id} style={styles.logCard}>
                        <View style={styles.logHeader}>
                            <Text style={styles.logTime}>
                                {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </Text>
                            <Text style={styles.logCategory}>{log.category.toUpperCase()}</Text>
                        </View>
                        <View style={styles.logBody}>
                            <Text style={styles.logScore}>
                                점수: {log.score} / {log.totalQuestions}
                            </Text>
                            <View>
                                {log.status === 'cancelled' && <Text style={styles.cancelledBadge}>🛑 중단함</Text>}
                                <Text style={styles.logBadge}>
                                    {log.score === log.totalQuestions ? '👑 완벽해요!' : log.status === 'cancelled' ? '' : '💪 멋져요!'}
                                </Text>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backButtonText}>🏠 홈으로</Text>
                </TouchableOpacity>
                <Text style={styles.title}>정우의 탐험 달력 🗓️</Text>
            </View>

            <View style={styles.calendarContainer}>
                <Calendar
                    onDayPress={onDayPress}
                    markedDates={markedDates}
                    onMonthChange={(month) => loadHistoryForMonth(month)}
                    theme={{
                        selectedDayBackgroundColor: '#FF6347',
                        todayTextColor: '#FF6347',
                        arrowColor: '#FF6347',
                        dotColor: '#FF6347',
                    }}
                />
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#FF6347" style={{ marginTop: 20 }} />
            ) : (
                renderDailyStats()
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F9FA",
    },
    header: {
        padding: 20,
        backgroundColor: "#FFF",
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#EEE",
    },
    backButton: {
        marginRight: 15,
        backgroundColor: "#F0F0F0",
        padding: 8,
        borderRadius: 15,
    },
    backButtonText: { fontWeight: "bold" },
    title: { fontSize: 20, fontWeight: "bold", color: "#333" },
    calendarContainer: {
        marginTop: 10,
        backgroundColor: '#fff',
        borderRadius: 15,
        marginHorizontal: 10,
        padding: 10,
        elevation: 3,
    },
    statsContainer: {
        flex: 1,
        padding: 15,
    },
    emptyContainer: {
        padding: 40,
        alignItems: 'center',
    },
    emptyText: {
        color: '#999',
        fontSize: 16,
    },
    summaryCard: {
        backgroundColor: '#E8F4D9', // Soft green for summary
        padding: 15,
        borderRadius: 15,
        marginBottom: 20,
        alignItems: 'center',
        elevation: 2,
    },
    summaryRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    summaryText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    summaryTextDivider: {
        fontSize: 16,
        color: '#999',
        marginHorizontal: 10,
    },
    noDataText: {
        color: '#888',
        fontSize: 16,
        fontStyle: 'italic',
    },
    logTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 5,
        color: '#333',
    },
    logCard: {
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 12,
        marginBottom: 10,
        borderLeftWidth: 5,
        borderLeftColor: '#FF6347',
        elevation: 1,
    },
    logHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    logTime: {
        color: '#888',
        fontSize: 12,
    },
    logCategory: {
        fontWeight: 'bold',
        color: '#555',
    },
    logBody: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logScore: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    logBadge: {
        color: '#FF6347',
        fontWeight: 'bold',
    },
    cancelledBadge: {
        color: '#999',
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 2
    }
});

export default RecordsScreen;
