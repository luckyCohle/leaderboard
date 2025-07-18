import { getPlayerStyles } from "../utils/style";
import type { PlayerType } from "../utils/types";

function TopThree({ topThree }: { topThree: PlayerType[] }) {
  return (
    <div className="flex justify-center items-end space-x-6 mb-8 px-4">
      {topThree.map((player) => {
        const styles = getPlayerStyles(player.rank);
        return (
          <div key={player.name} className={`${styles.order} flex flex-col items-center relative`}>
            {/* Crown for 1st place */}
            {styles.showCrown && (
              <div className="absolute -top-8 z-10 animate-bounce">
                <div className="text-2xl sm:text-4xl">👑</div>
              </div>
            )}
            
            {/* Podium base */}
            <div className={`${styles.containerSize} ${styles.bgColor} ${styles.borderColor} ${styles.glowEffect} border sm:border-2 rounded-full p-1 mb-3 relative`}>
              <img 
                src={player.imgUrl} 
                alt={player.name}
                className="w-full h-full rounded-full object-cover"
              />
              
              {/* Rank number badge */}
              <div className="absolute -bottom-2 -right-2 w-4 h-4 sm:w-8 sm:h-8 bg-slate-900 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold  sm:border-2 border-white">
                {player.rank}
              </div>
            </div>
            
            {/* Player Info */}
            <div className="text-center">
              <p className={`${styles.nameSize} font-bold text-white mb-1`}>{player.name}</p>
              <div className="flex items-center justify-center space-x-1">
                <span className="text-purple-400 text-lg">⭐</span>
                <p className={`${styles.textColor} text-xl sm:text-2xl font-bold`}>{player.points}</p>
              </div>
            </div>
            
            {/* Podium platform */}
            <div className={`mt-4 ${styles.bgColor} rounded-t-lg ${styles.glowEffect} ${
              player.rank === 1 ? 'w-12 h-6 sm:w-20 sm:h-12' : 
              player.rank === 2 ? 'w-10 h-5 sm:w-16 sm:h-10' : 
              'w-10 h-4 sm:w-16 sm:h-8'
            }`}></div>
          </div>
        );
      })}
    </div>
  );
}

export default TopThree;