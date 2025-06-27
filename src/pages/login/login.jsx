import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import "./login.scss";
import Bg from "../../img/Bg1.png";
import Item from "../../img/Picture.png";
import FB from "../../img/FBook.png";
import GG from "../../img/GG.png";
import { initLoginAnimations, initHoverEffects } from "./loginAnimation";
import api from "../../config/axios";
import { useDispatch } from "react-redux";
import { login } from "../../redux/features/userSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginRef = useRef(null);
  const bgRef = useRef(null);
  const itemRef = useRef(null);
  const headerRef = useRef(null);
  const formRef = useRef(null);
  const buttonsRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const refs = { bgRef, itemRef, headerRef, formRef, buttonsRef };

    const tl = initLoginAnimations(refs);
    const cleanupHover = initHoverEffects(refs);

    return () => {
      tl.kill();
      cleanupHover();
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleLogin = async (values) => {
    try {
      const response = await api.post("Auth/login", values);
      console.log(response);
      dispatch(login(response.data));
      const token = response.data.data.token;
      const { username, role } = response.data.data.account;
      localStorage.setItem("token", token);
      localStorage.setItem("accountId", username);
      if (role === "User") navigate("/dashboard");
      if (role === "Admin") navigate("/admin/dashboard");
    } catch (err) {
      //   if (err.response?.status === 404) {
      //     console.log("Account not found!");
      //   } else {
      //     console.log("Wrong username or password!");
      //   }
      console.log(err.response?.data);
    }
  };

  return (
    <div className="login" ref={loginRef}>
      <div className="login__img">
        <img src={Bg} alt="" className="login__bg" ref={bgRef} />
        <img src={Item} alt="" className="login__item" ref={itemRef} />
      </div>
      <section className="login__section">
        <div className="login__section__header" ref={headerRef}>
          <h1>Sign In to Create Exam</h1>
          <p>
            if you don't have account you can{" "}
            <Link
              to="/register"
              style={{
                color: "#4461f2",
                textDecoration: "none",
              }}
            >
              Register here!
            </Link>
          </p>
        </div>
        <div ref={formRef}>
          <Form labelCol={{ span: 24 }} onFinish={handleLogin}>
            <Form.Item
              name="identifier"
              rules={[
                {
                  required: true,
                  message: "Please input your user name!",
                },
              ]}
            >
              <Input placeholder="Enter Email" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input password!",
                },
              ]}
            >
              <Input.Password placeholder="••••••••" />
            </Form.Item>

            <div className="login__footer">
              <h5 style={{ textAlign: "end" }}>Recover Password ?</h5>

              <div className="submit">
                <button className="submit__btn" htmlType="submit">
                  Sign In
                </button>
              </div>

              <div className="login__divider">
                <div className="border" />
                <h5 style={{ textAlign: "center" }}>Or continue with</h5>
                <div className="border" />
              </div>
            </div>

            <div className="login_button" ref={buttonsRef}>
              <button>
                <img src={GG} alt="" />
              </button>
              <button>
                <img src={FB} alt="" />
              </button>
            </div>
          </Form>
        </div>
      </section>
    </div>
  );
}

export default Login;
