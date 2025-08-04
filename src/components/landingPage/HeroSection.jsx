import HeroCard from './HeroCard';

import { ArrowRight, Play } from 'lucide-react';
import HeroStats from './HeroStats';
import { useNavigate } from 'react-router-dom';

const HeroSection = ({ counters }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  }
  return (
     <section className="pt-20 pb-12 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 min-h-screen flex items-center relative overflow-hidden">
    <div className="absolute inset-0 bg-black/10"></div>
    {/* Bubbles */}
    <div className="absolute inset-0">
      <div className="absolute top-20 left-20 w-4 h-4 bg-yellow-400 rounded-full animate-bounce opacity-70"></div>
      <div className="absolute bottom-40 right-20 w-6 h-6 bg-pink-400 rounded-full animate-pulse opacity-60"></div>
      <div className="absolute top-1/2 left-40 w-3 h-3 bg-green-400 rounded-full animate-ping opacity-50"></div>
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="text-white">
          <div className="mb-6">
            <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-4">
              🚀 Where CDAC Students Connect & Learn
            </span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            Welcome to<br />
            <span className="text-yellow-300">QueryVerse</span>
          </h1>
          <p className="text-xl lg:text-2xl mb-8 text-gray-200 leading-relaxed">
            The ultimate discussion forum for CDAC students. Ask questions, share knowledge, 
            earn CrediRank points, and collaborate with peers across all courses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 flex items-center gap-2" onClick={handleLogin}>
              Start Exploring <ArrowRight size={20} />
            </button>
            {/* <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-purple-600 transition-all flex items-center gap-2">
              <Play size={20} /> Watch Demo
            </button> */}
          </div>
          <HeroStats counters={counters} />
        </div>
        <HeroCard />
      </div>
    </div>
  </section>
  )
}

export default HeroSection;
