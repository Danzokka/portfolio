"use client";
import { useRef, useEffect } from "react";
import * as THREE from "three";

const GLYPHS = ["{}", "()", "=>", "//", "</>", "fn", "[]", "::", "&&", "null", "true", "const"];

type DotVel = { vx: number; vy: number };

function makeGlyphTexture(glyph: string): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d")!;
  ctx.font = "bold 22px monospace";
  ctx.fillStyle = Math.random() > 0.5 ? "#6C63FF" : "#00D4FF";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.globalAlpha = 0.3;
  ctx.fillText(glyph, 32, 32);
  return new THREE.CanvasTexture(canvas);
}

export default function CodeParticlesBg() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const w = el.clientWidth || 800;
    const h = el.clientHeight || 600;

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100);
    camera.position.z = 5;

    // Dot particles
    const DOT_COUNT = 60;
    const dotPositions = new Float32Array(DOT_COUNT * 3);
    const dotVels: DotVel[] = [];

    for (let i = 0; i < DOT_COUNT; i++) {
      dotPositions[i * 3]     = (Math.random() - 0.5) * 10;
      dotPositions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      dotPositions[i * 3 + 2] = (Math.random() - 0.5) * 4;
      dotVels.push({
        vx: (Math.random() - 0.5) * 0.007,
        vy: (Math.random() - 0.5) * 0.005,
      });
    }

    const dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute("position", new THREE.BufferAttribute(dotPositions, 3));
    const dotMat = new THREE.PointsMaterial({ color: "#1a1a1a", size: 0.05 });
    const dots = new THREE.Points(dotGeo, dotMat);
    scene.add(dots);

    // Glyph sprites
    const sprites: { sprite: THREE.Sprite; vx: number; vy: number }[] = [];
    for (const glyph of GLYPHS) {
      const tex = makeGlyphTexture(glyph);
      const mat = new THREE.SpriteMaterial({ map: tex, transparent: true });
      const sprite = new THREE.Sprite(mat);
      sprite.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 3
      );
      sprite.scale.set(0.55, 0.55, 1);
      scene.add(sprite);
      sprites.push({
        sprite,
        vx: (Math.random() - 0.5) * 0.004,
        vy: (Math.random() - 0.5) * 0.003,
      });
    }

    const BOUNDS = { x: 5.2, y: 4.2 };
    const posAttr = dotGeo.attributes.position as THREE.BufferAttribute;

    let animId: number;
    function animate() {
      animId = requestAnimationFrame(animate);

      for (let i = 0; i < DOT_COUNT; i++) {
        dotPositions[i * 3]     += dotVels[i].vx;
        dotPositions[i * 3 + 1] += dotVels[i].vy;
        if (Math.abs(dotPositions[i * 3]) > BOUNDS.x) {
          dotVels[i].vx *= -1;
          dotPositions[i * 3] = Math.sign(dotPositions[i * 3]) * BOUNDS.x;
        }
        if (Math.abs(dotPositions[i * 3 + 1]) > BOUNDS.y) {
          dotVels[i].vy *= -1;
          dotPositions[i * 3 + 1] = Math.sign(dotPositions[i * 3 + 1]) * BOUNDS.y;
        }
      }
      posAttr.needsUpdate = true;

      for (const s of sprites) {
        s.sprite.position.x += s.vx;
        s.sprite.position.y += s.vy;
        if (Math.abs(s.sprite.position.x) > BOUNDS.x) {
          s.vx *= -1;
          s.sprite.position.x = Math.sign(s.sprite.position.x) * BOUNDS.x;
        }
        if (Math.abs(s.sprite.position.y) > BOUNDS.y) {
          s.vy *= -1;
          s.sprite.position.y = Math.sign(s.sprite.position.y) * BOUNDS.y;
        }
      }

      renderer.render(scene, camera);
    }
    animate();

    return () => {
      cancelAnimationFrame(animId);
      dotGeo.dispose();
      dotMat.dispose();
      for (const s of sprites) {
        s.sprite.material.map?.dispose();
        s.sprite.material.dispose();
      }
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" />;
}
