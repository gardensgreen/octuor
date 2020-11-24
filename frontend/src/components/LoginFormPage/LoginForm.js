import React, { useState } from "react";
import * as sessionActions from "../../store/session";

import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const DemoLoginContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const DividerContainer = styled.div`
    width: 400px;
    margin-top: 20px;
    margin-bottom: -10px;
`;

const DemoButton = styled.button`
    margin-top: 20px;
    background-color: #00a3bf;
    border: 0px;
    width: 400px;
    height: 33.33px;
    letter-spacing: 0.1rem;
    color: #f5f7f9;
    border-radius: 50px;
    box-shadow: rgba(149, 157, 165, 0.15) 0px 8px 24px;
    font-size: 0.7rem;
    font-weight: bold;
`;

const Divider = styled.div`
    border-top: 1px solid #9ea5ad;
    display: block;
    line-height: 1px;
    margin: 15px 0;
    position: relative;
    text-align: center;
`;

const DividerTitle = styled.strong`
    background-color: #323f4b;
    font-size: 12px;
    letter-spacing: 1px;
    padding: 0 20px;
    color: #9ea5ad;
    text-transform: uppercase;
`;

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
`;

const InputContainer = styled.label`
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
`;

const LabelSpan = styled.span`
    color: #9ea5ad;
    margin-bottom: 10px;
    font-size: 0.7rem;
`;

const Input = styled.input`
    width: 400px;
    background-color: #52606d;
    border: 0.5px solid #616e7c;
    height: 33.33px;
    border-radius: 3px;
    box-shadow: rgba(149, 157, 165, 0.15) 0px 8px 24px;
`;

const LogInButton = styled.button`
    margin-top: 20px;
    background-color: #c054eb;
    border: 0px;
    height: 33.33px;
    letter-spacing: 0.1rem;
    color: #f5f7f9;
    border-radius: 50px;
    box-shadow: rgba(149, 157, 165, 0.15) 0px 8px 24px;
    font-size: 0.7rem;
    font-weight: bold;
`;

function LoginForm() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(
            sessionActions.loginUser({ credential, password })
        ).catch((res) => {
            console.log(res);
            if (res.data && res.data.errors) setErrors(res.data.errors);
        });
    };

    const loginDemo = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(
            sessionActions.loginUser({
                credential: "demo@user.io",
                password: "password",
            })
        ).catch((res) => {
            if (res.data && res.data.errors) setErrors(res.data.errors);
        });
    };

    return (
        <>
            <DemoLoginContainer>
                <DemoButton onClick={loginDemo}>LOG IN AS DEMO USER</DemoButton>
            </DemoLoginContainer>
            <DividerContainer>
                <Divider>
                    <DividerTitle>OR</DividerTitle>
                </Divider>
            </DividerContainer>
            <StyledForm onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <InputContainer>
                    <LabelSpan>Email Address or Username</LabelSpan>
                    <Input
                        type="text"
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                        required
                    />
                </InputContainer>
                <InputContainer>
                    <LabelSpan>Password</LabelSpan>
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </InputContainer>
                <LogInButton type="submit">LOG IN</LogInButton>
            </StyledForm>
        </>
    );
}

export default LoginForm;
