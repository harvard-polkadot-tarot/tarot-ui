import React from 'react';

const HomePage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="relative w-full max-w-7xl h-[700px] rounded-full overflow-hidden shadow-lg">
        <img
          src="/table.jpg"
          alt="Tarot Table"
          className="w-full h-full object-cover"
        />
        <div className="w-4/5 h-4/5 bg-white/50 rounded-full flex justify-center items-center">
          {/* Add components here */}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
