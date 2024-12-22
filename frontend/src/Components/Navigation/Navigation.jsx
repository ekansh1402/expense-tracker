import React, { useState } from "react";
import styled from "styled-components";
import avatar from "../../img/avatar.png";
import { signoutt } from "../../utils/Icons";
import { menuItems } from "../../utils/menuItems";
import { NavLink } from "react-router-dom";
import { useGlobalContext } from "../../context/globalContext";
import Button from "../Button/Button";
function Navigation() {
  const { user, showPopUp, signOut } = useGlobalContext();
  return (
    <NavStyled>
      <div className="user-con">
        <img src={avatar} alt="" />
        <div className="text">
          <h2>{user}</h2>
          <p>Your Money</p>
        </div>
      </div>
      <ul className="menu-items">
        {menuItems.map((item) => (
          <li key={item.link}>
            <NavLink
              to={item.link}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {item.icon}
              <span>
                <h4>{item.title}</h4>
              </span>
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="bottom-nav">
        <button className="bottom-nav" onClick={signOut}>
          {signoutt}signout
        </button>
      </div>
    </NavStyled>
  );
}

const NavStyled = styled.nav`
  padding: 2rem 1.5rem;
  width: 374px;
  height: 100%;
  background: rgba(252, 246, 249, 0.78);
  border: 3px solid #ffffff;
  backdrop-filter: blur(4.5px);
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;

  .user-con {
    height: 100px;
    display: flex;
    align-items: center;
    gap: 1rem;

    img {
      width: 80px; /* Ensure this size is maintained */
      height: 80px;
      border-radius: 50%; /* Circular image */
      object-fit: cover; /* Maintain aspect ratio and fit the container */
      background: #fcf6f9;
      border: 2px solid #ffffff;
      padding: 0.2rem;
      box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
    }

    h2 {
      color: rgba(34, 34, 96, 1);
    }
    h4,
    p {
      color: rgba(34, 34, 96, 0.6);
    }
  }

  .menu-items {
    flex: 1;
    display: flex;
    flex-direction: column;

    li {
      display: grid;
      grid-template-columns: 40px auto;
      align-items: center;
      margin: 0.6rem 0;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.4s ease-in-out;
      color: rgba(34, 34, 96, 0.6);
      padding-left: 1rem;
      position: relative;

      i {
        color: rgba(34, 34, 96, 0.6);
        font-size: 1.4rem;
        transition: all 0.4s ease-in-out;
      }
    }
  }

  .bottom-nav {
    display: grid;
    grid-template-columns: 40px auto;
    align-items: center;
    margin: 0.6rem 0;
    font-weight: 5000;
    cursor: pointer;
    transition: all 0.4s ease-in-out;
    color: color: rgba(34, 34, 96, .5);
    padding-left: 1rem;
    position: relative;
    background: transparent;
    border: none;
    font-size:1.4rem;
  }

  .active {
    color: rgba(34, 34, 96, 1) !important;

    i {
      color: rgba(34, 34, 96, 1) !important;
    }

    &::before {
      opacity: 1;
    }
  }
`;

export default Navigation;
