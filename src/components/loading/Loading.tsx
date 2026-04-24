import { motion } from 'framer-motion';

// ─── SUB-COMPONENTS ───

const ConnectingLine = ({ center, currentPath, nextPath, duration, times, index, isDark }: any) => {
  const gap = 1.0;
  const getLineKeyframes = (isPositive: boolean) => {
    const x1: number[] = [], y1: number[] = [], x2: number[] = [], y2: number[] = [];
    currentPath.cx.forEach((_, i: number) => {
      const isChasingPhase = i === 5;
      const isSquarePhase = i === 6;
      const isBurstPhase = i === 7;
      const isStretchPhase = i === 8;
      const isSmallSquarePhase = i === 9;
      const isFinalSpinPhase = i === 10;

      const isPlusPhase = isSquarePhase || isBurstPhase || isStretchPhase;
      const isFinalPhase = isChasingPhase;
      const isRhombusState = (i < 5 && (i % 5 === 0 || i % 5 === 3 || i % 5 === 4)) || isFinalPhase;

      const rawX2 = currentPath.lineCx[i];
      const rawY2 = currentPath.lineCy[i];
      const prevIdx = i > 0 ? i - 1 : 0;
      let rawX1, rawY1;

      if (isFinalSpinPhase) {
        const nextAngleDeg = [0, 90, 180, 270][index];
        const smallSquareR = 14 * 0.9;
        const staticAngle = (nextAngleDeg) * Math.PI / 180;
        rawX1 = center + Math.cos(staticAngle) * smallSquareR;
        rawY1 = center + Math.sin(staticAngle) * smallSquareR;
      } else if (isSmallSquarePhase) {
        rawX1 = nextPath.cx[i];
        rawY1 = nextPath.cy[i];
      } else if (isPlusPhase) {
        rawX1 = center;
        rawY1 = center;
      } else if (isFinalPhase) {
        rawX1 = nextPath.cx[prevIdx];
        rawY1 = nextPath.cy[prevIdx];
      } else if (isRhombusState) {
        rawX1 = nextPath.cx[i];
        rawY1 = nextPath.cy[i];
      } else {
        rawX1 = center;
        rawY1 = center;
      }

      const currentGap = (isPlusPhase || isRhombusState || isSmallSquarePhase || isFinalSpinPhase) ? 0 : gap;
      const angle = Math.atan2(rawY2 - (rawY1 || 50), rawX2 - (rawX1 || 50));
      const perpAngle = angle + Math.PI / 2;
      const dx = Math.cos(perpAngle) * (isPositive ? currentGap : -currentGap);
      const dy = Math.sin(perpAngle) * (isPositive ? currentGap : -currentGap);

      x1.push(rawX1 + dx); y1.push(rawY1 + dy);
      x2.push(rawX2 + dx); y2.push(rawY2 + dy);
    });
    return { x1, y1, x2, y2 };
  };
  const lineA = getLineKeyframes(true);
  const lineB = getLineKeyframes(false);
  return (
    <g key={`line-group-${index}`}>
      {[lineA, lineB].map((l, j) => (
        <motion.line
          key={`line-${index}-${j}`}
          animate={{
            x1: l.x1, y1: l.y1, x2: l.x2, y2: l.y2,
            opacity: currentPath.lineOpacity,
            strokeDasharray: "50",
            strokeDashoffset: currentPath.dashOffset
          }}
          transition={{ duration, repeat: Infinity, times, ease: "easeInOut" }}
          stroke={isDark ? "white" : "black"}
          strokeWidth="0.6" strokeLinecap="round" strokeOpacity="0.7"
        />
      ))}
    </g>
  );
};

const RhombusFill = ({ paths, duration, times, isDark }: any) => {
  const pointsKeyframes = paths[0].cx.map((_: any, i: number) => {
    return paths.map((p: any) => `${p.cx[i]},${p.cy[i]}`).join(" ");
  });
  const opacityKeyframes = paths[0].cx.map((_: any, i: number) => {
    return (i === 3) ? 1 : 0;
  });
  return (
    <motion.polygon
      animate={{ points: pointsKeyframes, opacity: opacityKeyframes }}
      transition={{ duration, repeat: Infinity, times, ease: "easeInOut" }}
      fill={isDark ? "white" : "black"}
    />
  );
};

