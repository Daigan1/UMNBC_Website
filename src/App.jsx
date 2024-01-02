import "./App.css";
import grouppic from "./images/lionhack2023_group.jpg";
import { FaInstagram, FaRegCalendarAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import DiscordMemberList from "./components/DiscordMemberList.jsx";
import NewsList from "./components/NewsList.jsx";
import autoFetch from "./utils/autoFetch.js";
import Layout from "./components/Layout.jsx";
import MoreAboutClub from './components/MoreAboutClub.jsx';
import WeOffer from './components/WeOffer.jsx';

function App() {
  const [newsResults, setNewsResults] = useState(null);
  const [discordMembers, setDiscordMembers] = useState(null);

  useEffect(() => {
    (async () => {
      const [newsData, discordData] = await Promise.all([
        autoFetch("/crypto-panic/api"),
        autoFetch("/discord/api"),
      ]);

      setNewsResults(newsData?.results);
      setDiscordMembers(discordData?.members);
    })().catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <Layout>
      <div className="App">
        <div className="hero-wrap page-wrap">
          <div className="hero">
            <div className="left-hero">
              <DiscordMemberList discordMembers={discordMembers} />
            </div>
            <div className="middle-hero">
              <img
                id="groupPic"
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
              <NewsList newsResults={newsResults} />
            </div>
          </div>
          <div className="hero-corner-name">
            <h1>University Of Minnesota Blockchain Club</h1>
          </div>
        </div>
        <div className="about-us page-wrap" id="aboutUs">
          <h2>Why Blockchain</h2>
          <MoreAboutClub />
        </div>
        <div className="we-offer page-wrap" id="weOffer">
          <h2 style={{ fontSize: "2rem", marginBottom: "1rem"}}>What we offer</h2>
          <WeOffer />
        </div>
        <div className="our-team page-wrap" id="ourTeam">
          <h2 style={{ fontSize: "2rem", marginBottom: "1rem"}}>Meet our team</h2>
        </div>
      </div>
    </Layout>
  );
}

export default App;
