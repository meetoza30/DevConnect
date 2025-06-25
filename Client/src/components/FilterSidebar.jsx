import React from 'react';
import { X, Filter } from 'lucide-react';

export const FilterSidebar = ({ 
  filters, 
  onFiltersChange, 
  onClearFilters, 
  isOpen, 
  onClose 
}) => {
  const skillOptions = [
    'C', 'C#', 'C++', 'CSS3', 'DART', 'GOLANG', 'GRAPHQL', 'HTML5', 'JAVA',
    'JavaScript', 'KOTLIN', 'PHP', 'RUST', 'PYTHON', 'TYPESCRIPT', 'AWS', 'AZURE', 'GOOGLE CLOUD', 'ANGULAR', 'CHART.JS', 'Context API',  'DJANGO',
     'EXPRESS.JS', 'FLASK', 'FLUTTER', 'JWT', 'NEXT.JS',
    'NODE.JS', 'OPENCV', 'REACT.JS', 
    'SOCKET.IO', 'TAILWINDCSS', 'THREE.JS',  'VUE.JS', 'FIREBASE', 'MONGODB', 'MYSQL', 'POSTGRES',
    'REDIS', 'KERAS', 'MATPLOTLIB', 'MLFLOW', 'NUMPY', 'PANDAS', 'PYTORCH', 'TENSORFLOW'
  ];

  const experienceOptions = [
    { value: 'beginner', label: '0 Hackathons' },
    { value: 'intermediate', label: '1-3 Hackathons' },
    { value: 'experienced', label: '3+ Hackathons' }
  ];

  const graduationYears = [];
  const currentYear = new Date().getFullYear();
  for (let year = currentYear + 4; year >= currentYear - 5; year--) {
    graduationYears.push(year);
  }

  const handleSkillChange = (skill, checked) => {
    const updatedSkills = checked
      ? [...filters.skills, skill]
      : filters.skills.filter(s => s !== skill);
    
    onFiltersChange({ ...filters, skills: updatedSkills });
  };


  const handleGraduationYearChange = (year, checked) => {
    // console.log(year)
    const updatedYears = checked
      ? [...filters.graduationYears, year]
      : filters.graduationYears.filter(y => y !== year);
    
    onFiltersChange({ ...filters, graduationYears: updatedYears });
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 overflow-scroll bg-black bg-opacity-50 z-50" onClick={onClose}>
        <div 
          className="fixed overflow-scroll inset-x-4 top-20 md:inset-x-auto md:left-4 md:top-4 md:w-80 bg-gray-900 rounded-lg border border-gray-700 max-h-[calc(100vh-6rem)] md:max-h-[calc(100vh-2rem)] "
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 overflow-y-auto max-h-full">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Filter size={20} />
                  Filters
                </h2>
                <div className="flex gap-2">
                  <button 
                    className="px-3 py-1 text-sm text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
                    onClick={onClearFilters}
                  >
                    Clear All
                  </button>
                  <button 
                    className="p-1 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
                    onClick={onClose}
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Skills Filter */}
              <div className="bg-gray-800 border border-gray-700 rounded-lg">
                <div className="p-4 border-b border-gray-700">
                  <h3 className="text-sm font-medium text-white">Skills</h3>
                </div>
                <div className="p-4 max-h-48 overflow-y-auto">
                  <div className="grid grid-cols-2 gap-2">
                    {skillOptions.map((skill) => (
                      <div key={skill} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`skill-${skill}`}
                          checked={filters.skills.includes(skill)}
                          onChange={(e) => handleSkillChange(skill, e.target.checked)}
                          className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500 focus:ring-2"
                        />
                        <label htmlFor={`skill-${skill}`} className="text-sm text-gray-300 cursor-pointer">
                          {skill}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Experience Filter */}
              <div className="bg-gray-800 border border-gray-700 rounded-lg">
                <div className="p-4 border-b border-gray-700">
                  <h3 className="text-sm font-medium text-white">Hackathon Experience</h3>
                </div>
                <div className="p-4">
                  {experienceOptions.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2 mb-2">
                      <input
                        type="radio"
                        id={`exp-${option.value}`}
                        name="experience"
                        value={option.value}
                        checked={filters.hackathons === option.value}
                        onChange={(e) => onFiltersChange({ ...filters, hackathons: e.target.value })}
                        className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 focus:ring-purple-500 focus:ring-2"
                      />
                      <label htmlFor={`exp-${option.value}`} className="text-sm text-gray-300 cursor-pointer">
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Graduation Year Filter */}
              <div className="bg-gray-800 border border-gray-700 rounded-lg">
                <div className="p-4 border-b border-gray-700">
                  <h3 className="text-sm font-medium text-white">Graduation Year</h3>
                </div>
                <div className="p-4 max-h-40 overflow-y-auto">
                  <div className="grid grid-cols-3 gap-2">
                    {graduationYears.map((year) => (
                      <div key={year} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`year-${year}`}
                          checked={filters.graduationYears.includes(year)}
                          onChange={(e) => handleGraduationYearChange(year, e.target.checked)}
                          className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500 focus:ring-2"
                        />
                        <label htmlFor={`year-${year}`} className="text-sm text-gray-300 cursor-pointer">
                          {year}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};