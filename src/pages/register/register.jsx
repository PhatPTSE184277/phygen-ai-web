import React, { useEffect, useRef, useState } from "react";
import FB from "../../img/FBook.png";
import GG from "../../img/GG.png";
import "./register.scss";
import { Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Item from "../../img/picture2.png";
import Bg from "../../img/bg3.png";
import {
  initRegisterAnimations,
  initRegisterHoverEffects,
} from "./registerAnimation";
import api from "../../config/axios";
import { toast } from "react-toastify";
import { FaCircleNotch } from "react-icons/fa";

function Register() {
  const [loading, setLoading] = useState(false);
  const [showVerifyInput, setShowVerifyInput] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");

  const navigate = useNavigate();
  const [form] = Form.useForm();

  const registerRef = useRef(null);
  const bgRef = useRef(null);
  const itemRef = useRef(null);
  const headerRef = useRef(null);
  const formRef = useRef(null);
  const buttonsRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const refs = { bgRef, itemRef, headerRef, formRef, buttonsRef };
    const tl = initRegisterAnimations(refs);
    const cleanupHover = initRegisterHoverEffects(refs);

    return () => {
      tl.kill();
      cleanupHover();
      document.body.style.overflow = "auto";
    };
  }, []);

  const onFinish = async (values) => {
    setLoading(true);
    if (!showVerifyInput) {
      // First step: Register
      try {
        values.role = "User";
        const response = await api.post("Auth/register", values);

        if (response?.data?.success) {
          toast.success(
            "Registration successful. Please enter the verification code."
          );
          setRegisteredEmail(values.email);
          setShowVerifyInput(true);
        }
      } catch (err) {
        const errorMessage =
          err.response?.data?.error?.[0] || "Registration failed";
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    } else {
      // Second step: Verify
      try {
        const verifyCode = values.verificationCode;
        const response = await api.post("EmailVerification/verify", {
          email: registeredEmail,
          code: verifyCode,
        });

        if (response?.data?.success) {
          toast.success("Verification successful! You can now log in.");
          navigate("/login");
        } else {
          toast.error("Invalid verification code.");
        }
      } catch (err) {
        const errorMessage =
          err.response?.data?.error?.[0] || "Verification failed";
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="register" ref={registerRef}>
      <div className="register__img">
        <img className="register__bg" src={Bg} alt="" ref={bgRef} />
        <img className="register__item" src={Item} alt="" ref={itemRef} />
      </div>

      <section className="register__section">
        <div ref={formRef}>
          <Form
            form={form}
            labelCol={{ span: 24 }}
            onFinish={onFinish}
            disabled={loading}
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your Email!" }]}
            >
              <Input
                placeholder="Enter Email"
                disabled={loading || showVerifyInput}
              />
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
              <Input.Password
                placeholder="••••••••"
                disabled={loading || showVerifyInput}
              />
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
              <Input.Password
                placeholder="••••••••"
                disabled={loading || showVerifyInput}
              />
            </Form.Item>

            {/* Only show this input after successful registration */}
            {showVerifyInput && (
              <Form.Item
                name="verificationCode"
                rules={[
                  {
                    required: true,
                    message: "Please enter the verification code!",
                  },
                ]}
              >
                <Input
                  placeholder="Enter verification code"
                  disabled={loading}
                />
              </Form.Item>
            )}

            <div className="register__footer">
              <div className="submit">
                <button
                  className="submit__btn"
                  htmltype="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="spinner">
                      <FaCircleNotch className="spinner-icon" />
                    </span>
                  ) : showVerifyInput ? (
                    "Verify"
                  ) : (
                    "Register"
                  )}
                </button>
              </div>

              <div className="register__divider">
                <div className="border" />
                <div className="border" />
              </div>
            </div>

            {/* Optional: social buttons (commented out) */}
            {/* <div className="register_button" ref={buttonsRef}>
              <button><img src={GG} alt="" /></button>
              <button><img src={FB} alt="" /></button>
            </div> */}
          </Form>
        </div>

        <div className="register__section__header" ref={headerRef}>
          <h1>Register to create exams now.</h1>
          <p>
            Already have an account?{" "}
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
