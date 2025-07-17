import React from 'react'
import type { PlayerType } from '../utils/types';
import { getPlayerListStyles } from '../utils/style';

function PlayerList({ players }: { players: PlayerType[] }) {
  const handleClaim = (playerId: number) => {
    // Handle claim logic here
    console.log(`Claiming reward for player with rank: ${playerId}`);
  };

  

  return (
    <div className="space-y-3 px-4 w-full h-full">
      {players.map((player) => {
        const styles = getPlayerListStyles(player.rank);
        return (
          <div key={player.rank} className={`flex items-center justify-between ${styles.containerBg} ${styles.borderColor} rounded-xl p-4 shadow-lg`}>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img
                  src={player.imgUrl}
                  alt={player.name}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-purple-400"
                />
                {/* Rank number */}
                <div className="absolute -top-2 -left-2 w-6 h-6 bg-slate-900 text-white rounded-full flex items-center justify-center text-xs font-bold border-2 border-purple-400">
                  {player.rank}
                </div>
              </div>
              
              <div>
                <p className={`${styles.textGlow} font-bold text-lg`}>{player.name}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="flex items-center space-x-1">
                  <span className="text-purple-400 text-lg">⭐</span>
                  <p className={`${styles.textGlow} text-xl font-bold`}>{player.points}</p>
                </div>
                <p className="text-gray-400 text-sm">points</p>
              </div>
              
              <button
                onClick={() => handleClaim(player.rank)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-200 transform hover:scale-105 ${
                  player.rank <= 3 
                    ? ' bg-yellow-500  hover:bg-orange-600 text-black shadow-lg' 
                    : ' bg-purple-600 hover:bg-indigo-700 text-white shadow-md'
                }`}
              >
                {"Claim"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default PlayerList;