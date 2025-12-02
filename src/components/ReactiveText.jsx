// import {useRef} from "react";

// import {useGSAP} from "@gsap/react";

import { useRef } from "react";
import { gsap } from 'gsap';

const ReactiveText = ({ text }) => {
    const mousePositionRef = useRef({ x: 0, y: 0 });
    const containerRef = useRef(null);

    const handleMouseMove = (event) => {
        const rect = containerRef.current.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        mousePositionRef.current = {
            x: mouseX,
            y: mouseY
        }
        const letters = containerRef.current.querySelectorAll("span");
        letters.forEach(letter => {
            const box = letter.getBoundingClientRect();
            const centerX = box.left - rect.left + box.width / 2;
            const distanceX = Math.abs(centerX - mouseX);
            const maxDistance = 150;
            let intensity = Math.max(0, 1 - distanceX / maxDistance);
            intensity = intensity ** 2;
            const minScale = 1;
            const maxScale = 2;
            const scale = minScale + (maxScale - minScale) * intensity;
            const maxLift = -20;
            const y = maxLift * intensity;
            const minW = 300;
            const maxW = 900;
            const wght = minW + (maxW - minW) * intensity;
            const fontVar = `'wght' ${wght}`;
            const base = 180;
            const target = 255;
            const channel = Math.round(base + (target - base) * intensity);
            const color = `rgb(${channel}, ${channel}, ${channel})`;

            gsap.to(letter, { scale, y, fontVariationSettings: fontVar, color, duration: 0.2,
                ease: "power2.out",
                overwrite: "auto", });
            // letter.style.opacity = intensity;
        })
    };

    const TransformedText = () => {
        return [...text].map((char, i) => (
            <span key={i} className="inline-block">
                { char === " " ? "\u00A0" : char }
            </span>
        ))
    }

    // const squareRef = useRef(null);
    //
    // useGSAP(() => {
    //     gsap.to(squareRef.current, {
    //         opacity: 1,
    //         y: 50,
    //         scale: 0.8,
    //         duration: 1,
    //         ease: 'power1.inOut',
    //         delay: 2,
    //     })
    // },[])

    return (
        <>
            <p className="text-white mb-16"
               ref={containerRef}
               onMouseMove={handleMouseMove}
               style={{
                   border: '1px solid black',
                   padding: '20px',
                   width: 'auto',
                   height: 'auto'
               }}
            >
                <TransformedText />
            </p>
        </>
    )
}

export default ReactiveText;
