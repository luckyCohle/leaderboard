/// <reference types="vite/client" />
import  { useState } from 'react'
import type { PlayerType } from '../utils/types';
import { getPlayerListStyles } from '../utils/style';
import axios from 'axios';

function PlayerList({ players,getData }: { players: PlayerType[],getData:()=>{} }) {
  const [displayPoints,setDisplayPoints]=useState<number>(0);//points to be displayed when claim btn is pressed
  const [playerRewarded,setPlayerRewarded]=useState<number>(-1);//rank of player for which the btn is pressed
 const handleClaim = async (player: PlayerType) => {
  const random = Math.floor(Math.random() * 10) + 1;
  const url = import.meta.env.VITE_BACKEND_URL;

  try {
    const res = await axios.post(`${url}/claim/history`, {
      points: random,
      username: player.name,
      userId: player.id,
    });

    if (res.status === 200 || res.status === 201) {
      setDisplayPoints(random);
      setPlayerRewarded(player.rank);
    }
  } catch (err) {
    console.error("Claim failed:", err);
  }

  //display reward message for 2 seconds
  setTimeout(() => {
    setDisplayPoints(0);
    setPlayerRewarded(-1);
    getData()
  }, 3000);
  
};


  

  return (
    <div className="space-y-3 px-4 w-full h-full">
      {players.map((player) => {
        const styles = getPlayerListStyles(player.rank);
        return (
          <div key={player.rank} className={`relative flex items-center justify-between ${styles.containerBg} ${styles.borderColor} rounded-xl p-4 sm:p-4 shadow-lg`}>
            <div className="flex flex-col  sm:flex-row items-center space-x-4">
              <div className="relative items-center pl-3">
                <img
                  src={player.imgUrl}
                  alt={player.name}
                  className=" w-8 h-8 sm:w-14 sm:h-14 rounded-full object-cover ring-2 ring-purple-400"
                />
                {/* Rank number */}
                <div className="absolute -top-2 -left-2 h-4 w-4 sm:w-6 sm:h-6 bg-slate-900 text-white rounded-full flex items-center justify-center text-xs font-bold border-2 border-purple-400">
                  {player.rank}
                </div>
              </div>
              
              <div className='flex items-center justify-center'>
                <p className={`${styles.textGlow} font-bold sm:text-lg`}>{player.name}</p>
              </div>
            </div>
            {/* reward display message  */}
            
            {playerRewarded === player.rank && (
              <div className="absolute sm:static inset-0 flex items-center justify-center backdrop-blur-xs sm:bg-none sm:bg-transparent bg-white/30 rounded-lg sm:rounded-xl z-10">
                <p className="text-orange-400 text-lg sm:text-2xl font-bold animate-pulse">
                  +{displayPoints} Points
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center space-x-4">
              <div className="text-right">
                <div className="flex items-center space-x-1">
                  <span className="text-purple-400 sm:text-lg">⭐</span>
                  <p className={`${styles.textGlow} text-lg sm:text-xl font-bold`}>{player.points}</p>
                </div>
                {/* <p className="text-gray-400 text-xs sm:text-sm">points</p> */}
              </div>
              
              <button
                onClick={() => handleClaim(player)}
                className={`px-3 py-1 sm:px-6 sm:py-2 rounded-full sm:text-xl font-medium transition-all duration-200 transform hover:scale-105 ${
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