import React from "react";
import Dashboard from "../../../components/dashboard";
import { FormOutlined } from "@ant-design/icons";
import "./index.scss";
import { Link } from "react-router-dom";

function GenerateEdit() {
  const questions = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    text: `Question ${i + 1}: ngdaid aihiasd iadisa wueipaquei ijjasjdi`,
    options: ["a. hiahas", "a. hiahas", "a. hiahas", "a. hiahas"],
  }));
  return (
    <Dashboard>
      <div className="exam-container">
        <div className="exam-header">
          <h2>My exam for the adsa ahdiad</h2>
          <Link to="/generate/summary">
            <button className="finish-button">Finish</button>
          </Link>
        </div>

        <div className="exam-body">
          {questions.map((q) => (
            <div className="question-row" key={q.id}>
              <p>{q.text}</p>
              <p className="options">
                {q.options.map((opt, i) => (
                  <div className="option" key={i}>
                    {opt}
                  </div>
                ))}

                <div className="edit-icon">
                  <FormOutlined />
                </div>
              </p>
            </div>
          ))}
        </div>
      </div>
    </Dashboard>
  );
}

export default GenerateEdit;
