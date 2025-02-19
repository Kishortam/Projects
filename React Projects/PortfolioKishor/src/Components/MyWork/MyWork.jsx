import React from "react";
import "./MyWork.css";
import theme_pattern from "../../assets/theme_pattern.svg";
import arrow_icon from "../../assets/arrow_icon.svg";
import image_search from "../../assets/Image_Search.png";
import Netflix_home from "../../assets/Netflix_homescreen.png";
import Github_home from "../../assets/Github_homescreen.png";
import Twitter_home from "../../assets/Twitter_homescreen.png";
import YT from "../../assets/YT1.png";
import portfolio from "../../assets/portfolio.png";

const MyWork = () => {
  return (
    <div id="work" className="mywork">
      <div className="title">
        <h1>My Latest Work</h1>
        <img src={theme_pattern} alt="" />
      </div>

      <div className="container">
        <div className="work">
          <img src={Twitter_home} alt="" />
          {/* <!-- when we click on my work cards, the related info will cover that particular card --> */}
          <div className="layer">
            <h3>Twitter</h3>
            <p>This X (or Twitter) clone, built using the MERN stack, enables users to create, like, and delete posts, as well as follow other users. <br /> Visit App Now. </p>
            <a href="https://twitter-clone-eugj.onrender.com/" target="_blank"><i class="fas fa-external-link-alt"></i></a>
          </div>
        </div>

        <div className="work">
          <img src={Github_home} alt="" />
          {/* <!-- when we click on my work cards, the related info will cover that particular card --> */}
          <div className="layer">
            <h3>Github</h3>
            <p>This GitHub clone app, built with the MERN stack, allows users to view their own and other users' GitHub repositories after logging in. <br /> Visit App Now. </p>
            <a href="https://github-app-o8fq.onrender.com/" target="_blank"> <i class="fas fa-external-link-alt"></i></a>
          </div>
        </div>

        <div className="work">
          <img src={Netflix_home} alt="" />
          {/* <!-- when we click on my work cards, the related info will cover that particular card --> */}
          <div className="layer">
            <h3>Netflix</h3>
            <p>The Netflix app, built using full-stack technology, lets you stream movies and TV shows across a variety of genres. <br /> Visit App Now.</p>
            <a href="https://netflix-clone-s7qv.onrender.com/" target="_blank"> <i class="fas fa-external-link-alt"></i></a>
          </div>
        </div>

        <div className="work">
          <img src={YT} alt="" />
          {/* <!-- when we click on my work cards, the related info will cover that particular card --> */}
          <div className="layer">
            <h3>Youtube</h3>
            <p>This YouTube clone app is built using ReactJS. <br /> Visit App Now.</p>
            <a href="https://youtube-react-s5sb.onrender.com" target="_blank"> <i class="fas fa-external-link-alt"></i></a>
          </div>
        </div>

        <div className="work">
          <img src={portfolio} alt="" />
          {/* <!-- when we click on my work cards, the related info will cover that particular card --> */}
          <div className="layer">
            <h3>Portfolio</h3>
            <p>This portfolio website, built with React, serves as a comprehensive introduction to my skills, projects and experience. <br /> Visit App Now.</p>
            <a href="https://portfolio-kishor.onrender.com" target="_blank"> <i class="fas fa-external-link-alt"></i></a>
          </div>
        </div>

        <div className="work">
          <img src={image_search} alt="" />
          {/* <!-- when we click on my work cards, the related info will cover that particular card --> */}
          <div className="layer">
            <h3>Image Search</h3>
            <p>This JavaScript-powered app lets you search for images online. <br /> Visit App Now.</p>
            <a href="https://github.com/Kishortam/Projects/tree/main/JS%20Projects/Image%20Search%20Engine" target="_blank"> <i class="fas fa-external-link-alt"></i></a>
          </div>
        </div>
      </div>

      <div className="show-more">
        <p><a href="https://github.com/Kishortam/Projects" target="_blank">Show More</a></p>
        <img src={arrow_icon} alt="" />
      </div>
    </div>
  );
};

export default MyWork;
