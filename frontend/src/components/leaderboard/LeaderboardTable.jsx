function LeaderboardTable({ data }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Rank</th>
          <th>User</th>
          <th>Total</th>
          <th>Easy</th>
          <th>Medium</th>
          <th>Hard</th>
          <th>Ranking</th>
        </tr>
      </thead>
      <tbody>
        {data.map((user, index) => (
          <tr key={user.username}>
            <td>{index + 1}</td>
            <td>{user.username}</td>
            <td>{user.total}</td>
            <td>{user.easy}</td>
            <td>{user.medium}</td>
            <td>{user.hard}</td>
            <td>{user.ranking}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default LeaderboardTable;