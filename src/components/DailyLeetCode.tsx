import React, { useState, useEffect } from 'react';
import { Search, Calendar, Tag, Code, ArrowLeft } from 'lucide-react';
import type { Solution } from '../types/Solution';

interface SolutionCardProps {
  solution: Solution;
  onClick: (solution: Solution) => void;
}

const SolutionCard: React.FC<SolutionCardProps> = ({ solution, onClick }) => {
  const getDifficultyStyle = (difficulty: Solution['difficulty']): string => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-900 text-green-300';
      case 'Medium': return 'bg-yellow-900 text-yellow-300';
      case 'Hard': return 'bg-red-900 text-red-300';
      default: return 'bg-gray-900 text-gray-300';
    }
  };

  return (
    <div 
      className="cursor-pointer bg-[#161b22] border border-[#30363d] rounded-lg p-6 hover:border-[#8b949e] hover:-translate-y-1 transition-all duration-200 ease-in-out"
      onClick={() => onClick(solution)}
    >
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-lg font-semibold text-gray-200">{solution.title}</h2>
        <span className={`${getDifficultyStyle(solution.difficulty)} text-xs font-medium px-2.5 py-1 rounded-full`}>
          {solution.difficulty}
        </span>
      </div>
      
      <p className="text-gray-400 mb-4 text-sm leading-relaxed">{solution.description}</p>
      
      <div className="flex items-center text-xs text-gray-500">
        <Calendar className="w-4 h-4 mr-1.5" />
        <span>{solution.date}</span>
        <span className="mx-2">|</span>
        <Tag className="w-4 h-4 mr-1.5" />
        <span>{solution.tags.join(', ')}</span>
      </div>
    </div>
  );
};

interface SolutionDetailProps {
  solution: Solution;
  onBack: () => void;
}

