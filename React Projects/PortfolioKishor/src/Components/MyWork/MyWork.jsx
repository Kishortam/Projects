import React from "react";
import "./MyWork.css";
import theme_pattern from "../../assets/theme_pattern.svg";
import arrow_icon from "../../assets/arrow_icon.svg";
import music_player from "../../assets/Music_Player.png";
import image_search from "../../assets/Image_Search.png";
import dropdown_menu from "../../assets/DropDown_Menu.png";

const MyWork = () => {
  return (
    <div id="work" className="mywork">
      <div className="title">
        <h1>My Latest Work</h1>
        <img src={theme_pattern} alt="" />
      </div>

      <div className="container">
        <div className="work">
          <img src={music_player} alt="" />
          {/* <!-- when we click on my work cards, the related info will cover that particular card --> */}
          <div className="layer">
            <h3>Social Media App</h3>
            <p>The app connects you to the talented people around the world. download it from play store.</p>
            <a href="#"> <i class="fas fa-external-link-alt"></i></a>
          </div>
        </div>

        <div className="work">
          <img src={image_search} alt="" />
          {/* <!-- when we click on my work cards, the related info will cover that particular card --> */}
          <div className="layer">
            <h3>Social Media App</h3>
            <p>The app connects you to the talented people around the world. download it from play store.</p>
            <a href="#"> <i class="fas fa-external-link-alt"></i></a>
          </div>
        </div>

        <div className="work">
          <img src={dropdown_menu} alt="" />
          {/* <!-- when we click on my work cards, the related info will cover that particular card --> */}
          <div className="layer">
            <h3>Social Media App</h3>
            <p>The app connects you to the talented people around the world. download it from play store.</p>
            <a href="#"> <i class="fas fa-external-link-alt"></i></a>
          </div>
        </div>
      </div>

      <div className="show-more">
        <p>Show More</p>
        <img src={arrow_icon} alt="" />
      </div>
    </div>
  );
};

export default MyWork;
