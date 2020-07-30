import React, { useState, useEffect, useContext } from "react";
import { Banner } from "../Components/Banner";
import { Link, Redirect } from "react-router-dom";

import Footer from "../Components/Footer";
import bedtimeHero from "../Assets/bedtime.jpg";
import { client } from "../client";
import lang from "../Assets/lang.svg";
import {AuthContext } from "../Context/AuthContext"

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
        <nav className="nav nav-pills nav-fill">
          <Link
            onClick={() => setCategory("Openess")}
            className="cat-nav nav-item nav-link active"
          >
            Openess
          </Link>
          <Link
            onClick={() => setCategory("Conscientiosness")}
            className="cat-nav nav-item nav-link"
          >
            Conscientiosness
          </Link>
          <Link
            onClick={() => setCategory("Extroversion")}
            className="cat-nav nav-item nav-link"
          >
            Extroversion
          </Link>
          <Link
            onClick={() => setCategory("Agreeableness")}
            className="cat-nav nav-item nav-link"
          >
            Agreeableness
          </Link>
          <Link
            onClick={() => setCategory("Neuroticism")}
            className="cat-nav nav-item nav-link"
          >
            Neuroticism
          </Link>
        </nav>
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
