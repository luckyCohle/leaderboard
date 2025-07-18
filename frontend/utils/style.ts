export const getPlayerListStyles = (rank: number) => {
    if (rank <= 3) {
      return {
        containerBg: 'bg-purple-700',
        borderColor: rank === 1 ? 'border-l-4 border-yellow-500' : 
                    rank === 2 ? 'border-l-4 border-gray-400' : 
                    'border-l-4 border-orange-500',
        textGlow: 'text-yellow-400 drop-shadow-sm',
        rankBadge: true
      };
    }
    return {
      containerBg: 'bg-slate-700',
      borderColor: '',
      textGlow: 'text-white',
      rankBadge: false
    };
  };
  // utils/style.js
export const getPlayerStyles = (rank:number) => {

  const containerSize = 'w-12 h-12 sm:w-16 sm:h-16'
  switch(rank) {
    case 1:
      return {
        containerSize,
        order: 'order-2',
        bgColor: 'bg-yellow-400',
        borderColor: 'border-yellow-300',
        textColor: 'text-yellow-400',
        nameSize: 'sm:text-xl',
        showCrown: true,
        glowEffect: 'shadow-2xl shadow-yellow-500/50'
      };
    case 2:
      return {
        containerSize,
        order: 'order-1',
        bgColor: 'bg-gray-300',
        borderColor: 'border-gray-300',
        textColor: 'text-gray-300',
        nameSize: 'text-xs sm:text-lg',
        showCrown: false,
        glowEffect: 'shadow-xl shadow-gray-500/30'
      };
    case 3:
      return {
        containerSize,
        order: 'order-3',
        bgColor: 'bg-orange-400',
        borderColor: 'border-orange-400',
        textColor: 'text-orange-400',
        nameSize: 'text-xs text-lg',
        showCrown: false,
        glowEffect: 'shadow-xl shadow-orange-500/30'
      };
    default:
      return {
        containerSize,
        order: '',
        bgColor: 'bg-gradient-to-br from-purple-600 to-indigo-600',
        borderColor: 'border-purple-400',
        textColor: 'text-white',
        nameSize: 'text-base',
        showCrown: false,
        glowEffect: 'shadow-lg shadow-purple-500/20'
      };
  }
};