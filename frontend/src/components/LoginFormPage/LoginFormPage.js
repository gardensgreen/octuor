import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import LoginForm from "../LoginFormPage/LoginForm";

const PageContainer = styled.div`
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 400px;
`;

const PageTitle = styled.h1`
    display: inline;
    font-size: 0.7rem;
    margin-top: 40px;
    margin-bottom: -5px;
    color: #f5f7f9;
`;

const SignUpLink = styled(NavLink)`
    color: #9ea5ad;
    margin-bottom: 10px;
    font-size: 0.7rem;
    margin-top: 20px;
`;

export default function LoginFormPage() {
    return (
        <PageContainer>
            <PageTitle>To Continue, log in to Octour.</PageTitle>
            <LoginForm />
            <SignUpLink to="/signup">
                Don't have an account? <u>Click this link.</u>
            </SignUpLink>
        </PageContainer>
    );
}
