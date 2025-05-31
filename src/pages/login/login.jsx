import React from "react";
import LoginHeader from "../../components/login_header/login_header";
import { Link } from "react-router-dom";
import { Button, Form, Input } from "antd";
import "./login.scss"; // Assuming you have a CSS file for styles
import Bg from "../../img/Bg1.png";
import Item from "../../img/Picture.png";
import FB from "../../img/FBook.png";
import GG from "../../img/GG.png";

function Login() {
  return (
    <div className="login">
      <LoginHeader />
      <div className="login__img">
        <img src={Bg} alt="" className="login__bg" />
        <img src={Item} alt="" className="login__item" />
      </div>
      <section className="login__section">
        <div className="login__section__header">
          <h1>Sign In to Create Exam</h1>
          <p>
            if you don’t have account you can{" "}
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
        <div>
          <Form labelCol={{ span: 24 }}>
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your user name!" },
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

            <div className="login_button">
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
