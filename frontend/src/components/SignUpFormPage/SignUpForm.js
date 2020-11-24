import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import styled from "styled-components";

import * as sessionActions from "../../store/session";

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
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
        rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
        rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
`;

const SignupButton = styled.button`
    margin-top: 20px;
    background-color: #c054eb;
    border: 0px;
    height: 33.33px;
    letter-spacing: 0.1rem;
    color: #f5f7f9;
    border-radius: 50px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
        rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
        rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    font-size: 0.7rem;
    font-weight: bold;
`;

function SignupForm() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/home" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(
                sessionActions.signup({ email, username, password })
            ).catch((res) => {
                if (res.data && res.data.errors) setErrors(res.data.errors);
            });
        }
        return setErrors([
            "Confirm Password field must be the same as the Password field",
        ]);
    };

    return (
        <StyledForm onSubmit={handleSubmit}>
            <ul>
                {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
            </ul>
            <InputContainer>
                <LabelSpan>Email</LabelSpan>
                <Input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </InputContainer>
            <InputContainer>
                <LabelSpan>Username</LabelSpan>
                <Input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
            <InputContainer>
                <LabelSpan>Confirm Password</LabelSpan>
                <Input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
            </InputContainer>
            <SignupButton type="submit">SIGN UP</SignupButton>
        </StyledForm>
    );
}

export default SignupForm;
