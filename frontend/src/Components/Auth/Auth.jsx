import React, { useState } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import { AiOutlineClose } from "react-icons/ai";

export const SignInSignUp = ({ setShowPopup }) => {
  const { loginUser, registerUser, error } = useGlobalContext();

  const [isSignUp, setIsSignUp] = useState(false);
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const [signupFormData, setSignupFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();
    loginUser(loginFormData);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    registerUser(signupFormData);
  };

  return (
    <PopupContainer>
      <AuthForm>
        <LeftPanel>
          <h1>{isSignUp ? "Sign Up" : "Sign In"}</h1>
          <form onSubmit={isSignUp ? handleSignup : handleLogin}>
            {isSignUp && (
              <Input
                type="text"
                placeholder="Username"
                value={signupFormData.username}
                onChange={(e) =>
                  setSignupFormData({
                    ...signupFormData,
                    username: e.target.value,
                  })
                }
                required
              />
            )}
            <Input
              type="email"
              placeholder="Email"
              value={isSignUp ? signupFormData.email : loginFormData.email}
              onChange={(e) =>
                isSignUp
                  ? setSignupFormData({
                      ...signupFormData,
                      email: e.target.value,
                    })
                  : setLoginFormData({
                      ...loginFormData,
                      email: e.target.value,
                    })
              }
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={
                isSignUp ? signupFormData.password : loginFormData.password
              }
              onChange={(e) =>
                isSignUp
                  ? setSignupFormData({
                      ...signupFormData,
                      password: e.target.value,
                    })
                  : setLoginFormData({
                      ...loginFormData,
                      password: e.target.value,
                    })
              }
              required
            />
            <Button type="submit">{isSignUp ? "Sign Up" : "Sign In"}</Button>
          </form>
          <ToggleLink onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp
              ? "Already have an account? Sign In"
              : "Don't have an account? Sign Up"}
          </ToggleLink>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </LeftPanel>
      </AuthForm>
    </PopupContainer>
  );
};

const PopupContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999; /* Ensure the popup stays above everything else */
  overflow-y: auto; /* Allow scrolling inside the popup if needed */
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: white;
`;

const AuthForm = styled.div`
  background: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 400px;
`;

const LeftPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    margin-bottom: 20px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background: #007bff;
  border: none;
  color: white;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: #0056b3;
  }
`;

const ToggleLink = styled.p`
  margin-top: 20px;
  color: #007bff;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 10px;
`;