// ─── MAIN COMPONENT ───

export default function ConnectingLoader() {
  const isDark = false;
  const turnDuration = 0.9;
  const pauseDuration = 0.4;
  const outerPauseDuration = 0.4;
  const rotationDuration = 0.5;
  const squareDuration = 0.5;
  const plusDuration = 0.5;
  const stretchDuration = 0.6;
  const smallSquareDuration = 0.6;
  const finalSpinDuration = 0.6;

  const stepTime = turnDuration + pauseDuration + outerPauseDuration;
  const cycleTime = stepTime;
  const totalDuration = cycleTime + rotationDuration + squareDuration + plusDuration + stretchDuration + smallSquareDuration + finalSpinDuration;
  const center = 50, outerR = 32, squareR = 12, lineBurstR = 35, innerR = 14;

  const generatePath = (startAngleDeg: number) => {
    const cx: number[] = [], cy: number[] = [], lineCx: number[] = [], lineCy: number[] = [];
    const opacity: number[] = [], lineOpacity: number[] = [], dashOffset: number[] = [];

    // 1. Initial Connecting
    const angleStart = (startAngleDeg * Math.PI) / 180;
    const angleMid = (startAngleDeg + 45) * Math.PI / 180;
    const angleEnd = (startAngleDeg + 90) * Math.PI / 180;
    const addPoint = (x: number, y: number, lx: number, ly: number, op: number, lop: number, doff: number) => {
      cx.push(x); cy.push(y); lineCx.push(lx); lineCy.push(ly);
      opacity.push(op); lineOpacity.push(lop); dashOffset.push(doff);
    };
    const startX = center + Math.cos(angleStart) * outerR;
    const startY = center + Math.sin(angleStart) * outerR;
    const midX = center + Math.cos(angleMid) * innerR;
    const midY = center + Math.sin(angleMid) * innerR;
    const endX = center + Math.cos(angleEnd) * outerR;
    const endY = center + Math.sin(angleEnd) * outerR;
    addPoint(startX, startY, startX, startY, 0, 0, 0);
    addPoint(midX, midY, midX, midY, 1, 0, 0);
    addPoint(midX, midY, midX, midY, 1, 1, 0);
    addPoint(endX, endY, endX, endY, 0, 1, 0);
    addPoint(endX, endY, endX, endY, 0, 1, 0);

    // 2. Chasing Phase
    cx.push(endX); cy.push(endY); lineCx.push(endX); lineCy.push(endY);
    opacity.push(0); lineOpacity.push(1); dashOffset.push(50);

    // 3. Square Formation
    const angleSquare = (startAngleDeg + 45) * Math.PI / 180;
    const squareX = center + Math.cos(angleSquare) * squareR;
    const squareY = center + Math.sin(angleSquare) * squareR;
    const anglePlus = (startAngleDeg) * Math.PI / 180;
    const lineBX = center + Math.cos(anglePlus) * lineBurstR;
    const lineBY = center + Math.sin(anglePlus) * lineBurstR;
    cx.push(squareX); cy.push(squareY);
    lineCx.push(lineBX); lineCy.push(lineBY);
    opacity.push(0); lineOpacity.push(0); dashOffset.push(50);

    // 4. Plus Burst
    cx.push(squareX); cy.push(squareY);
    lineCx.push(lineBX); lineCy.push(lineBY);
    opacity.push(1); lineOpacity.push(1); dashOffset.push(0);

    // 5. Rotate + Stretch
    const stretchX = center + Math.cos(angleSquare) * outerR;
    const stretchY = center + Math.sin(angleSquare) * outerR;
    cx.push(stretchX); cy.push(stretchY);
    lineCx.push(lineBX); lineCy.push(lineBY);
    opacity.push(0); lineOpacity.push(1); dashOffset.push(0);

    // 6. Final Small Square Box
    const smallSquareR = innerR * 0.9;
    const finalAngleDots = (startAngleDeg + 45) * Math.PI / 180;
    const finalX = center + Math.cos(finalAngleDots) * smallSquareR;
    const finalY = center + Math.sin(finalAngleDots) * smallSquareR;
    cx.push(finalX); cy.push(finalY);
    lineCx.push(finalX); lineCy.push(finalY);
    opacity.push(0); lineOpacity.push(1); dashOffset.push(0);

    // 7. Final Spin
    const expandR = outerR;
    const angleDots10 = (startAngleDeg + 45) * Math.PI / 180;
    const angleLines10 = (startAngleDeg) * Math.PI / 180;
    cx.push(center + Math.cos(angleDots10) * expandR);
    cy.push(center + Math.sin(angleDots10) * expandR);
    lineCx.push(center + Math.cos(angleLines10) * smallSquareR);
    lineCy.push(center + Math.sin(angleLines10) * smallSquareR);
    opacity.push(0); lineOpacity.push(0); dashOffset.push(50);

    return { cx, cy, lineCx, lineCy, opacity, lineOpacity, dashOffset };
  };

  const times: number[] = [];
  for (let i = 0; i < 1; i++) {
    const base = (i * stepTime) / totalDuration;
    times.push(base);
    times.push(base + (turnDuration / 2) / totalDuration);
    times.push(base + (turnDuration / 2 + pauseDuration) / totalDuration);
    times.push(base + (turnDuration + pauseDuration) / totalDuration);
    times.push(base + stepTime / totalDuration);
  }
  times.push((cycleTime + rotationDuration) / totalDuration);
  times.push((cycleTime + rotationDuration + squareDuration) / totalDuration);
  times.push((cycleTime + rotationDuration + squareDuration + plusDuration) / totalDuration);
  times.push((cycleTime + rotationDuration + squareDuration + plusDuration + stretchDuration) / totalDuration);
  times.push((cycleTime + rotationDuration + squareDuration + plusDuration + stretchDuration + smallSquareDuration) / totalDuration);
  times.push(1.0);

  const angles = [-90, 0, 90, 180];
  const allPaths = angles.map(angle => generatePath(angle));
  const rotationKeyframes = times.map(t => {
    const elapsed = t * totalDuration;
    if (elapsed <= cycleTime) return 0;
    const rotTime = elapsed - cycleTime;
    if (rotTime <= rotationDuration) return (rotTime / rotationDuration) * 90;
    const sqTime = rotTime - rotationDuration;
    if (sqTime <= squareDuration) return 90 + (sqTime / squareDuration) * 90;
    const plTime = sqTime - squareDuration;
    if (plTime <= plusDuration) return 180;
    const stTime = plTime - plusDuration;
    if (stTime <= stretchDuration) return 180 + (stTime / stretchDuration) * 45;
    const smTime = stTime - stretchDuration;
    if (smTime <= smallSquareDuration) return 225 + (smTime / smallSquareDuration) * 45;
    const fsTime = smTime - smallSquareDuration;
    if (fsTime <= finalSpinDuration) return 270 + (fsTime / finalSpinDuration) * 45;
    return 315;
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen overflow-hidden font-sans relative bg-white">
      <div className="relative flex flex-col items-center">
        <div className="relative w-40 h-40 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-full h-full transition-all duration-500 drop-shadow-[0_0_8px_rgba(0,0,0,0.1)]">
            <motion.g animate={{ rotate: rotationKeyframes }} transition={{ duration: totalDuration, repeat: Infinity, times, ease: "easeInOut" }}>
              <RhombusFill paths={allPaths} duration={totalDuration} times={times} isDark={isDark} />
              {allPaths.map((path, i) => (
                <motion.circle key={`dot-${i}`} r="2.5" fill="black" animate={{ cx: path.cx, cy: path.cy }} transition={{ duration: totalDuration, repeat: Infinity, times, ease: "easeInOut" }} />
              ))}
              <circle cx="50" cy="50" r="2.5" fill="black" />
              {allPaths.map((path, i) => (
                <ConnectingLine key={i} center={center} currentPath={path} nextPath={allPaths[(i + 1) % 4]} duration={totalDuration} times={times} index={i} isDark={isDark} />
              ))}
            </motion.g>
          </svg>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 blur-3xl rounded-full pointer-events-none bg-black/5" />
      </div>
    </div>
  );
}






