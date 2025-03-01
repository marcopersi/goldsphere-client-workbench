import { useState, useEffect } from 'react';

const useCountdown = (initialCountdown, onCountdownEnd) => {
  const [countdown, setCountdown] = useState(initialCountdown);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prevCountdown => {
        if (prevCountdown <= 1) {
          onCountdownEnd();
          return initialCountdown;
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [initialCountdown, onCountdownEnd]);

  return countdown;
};

export default useCountdown;