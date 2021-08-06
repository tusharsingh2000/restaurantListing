import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { Home } from "./Pages/home";
import { Login } from "./Pages/login";
import { Otpverification } from "./Pages/otpVerification";
import { Restaurant } from "./Pages/singleRestaurant";

export function Routes() {

    return (
        <BrowserRouter>
            <Switch>
                <Route
                    exact
                    path="/"
                    component={Login}
                />
                <Route exact path="/login" component={Login} />
                <Route exact path="/otp" component={Otpverification} />
                <Route exact path="/home" component={Home} />
                <Route exact path="/restaurant/:id/" component={Restaurant} />
            </Switch>
        </BrowserRouter>
    )
}