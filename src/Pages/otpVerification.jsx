import React, { useState } from 'react';
import "../Styles/verification.css";
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import ReactCodeInput from "react-verification-code-input";
import { Button, message, Spin } from 'antd';


export const Otpverification = () => {
    const [loading, setLoading] = useState(false);
    const [otp, setOtp] = useState(" ");
    const [error, setError] = useState(false);

    const history = useHistory();
    const { state } = useLocation();
    const { num } = state;
    const clear = () => {
        setOtp(" ")
    }



    const handleSubmit = (otp) => {
        if (otp.length === 6) {
            const data = {
                phone: num,
                otp: otp,
                dial_code: "+91",
            };
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const body = JSON.stringify(data);

            axios
                .post("pwa/user/login", body, config)
                .then(res => {
                    if (res.data.status) {
                        localStorage.setItem("access", res.data.data.token);
                        localStorage.setItem("refresh", res.data.data.refresh);

                        message.success(" Succesfully Logged in")
                        history.push("/home");

                    }
                })
                .catch(err => {
                    console.log(err);
                    clear()
                    setLoading(false);
                    message.error("OTP Entered is Wrong");
                    setError(true);
                })
        }
    }

    return loading ? (
        <div
            style={{
                margin: 0,
                padding: 0,
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#ececec",
            }}
        >
            <Spin tip="Verifying OTP..."></Spin>
        </div>
    )
        :
        (
            <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }} >
                <div style={{ boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.15)", padding: "5vw" }}>
                    <div>
                        <h1>OTP Verification</h1>
                        <p>Enter the otp sent to  <span>{num}</span></p>
                    </div>
                    <div style={{ alignItems: "center" }}  >
                        <ReactCodeInput
                            style={{ background: "black", fontFamily: "Roboto, sans-serif" }}
                            fieldWidth={40}
                            type="number"
                            fields={6}
                            value={otp}
                            onChange={(val) => {
                                handleSubmit(val)
                                setOtp(otp)
                            }}
                            onComplete={() => {
                                setLoading(true)
                            }}

                            loading={loading}
                        />
                        <p style={{ visibility: !error ? "hidden" : "visible", color: "red", paddingTop: "5vh" }} >*Please Enter the correct OTP  </p>

                    </div>

                    <Button loading={loading}
                        onClick={() => {
                            setLoading(true);
                            handleSubmit()
                        }} style={{ color: "#8F99FF", boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.15)", width: "284px", height: "49px", borderRadius: "10px", marginBottom: "5vh" }}>Proceed</Button>

                </div>
            </div>
        )
}