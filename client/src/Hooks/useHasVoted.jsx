import { useState, useEffect } from 'react';

function useHasVoted(pollID) {
  const initialHasVoted = () => localStorage.getItem(pollID) !== null
    ? localStorage.getItem(pollID) : false;
  const [hasVoted, setHasVoted] = useState(initialHasVoted);
  useEffect(() => {
    if (hasVoted !== false) {
      localStorage.setItem(pollID, hasVoted);
    }
  }, [hasVoted]);

  return [hasVoted, setHasVoted];
}

export default useHasVoted;
