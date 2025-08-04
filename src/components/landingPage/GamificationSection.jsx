import React from 'react';

const GamificationSection = ({ gamificationFeatures }) => {
  return (
    <section id="gamification" className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">CrediRank System</h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Gamified learning that rewards knowledge sharing and active participation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {gamificationFeatures.map((feature, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center mb-6">
                <feature.icon className="text-purple-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-200">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">How CrediRank Works</h3>
            <div className="space-y-4 text-left">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-bold">+5</span>
                </div>
                <span>Ask a question</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">+15</span>
                </div>
                <span>Answer a question</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">+25</span>
                </div>
                <span>Get your answer accepted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GamificationSection;
