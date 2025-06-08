import React from "react";
import FB from "../../img/FBook.png";
import GG from "../../img/GG.png";
import "./register.scss";
import { Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Item from "../../img/picture2.png";
import Bg from "../../img/bg3.png";

function Register() {
  const navigate = useNavigate();

  const handleRegister = async (values) => {
    try {
      values.role = "CUSTOMER";
      // const response = await api.post("register", values);
      // console.log(response);
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="register">
      <div className="register__img">
        <img className="register__bg" src={Bg} alt="" />
        <img className="register__item" src={Item} alt="" />
      </div>

      <section className="register__section">
        <div>
          <Form
            labelCol={{
              span: 24,
            }}
            onFinish={handleRegister}
          >
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
                { required: true, message: "Please input your password!" },
                {
                  min: 3,
                  message: "Password must be at least 3 characters long!",
                },
              ]}
              hasFeedback
            >
              <Input.Password placeholder="••••••••" />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              dependencies={["password"]}
              hasFeedback
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("The two passwords do not match!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password placeholder="••••••••" />
            </Form.Item>

            <div className="register__footer">
              <div className="submit">
                <button className="submit__btn" htmlType="submit">
                  Register
                </button>
              </div>

              <div className="register__divider">
                <div className="border" />
                <h5 style={{ textAlign: "center" }}>Or continue with</h5>
                <div className="border" />
              </div>
            </div>

            <div className="register_button">
              <button>
                <img src={GG} alt="" />
              </button>
              <button>
                <img src={FB} alt="" />
              </button>
            </div>
          </Form>
        </div>

        <div className="register__section__header">
          <h1>Register to create exams now.</h1>
          <p>
            Already have an account yet ? {""}
            <Link
              to="/login"
              style={{
                color: "#4461f2",
                textDecoration: "none",
              }}
            >
              Sign in!
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}

export default Register;
