import React from 'react';

const PusherContext = React.createContext();
export const PusherProvider = PusherContext.Provider;
export const PusherConsumer = PusherContext.Consumer;

export default PusherContext;
