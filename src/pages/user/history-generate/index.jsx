import React from "react";
import Dashboard from "../../../components/dashboard";
import "./index.scss";
import Example from "../../../img/ex.png"; // Assuming you have an example item in this path
import { Button } from "antd";

function HistoryGenerate() {
  return (
    <Dashboard>
      <div className="history-generate">
        <div className="history-generate__header">
          <img src={Example} alt="" />
          <p>View Exam</p>
          <button style={{ marginTop: "auto" }}>View Answer</button>
        </div>

        <div className="history-generate__details">
          <div className="details__item">
            <p>Title</p>
            <span>My exam for the adsa ahdiad</span>
          </div>
          <div className="details__item">
            <p>Grade</p>
            <span>11</span>
          </div>
          <div className="details__item">
            <p>Chapter</p>
            <span>Dao dong co</span>
          </div>
          <div className="details__item">
            <p>Questions</p>
            <span>40</span>
          </div>
          <div className="details__item">
            <p>Level</p>
            <span>Difficult</span>
          </div>
          <div className="details__item">
            <p>Format</p>
            <span>Multiple Choice</span>
          </div>
          <div className="details__item">
            <p>Matrix</p>
            <span>15 minutes</span>
          </div>
        </div>
      </div>
    </Dashboard>
  );
}

export default HistoryGenerate;
