import React from 'react';

const CourseFilter = ({ selectedCourse, onCourseChange }) => {
  const courses = ['DAC', 'DASSD', 'DBDA', 'DVSLI', 'EMBEDDED'];

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Filter by Course
      </label>
      <select
        value={selectedCourse}
        onChange={(e) => onCourseChange(e.target.value)}
        className="w-full border border-gray-300 rounded-md p-2"
      >
        <option value="">-- Select Course --</option>
        {courses.map((course) => (
          <option key={course} value={course}>
            {course}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CourseFilter;
