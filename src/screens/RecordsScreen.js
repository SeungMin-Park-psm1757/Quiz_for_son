import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView
} from "react-native";
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { getMonthlyHistory, getDailyLogs } from "../services/historyService";
import {
    DEFAULT_USER_ID,
    getCategoryMeta,
    getUserDisplayName,
} from "../constants/appConfig";

// Setup Korean Locale
LocaleConfig.locales['kr'] = {
    monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
    dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
    today: '오늘'
};
LocaleConfig.defaultLocale = 'kr';

const RecordsScreen = ({ navigation }) => {
    const userId = DEFAULT_USER_ID;

    // Initialize with KST date
    const kstOffset = 9 * 60 * 60 * 1000;
    const initialDate = new Date(new Date().getTime() + kstOffset).toISOString().split('T')[0];
    const [selectedDate, setSelectedDate] = useState(initialDate);
    const [monthlyData, setMonthlyData] = useState({});
    const [markedDates, setMarkedDates] = useState({});
    const [loading, setLoading] = useState(false);
    const [dailyLogs, setDailyLogs] = useState([]);

    const loadHistoryForMonth = async (date) => {
        setLoading(true);
        const year = date.year;
        const month = date.month;

        const data = await getMonthlyHistory(userId, year, month);
        setMonthlyData(data);

        // Process marked dates - 문제 푼 날에 동그라미 표시
        const marked = {};
        Object.keys(data).forEach(dateStr => {
            marked[dateStr] = {
                marked: true,
                dotColor: '#FF6347',
                customStyles: {
                    container: {
                        borderWidth: 2,
                        borderColor: '#FF6347',
                        borderRadius: 20
                    }
                }
            };
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
            const logs = await getDailyLogs(userId, dateStr);
            setDailyLogs(logs);
        } catch (error) {
            console.error("Error loading daily logs:", error);
            setDailyLogs([]);
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
                {/* Summary Section */}
                {dayData ? (
                    <View style={styles.summaryCard}>
                        <Text style={styles.summaryTitle}>📅 {selectedDate}</Text>
                        <View style={styles.summaryRow}>
                            <View style={styles.summaryItem}>
                                <Text style={styles.summaryNumber}>{dayData.totalScore || 0}</Text>
                                <Text style={styles.summaryLabel}>정답</Text>
                            </View>
                            <View style={styles.summaryDivider} />
                            <View style={styles.summaryItem}>
                                <Text style={styles.summaryNumber}>{dayData.totalQuestions || 0}</Text>
                                <Text style={styles.summaryLabel}>총 문제</Text>
                            </View>
                            <View style={styles.summaryDivider} />
                            <View style={styles.summaryItem}>
                                <Text style={styles.summaryNumber}>{dayData.totalAttempts || 0}</Text>
                                <Text style={styles.summaryLabel}>도전 횟수</Text>
                            </View>
                        </View>
                    </View>
                ) : null}

                {/* Detailed Logs */}
                <Text style={styles.logTitle}>📜 상세 기록</Text>
                {dailyLogs.length > 0 ? (
                    dailyLogs.map((log, index) => (
                        <View key={log.id || index} style={styles.logCard}>
                            <View style={styles.logHeader}>
                                <Text style={styles.logTime}>
                                    {new Date(log.timestamp).toLocaleTimeString('ko-KR', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: true
                                    })}
                                </Text>
                                <Text style={styles.logCategory}>
                                    {getCategoryMeta(log.category).label}
                                </Text>
                            </View>
                            <View style={styles.logBody}>
                                <Text style={styles.logScore}>
                                    점수: {log.score} / {log.totalQuestions}
                                </Text>
                                <View>
                                    {log.status === 'cancelled' && <Text style={styles.cancelledBadge}>🛑 중단함</Text>}
                                    {log.status !== 'cancelled' && (
                                        <Text style={styles.logBadge}>
                                            {log.score === log.totalQuestions ? '👑 완벽해요!' : '💪 멋져요!'}
                                        </Text>
                                    )}
                                </View>
                            </View>
                        </View>
                    ))
                ) : (
                    <Text style={styles.noLogsText}>상세 기록이 없습니다.</Text>
                )}
            </ScrollView>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backButtonText}>🏠 홈으로</Text>
                </TouchableOpacity>
                <Text style={styles.title}>{getUserDisplayName()}의 탐험 달력 🗓️</Text>
            </View>

            <View style={styles.calendarContainer}>
                <Calendar
                    onDayPress={onDayPress}
                    markedDates={markedDates}
                    markingType={'custom'}
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
        backgroundColor: '#E8F4D9',
        padding: 20,
        borderRadius: 15,
        marginBottom: 20,
        elevation: 2,
    },
    summaryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 15,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    summaryItem: {
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    summaryNumber: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FF6347',
    },
    summaryLabel: {
        fontSize: 12,
        color: '#666',
        marginTop: 4,
    },
    summaryDivider: {
        width: 1,
        height: 40,
        backgroundColor: '#CCC',
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
    },
    noLogsText: {
        color: '#999',
        textAlign: 'center',
        marginTop: 10,
    }
});

export default RecordsScreen;
