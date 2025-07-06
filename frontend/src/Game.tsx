import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Game() {
 const [board, setBoard] = useState(Array(9).fill(null));
 const [winner,setWinner] = useState(null);
 const [isx, setIsx] = useState(true);
 const [loading,setLoading] = useState(false);
 const navigate = useNavigate();
 
 const winningCombinations = [ 
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ]
  const handleClick = (index:number) =>{
    setLoading(true)
    try{
      if(board[index] || winner) return;
      const newBoard = [...board];
      newBoard[index] = isx ? '❌':'⭕';
      setBoard(newBoard);
      const checkWinner = (board:any) =>{
            for(let combo of winningCombinations){
              const [a,b,c] = combo;
              if(board[a] && board[a]===board[b] && board[a]===board[c]){
                return board[a] // x or o
              }
            }
            return null
      }
      const foundWinner = checkWinner(newBoard);
      if(foundWinner){
        setWinner(foundWinner)
      }
      else{
        setIsx(!isx) // toggle players
      }
    } catch(error){
      console.log("error in handling clicks ", error)
    } finally{
      setLoading(false)
    } 
  }
   const resetGame = () =>{
      setBoard(Array(9).fill(null));
      setIsx(true);
      setWinner(null);
    }
    
  const handleBackToHome = () => {
    navigate('/');
  }
    
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white'>
      <div className="container mx-auto px-4 py-4 sm:py-8">
      
        <div className="text-center mb-6 sm:mb-8">
          <button
            onClick={handleBackToHome}
            className="absolute top-4 sm:top-8 left-4 sm:left-8 bg-white/10 backdrop-blur-md rounded-full p-2 sm:p-3 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
          >
            <span className="text-xl sm:text-2xl">🏠</span>
          </button>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent mb-4">
            Tic Tac Toe
          </h1>
        </div>

        {/* Winner Display */}
        <div className="text-center mb-6 sm:mb-10">
          {winner && (
            <div className="bg-green-500/20 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-green-500/30">
              <p className="text-2xl sm:text-3xl text-green-400 font-bold mb-2">🎉 Winner!</p>
              <p className="text-xl sm:text-2xl text-white">Player {winner} wins!</p>
            </div>
          )}
        </div>

       
        <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8 xl:space-x-10">
        
          {!winner && (
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 w-full max-w-[280px] lg:min-w-[280px]">
              <p className="text-sm text-gray-300 mb-3 text-center">Choose Starter:</p>
              
              <div className="flex items-center justify-center space-x-4 sm:space-x-6">
                <label className="relative cursor-pointer group">
                  <input 
                    type="radio" 
                    name="starter" 
                    checked={isx}
                    onChange={() => setIsx(true)}
                    className="sr-only"
                  />
                  <div className={`
                    w-10 h-10 sm:w-12 sm:h-12 rounded-lg border-2 flex items-center justify-center text-lg sm:text-2xl font-bold transition-all duration-300 transform hover:scale-110
                    ${isx 
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 border-indigo-400 shadow-lg shadow-indigo-500/50 scale-110' 
                      : 'bg-white/20 border-white/30 hover:bg-white/30 hover:border-white/50'
                    }
                  `}>
                    ❌
                  </div>
                  <div className={`
                    absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 flex items-center justify-center transition-all duration-300
                    ${isx ? 'bg-green-500 border-green-400' : 'bg-transparent border-white/30'}
                  `}>
                    {isx && <span className="text-white text-xs leading-none">✓</span>}
                  </div>
                </label>

                <div className="text-sm font-bold text-gray-400">VS</div>

                <label className="relative cursor-pointer group">
                  <input 
                    type="radio" 
                    name="starter" 
                    checked={!isx}
                    onChange={() => setIsx(false)}
                    className="sr-only"
                  />
                  <div className={`
                    w-10 h-10 sm:w-12 sm:h-12 rounded-lg border-2 flex items-center justify-center text-lg sm:text-2xl font-bold transition-all duration-300 transform hover:scale-110
                    ${!isx 
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-600 border-blue-400 shadow-lg shadow-blue-500/50 scale-110' 
                      : 'bg-white/20 border-white/30 hover:bg-white/30 hover:border-white/50'
                    }
                  `}>
                    ⭕
                  </div>
                  <div className={`
                    absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 flex items-center justify-center transition-all duration-300
                    ${!isx ? 'bg-green-500 border-green-400' : 'bg-transparent border-white/30'}
                  `}>
                    {!isx && <span className="text-white text-xs leading-none">✓</span>}
                  </div>
                </label>
              </div>
  {/* Current Player Display */}
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-300 mb-1">Current Player:</p>
                <div className={`
                  inline-block text-xl sm:text-2xl font-bold p-2 rounded-md transition-all duration-300
                  ${isx 
                    ? 'bg-gradient-to-r from-indigo-500/20 to-purple-600/20 border border-indigo-400/30' 
                    : 'bg-gradient-to-r from-blue-500/20 to-cyan-600/20 border border-blue-400/30'
                  }
                `}>
                  {isx ? '❌' : '⭕'}
                </div>
              </div>
            </div>
          )}

          {/* Game Board - Responsive */}
          <div className="flex justify-center">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 md:p-8 border border-white/20 shadow-2xl">
              <div className='w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 grid grid-cols-3 gap-2 sm:gap-3'> 
                {board.map((value, index) => (
                  <div
                    key={index}
                    onClick={() => handleClick(index)}
                    className='h-20 w-20 sm:h-22 sm:w-22 md:h-24 md:w-24 bg-white/20 rounded-xl border border-white/30 flex items-center justify-center text-2xl sm:text-3xl md:text-4xl font-bold cursor-pointer hover:bg-white/30 transition-all duration-300 transform hover:scale-105 active:scale-95'
                  >
                    {value}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        
        <div className="text-center space-y-4 mt-6 sm:mt-8">
          <button
            onClick={resetGame}
            className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg sm:text-xl font-bold rounded-full shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-blue-500/50 active:scale-95"
          >
            🔄 New Game
          </button>
          
          {loading && (
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-white"></div>
              <p className="text-lg sm:text-xl text-yellow-400 mt-2">Loading...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Game

