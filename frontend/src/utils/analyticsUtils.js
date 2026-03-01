// ===============================
// Analytics Utility Functions
// ===============================

/*
  Helper: Get total solved from a snapshot
  A snapshot = array of users
*/
const getSnapshotTotal = (snapshot) => {
  if (!snapshot || snapshot.length === 0) return 0;
  return snapshot.reduce((sum, user) => sum + (user.total || 0), 0);
};

/*
  FEATURE 1: Daily Growth
  Compares last 2 history snapshots
*/
export const calculateGrowth = (history) => {
  if (!history || history.length < 2) {
    return {
      problemGrowth: 0,
    };
  }

  const latest = history[history.length - 1];
  const previous = history[history.length - 2];

  const latestTotal = getSnapshotTotal(latest);
  const previousTotal = getSnapshotTotal(previous);

  return {
    problemGrowth: latestTotal - previousTotal,
  };
};

/*
  FEATURE 2: Smart Alerts
*/
export const generateAlerts = (growth) => {
  const alerts = [];

  if (!growth) return alerts;

  if (growth.problemGrowth > 0) {
    alerts.push("📈 Great job! Problems solved increased today.");
  }

  if (growth.problemGrowth === 0) {
    alerts.push("⚠️ No new problems solved today.");
  }

  if (growth.problemGrowth < 0) {
    alerts.push("❗ Data inconsistency detected.");
  }

  return alerts;
};

/*
  FEATURE 3: Difficulty Strength Analysis
  Based on latest snapshot
*/
export const difficultyAnalysis = (latestSnapshot) => {
  if (!latestSnapshot || latestSnapshot.length === 0)
    return "No Data Available";

  const totalSolved = getSnapshotTotal(latestSnapshot);

  if (totalSolved === 0) return "No Problems Solved Yet 🚀";

  const totalHard = latestSnapshot.reduce(
    (sum, user) => sum + (user.hard || 0),
    0
  );

  const hardPercentage = (totalHard / totalSolved) * 100;

  if (hardPercentage > 30)
    return "Advanced — Strong Hard Problem Focus 🔥";

  if (hardPercentage > 15)
    return "Intermediate — Good Progress 💪";

  return "Beginner — Keep Improving 🚀";
};

/*
  FEATURE 4: Consistency Streak
  Counts consecutive days where total increased
*/
export const calculateStreak = (history) => {
  if (!history || history.length < 2) return 0;

  let streak = 0;

  for (let i = history.length - 1; i > 0; i--) {
    const currentTotal = getSnapshotTotal(history[i]);
    const previousTotal = getSnapshotTotal(history[i - 1]);

    if (currentTotal > previousTotal) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
};

/*
  FEATURE 5: 30-Day Projection
  Based on average daily growth
*/
export const predictFuture = (history) => {
  if (!history || history.length < 2) return 0;

  const firstTotal = getSnapshotTotal(history[0]);
  const lastTotal = getSnapshotTotal(history[history.length - 1]);

  const growth = lastTotal - firstTotal;
  const days = history.length;

  if (days === 0) return lastTotal;

  const dailyAverage = growth / days;

  return Math.round(lastTotal + dailyAverage * 30);
};