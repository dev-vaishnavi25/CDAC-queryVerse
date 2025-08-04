const HeroStats = ({ counters }) => (
  <div className="grid grid-cols-3 gap-8">
    <div className="text-center">
      <div className="text-4xl font-bold text-yellow-300 mb-2">{counters.students.toLocaleString()}+</div>
      <div className="text-gray-300">Active Students</div>
    </div>
    <div className="text-center">
      <div className="text-4xl font-bold text-yellow-300 mb-2">{counters.questions.toLocaleString()}+</div>
      <div className="text-gray-300">Questions Solved</div>
    </div>
    <div className="text-center">
      <div className="text-4xl font-bold text-yellow-300 mb-2">{counters.courses}+</div>
      <div className="text-gray-300">Courses</div>
    </div>
  </div>
);

export default HeroStats;
