import { useRef, useState } from "react";
import Poster from "../../../img/bguser.png";
import { useEffect } from "react";
import Icon from "../../../img/local.png";
import api from "../../../config/axios";
import AdminDashboardComponent from "../../../components/admin/dashboard";

function AdminProfile() {
  const [user, setUser] = useState([]);
  const fileInputRef = useRef(null);

  const fetchUser = async () => {
    try {
      const response = await api.get("AccountUser/me");
      console.log(response?.data?.data);
      setUser(response?.data?.data);
    } catch (e) {
      console.log("Error", e);
    }
  };
  const handleUpdate = async (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await api.put("AccountUser/update-avatar", formData);
      console.log(response.data.data);
      fetchUser();
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AdminDashboardComponent>
      <section className="user-header">
        <div className="user-header__poster">
          <img src={Poster} alt="" />
        </div>
        <div className="user-header__info">
          <div className="user" style={{ transform: "translate(60px, -70px)" }}>
            <img src={user?.avatarUrl} alt="" />
            <p
              style={{ cursor: "pointer" }}
              onClick={() => fileInputRef.current.click()}
            >
              Change
            </p>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={(e) => {
                handleUpdate(e.target.files[0]);
              }}
            />
          </div>

          <div className="user-header__info__details">
            <h3>{user?.username}</h3>
            <div style={{ display: "flex", gap: "40px" }}>
              <div>
                <p>{user?.school}</p>
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
                  {user?.address}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="profile-detail">
        <div className="profile-detail__info">
          <h4>Personal ID</h4>
          <h5> {user?.id}</h5>
        </div>
        <div style={{ border: "1px solid #d3d5df", marginTop: "10px" }} />
        <div className="profile-detail__info">
          <h4>User Name</h4>
          <h5>{user?.username}</h5>
          <p>Edit</p>
        </div>
        <div className="profile-detail__info">
          <h4>Email</h4>
          <h5>{user?.email}</h5>
          <p>Edit</p>{" "}
        </div>
        <div className="profile-detail__info">
          <h4>School</h4>
          <h5>{user?.school}</h5>
          <p>Edit</p>{" "}
        </div>
        <div className="profile-detail__info">
          <h4>Address</h4>
          <h5>{user?.address}</h5>
          <p>Edit</p>{" "}
        </div>
        <div className="profile-detail__info">
          <h4>Password</h4>
          <h5>***************</h5>
          <p>Edit</p>{" "}
        </div>
      </section>
    </AdminDashboardComponent>
  );
}

export default AdminProfile;
