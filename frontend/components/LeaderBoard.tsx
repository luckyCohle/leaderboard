/// <reference types="vite/client" />

import React, { useEffect, useState } from 'react'
import { getPlayerStyles } from '../utils/style';
import type { PlayerType } from '../utils/types';
import TopThree from './TopThree';
import PlayerList from './PlayerList';
import axios from 'axios';



function LeaderBoard({ period }: { period: string }) {
  const [players, setPlayers] = useState<PlayerType[]>([]);
  useEffect(() => {
    const url = import.meta.env.VITE_BACKEND_URL;
    console.log("url=> " + url);
    async function getData() {
      try {
        const response = await axios.get(`${url}/claim/leaderboard/${period}`);
        console.log("response.data =>", response.data);
        const playerArray: PlayerType[] = response.data.leaderboard.map((player: any, index: number) => ({
          rank: index + 1,
          name: player.name,
          points: player.totalPoints,
          imgUrl: player.imgUrl,
        }));

        setPlayers(playerArray);
      } catch (error) {
        console.error("Failed to fetch leaderboard:", error);
      }
    }
    getData()
  }, [period])



  return (
    <div className='h-full max-full rounded-3xl border-2 border-slate-600 bg-slate-800 mx-5 overflow-hidden'>
      {/* Header */}
      <div className="flex items-center justify-center h-16 py-4 border-b border-slate-700">
        <h1 className="text-white text-2xl font-bold">Leaderboard</h1>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Top 3 Players */}
        <TopThree topThree={players.slice(0, 3)} />

        {/* all Players */}
        <PlayerList players={players} />
      </div>
    </div>
  );
}

export default LeaderBoard;