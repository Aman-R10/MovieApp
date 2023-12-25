import React from "react";
import "./footer.css";

const Footer = () => {
  const footer = [
    {
      title: "MOVIE APP",
      text: [
        { list: "Home" },
        { list: "Movies" },
        { list: "TV Shows" },
        { list: "Genres" },
      ],
    },
    {
      title: "EXPLORE",
      text: [
        { list: "Top Rated" },
        { list: "Upcoming" },
        { list: "Now Playing" },
        { list: "Trending" },
      ],
    },
    {
      title: "ACCOUNT",
      text: [
        { list: "Profile" },
        { list: "Watchlist" },
        { list: "Settings" },
        { list: "Logout" },
      ],
    },
  ];

  return (
    <footer>
      <div className="container">
        {footer.map((val) => (
          <div className="box" key={val.title}>
            <h3>{val.title}</h3>
            <ul>
              {val.text.map((items, index) => (
                <li key={index}>{items.list}</li>
              ))}
            </ul>
          </div>
        ))}

        <div className="box">

          <div className="logo">
            <h2>Do You Need Help With Anything?</h2>
            <p>
              Receive updates, latest movies and Shows sent straight to
              your inbox every month.
            </p>

            <div className="input flex">
              <input type="text" placeholder="Email Address" />
              <button>Subscribe</button>
            </div>
          </div>

        </div>

      </div>

      <div className="legal">
        <span>© 2023 MovieApp Assignment</span>
      </div>
      
    </footer>
  );
};

export default Footer;
