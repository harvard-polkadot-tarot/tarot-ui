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
        { src: "/images/icons/sagittarius.png", alt: "Sagittarius Icon", angle: 240 },
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

export default CircleAstrologyIcons;
