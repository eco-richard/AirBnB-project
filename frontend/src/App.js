import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from 'react-router-dom';
import Navigation from "./components/Navigation";
import Spots from "./components/Spots";
import SpotShow from "./components/SpotShow";

import * as sessionActions from "./store/session"

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true))
  }, [dispatch]);

  return (
    <>
    <hr />
    <Navigation isLoaded={isLoaded} />
    <hr />
    {isLoaded && ( 
    <Switch>
      <Route exact path="/" component={Spots} />
      <Route exact path="/spots/:spotId" component={SpotShow} />
    </Switch>
    )}
    </>
  );
}

export default App;
