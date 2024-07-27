"use client"; // This marks the file as a Client Component

import { useState } from 'react';

const HomePage = () => {
  const [shuffledCards, setShuffledCards] = useState<string[]>([]);

  const tarotDeck = [
    "/images/cards/MW_Death.jpg",
    "/images/cards/MW_Judgement.jpg",
    "/images/cards/MW_Justice.jpg",
  ];

  const shuffleCards = () => {
    const deck = [...tarotDeck];
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    setShuffledCards(deck.slice(0, 3)); // Get the top 3 cards after shuffling
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="relative h-[700px] w-full max-w-7xl overflow-hidden rounded-full shadow-lg">

        {/* Table Image */}
        <img src="/table2.jpg" alt="Tarot Table" className="absolute inset-0 w-full h-full object-cover z-0" />

        {/* Circle Overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <CircleAstrologyIcons />
        </div>

        {/* Button to shuffle cards */}
        <button
          onClick={shuffleCards}
          className="absolute z-20 rounded-full bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
        >
          Tell me my fortune
        </button>

        {/* Display shuffled cards */}
        <div className="absolute inset-0 flex items-center justify-center z-30">
          <div className="flex space-x-4">
            {shuffledCards.map((card, index) => (
              <img
                key={index}
                src={card}
                alt={`Card ${index + 1}`}
                className="h-48 w-32"
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};


const CircleAstrologyIcons = () => {
  const radius = 300; // Increased radius for a larger circle
  const centerX = 650; // Center X remains the same for horizontal alignment adjustment
  const centerY = 350; // Center Y remains the same for vertical alignment

  const icons = [
    { src: "/images/icons/aries.png", alt: "Aries Icon", angle: 0 },
    { src: "/images/icons/taurus.png", alt: "Taurus Icon", angle: 30 },
    { src: "/images/icons/gemini.png", alt: "Gemini Icon", angle: 60 },
    { src: "/images/icons/cancer.png", alt: "Cancer Icon", angle: 90 },
    { src: "/images/icons/leo.png", alt: "Leo Icon", angle: 120 },
    { src: "/images/icons/virgo.png", alt: "Virgo Icon", angle: 150 },
    { src: "/images/icons/libra.png", alt: "Libra Icon", angle: 180 },
    { src: "/images/icons/scorpio.png", alt: "Scorpio Icon", angle: 210 },
    {
      src: "/images/icons/sagittarius.png",
      alt: "Sagittarius Icon",
      angle: 240,
    },
    { src: "/images/icons/capricorn.png", alt: "Capricorn Icon", angle: 270 },
    { src: "/images/icons/aquarius.png", alt: "Aquarius Icon", angle: 300 },
    { src: "/images/icons/pisces.png", alt: "Pisces Icon", angle: 330 },
  ];

  return (
    <>
      {icons.map(({ src, alt, angle }, index) => {
        const radian = (angle * Math.PI) / 180;
        const x = centerX + radius * Math.cos(radian);
        const y = centerY + radius * Math.sin(radian);

        return (
          <div
            key={index}
            style={{
              position: "absolute",
              left: `${x}px`,
              top: `${y}px`,
              transform: "translate(-50%, -50%)",
              zIndex: 10, // Ensures the icons are above other elements
            }}
          >
            <img src={src} alt={alt} className="h-20 w-20" />
          </div>
        );
      })}
    </>
  );
};

export default HomePage;
