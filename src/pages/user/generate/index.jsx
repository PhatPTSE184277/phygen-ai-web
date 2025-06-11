import React from "react";
import Dashboard from "../../../components/dashboard";
import { Button, Dropdown, Input, InputNumber } from "antd";
import { DownOutlined } from "@ant-design/icons";
import "./index.scss";
import TextArea from "antd/es/input/TextArea";
import Star from "../../../img/star.png"; // Assuming you have a star icon in this path

function Generate() {
  const items = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          1st menu item
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          2nd menu item
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          3rd menu item
        </a>
      ),
    },
  ];
  const onChange = (value) => {
    console.log("changed", value);
  };
  return (
    <Dashboard>
      <div className="generate">
        <div>
          <div className="generate__item">
            <h2>Grade:</h2>
            <Dropdown menu={{ items }} placement="bottom">
              <Button style={{ width: "178px", height: "48px" }}>
                11 <DownOutlined />
              </Button>
            </Dropdown>
            <h2>Chapter:</h2>
            <Dropdown menu={{ items }} placement="bottom">
              <Button style={{ width: "178px", height: "48px" }}>
                Dao động cơ <DownOutlined />
              </Button>
            </Dropdown>
          </div>
          <div className="generate__item">
            <h2>Question:</h2>
            <InputNumber
              min={1}
              max={50}
              defaultValue={20}
              onChange={onChange}
              className="inputnumber"
            />
            <h2>Level:</h2>
            <Dropdown menu={{ items }} placement="bottom">
              <Button style={{ width: "178px", height: "48px" }}>
                Difficult <DownOutlined />
              </Button>
            </Dropdown>
          </div>
          <div className="generate__item">
            <h2>Format:</h2>
            <Dropdown menu={{ items }} placement="bottom">
              <Button style={{ width: "178px", height: "48px" }}>
                Multiple Choice <DownOutlined />
              </Button>
            </Dropdown>
            <h2>Matrix:</h2>
            <Dropdown menu={{ items }} placement="bottom">
              <Button style={{ width: "178px", height: "48px" }}>
                15 minutes <DownOutlined />
              </Button>
            </Dropdown>
          </div>
          <div className="generate__item">
            <h2>Title:</h2>
            <TextArea className="inputnumber" rows={4} />
            <h2>Variants:</h2>
            <InputNumber
              className="inputnumber"
              min={1}
              max={50}
              defaultValue={4}
              onChange={onChange}
            />
          </div>
        </div>

        <div className="generate__button">
          <button>
            <img src={Star} alt="" />
            Generate Exam
          </button>
        </div>
      </div>
    </Dashboard>
  );
}

export default Generate;
