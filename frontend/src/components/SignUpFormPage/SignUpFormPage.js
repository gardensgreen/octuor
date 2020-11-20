import React from "react";
import styled from "styled-components";

import SignupForm from "../SignUpFormPage/SignUpForm";

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
    font-size: 1.2rem;
    margin-top: 40px;
    margin-bottom: -5px;
    color: #f5f7f9;
`;

export default function SignUpFormPage() {
    return (
        <PageContainer>
            <PageTitle>Sign up for free to start listening.</PageTitle>
            <SignupForm />
        </PageContainer>
    );
}
