import { useState, useEffect, useContext } from 'react';
import PusherContext from 'Contexts/PusherContext';

const getData = (url, callback) => {
  fetch(url)
    .then((res) => res.json())
    .then((res) => callback(res));
};

function usePoll(pollID) {
  const [poll, setPoll] = useState(null);
  const [pusherChannel, setPusherChannel] = useState(null);
  const [subscription, setSubscription] = useState(false);
  const pusherContext = useContext(PusherContext);

  // Fetch our data on hook mount
  useEffect(() => {
    // Intiial call for data
    setPusherChannel(pusherContext.subscribe(pollID));
    getData(`/api/polls/${pollID}`, setPoll);
  }, []);

  // Subscribe to pusher channel is subscription is set to true
  useEffect(() => {
    if (subscription === true) {
      getData(`/api/polls/${pollID}`, setPoll);
      pusherChannel.bind('voted', () => {
        getData(`/api/polls/${pollID}`, setPoll);
      });
    }
  }, [subscription]);

  // Unsubscribe from our pusher channel when unmounting
  useEffect(() => () => {
    pusherContext.unsubscribe(pollID);
  }, []);

  return [poll, setSubscription];
}

export default usePoll;
