import * as React from "react";
import { useState, useEffect } from "react";

export function Counter() {
  const [count, setCount] = useState(0);

  const generateString1 = () => "1"; // can change this and the state below should stay the same during HMR

  useEffect(() => {
    const interval = setInterval(() => setCount(prev => prev + 1), 500);
    return () => clearInterval(interval);
  }, []);

  console.log(count, generateString1());

  return (
    <span>
      {count} - {generateString1()}
    </span>
  );
}
