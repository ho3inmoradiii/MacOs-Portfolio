import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const FONT_WEIGHTS = {
    subtitle: { min: 100, max: 400, default: 100 },
    title: { min: 400, max: 900, default: 400 },
};

const renderText = (text, className, baseWeight = 400) => {
    return [...text].map((char, i) => (
        <span
            key={i}
            className={className}
            style={{ fontVariationSettings: `'wght' ${baseWeight}` }}
        >
      {char === " " ? "\u00A0" : char}
    </span>
    ));
};

const setupTextHover = (container, type) => {
    if (!container) return;

    const letters = container.querySelectorAll("span");
    const { min, max } = FONT_WEIGHTS[type];

    const animateLetter = (letter, weight, duration = 0.25) => {
        return gsap.to(letter, {
            duration,
            ease: "power2.out",
            fontVariationSettings: `'wght' ${weight}`,
        });
    };

    const handleMouseMove = (e) => {
        const { left } = container.getBoundingClientRect();
        const mouseX = e.clientX - left;

        letters.forEach((letter) => {
            const { left: l, width: w } = letter.getBoundingClientRect();
            const distance = Math.abs(mouseX - (l - left + w / 2));
            const intensity = Math.exp(-(distance ** 2) / 2000);
            const weight = min + (max - min) * intensity;

            animateLetter(letter, weight);
        });
    };

    container.addEventListener("mousemove", handleMouseMove);

    return () => {
        container.removeEventListener("mousemove", handleMouseMove);
    };
};

const Welcome = () => {
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);

    useGSAP(() => {
        const cleanTitle = setupTextHover(titleRef.current, "title");
        const cleanSubtitle = setupTextHover(subtitleRef.current, "subtitle");

        return () => {
            cleanTitle && cleanTitle();
            cleanSubtitle && cleanSubtitle();
        };
    }, []);

    return (
        <section id="welcome">

            <p ref={subtitleRef}>
                {renderText(
                    "Hey I'm Hossein Moradi! Welcome to my",
                    "text-3xl font-georama",
                    100
                )}
            </p>
            <h1 ref={titleRef} className="mt-7">
                {renderText("Portfolio", "text-9xl italic font-georama")}
            </h1>

            <div className="small-screen">
                <p>This portfolio is designed for desktop/tablet screens only.</p>
            </div>
        </section>
    );
};

export default Welcome;
