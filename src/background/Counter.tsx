import * as React from "react";
import { useState, useEffect } from "react";

export function Counter() {
  const [count, setCount] = useState(0);

  const generateString1 = () => "1";
  const generateString2 = () => "1";

  useEffect(() => {
    const interval = setInterval(() => setCount(prev => prev + 1), 500);
    return () => clearInterval(interval);
  }, []);

  console.log("render!", count, generateString1(), generateString2());

  return (
    <span>
      {count} - {generateString1()} - {generateString2()}
    </span>
  );
}
