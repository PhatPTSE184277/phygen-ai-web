import React from "react";
import Dashboard from "../../../components/dashboard";
import "./index.scss";
import Check from "../../../img/check.png"; // Assuming you have a check icon in this path

function Membership() {
  return (
    <Dashboard>
      <div className="membership">
        <div className="membership__header">
          <h1>Choose a Subscription Plan</h1>
          <p>Pick the best option to start generating exams with AI.</p>
        </div>

        <div style={{ display: "flex", justifyContent: "space-around", marginTop: "45px" }}>
          <div className="basic-plan">
            <div>
              <h1>Basic Plan</h1>
              <p>Ideal for new users or light usage</p>
              <span>$0</span>
            </div>
            <div className="basic-plan__content">
              <p>
                <img src={Check} alt="" /> Generate 5 AI-powered exams per month
              </p>
              <p>
                <img src={Check} alt="" />
                Limited question bank access
              </p>
              <p>
                {" "}
                <img src={Check} alt="" /> Store exams for 30 days
              </p>
              <p>
                <img src={Check} alt="" />
                No credit card required to get started
              </p>
            </div>
          </div>

          <div className="basic-plan">
            <div>
              <h1>Premium</h1>
              <p>Unlimited access for serious exam creators</p>
              <span>$10<span style={{fontSize: "16px" } }>/month</span> </span>
            </div>
            <div className="basic-plan__content">
              <p>
                <img src={Check} alt="" /> Unlimited AI-generated exams every
                month
              </p>
              <p>
                <img src={Check} alt="" />
                Full question bank with updates
              </p>
              <p>
                {" "}
                <img src={Check} alt="" /> Custom difficulty & exam formats
              </p>
              <p>
                <img src={Check} alt="" />
                Lifetime exam storage
              </p>
              <p>
                <img src={Check} alt="" />
                Smart auto-grading with feedback
              </p>
            </div>
            <div className="premium-plan__button">
              <button>Choose This Plan</button>
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
  );
}

export default Membership;
