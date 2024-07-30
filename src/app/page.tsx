"use client"; // This marks the file as a Client Component

import React, { useState, useEffect, useRef } from "react";
import tarot from "../tarotdepot.json";
import { NewSeededRNG, Shuffle, ReadRange, type SeededRNG } from './random';
import CircleAstrologyIcons from './CircleAstrologyIcons';
import { PolkadotConnect } from "./polkadot-connect";
import { draw } from "./contracts";
import { web3Accounts, web3Enable } from "@polkadot/extension-dapp";
import { blake2b } from '@noble/hashes/blake2b';

const HomePage = () => {
    const [shuffledCards, setShuffledCards] = useState<any[]>([]);
    const [majorArcana, setMajorArcana] = useState<any[]>([]);
    const [minorArcana, setMinorArcana] = useState<any[]>([]);
    const [gameStarted, setGameStarted] = useState(false);
    const [drawCount, setDrawCount] = useState(0);
    const [rng, setRng] = useState<SeededRNG|null>(null);
    const [drawSeed, setDrawSeed] = useState<Uint8Array|null>(null);
    const [shuffle, setShuffle] = useState<number[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [cameraOpen, setCameraOpen] = useState(false);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const empty = new Array<any>();
    const major = empty.concat(tarot["Major Arcana"])
    //const deck = major.concat(tarot["Minor Arcana"]);
    const deck = major;

    useEffect(() => {
        const major = tarot["Major Arcana"];
        const minor = tarot["Minor Arcana"];
        
        setMajorArcana(major);
        setMinorArcana(minor);

    }, []);

    const createTarotTx = async () => {
        const enabled = await web3Enable("Tarot");
        const accounts = await web3Accounts();    

        const encoder = new TextEncoder();
        let seed = encoder.encode("");
        //await updateSeed(seed);
        if (capturedImage != null) {
            seed = blake2b(encoder.encode(capturedImage));
        }
        await draw(accounts[0]!, seed, 1000000000000000, updateSeed);
    }

    const startGame = async () => {
        await createTarotTx();
    };

    const updateSeed = async (newSeed: Uint8Array) => {
        setDrawSeed(newSeed);
        const newRNG = NewSeededRNG(newSeed);
        setRng(newRNG);
        setDrawCount(0);
        setShuffle(Shuffle(deck.length, newRNG));
        setGameStarted(true);
        setModalOpen(false);
    }

    const drawCard = () => {
        if (drawCount < 3) {
            setDrawCount(drawCount + 1);
            setModalOpen(true);
        }
    };

    const restartGame = () => {
        setGameStarted(false);
        setDrawCount(0);
        setCapturedImage(null);
    };

    const openCamera = () => {
        setCameraOpen(true);
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.play();
                }
            })
            .catch(err => {
                console.error("Error accessing webcam:", err);
            });
    };

    const captureImage = () => {
        if (videoRef.current && canvasRef.current) {
            const context = canvasRef.current.getContext('2d');
            if (context) {
                context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
                const dataURL = canvasRef.current.toDataURL('image/png');
                setCapturedImage(dataURL);
                videoRef.current.srcObject && (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
                setCameraOpen(false);
                startGame();
            }
        }
    };

    // Placeholder image source for facedown card
    const facedownCardSrc = "/images/cards/back.jpg";

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 pt-16">
            {!capturedImage && (
                <button
                    onClick={!cameraOpen ? openCamera : captureImage}
                    className="z-20 mt-4 rounded-full px-4 py-2 text-white bg-blue-500 hover:bg-blue-700"
                >
                    {!cameraOpen ? "Start Game (Take Palm Photo)" : "Capture Photo"}
                </button>
            )}

            <div className="relative h-[700px] w-full max-w-7xl overflow-hidden rounded-full shadow-lg mt-8">
                <img
                    src="/table2-min.jpg"
                    alt="Tarot Table"
                    className="z-10 h-full w-full object-cover"
                />

                <div className="absolute inset-0 z-0 flex items-center justify-center">
                    <CircleAstrologyIcons />
                </div>

                {/* Centering the cards on the table */}
                <div className="absolute inset-0 z-20 flex items-center justify-center">
                    {gameStarted && (
                        <div className="flex space-x-4">
                            {[...Array(3)].map((x, i) => (
                                <img
                                    key={i}
                                    src={i < drawCount ? deck[shuffle[i]!].img : facedownCardSrc}
                                    alt={`Card ${i + 1}`}
                                    className="h-48 w-32"
                                />
                            ))}
                        </div>
                    )}
                </div>

                {cameraOpen && (
                    <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black bg-opacity-50">
                        <video ref={videoRef} className="h-64 w-64"></video>
                        <canvas ref={canvasRef} className="hidden" width="640" height="480"></canvas>
                    </div>
                )}
            </div>

            {/* Modal for Card Name, Description, and Image */}
            {modalOpen && gameStarted && drawCount > 0 && (
                <Modal
                    card={deck[shuffle[drawCount-1]!]}
                    onClose={() => setModalOpen(false)}
                />
            )}

            {/* Button to draw cards or restart game */}
            {gameStarted && (
                <button
                    onClick={drawCount < 3 ? drawCard : restartGame}
                    className={`z-20 mt-4 rounded-full px-4 py-2 text-white ${drawCount >= 3 ? 'bg-red-500 hover:bg-red-700' : 'bg-green-500 hover:bg-green-700'}`}
                >
                    {drawCount < 3 ? `Draw Card ${Math.min(drawCount + 1, 3)}` : "Restart Game"}
                </button>
            )}
        </div>
    );
};

