import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import ImageScroll from "./components/SplashPage";
import AddImageForm from "./components/AddImagePage";
import ImageDetails from "./components/ImageDetailsPage/ImageDetails";

function App() {
  const dispatch = useDispatch();

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <ImageScroll />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/add-image">
            <AddImageForm />
          </Route>
          <Route exact path="/images/:imageId">
            <ImageDetails />
          </Route>
          <Route>
           Page Not be Found
          </Route>
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;