const SolutionDetail: React.FC<SolutionDetailProps> = ({ solution, onBack }) => {
  const getDifficultyStyle = (difficulty: Solution['difficulty']): string => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-900 text-green-300';
      case 'Medium': return 'bg-yellow-900 text-yellow-300';
      case 'Hard': return 'bg-red-900 text-red-300';
      default: return 'bg-gray-900 text-gray-300';
    }
  };

  // Simple syntax highlighting function
  const renderCodeLine = (line: string, index: number) => {
    const parts = [];
    let currentIndex = 0;
    
    // Keywords
    const keywords = /(class|def|if|for|in|return|while|import|from|as|self)/g;
    // Types
    const types = /(Solution|ListNode|Optional|List|int|bool)/g;
    // Functions
    const functions = /(twoSum|addTwoNumbers|len|range|__init__|val|next)/g;
    // Comments
    const comments = /(#.*)/g;
    // Numbers
    const numbers = /(\b\d+\b)/g;
    
    // For simplicity, let's just use basic coloring without complex parsing
    if (line.includes('#')) {
      // Comment line
      return <span key={index} className="text-[#5c6370]">{line}</span>;
    }
    
    return (
      <span key={index}>
        {line.split(/(\b(?:class|def|if|for|in|return|while|import|from|as|self)\b)/).map((part, i) => {
          if (['class', 'def', 'if', 'for', 'in', 'return', 'while', 'import', 'from', 'as', 'self'].includes(part)) {
            return <span key={i} className="text-[#c678dd]">{part}</span>;
          }
          return part;
        })}
      </span>
    );
  };

  const codeLines = solution.solution.split('\n');

  return (
    <div className="min-h-screen bg-[#0d1117] w-screen overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[#161b22] bg-opacity-90 backdrop-blur-sm border-b border-[#30363d]">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button 
                onClick={onBack}
                className="flex items-center text-sm cursor-pointer appearance-none text-[#8b949e] bg-transparent hover:border-[#8b949e]"
            >
                <ArrowLeft className="w-4 h-4 mr-1" />
                    Back to Solutions
            </button>
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-200 mr-4" style={{ fontFamily: 'Fira Code, monospace' }}>
                {solution.title}
              </h1>
              <span className={`${getDifficultyStyle(solution.difficulty)} text-xs font-medium px-2.5 py-1 rounded-full`}>
                {solution.difficulty}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Problem Description */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-200 mb-2">{solution.title}</h1>
            <p className="text-[#8b949e] leading-relaxed">{solution.description}</p>
            <a 
              href={solution.problemUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#8b949e] hover:text-[#c9d1d9] leading-relaxed underline transition-colors"
            > 
              {solution.problemUrl}
            </a>
          </div>

          {/* Code Editor */}
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg overflow-hidden">
            {/* Editor Header */}
            <div className="flex items-center justify-between p-3 border-b border-[#30363d] bg-[#161b22]">
              <div className="flex items-center space-x-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-xs text-[#8b949e]" style={{ fontFamily: 'Fira Code, monospace' }}>
                {solution.filename}
              </div>
              <div className="w-12"></div>
            </div>

            {/* Code Content */}
            <div className="bg-[#0d1117] text-sm p-4 flex" style={{ fontFamily: 'Fira Code, monospace' }}>
              {/* Line Numbers */}
              <div className="pr-4 text-right select-none">
                {codeLines.map((_, index) => (
                  <div key={index} className="text-[#4b5263]">
                    {index + 1}
                  </div>
                ))}
              </div>

              {/* Code */}
              <pre className="flex-1 overflow-x-auto">
                <code className="text-[#abb2bf]">
                  {codeLines.map((line, index) => (
                    <div key={index}>
                      {line.trim() === '' ? '\u00A0' : renderCodeLine(line, index)}
                    </div>
                  ))}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const DailyLeetCode: React.FC = () => {
  const [solutions, setSolutions] = useState<Solution[]>([]); 
  const [filteredSolutions, setFilteredSolutions] = useState<Solution[]>([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedSolution, setSelectedSolution] = useState<Solution | null>(null);

// Add this useEffect to fetch real data:
  useEffect(() => {
    const fetchSolutions = async () => {
      try {
        setLoading(true);
        const response = await fetch('/solutions.json');
        if (!response.ok) {
          throw new Error('Failed to fetch solutions');
        }
        const data = await response.json();
        setSolutions(data.solutions);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load solutions');
      } finally {
        setLoading(false);
      }
    };

  fetchSolutions();
}, []);

  useEffect(() => {
    let filtered = solutions;
    
    if (searchTerm) {
      filtered = filtered.filter(solution =>
        solution.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        solution.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    if (selectedDifficulty !== 'All') {
      filtered = filtered.filter(solution => solution.difficulty === selectedDifficulty);
    }
    
    setFilteredSolutions(filtered);
  }, [searchTerm, selectedDifficulty, solutions]);

  if (selectedSolution) {
    return <SolutionDetail solution={selectedSolution} onBack={() => setSelectedSolution(null)} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d1117] w-screen overflow-x-hidden flex items-center justify-center">
        <div className="text-gray-400">Loading solutions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0d1117] w-screen overflow-x-hidden flex items-center justify-center">
        <div className="text-red-400">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d1117] w-screen overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[#161b22] bg-opacity-90 backdrop-blur-sm border-b border-[#30363d]">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-semibold text-gray-200" style={{ fontFamily: 'Fira Code, monospace' }}>
              Daily LeetCode Solutions
            </h1>
            <div className="flex items-center text-sm text-gray-400">
              <Code className="w-4 h-4 mr-1" />
              <span>{solutions.length} solutions</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full px-4 sm:px-6 lg:px-8 py-8 min-w-full">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
          <div className="relative w-full sm:w-auto mb-4 sm:mb-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
            <input
              type="text"
              placeholder="Search solutions..."
              className="bg-[#0d1117] border border-[#30363d] rounded-md py-2 pl-10 pr-4 focus:outline-none focus:border-[#8b949e] text-gray-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="relative">
            <select
              className="cursor-pointer appearance-none bg-[#0d1117] border border-[#30363d] rounded-md py-2 px-4 pr-8 focus:outline-none focus:border-[#8b949e] hover:border-[#8b949e] text-gray-300"
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
            >
              <option value="All">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 w-full min-h-[400px] min-w-full">
          {filteredSolutions.map((solution) => (
            <SolutionCard
              key={solution.id}
              solution={solution}
              onClick={setSelectedSolution}
            />
          ))}
          
          {filteredSolutions.length === 0 && (
            <div className="col-span-full text-center py-12 w-full flex items-center justify-center">
              <div>
                <Code className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">No solutions found matching your search.</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DailyLeetCode;
