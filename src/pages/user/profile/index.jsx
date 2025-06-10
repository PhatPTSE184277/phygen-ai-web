import React, { useState } from "react";
import Dashboard from "../../../components/dashboard";
import "./index.scss";
import Poster from "../../../img/bguser.png";
import axios from "axios";
import { useEffect } from "react";
import Icon from "../../../img/local.png";

function UserProfile() {
  const api = "https://683590cfcd78db2058c23218.mockapi.io/user";

  const [user, setUser] = useState([]);

  const fetchUser = async () => {
    const reponse = await axios.get(api);
    console.log(reponse.data);
    setUser(reponse.data);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Dashboard>
      <section className="user-header">
        <div className="user-header__poster">
          <img src={Poster} alt="" />
        </div>
        <div className="user-header__info">
          <div className="user" style={{ transform: "translate(60px, -70px)" }}>
            <img src={user[0]?.avatar} alt="" />
            <p>Change</p>
          </div>

          <div className="user-header__info__details">
            <h3>{user[0]?.name}</h3>
            <div style={{ display: "flex", gap: "40px" }}>
              <div>
                <p>{user[0]?.school}</p>
              </div>
              <div>
                <p
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <img
                    style={{ width: "14px", height: "16px" }}
                    src={Icon}
                    alt=""
                  />
                  {user[0]?.address}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="profile-detail">
        <div className="profile-detail__info">
          <h4>Personal ID</h4>
          <p> {user[0]?.id}</p>
        </div>
        <div style={{ border: "1px solid #d3d5df", marginTop: "10px" }} />
        <div className="profile-detail__info">
          <h4>User Name</h4>
          <h5>{user[0]?.name}</h5>
          <p>Edit</p>
        </div>
        <div className="profile-detail__info">
          <h4>Email</h4>
          <h5>{user[0]?.email}</h5>
          <p>Edit</p>{" "}
        </div>
        <div className="profile-detail__info">
          <h4>School</h4>
          <h5>{user[0]?.school}</h5>
          <p>Edit</p>{" "}
        </div>
        <div className="profile-detail__info">
          <h4>Address</h4>
          <h5>{user[0]?.address}</h5>
          <p>Edit</p>{" "}
        </div>
        <div className="profile-detail__info">
          <h4>Password</h4>
          <h5>***************</h5>
          <p>Edit</p>{" "}
        </div>
      </section>
    </Dashboard>
  );
}

export default UserProfile;