const Modal = ({ card, onClose }) => {
    return (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md mx-auto">
            <img src={card.img} alt={card.Name} className="mx-auto mb-4 h-80 w-50" /> {/* Increased width and height */}
            <h2 className="text-xl font-bold mb-2">
                    {card.Name} - {card["Crypto Link"].Name}
                </h2>
                <p className="text-md">{card.Description}</p>
                <div className="mt-4">
                    <p>{card["Crypto Link"].Reason}</p>
                    <p>{card["Crypto Link"].Bio}</p>
                </div>
                <button
                    onClick={onClose}
                    className="mt-4 rounded-full px-4 py-2 text-white bg-blue-500 hover:bg-blue-700"
                >
                    Done
                </button>
            </div>
        </div>
    );
};


// const CircleAstrologyIcons = () => {
//     const radius = 300; // Increased radius for a larger circle
//     const centerX = 650; // Center X remains the same for horizontal alignment adjustment
//     const centerY = 350; // Center Y remains the same for vertical alignment

//     const icons = [
//         { src: "/images/icons/aries.png", alt: "Aries Icon", angle: 0 },
//         { src: "/images/icons/taurus.png", alt: "Taurus Icon", angle: 30 },
//         { src: "/images/icons/gemini.png", alt: "Gemini Icon", angle: 60 },
//         { src: "/images/icons/cancer.png", alt: "Cancer Icon", angle: 90 },
//         { src: "/images/icons/leo.png", alt: "Leo Icon", angle: 120 },
//         { src: "/images/icons/virgo.png", alt: "Virgo Icon", angle: 150 },
//         { src: "/images/icons/libra.png", alt: "Libra Icon", angle: 180 },
//         { src: "/images/icons/scorpio.png", alt: "Scorpio Icon", angle: 210 },
//         { src: "/images/icons/sagittarius.png", alt: "Sagittarius Icon", angle: 240 },
//         { src: "/images/icons/capricorn.png", alt: "Capricorn Icon", angle: 270 },
//         { src: "/images/icons/aquarius.png", alt: "Aquarius Icon", angle: 300 },
//         { src: "/images/icons/pisces.png", alt: "Pisces Icon", angle: 330 },
//     ];

//     return (
//         <>
//             {icons.map(({ src, alt, angle }, index) => {
//                 const radian = (angle * Math.PI) / 180;
//                 const x = centerX + radius * Math.cos(radian);
//                 const y = centerY + radius * Math.sin(radian);

//                 return (
//                     <div
//                         key={index}
//                         style={{
//                             position: "absolute",
//                             left: `${x}px`,
//                             top: `${y}px`,
//                             transform: "translate(-50%, -50%)",
//                             zIndex: 10, // Ensures the icons are above other elements
//                         }}
//                     >
//                         <img src={src} alt={alt} className="h-20 w-20" />
//                     </div>
//                 );
//             })}
//         </>
//     );
// };

export default HomePage;
