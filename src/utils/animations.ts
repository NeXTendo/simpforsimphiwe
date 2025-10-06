import confetti from 'canvas-confetti';
import { gsap } from 'gsap';

export const triggerConfetti = (options?: confetti.Options) => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#EC4899', '#8B5CF6', '#F59E0B', '#EF4444', '#10B981'],
    ...options,
  });
};

export const triggerHeartConfetti = () => {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    colors: ['#EC4899', '#F472B6', '#FBBF24'],
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });

  fire(0.2, {
    spread: 60,
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};

export const animateHeart = (element: HTMLElement) => {
  gsap.fromTo(element, 
    { scale: 1 },
    { 
      scale: 1.2, 
      duration: 0.3, 
      yoyo: true, 
      repeat: 1,
      ease: "power2.out"
    }
  );
};

export const floatingAnimation = (selector: string) => {
  gsap.to(selector, {
    y: "-=20",
    duration: 2,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1,
    stagger: 0.2,
  });
};

export const fadeInUp = (element: HTMLElement, delay = 0) => {
  gsap.fromTo(element,
    { opacity: 0, y: 50 },
    { 
      opacity: 1, 
      y: 0, 
      duration: 1, 
      delay,
      ease: "power3.out" 
    }
  );
};

export const typewriterEffect = (element: HTMLElement, text: string, speed = 50) => {
  let i = 0;
  element.innerHTML = '';
  
  const timer = setInterval(() => {
    element.innerHTML += text.charAt(i);
    i++;
    if (i > text.length - 1) {
      clearInterval(timer);
    }
  }, speed);
};

export const pulseAnimation = (selector: string) => {
  gsap.to(selector, {
    scale: 1.05,
    duration: 1.5,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1,
  });
};