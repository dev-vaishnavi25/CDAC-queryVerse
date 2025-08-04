import { MessageCircle, Trophy, Users } from 'lucide-react';

const HeroCard = () => (
  <div className="relative">
    <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 transform hover:scale-105 transition-transform duration-300">
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
            <MessageCircle className="text-purple-600" size={24} />
          </div>
          <div>
            <div className="text-white font-semibold">Latest Question</div>
            <div className="text-gray-300 text-sm">How to implement microservices in Spring Boot?</div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center">
            <Trophy className="text-white" size={24} />
          </div>
          <div>
            <div className="text-white font-semibold">CrediRank Leader</div>
            <div className="text-gray-300 text-sm">Priya S. - 2,450 points</div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center">
            <Users className="text-white" size={24} />
          </div>
          <div>
            <div className="text-white font-semibold">Active Now</div>
            <div className="text-gray-300 text-sm">234 students online</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default HeroCard;
