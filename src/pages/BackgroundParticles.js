import React, { useEffect } from "react";

const BackgroundParticles = () => {
  useEffect(() => {
    const canvas = document.createElement("canvas");
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    const particles = [];

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function createParticle(x, y) {
      const particle = {
        x,
        y,
        size: Math.random() * 5 + 1,
        speedX: Math.random() * 3 - 1.5,
        speedY: Math.random() * 3 - 1.5,
      };
      particles.push(particle);
    }

    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
      particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.fill();
      });
    }

    function updateParticles() {
      particles.forEach((particle, index) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.size > 0.2) particle.size -= 0.1;

        if (particles.size <= 0.2) particles.splice(index, 1);
      });
    }

    function animateParticles() {
      drawParticles();
      updateParticles();
      requestAnimationFrame(animateParticles);
    }

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    window.addEventListener("mousemove", (event) => {
      createParticle(event.x, event.y);
    });

    animateParticles();

    return () => {
      document.body.removeChild(canvas);
      window.removeEventListener("resize", () => {});
      window.removeEventListener("mousemove", () => {});
    };
  }, []);

  return null; // No need to render anything
};

export default BackgroundParticles;
