import React from 'react';

const HomePage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="relative w-full max-w-4xl h-96 rounded-full overflow-hidden shadow-lg">
        <img
          src="/table.jpg"
          alt="Tarot Table"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="w-3/4 h-3/4 bg-white/50 rounded-full flex justify-center items-center">
            {/* Add components here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
