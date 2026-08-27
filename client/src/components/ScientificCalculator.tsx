/**
 * Style reminder — Utilitarian Calculation Desk: compact, square controls, navy structure,
 * pale-blue work surface, and instant tactile feedback. Function always leads decoration.
 */
import { useState } from "react";

type ScientificCalculatorProps = {
  compact?: boolean;
};

function formatResult(value: number) {
  if (!Number.isFinite(value)) return "Error";
  return Number.isInteger(value)
    ? value.toString()
    : Number(value.toPrecision(12)).toString();
}

export default function ScientificCalculator({
  compact = false,
}: ScientificCalculatorProps) {
  const [display, setDisplay] = useState("0");
  const [memory, setMemory] = useState(0);
  const [degrees, setDegrees] = useState(true);

  const evaluate = (source = display) => {
    try {
      const safe = source.replace(/×/g, "*").replace(/÷/g, "/");
      if (!/^[0-9+\-*/().\sEe]+$/.test(safe)) throw new Error("Invalid input");
      const value = Function(`"use strict"; return (${safe})`)();
      return typeof value === "number" ? value : NaN;
    } catch {
      return NaN;
    }
  };

  const input = (key: string) => {
    if (key === "AC") return setDisplay("0");
    if (key === "Back") return setDisplay((value) => (value.length <= 1 ? "0" : value.slice(0, -1)));
    if (key === "=") {
      const result = evaluate();
      return setDisplay(formatResult(result));
    }
    if (key === "±") {
      const result = evaluate();
      return setDisplay(formatResult(-result));
    }
    if (key === "M+") {
      const result = evaluate();
      if (Number.isFinite(result)) setMemory((value) => value + result);
      return;
    }
    if (key === "M-") {
      const result = evaluate();
      if (Number.isFinite(result)) setMemory((value) => value - result);
      return;
    }
    if (key === "MR") return setDisplay(formatResult(memory));
    if (key === "RND") {
      const result = evaluate();
      return setDisplay(formatResult(Math.round(result)));
    }
    if (key === "π") return setDisplay((value) => (value === "0" ? "3.141592653589793" : `${value}*3.141592653589793`));
    if (key === "e") return setDisplay((value) => (value === "0" ? "2.718281828459045" : `${value}*2.718281828459045`));
    if (["sin", "cos", "tan", "√", "x²", "x³", "1/x", "n!"].includes(key)) {
      const result = evaluate();
      if (!Number.isFinite(result)) return setDisplay("Error");
      const radians = degrees ? (result * Math.PI) / 180 : result;
      const next =
        key === "sin" ? Math.sin(radians) :
        key === "cos" ? Math.cos(radians) :
        key === "tan" ? Math.tan(radians) :
        key === "√" ? Math.sqrt(result) :
        key === "x²" ? result ** 2 :
        key === "x³" ? result ** 3 :
        key === "1/x" ? 1 / result :
        result < 0 || !Number.isInteger(result) ? NaN : Array.from({ length: result }, (_, i) => i + 1).reduce((a, b) => a * b, 1);
      return setDisplay(formatResult(next));
    }
    if (key === "%") {
      const result = evaluate();
      return setDisplay(formatResult(result / 100));
    }
    if (key === "EXP") return setDisplay((value) => (value === "0" ? "1e" : `${value}e`));
    if (key === "xʸ") return setDisplay((value) => `${value}**`);
    setDisplay((value) => (value === "0" && /[0-9.]/.test(key) ? key : `${value}${key}`));
  };

  const rows = compact
    ? [["sin", "cos", "tan", "π", "e"], ["7", "8", "9", "÷", "Back"], ["4", "5", "6", "×", "x²"], ["1", "2", "3", "-", "√"], ["0", ".", "±", "+", "=" ]]
    : [["sin", "cos", "tan", "π", "e", "xʸ", "x³", "x²"], ["√", "1/x", "%", "n!", "(", ")", "EXP", "Back"], ["7", "8", "9", "÷", "M+"], ["4", "5", "6", "-", "M-"], ["1", "2", "3", "×", "MR"], ["0", ".", "±", "RND", "AC", "+", "="]];

  return (
    <section className={`scientific-shell ${compact ? "scientific-shell--compact" : ""}`} aria-label="Scientific calculator">
      <div className="scientific-display-wrap">
        <input
          aria-label="Calculator display"
          className="scientific-display"
          inputMode="decimal"
          value={display}
          onChange={(event) => setDisplay(event.target.value.replace(/[^0-9+\-*/().Ee×÷\s]/g, ""))}
          onKeyDown={(event) => event.key === "Enter" && input("=")}
        />
        <div className="angle-toggle" aria-label="Angle mode">
          <button className={degrees ? "is-active" : ""} onClick={() => setDegrees(true)}>Deg</button>
          <button className={!degrees ? "is-active" : ""} onClick={() => setDegrees(false)}>Rad</button>
        </div>
      </div>
      <div className="calculator-keys">
        {rows.flat().map((key, index) => (
          <button
            type="button"
            key={`${key}-${index}`}
            className={`calc-key ${["=", "AC"].includes(key) ? "calc-key--accent" : ""} ${["+", "-", "×", "÷"].includes(key) ? "calc-key--operator" : ""}`}
            onClick={() => input(key)}
          >
            {key}
          </button>
        ))}
      </div>
    </section>
  );
}
