import React from 'react';

const CourseSection = ({ courses, activeTab, setActiveTab }) => {
  return (
    <section id="courses" className="py-20 bg-gradient-to-b from-gray-50 via-white to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Course Communities
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Dedicated hubs with tailored discussions and expert guidance for every course.
          </p>
        </div>

        {/* Course Toggle Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.entries(courses).map(([key, course]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 text-sm sm:text-base ${
                activeTab === key
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md scale-105'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
              }`}
            >
              <span className="mr-2">{course.icon}</span> {course.name}
            </button>
          ))}
        </div>

        {/* Course Detail Card */}
        <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
          <div className="text-center mb-10">
            <div className={`w-20 h-20 ${courses[activeTab].color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md`}>
              <span className="text-4xl">{courses[activeTab].icon}</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-2">{courses[activeTab].fullName}</h3>
            <p className="text-gray-500">Connect with <strong>{courses[activeTab].name}</strong> students and coordinators.</p>
          </div>

          {/* Course Stats */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { label: 'Active Students', count: '1,250+', color: 'text-purple-600' },
              { label: 'Questions Answered', count: '8,500+', color: 'text-blue-600' },
              { label: 'Course Coordinators', count: '25+', color: 'text-green-600' },
            ].map((item, idx) => (
              <div key={idx} className="text-center p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-md transition">
                <div className={`text-2xl font-bold ${item.color} mb-1`}>{item.count}</div>
                <div className="text-gray-600">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseSection;
