import React, { useState, useEffect, useContext } from "react";
import { Banner } from "../Components/Banner";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";

import Footer from "../Components/Footer";
import bedtimeHero from "../Assets/bedtime.jpg";
import { client } from "../client";
import lang from "../Assets/lang.svg";
import { AuthContext } from "../Context/AuthContext";

const Bedtime = () => {
  const languages = [
    "English",
    "Chinese",
    "Hindi",
    "Japanese",
    "Korean",
    "Russian",
    "Spanish",
  ];

  const [category, setCategory] = useState("Openess");

  const [activeLanguage, setActiveLanguage] = useState("English");

  const [gender, setGender] = useState("Male");

  const [videos, setVideo] = useState([]);

  useEffect(() => {
    client
      .getEntries({
        content_type: "bedtime",
        "fields.language[match]": activeLanguage,
        "fields.category[match]": category,
        "fields.gender[match]": gender,
      })
      .then((res) => {
        console.log(res.items);
        setVideo(res.items);
      });
  }, [activeLanguage, category, gender]);

  //console.log(bedtime);

  const handleLanguageChange = (e) => {
    setActiveLanguage(e.target.value);
  };
  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  function goFullscreen(id) {
    var element = document.getElementById(id);
    if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullScreen) {
      element.webkitRequestFullScreen();
    }
  }

  return (
    <>
      <Banner pic={bedtimeHero} heading="Bedtime" />
      <div className="container">
        <div className="language-section">
          <img src={lang} width="40" height="32" alt="language-svg" />
          <select
            id="exampleFormControlSelect1"
            onChange={handleLanguageChange}
          >
            {languages.map((language, index) => (
              <option name="language" value={language} key={index}>
                {language}
              </option>
            ))}
          </select>
        </div>
        <div style={{ clear: "both" }} className="category-nav">
          <Nav fill variant="pills" defaultActiveKey="#">
            <Nav.Item>
              <Nav.Link href="#" onClick={() => setCategory("Openess")}>
                Openess
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="link-1"
                onClick={() => setCategory("Conscientiousness")}
              >
                Conscientiousness
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="link-2"
                onClick={() => setCategory("Extroversion")}
              >
                Extroversion
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="link-3"
                onClick={() => setCategory("Agreeableness")}
              >
                Agreeableness
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="link-4"
                onClick={() => setCategory("Neuroticism")}
              >
                Neuroticism
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
        <div
          style={{ float: "right", paddingTop: 20 }}
          className="gender"
          onChange={handleGenderChange}
        >
          <select>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="row video-gallery">
          {videos &&
            videos.map((video, index) => {
              const name = video.fields.name;
              const videoUrl = video.fields.video.fields.file.url;
              const thumbnail = video.fields.videoThumbnail.fields.file.url;
              return (
                <div
                  key={index}
                  className="col-sm-4"
                  style={{ paddingTop: 80, clear: "both", cursor: "pointer" }}
                >
                  <div style={{ width: "18rem", textAlign: "center" }}>
                    <video
                      style={{ margin: "auto" }}
                      onClick={() => goFullscreen("player")}
                      id="player"
                      poster={thumbnail}
                      width="256px"
                      height="200px"
                    >
                      <source src={videoUrl} />
                    </video>
                    <p
                      style={{
                        width: "100%",
                        textAlign: "center",
                      }}
                    >
                      {name}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Bedtime;
