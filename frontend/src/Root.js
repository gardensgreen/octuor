import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";

import LoginFormPage from "./components/LoginFormPage/LoginFormPage";
import SignupFormPage from "./components/SignUpFormPage/SignUpFormPage";
import * as sessionActions from "./store/session";

function Root() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    }, [dispatch]);

    return (
        isLoaded && (
            <Switch>
                <Route path="/login">
                    <LoginFormPage />
                </Route>
                <Route path="/signup">
                    <SignupFormPage />
                </Route>
            </Switch>
        )
    );
}

export default Root;
