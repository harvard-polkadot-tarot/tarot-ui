"use client"; // This marks the file as a Client Component

import React, { useState, useEffect } from "react";
import tarot from "../tarotdepot.json";

const HomePage = () => {
    const [shuffledCards, setShuffledCards] = useState<any[]>([]);
    const [majorArcana, setMajorArcana] = useState<any[]>([]);
    const [minorArcana, setMinorArcana] = useState<any[]>([]);
    const [gameStarted, setGameStarted] = useState(false);
    const [drawCount, setDrawCount] = useState(0);

    useEffect(() => {
        const major = tarot["Major Arcana"];
        const minor = tarot["Minor Arcana"];
        
        setMajorArcana(major);
        setMinorArcana(minor);
    }, []);

    const startGame = () => {
        const deck = majorArcana.map(card => ({ ...card, img: card.img }));
        const shuffledDeck = shuffleDeck([...deck]);
        setShuffledCards(shuffledDeck.slice(0, 3));
        setDrawCount(0);
        setGameStarted(true);
    };

    const shuffleDeck = (deck) => {
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
        return deck;
    };

    const drawCard = () => {
        if (drawCount < 3) {
            setDrawCount(drawCount + 1);
        }
    };

    // Placeholder image source for facedown card
    const facedownCardSrc = "/images/cards/back.jpg";

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
            {/* Display shuffled cards */}
            <div className="absolute z-10 flex space-x-4">
                {gameStarted && shuffledCards.map((card, index) => (
                    <img
                        key={index}
                        src={index < drawCount ? card.img : facedownCardSrc}
                        alt={`Card ${index + 1}`}
                        className="h-48 w-32"
                    />
                ))}
            </div>
            {/* Button to start game or draw cards */}
            <button
                onClick={!gameStarted ? startGame : drawCard}
                className="absolute left-1/2 top-3 z-20 mt-4 -translate-x-1/2 transform rounded-full bg-green-500 px-4 py-2 text-white hover:bg-green-700"
            >
                {!gameStarted ? "Start Game" : `Draw Card ${drawCount + 1}`}
            </button>

            <div className="relative h-[700px] w-full max-w-7xl overflow-hidden rounded-full shadow-lg">
                <img
                    src="/table2.jpg"
                    alt="Tarot Table"
                    className="z-10 h-full w-full object-cover"
                />

                <div className="absolute inset-0 z-0 flex items-center justify-center">
                    <CircleAstrologyIcons />
                </div>

                <div className="absolute z-20 flex h-4/5 w-4/5 flex-col items-center justify-center space-y-4 rounded-full bg-white/50"></div>
            </div>

            {/* Card Name and Description */}
            <div className="mt-8 text-center">
                {gameStarted && drawCount > 0 && (
                    <div>
                        <h2 className="text-xl font-bold">{shuffledCards[drawCount - 1].Name}</h2>
                        <p className="text-md">{shuffledCards[drawCount - 1].Description}</p>
                    </div>
                )}
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
