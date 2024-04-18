export default function GameTile({ game }) {
  return (
    <div className="game-tile">
      <img src={game.img} />
      <h1 className="game-title">{game.itemName}</h1>
    </div>
  );
}
