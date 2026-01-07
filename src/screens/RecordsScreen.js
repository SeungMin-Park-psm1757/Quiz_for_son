import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    SafeAreaView,
    TouchableOpacity,
} from "react-native";
import { db } from "../config/firebaseConfig";

const RecordsScreen = ({ navigation }) => {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const userId = "jungwoo_explorer";

    useEffect(() => {
        const fetchRecords = async () => {
            if (!db) {
                setLoading(false);
                return;
            }
            try {
                const snapshot = await db.collection("wrong_answers")
                    .where("userId", "==", userId)
                    .orderBy("timestamp", "desc")
                    .limit(20)
                    .get();

                const data = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setRecords(data);
            } catch (error) {
                console.error("Error fetching records:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecords();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.recordCard}>
            <Text style={styles.categoryBadge}>{item.category.toUpperCase()}</Text>
            <Text style={styles.questionText}>Q: {item.question}</Text>
            <View style={styles.answerRow}>
                <Text style={styles.wrongLabel}>정우의 답: </Text>
                <Text style={styles.wrongAnswer}>{item.selectedAnswer}</Text>
            </View>
            <View style={styles.answerRow}>
                <Text style={styles.correctLabel}>정답: </Text>
                <Text style={styles.correctAnswer}>{item.correctAnswer}</Text>
            </View>
            <Text style={styles.dateText}>{new Date(item.timestamp).toLocaleDateString()}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backButtonText}>🏠 홈으로</Text>
                </TouchableOpacity>
                <Text style={styles.title}>정우의 오답 노트 📓</Text>
            </View>

            {loading ? (
                <View style={styles.center}>
                    <Text>기록을 불러오는 중...</Text>
                </View>
            ) : records.length === 0 ? (
                <View style={styles.center}>
                    <Text style={styles.emptyText}>아직 틀린 문제가 없어요! 대단해요 정우! 🏆</Text>
                </View>
            ) : (
                <FlatList
                    data={records}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContent}
                />
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
        borderBottomWidth: 1,
        borderBottomColor: "#EEE",
        flexDirection: "row",
        alignItems: "center",
    },
    backButton: {
        marginRight: 15,
        backgroundColor: "#F0F0F0",
        padding: 8,
        borderRadius: 15,
    },
    backButtonText: {
        fontWeight: "bold",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#333",
    },
    listContent: {
        padding: 15,
    },
    recordCard: {
        backgroundColor: "#FFF",
        padding: 15,
        borderRadius: 15,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    categoryBadge: {
        alignSelf: "flex-start",
        backgroundColor: "#E1F5FE",
        color: "#0288D1",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 10,
        fontSize: 12,
        fontWeight: "bold",
        marginBottom: 10,
    },
    questionText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#444",
        marginBottom: 10,
    },
    answerRow: {
        flexDirection: "row",
        marginBottom: 5,
    },
    wrongLabel: {
        color: "#666",
        fontSize: 14,
    },
    wrongAnswer: {
        color: "#E74C3C",
        fontWeight: "bold",
        fontSize: 14,
    },
    correctLabel: {
        color: "#666",
        fontSize: 14,
    },
    correctAnswer: {
        color: "#2ECC71",
        fontWeight: "bold",
        fontSize: 14,
    },
    dateText: {
        fontSize: 12,
        color: "#999",
        marginTop: 10,
        textAlign: "right",
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    emptyText: {
        fontSize: 18,
        color: "#666",
        textAlign: "center",
    },
});

export default RecordsScreen;
