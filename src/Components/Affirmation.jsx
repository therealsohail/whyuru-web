import React, { useEffect, useState } from "react";
import { client } from "../client";

const Affirmation = (props) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    client
      .getEntries({
        content_type: "affirmation",
        "fields.language[match]": props.language,
      })
      .then((res) => {
        setVideos(res.items);
      });
  }, []);

  return (
    <div className="affirmation">
      <div className="affirmation-heading" style={{ marginTop: 80 }}>
        <h3>Affirmation</h3>
      </div>
      <div className="row">
        {videos &&
          videos.map((video, index) => {
            const {
              fields: { title },
            } = video;
            const thumbnailUrl = video.fields.videoThumbnail.fields.file.url;
            const videoUrl = video.fields.video.fields.file.url;

            return (
              <div
                className="col-sm-4"
                style={{ paddingTop: 80, clear: "both", cursor: "pointer" }}
              >
                <div
                  style={{
                    width: "18rem",
                    textAlign: "center",
                  }}
                >
                  <video
                    style={{ margin: "auto" }}
                    onClick={() => props.goFullscreen("player")}
                    id="player"
                    poster={thumbnailUrl}
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
                    {title}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Affirmation;
