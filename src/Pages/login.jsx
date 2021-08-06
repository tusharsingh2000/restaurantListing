import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'
// import "../Styles/otp.css"
import { Button, Input, message } from 'antd';

export const Login = () => {
    const [num, setNum] = useState('');
    const [previousNum, setPreviousNum] = useState('');
    const [error, seterror] = useState(false);
    const history = useHistory();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (num.length === 10) {
            if (previousNum !== num) {
                setPreviousNum(num)
                const data = {
                    phone: num,
                    dial_code: "+91",

                };
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                    },
                };

                const body = JSON.stringify(data);

                axios
                    .post("pwa/user/register", body, config)
                    .then(res => {
                        if (res.data.status) {
                            message.success("Otp Is sent to your mobile number");
                            history.push('/otp', { num: num })
                        } else {
                            console.log("wrong input");
                            setLoading(false);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        }
        else {
            message.error("Please enter a valid phone number");
            if (num.length < 10 || num.length > 10) {
                seterror(true);
            }
        }

    };

    return (

        <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }} >
            <div style={{ boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.15)", padding: "5vw" }}>
                <div>
                    <h1 >Enter Your mobile <br /> number</h1>
                    <p>We will send you an <span>One Time Password </span> <br /> to this mobile number </p>
                </div>
                <div style={{ alignItems: "center", display: "flex" }}  >
                    <div style={{ background: "#8F99FF", borderRadius: "6px 0px 0px 6px", padding: "12px", color: "#fff" }} >
                        +91
                    </div>
                    <Input type="tel" autoFocus value={num} onPressEnter={() => handleSubmit()} onChange={(e) => { setNum(e.target.value) }}
                        maxLength="10"
                        style={{ height: "50px", borderRadius: "0px 6px 6px 0px", border: "1px solid #E5E5E5" }} />
                </div>

                <p style={{ visibility: !error ? "hidden" : "visible", color: "red", paddingTop: "5vh" }} >*Please Enter Valid Phone number</p>

                <Button loading={loading}
                    onClick={() => {
                        setLoading(true);
                        handleSubmit()
                    }} style={{ color: "#8F99FF", boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.15)", width: "284px", height: "49px", borderRadius: "10px", marginBottom: "5vh" }}>Get OTP</Button>

            </div>
        </div>
    );
}
