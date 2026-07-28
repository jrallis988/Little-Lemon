import { useEffect, useRef, useState } from "react";

const TARGET_SCORE = 12;

function createParticle(width) {
  return {
    x: Math.random() * (width - 24) + 12,
    y: -12 - Math.random() * 80,
    r: 5 + Math.random() * 7,
    vy: 1.4 + Math.random() * 1.8,
    vx: (Math.random() - 0.5) * 0.6,
    hue: 160 + Math.random() * 28,
  };
}

export default function FoamDriftGame() {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);
  const stateRef = useRef(null);
  const [score, setScore] = useState(0);
  const [misses, setMisses] = useState(0);
  const [status, setStatus] = useState("ready");
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener?.("change", sync);
    return () => media.removeEventListener?.("change", sync);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return undefined;

    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    const state = {
      running: false,
      width: 0,
      height: 0,
      playerX: 0,
      playerY: 0,
      pointerX: null,
      keys: { left: false, right: false },
      particles: [],
      score: 0,
      misses: 0,
      spawnTimer: 0,
      raf: 0,
      last: 0,
    };
    stateRef.current = state;

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      state.width = Math.max(280, Math.floor(rect.width));
      state.height = Math.max(280, Math.floor(Math.min(420, rect.width * 0.62)));
      canvas.width = state.width * dpr;
      canvas.height = state.height * dpr;
      canvas.style.width = `${state.width}px`;
      canvas.style.height = `${state.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      state.playerY = state.height - 36;
      state.playerX = state.width / 2;
    };

    const resetRound = (keepRunning = true) => {
      state.particles = Array.from({ length: 4 }, () => createParticle(state.width));
      state.score = 0;
      state.misses = 0;
      state.spawnTimer = 0;
      setScore(0);
      setMisses(0);
      setStatus(keepRunning ? "playing" : "ready");
      state.running = keepRunning;
    };

    const drawFrame = () => {
      const { width, height, playerX, playerY, particles } = state;
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "#0a1218");
      gradient.addColorStop(0.55, "#132029");
      gradient.addColorStop(1, "#1c2e3a");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "rgba(62, 207, 190, 0.06)";
      for (let i = 0; i < 18; i += 1) {
        const x = ((i * 97) % width) + (i % 3) * 8;
        const y = ((i * 53) % height) + 10;
        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      particles.forEach((p) => {
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 2.4);
        glow.addColorStop(0, `hsla(${p.hue}, 70%, 68%, 0.95)`);
        glow.addColorStop(1, `hsla(${p.hue}, 70%, 50%, 0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 2.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `hsla(${p.hue}, 72%, 72%, 0.95)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      const paddleGlow = ctx.createRadialGradient(playerX, playerY, 0, playerX, playerY, 42);
      paddleGlow.addColorStop(0, "rgba(127, 227, 213, 0.35)");
      paddleGlow.addColorStop(1, "rgba(127, 227, 213, 0)");
      ctx.fillStyle = paddleGlow;
      ctx.beginPath();
      ctx.arc(playerX, playerY, 42, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#7fe3d5";
      ctx.beginPath();
      const px = playerX - 34;
      const py = playerY - 8;
      const pw = 68;
      const ph = 16;
      const pr = 8;
      ctx.moveTo(px + pr, py);
      ctx.arcTo(px + pw, py, px + pw, py + ph, pr);
      ctx.arcTo(px + pw, py + ph, px, py + ph, pr);
      ctx.arcTo(px, py + ph, px, py, pr);
      ctx.arcTo(px, py, px + pw, py, pr);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#0a1218";
      ctx.beginPath();
      ctx.arc(playerX, playerY, 4, 0, Math.PI * 2);
      ctx.fill();
    };

    const tick = (time) => {
      if (!state.running) return;
      const dt = Math.min(32, time - (state.last || time)) / 16.67;
      state.last = time;

      const speed = 5.2 * dt;
      if (state.keys.left) state.playerX -= speed;
      if (state.keys.right) state.playerX += speed;
      if (state.pointerX != null) {
        state.playerX += (state.pointerX - state.playerX) * 0.22;
      }
      state.playerX = Math.max(34, Math.min(state.width - 34, state.playerX));

      state.spawnTimer += dt;
      if (state.spawnTimer > 28) {
        state.particles.push(createParticle(state.width));
        state.spawnTimer = 0;
      }

      const next = [];
      let scored = false;
      let missed = false;

      state.particles.forEach((p) => {
        p.y += p.vy * dt;
        p.x += p.vx * dt;
        if (p.x < p.r || p.x > state.width - p.r) p.vx *= -1;

        const dx = p.x - state.playerX;
        const dy = p.y - state.playerY;
        const hit = dx * dx + dy * dy < (p.r + 28) * (p.r + 28) && p.y > state.playerY - 18;

        if (hit) {
          scored = true;
          return;
        }
        if (p.y - p.r > state.height) {
          missed = true;
          return;
        }
        next.push(p);
      });

      state.particles = next;
      if (scored) {
        state.score += 1;
        setScore(state.score);
      }
      if (missed) {
        state.misses += 1;
        setMisses(state.misses);
      }

      if (state.score >= TARGET_SCORE) {
        state.running = false;
        setStatus("won");
      } else if (state.misses >= 5) {
        state.running = false;
        setStatus("lost");
      }

      drawFrame();
      if (state.running) state.raf = requestAnimationFrame(tick);
    };

    const onKeyDown = (event) => {
      if (event.key === "ArrowLeft" || event.key === "a" || event.key === "A") {
        state.keys.left = true;
        event.preventDefault();
      }
      if (event.key === "ArrowRight" || event.key === "d" || event.key === "D") {
        state.keys.right = true;
        event.preventDefault();
      }
    };
    const onKeyUp = (event) => {
      if (event.key === "ArrowLeft" || event.key === "a" || event.key === "A") state.keys.left = false;
      if (event.key === "ArrowRight" || event.key === "d" || event.key === "D") state.keys.right = false;
    };
    const pointerPos = (event) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = "touches" in event ? event.touches[0]?.clientX : event.clientX;
      if (clientX == null) return;
      state.pointerX = clientX - rect.left;
    };
    const clearPointer = () => {
      state.pointerX = null;
    };

    resize();
    resetRound(false);
    drawFrame();

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    canvas.addEventListener("pointermove", pointerPos);
    canvas.addEventListener("pointerdown", pointerPos);
    canvas.addEventListener("pointerup", clearPointer);
    canvas.addEventListener("pointerleave", clearPointer);
    canvas.addEventListener("touchmove", pointerPos, { passive: true });

    canvas.__startGame = () => {
      cancelAnimationFrame(state.raf);
      resetRound(true);
      state.last = performance.now();
      state.raf = requestAnimationFrame(tick);
    };

    return () => {
      cancelAnimationFrame(state.raf);
      ro.disconnect();
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      canvas.removeEventListener("pointermove", pointerPos);
      canvas.removeEventListener("pointerdown", pointerPos);
      canvas.removeEventListener("pointerup", clearPointer);
      canvas.removeEventListener("pointerleave", clearPointer);
      canvas.removeEventListener("touchmove", pointerPos);
    };
  }, []);

  const start = () => {
    if (reducedMotion) {
      setStatus("static");
      return;
    }
    canvasRef.current?.__startGame?.();
  };

  return (
    <div className="overflow-hidden rounded-sm border border-sand/15 bg-ink">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-sand/10 px-4 py-3 sm:px-5">
        <div>
          <p className="font-display text-lg font-bold text-chalk">Foam Drift</p>
          <p className="text-sm text-sand/70">Catch drifting foam before it sinks.</p>
        </div>
        <div className="flex gap-4 text-sm text-sand/80">
          <span>
            Score <strong className="text-foam-soft">{score}</strong>/{TARGET_SCORE}
          </span>
          <span>
            Misses <strong className="text-chalk">{misses}</strong>/5
          </span>
        </div>
      </div>

      <div ref={wrapRef} className="relative">
        <canvas
          ref={canvasRef}
          className="block w-full touch-none"
          role="img"
          aria-label="Foam Drift playable demo. Move the paddle to catch falling foam orbs."
        />

        {status !== "playing" && (
          <div className="absolute inset-0 flex items-center justify-center bg-ink/55 p-6 backdrop-blur-[2px]">
            <div className="max-w-sm text-center">
              {status === "ready" && !reducedMotion && (
                <>
                  <p className="font-display text-2xl font-bold text-chalk">Ready to play</p>
                  <p className="mt-2 text-sm text-sand/80">
                    Drag or use ← → / A D. Catch {TARGET_SCORE} orbs.
                  </p>
                </>
              )}
              {reducedMotion && (
                <>
                  <p className="font-display text-2xl font-bold text-chalk">Motion reduced</p>
                  <p className="mt-2 text-sm text-sand/80">
                    The live loop is paused. Enable motion to play, or read the writeup below.
                  </p>
                </>
              )}
              {status === "won" && (
                <>
                  <p className="font-display text-2xl font-bold text-foam-soft">Clear!</p>
                  <p className="mt-2 text-sm text-sand/80">Nice catch pattern. Run it again?</p>
                </>
              )}
              {status === "lost" && (
                <>
                  <p className="font-display text-2xl font-bold text-chalk">Drifted under</p>
                  <p className="mt-2 text-sm text-sand/80">Five misses. Reset and try a tighter lane.</p>
                </>
              )}
              {!reducedMotion && (
                <button type="button" className="btn-primary mt-5" onClick={start}>
                  {status === "ready" ? "Start demo" : "Play again"}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
