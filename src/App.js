import "./App.css";
import Navbar from "./components/Navbar.js";
import grouppic from "./images/lionhack2023_group.jpg";
import { FaInstagram, FaRegCalendarAlt } from "react-icons/fa";
import {useEffect, useState} from 'react';

function App() {

  const [newsData, setNewsData] = useState(null);

  useEffect(() => {
    let isMounted = true;
    fetch("/crypto-panic/api")
    .then(res => res.json())
    .then(data => {
      if (isMounted) {
        setNewsData(data)
      }
    })
    .catch(err => console.log("Cryptopanic error: ", err));
    return () => {
      isMounted = false;
    };
  }, []);

  function convertTime(timeInput) {
    let currentTime = new Date();
    console.log(timeInput);
  }

  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
      </header>
      <div className="hero-wrap">
        <div className="hero">
          <div className="left-hero">
            <h3>Board Members</h3>
            <ul>
              <li>Annika: Co-President</li>
              <li>Jorgen: Co-President</li>
              <li>Anajli: Officer</li>
              <li>Jackie: Officer</li>
              <li>Ahmed: Officer</li>
              <li>Andy: Officer</li>
            </ul>
            <h3>Current Members</h3>
          </div>
          <div className="middle-hero">
            <img
              id="groupPic"
              style={{ width: "100%", margin: "1rem" }}
              src={grouppic}
              alt="group of umn blockchain at lionhack 2023"
            />
            <div className="hero-socials">
              <a
                style={{ color: "black" }}
                href="https://www.instagram.com/umn_blockchain"
              >
                <FaInstagram className="hero-icons" />
              </a>
              <a href="https://discord.com/invite/EeVuh24q8E">
                <button id="discord-button">Join our discord</button>
              </a>
              <a
                style={{ color: "black" }}
                href="https://discord.gg/HYxB7hkrub"
              >
                <FaRegCalendarAlt className="hero-icons" />
              </a>
            </div>
          </div>
          <div className="right-hero">
            <h3>Latest news</h3>
            <div class="news-box">
              <ul>
              {newsData && newsData.results && newsData.results.length > 0 ? (
                newsData.results.map((news, i) => (
                  <li key={i}><a href={news.url}>{news.title}</a><p>{convertTime(news.created_at)}</p></li>
                ))
              ) : (
                <p>Loading...</p>
              )}
              </ul>
            </div>
          </div>
        </div>
        <div class="hero-corner-name">
          <h1>University Of Minnesota Blockchain Club</h1>
        </div>
      </div>
      <div className="about-us" id="aboutUs">
        <h2>Why Blockchain</h2>
        <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
          More About Our Club
        </h2>
        <div className="card-wrap">
          <div className="card">
            <p>
              Blockchain is an emerging field with over 300 million people
              involved in either investing or developing
            </p>
          </div>
          <div className="card">
            <p>
              Great way to network and meet people in the web3 industry as well
              software engineers, lawyers, economists, artists, and more
            </p>
          </div>
          <div className="card">
            <p>
              We meet every wednesday from 7pm-8pm and will also have free food.
              We teach terms and discuss with each other every meeting
            </p>
          </div>
        </div>
        <a href="https://discord.com/invite/EeVuh24q8E">
          <button id="discord-button">View our upcoming</button>
        </a>
      </div>
    </div>
  );
}

export default App;
