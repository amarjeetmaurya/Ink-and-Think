
const Players = () => {
  return (
    <div className="bg-[#fffdf7] border-sketch-lg overflow-hidden min-w-36 py-8 left">
      <div
        className="tape-sticker tape-top-left"
        style={{ left: 'calc(50% - 45px)' }}
      />
      <div className="p-2 border">Player1</div>
      <div className="p-2 border">Player2</div>
      <div className="p-2 border">Player3</div>
    </div>
  );
};

export default Players;
