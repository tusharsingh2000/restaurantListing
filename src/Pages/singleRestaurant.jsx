import React from "react";
import { useLocation } from "react-router-dom";
import logo from "../Assets/Logo.png";

import {
    FacebookIcon,
    FacebookShareButton,
    WhatsappShareButton,
    WhatsappIcon,
} from "react-share";

export const Restaurant = () => {
    const { state } = useLocation();
    return (
        <div>
            <div style={{ padding: "1vh", textAlign: "center" }}>
                <h1>{state.data.restaurant_name}</h1>
            </div>
            <div style={{ padding: "5vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <img style={{ height: "80vh" }} src={state.data.images[0].url} alt="img" />
                <img style={{ height: "50vh", position: "absolute" }} src={logo} alt="logo" />
            </div>
            <div>Share on -</div>
            <>
                <FacebookShareButton
                    url={`${state.data.images[0].url}`}
                    quote={`Check out the picture of ${state.data.restaurant_name} restraunt.`}
                >
                    <FacebookIcon round={true} size={40} />
                </FacebookShareButton>
                <WhatsappShareButton

                    url={`${state.data.images[0].url}`}
                    title={`Check out the picture of ${state.data.restaurant_name} restraunt.`}
                >
                    <WhatsappIcon round={true} size={40} />
                </WhatsappShareButton>
            </>
        </div>
    )

}