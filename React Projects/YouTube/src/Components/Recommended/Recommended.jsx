import React, { useEffect, useState } from "react"
import "./recommended.css"
import { API_KEY, val_convertor } from "../../data"
import { Link } from "react-router-dom"

const Recommended = ({categoryId}) => {
  const [apiData, setApiData] = useState([]);

  const fetchData = async () => {
    const relatedVideo_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=IN&videoCategoryId=${categoryId}&key=${API_KEY}`
    await fetch(relatedVideo_url)
      .then((res) => res.json())
      .then((data) => setApiData(data.items));
  }

  // this is related to recommend tab, because of commenting it its runnig succefully
  // but recommended tab is not showing, looking for solution

  // useEffect(() => {
  //   fetchData();
  // },[]);
  

  return (
    <div className="recommended">
      {apiData.map((item, index) => {
        return (
          <Link to={`/video/${item.snippet.categoryId}/${item.id}`} key={index} className="side-video-list">
            <img src={item.snippet.thumbnails.medium.url} alt="" />
            <div className="vid-info">
              <h4>{item.snippet.title}</h4>
              <p>{item.snippet.channelTitle}</p>
              <p>{val_convertor(item.statistics.viewCount)} Views</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Recommended;
