import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./LandingPage/LandingPage";
import LoginFormPage from "./LoginFormPage/LoginFormPage";
import Navigation from "./Navigation";
import SignUpFormPage from "./SignUpFormPage/SignUpFormPage";

export default function Layout({ isLoaded }) {
    return <Navigation isLoaded={isLoaded}></Navigation>;
}
