import React, { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(Draggable);

const CylinderCarousel = () => {
  const containerRef = useRef(null);
  const carouselRef = useRef(null);
  const cardsRef = useRef([]);

  // Mock data for the carousel cards
  const cards = [
    { title: "Revenue Analytics", value: "+127%", color: "#E3F221", type: "graph" },
    { title: "User Growth", value: "14.2k", color: "#5B5F97", type: "stat" },
    { title: "Customer Love", value: "4.9/5", color: "#E3F221", type: "review" },
    { title: "Active Sessions", value: "892", color: "#5B5F97", type: "graph" },
    { title: "Conversion Rate", value: "3.4%", color: "#E3F221", type: "stat" },
    { title: "NPS Score", value: "72", color: "#5B5F97", type: "review" },
    { title: "Churn Rate", value: "-12%", color: "#E3F221", type: "graph" },
    { title: "Team Velocity", value: "High", color: "#5B5F97", type: "stat" },
  ];

  useGSAP(() => {
    const radius = 400; // Radius of the cylinder
    const totalCards = cards.length;
    const angleStep = 360 / totalCards;

    // Position cards in a circle
    cardsRef.current.forEach((card, index) => {
      if (!card) return;
      const angle = index * angleStep;
      gsap.set(card, {
        rotationY: angle,
        z: radius,
        transformOrigin: "50% 50% -400px" // Match radius
      });
    });

    // Auto-rotation animation
    const rotationAnim = gsap.to(carouselRef.current, {
      rotationY: "-=360",
      duration: 40,
      ease: "none",
      repeat: -1
    });

    // Make it draggable
    Draggable.create(carouselRef.current, {
      type: "rotationY",
      inertia: true,
      onPress: () => rotationAnim.pause(),
      onRelease: () => rotationAnim.play(),
      snap: (endValue) => Math.round(endValue / angleStep) * angleStep
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative h-[80vh] bg-white overflow-hidden flex items-center justify-center perspective-1000">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-50 via-white to-white" />
      
      <div className="relative z-10 text-center mb-12 absolute top-10 w-full">
        <h2 className="text-4xl md:text-5xl font-bold text-[#47423D] mb-4 font-heading">
          Platform Insights
        </h2>
        <p className="text-lg text-gray-500">
          Spin to explore real-time metrics
        </p>
      </div>

      <div className="relative w-full max-w-4xl h-[400px] flex items-center justify-center preserve-3d">
        <div 
          ref={carouselRef} 
          className="relative w-[300px] h-[400px] preserve-3d cursor-grab active:cursor-grabbing"
        >
          {cards.map((card, index) => (
            <div
              key={index}
              ref={el => cardsRef.current[index] = el}
              className="absolute top-0 left-0 w-full h-full bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 flex flex-col justify-between backface-visible"
              style={{
                backfaceVisibility: 'hidden' // Hide back of cards for cleaner look
              }}
            >
              {/* Card Content - Simulating Graphs/Reviews */}
              <div className="h-2/3 rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden relative">
                {card.type === 'graph' && (
                  <div className="w-full h-full flex items-end gap-2 p-4">
                    {[40, 70, 50, 90, 60, 80].map((h, i) => (
                      <div key={i} className="flex-1 rounded-t-sm" style={{ height: `${h}%`, backgroundColor: card.color, opacity: 0.6 }} />
                    ))}
                  </div>
                )}
                {card.type === 'stat' && (
                  <div className="text-6xl font-bold" style={{ color: card.color }}>
                    {card.value}
                  </div>
                )}
                {card.type === 'review' && (
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex gap-1">
                      {[1,2,3,4,5].map(i => (
                        <span key={i} className="text-2xl text-[#E3F221]">★</span>
                      ))}
                    </div>
                    <p className="text-sm text-gray-400 italic">"Amazing platform!"</p>
                  </div>
                )}
              </div>

              <div className="text-left">
                <h3 className="text-xl font-bold text-[#47423D]">{card.title}</h3>
                <p className="text-sm text-gray-400">Real-time data</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CylinderCarousel;
