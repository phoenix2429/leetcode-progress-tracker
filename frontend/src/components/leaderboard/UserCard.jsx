function UserCard({ user }) {
  return (
    <div className="card">
      <h2>{user.username}</h2>
      <p>Total: {user.total}</p>
      <p>Easy: {user.easy}</p>
      <p>Medium: {user.medium}</p>
      <p>Hard: {user.hard}</p>
      <p>Ranking: {user.ranking}</p>
    </div>
  );
}

export default UserCard;