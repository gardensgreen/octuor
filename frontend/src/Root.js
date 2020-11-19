import React from "react";

import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage/LoginFormPage";

function Root() {
    return (
        <Switch>
            <Route path="/login">
                <LoginFormPage />
            </Route>
        </Switch>
    );
}

export default Root;
