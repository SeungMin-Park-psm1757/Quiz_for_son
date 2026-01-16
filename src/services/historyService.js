import { db } from '../config/firebaseConfig';

export const saveQuizHistory = async (userId, category, score, totalQuestions, status = 'completed') => {
    if (!db) {
        console.error("Database not initialized");
        return;
    }

    try {
        // Use KST (UTC+9) for date string
        const kstOffset = 9 * 60 * 60 * 1000;
        const now = new Date();
        const kstDate = new Date(now.getTime() + kstOffset);
        const today = kstDate.toISOString().split('T')[0]; // YYYY-MM-DD
        const timestamp = now.toISOString(); // Keep simplified ISO for order, or KST ISO? Standard ISO is fine for sorting.

        // 1. Save detailed log
        await db.collection('quiz_history').add({
            userId,
            date: today,
            timestamp,
            category,
            score,
            totalQuestions,
            status, // 'completed' or 'cancelled'
            accuracy: totalQuestions > 0 ? (score / totalQuestions) * 100 : 0
        });

        // 2. Update daily summary (for quick lookup on calendar)
        // Structure: user_daily_stats/{userId}/dates/{YYYY-MM-DD}
        // Fields: { [category]: { attemptCount: +1, totalScore: +score }, totalAttempts: +1 }

        const dailyRef = db.collection('user_daily_stats').doc(userId).collection('dates').doc(today);

        await db.runTransaction(async (transaction) => {
            const doc = await transaction.get(dailyRef);

            let newData = {
                lastUpdated: timestamp,
            };

            if (!doc.exists) {
                newData[category] = { attempts: 1, totalScore: score, totalQuestions: totalQuestions };
                newData.totalAttempts = 1;
            } else {
                const data = doc.data();
                const catData = data[category] || { attempts: 0, totalScore: 0, totalQuestions: 0 };

                newData[category] = {
                    attempts: catData.attempts + 1,
                    totalScore: catData.totalScore + score,
                    totalQuestions: catData.totalQuestions + totalQuestions
                };
                newData.totalAttempts = (data.totalAttempts || 0) + 1;
            }

            transaction.set(dailyRef, newData, { merge: true });
        });

        console.log("Quiz history saved successfully");

    } catch (error) {
        console.error("Error saving quiz history:", error);
    }
};

export const getMonthlyHistory = async (userId, year, month) => {
    // This is a simplified fetch. In reality, we might need a range query.
    // Since firestore string filtering works for YYYY-MM-DD, we can query by document ID range if we used that as ID, 
    // but here we are in a subcollection.
    // For 'user_daily_stats/{userId}/dates', the doc ID is the date.

    // Construct range
    const startId = `${year}-${String(month).padStart(2, '0')}-01`;
    const endId = `${year}-${String(month).padStart(2, '0')}-31`;

    try {
        const snapshot = await db.collection('user_daily_stats')
            .doc(userId)
            .collection('dates')
            .where(db.FieldPath.documentId(), '>=', startId)
            .where(db.FieldPath.documentId(), '<=', endId)
            .get();

        const data = {};
        snapshot.forEach(doc => {
            data[doc.id] = doc.data();
        });
        return data; // Returns object like { "2023-10-01": { ... } }
    } catch (error) {
        console.error("Error fetching monthly history:", error);
        return {};
    }
};
