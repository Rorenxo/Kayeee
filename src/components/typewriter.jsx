import { useEffect, useMemo, useRef, useState } from "react";

export default function TypewriterText({
  lines,
  speed = 55,
  linePause = 700,
  startDelay = 500,
  onDone,
  onLineStart,
  lineStyles = [],
  className = "",
}) {
  const [n, setN] = useState(0);
  const doneRef = useRef(false);
  const onDoneRef = useRef(onDone);
  const onLineStartRef = useRef(onLineStart);
  const lineStartFiredRef = useRef({});
  const { ends, flat, total } = useMemo(() => {
    const lens = lines.map((line) => line.length);
    return {
      total: lens.reduce((sum, length) => sum + length, 0),
      ends: lens.reduce((acc, length) => [...acc, (acc.at(-1) ?? 0) + length], []),
      flat: lines.join(""),
    };
  }, [lines]);

  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    onLineStartRef.current = onLineStart;
  }, [onLineStart]);

  useEffect(() => {
    lineStartFiredRef.current = {};
    doneRef.current = false;
  }, [lines]);

  useEffect(() => {
    lines.forEach((_, i) => {
      const lineOffset = lines.slice(0, i).reduce((sum, currentLine) => sum + currentLine.length, 0);
      if (n >= lineOffset + 1 && !lineStartFiredRef.current[i]) {
        lineStartFiredRef.current[i] = true;
        onLineStartRef.current?.(i);
      }
    });
  }, [n, lines]);


  useEffect(() => {
    if (n >= total) {
      if (!doneRef.current) {
        doneRef.current = true;
        onDoneRef.current?.();
      }
      return;
    }
    let delay = speed;
    if (n === 0) delay = startDelay;
    else if (ends.includes(n)) delay = linePause;
    else {
      if (/[,…]/.test(flat[n - 1])) delay = speed * 4;
    }
    const t = setTimeout(() => setN((v) => v + 1), delay);
    return () => clearTimeout(t);
  }, [ends, flat, linePause, n, speed, startDelay, total]);

  return (
    <div className={className}>
      <span className="sr-only">{lines.join(" ")}</span>
      {lines.map((line, i) => {
        const lineOffset = lines.slice(0, i).reduce((sum, currentLine) => sum + currentLine.length, 0);
        const remaining = n - lineOffset;
        const shown = Math.max(0, Math.min(line.length, remaining));
        return (
          <p key={i} aria-hidden="true" style={lineStyles[i]}>
            <span>{line.slice(0, shown)}</span>
            <span style={{ opacity: 0 }}>{line.slice(shown)}</span>
          </p>
        );
      })}
    </div>
  );
}