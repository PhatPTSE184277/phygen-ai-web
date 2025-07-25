import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./home.scss";
import Icon from "../../img/Icon.png";
import Icon1 from "../../img/Icon1.png";
import Icon2 from "../../img/Icon2.png";
import Icon3 from "../../img/Icon3.png";
import Icon4 from "../../img/Icon4.png";
import F1 from "../../img/f1.png";
import F2 from "../../img/f2.png";
import F3 from "../../img/f3.png";
import Bg from "../../img/bg.png";
import Left from "../../img/left.png";
import Right from "../../img/right.png";
import Exam from "../../img/Exam.png";
import Whitecheck from "../../img/whitecheck.png";
import Blackcheck from "../../img/blackcheck.png";
import Dot from "../../img/dot.png";
import Wdot from "../../img/wdot.png";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Input, Rate } from "antd";

function HomePage() {
  const api = "https://683590cfcd78db2058c23218.mockapi.io/FB";

  const [feedback, setFeedback] = useState([]);

  const fetchFeedback = async () => {
    const reponse = await axios.get(api);
    console.log(reponse.data);
    setFeedback(reponse.data);
  };

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    fetchFeedback();
    if (
      swiperRef.current &&
      swiperRef.current.params &&
      prevRef.current &&
      nextRef.current
    ) {
      swiperRef.current.params.navigation.prevEl = prevRef.current;
      swiperRef.current.params.navigation.nextEl = nextRef.current;
      swiperRef.current.navigation.destroy();
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, []);
  return (
    <>
      <div className="home__wrapper">
        <section className="home">
          <div className="banner" />
          <div className="banner__trsf" />
          <div className="banner__wrapper">
            <div>
              <h1>Good Morning!</h1>
              <p>Create your exam with Examify!</p>
            </div>
            <div className="banner__content">
              <div className="banner__content__item">
                <img src={Icon} alt="Icon" />
                <div className="banner__content__item__text">
                  <h6>Class</h6>
                  <p>Choose Class</p>
                </div>
              </div>
              <div className="border" />
              <div className="banner__content__item">
                <img src={Icon1} alt="Icon" />
                <div className="banner__content__item__text">
                  <h6>Chapter</h6>
                  <p>Choose Chapter</p>
                </div>
              </div>
              <div className="border" />
              <div className="banner__content__item">
                <img src={Icon2} alt="Icon" />
                <div className="banner__content__item__text">
                  <h6>Quality</h6>
                  <p>Number Question</p>
                </div>
              </div>
              <div className="border" />
              <div className="banner__content__item">
                <img src={Icon3} alt="Icon" />
                <div className="banner__content__item__text">
                  <h6>Matrix</h6>
                  <p>Choose Matrix</p>
                </div>
              </div>
              <img src={Icon4} alt="Icon" />
            </div>
          </div>
        </section>
        <div className="bg">
          <img src={Bg} alt="" />
        </div>

        <section className="first__section">
          <div>
            <h4>WHY CHOOSE US?</h4>
          </div>
          <div className="first__section__wrapper">
            <div className="first__section__wrapper__item">
              <img src={F1} alt="" />
              <div>
                <h6>Competitive Prices</h6>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum
                </p>
              </div>
            </div>
            <div className="first__section__wrapper__item">
              <img src={F2} alt="" />
              <div>
                <h6>Secure Create</h6>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum
                </p>
              </div>
            </div>
            <div className="first__section__wrapper__item">
              <img src={F3} alt="" />
              <div>
                <h6>Easy to Operate</h6>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="second__section">
          <div className="section__wrapper">
            <div className="carousel__header">
              <h4>Testimonials</h4>
              <div className="carousel__navigation">
                <img src={Left} ref={prevRef} className="btn-prev" alt="" />
                <img src={Right} ref={nextRef} className="btn-next" alt="" />
              </div>
            </div>
            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              slidesPerView={3}
              spaceBetween={30}
              loop={true}
              pagination={{ clickable: true }}
              modules={[Navigation, Pagination]}
              className="swipper"
            >
              {feedback.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className="swiper__item_wrapper">
                    <img src={item.avatar} alt="" />
                    <div className="swiper__item_text">
                      <div className="swiper__item_text__header">
                        <h5>{item.name}</h5>
                        <Rate allowHalf disabled defaultValue={item.Rate} />
                      </div>
                      <p>{item.Comment}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>

        <section className="membership">
          <div className="membership__wrapper__header">
            <h1>Customizable plans for everyone</h1>
            <div
              style={{
                border: "4px solid #5932EA",
                borderRadius: "10px",
                width: "50px",
              }}
            />
            <div style={{ textAlign: "center" }}>
              <span>
                With our scalable packages, you can pay for what you need and
                leave out what you don’t. We will grow with you.
              </span>
              <p>Figure out what package is best for you</p>
            </div>
          </div>

          <div className="membership__wrapper">
            <div className="membership__week">
              <div className="membership__header">
                <h4>Week</h4>
                <span>
                  <span
                    style={{
                      color: "#b3b3b3",
                      fontSize: "14px",
                      fontWeight: "400",
                    }}
                  >
                    $
                  </span>{" "}
                  5
                </span>
              </div>
              <div>
                <p>
                  <img src={Blackcheck} alt="" />1 user 1 connected calendar
                </p>
                <p>
                  <img src={Blackcheck} alt="" />
                  Up to 12 responses
                </p>
                <p>
                  <img src={Blackcheck} alt="" />
                  Up to 3 survey results archived
                </p>
                <p>
                  <img src={Blackcheck} alt="" />
                  Knowledge base
                </p>
              </div>
              <div>
                <img src={Dot} alt="" />
              </div>
              <button>Get Premium</button>
            </div>

            <div className="membership__month">
              <div className="membership__header">
                <h4>Month</h4>
                <span>
                  <span
                    style={{
                      color: "#b3b3b3",
                      fontSize: "14px",
                      fontWeight: "400",
                    }}
                  >
                    $
                  </span>{" "}
                  20
                </span>
              </div>
              <div>
                <p>
                  <img src={Whitecheck} alt="" />1 user up to 2 connected
                  calendars
                </p>
                <p>
                  <img src={Whitecheck} alt="" />
                  Up to 50 responses
                </p>
                <p>
                  <img src={Whitecheck} alt="" />
                  Up to 10 survey results archived
                </p>
                <p>
                  <img src={Whitecheck} alt="" />
                  Standard email & chat
                </p>
              </div>
              <div>
                <img src={Wdot} alt="" />
              </div>
              <button>Get Premium</button>
            </div>

            <div className="membership__year">
              <div className="membership__header">
                <h4>Year</h4>
                <span>
                  <span
                    style={{
                      color: "#b3b3b3",
                      fontSize: "14px",
                      fontWeight: "400",
                    }}
                  >
                    $
                  </span>{" "}
                  200
                </span>
              </div>
              <div>
                <p>
                  <img src={Blackcheck} alt="" />
                  Per user in company domain with single calender integrations
                </p>
                <p>
                  <img src={Blackcheck} alt="" />
                  Unlimited responses
                </p>
                <p>
                  <img src={Blackcheck} alt="" />
                  Unlimited survey results archived
                </p>
                <p>
                  <img src={Blackcheck} alt="" />
                  Priority email & chat
                </p>
              </div>
              <div>
                <img src={Dot} alt="" />
              </div>
              <button>Get Premium</button>
            </div>
          </div>
        </section>

        <section className="third__section">
          <div className="third__section__header">
            <img className="bg" src={Bg} alt="" />
            <div className="third__section__wrapper">
              <img src={Exam} alt="" />
              <div className="third__section__wrapper__text">
                <h4>Get special offers, and more from Examify</h4>
                <div className="input__wrapper">
                  <Input type="email" placeholder="Enter your email" />
                  <button>Subscribe</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default HomePage;
