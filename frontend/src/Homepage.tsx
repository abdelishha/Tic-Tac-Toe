import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleStartGame = () => {
    navigate('/game');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating X's and O's - Responsive positioning */}
        <div className="absolute top-4 left-4 sm:top-20 sm:left-10 animate-bounce opacity-20" style={{ animationDuration: '6s' }}>
          <span className="text-3xl sm:text-6xl text-white">❌</span>
        </div>
        <div className="absolute top-8 right-4 sm:top-40 sm:right-20 animate-bounce opacity-30" style={{ animationDuration: '4s', animationDelay: '1s' }}>
          <span className="text-2xl sm:text-5xl text-white">⭕</span>
        </div>
        <div className="absolute bottom-8 left-4 sm:bottom-40 sm:left-20 animate-bounce opacity-25" style={{ animationDuration: '3s', animationDelay: '2s' }}>
          <span className="text-2xl sm:text-4xl text-white">❌</span>
        </div>
        <div className="absolute bottom-4 right-4 sm:bottom-20 sm:right-10 animate-bounce opacity-20" style={{ animationDuration: '5s', animationDelay: '0.5s' }}>
          <span className="text-2xl sm:text-5xl text-white">⭕</span>
        </div>
        <div className="hidden sm:block absolute top-1/2 left-1/4 animate-bounce opacity-15" style={{ animationDuration: '4.5s', animationDelay: '1.5s' }}>
          <span className="text-3xl text-white">❌</span>
        </div>
        <div className="hidden sm:block absolute top-1/3 right-1/3 animate-bounce opacity-20" style={{ animationDuration: '3.5s', animationDelay: '0.8s' }}>
          <span className="text-4xl text-white">⭕</span>
        </div>
      </div>

  
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
      
        <div className={`text-center mb-8 sm:mb-12 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent mb-4 sm:mb-6 animate-pulse">
            Tic Tac Toe
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-4">
            Experience the classic game reimagined with stunning animations and modern design
          </p>
        </div>

        
        <div className={`mb-8 sm:mb-12 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-8 border border-white/20 shadow-2xl">
            <div className="grid grid-cols-3 gap-2 sm:gap-3 w-36 h-36 sm:w-48 sm:h-48 mx-auto"> 
              {Array(9).fill(null).map((_, index) => (
                <div
                  key={index}
                  className="bg-white/20 rounded-lg flex items-center justify-center text-xl sm:text-3xl font-bold text-white hover:bg-white/30 transition-all duration-300 cursor-pointer transform hover:scale-105"
                >
                  {index % 3 === 0 ? '❌' : index % 3 === 1 ? '⭕' : '❌'}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className={`space-y-6 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <button
            onClick={handleStartGame}
            onMouseEnter={() => setHoveredButton(true)}
            onMouseLeave={() => setHoveredButton(false)}
            className="group relative px-8 sm:px-12 py-3 sm:py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-lg sm:text-xl font-bold rounded-full shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-green-500/50 active:scale-95"
          >
            <span className="relative z-10">🎮 Start Game</span>
            <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12 max-w-4xl">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">⚡</div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Lightning Fast</h3>
              <p className="text-sm sm:text-base text-gray-300">Instant gameplay with smooth animations</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🎨</div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Beautiful Design</h3>
              <p className="text-sm sm:text-base text-gray-300">Modern UI with stunning visual effects</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 sm:col-span-2 lg:col-span-1">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🏆</div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Classic Fun</h3>
              <p className="text-sm sm:text-base text-gray-300">The timeless game you know and love</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`mt-12 sm:mt-16 text-center transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-gray-400 text-xs sm:text-sm">
            Built with ❤️ using React & Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
