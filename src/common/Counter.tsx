import * as React from "react";
import { useState, useEffect } from "react";
import { ids } from "../lib/utils/ids";

export function increment(num: number): number {
  return num + 1;
}

export function Counter() {
  const [count, setCount] = useState(0);

  const generateString1 = () => "1"; // can change this and the state below should stay the same during HMR

  useEffect(() => {
    const interval = setInterval(() => setCount(increment), 500);
    return () => clearInterval(interval);
  }, []);

  console.log(count, generateString1());

  return (
    <span data-test-id={Counter.ids.id}>
      {count} - {generateString1()}
    </span>
  );
}

Counter.ids = ids("counter", []);
