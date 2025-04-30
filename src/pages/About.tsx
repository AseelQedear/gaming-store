import React from 'react';
import '../styles/About.scss';

const About: React.FC = () => {
  return (
    <section className="about-page-section py-5">
      <div className="container text-center" data-aos="fade-up">
        <h2 className="section-title mb-4">🎮 Our Story</h2>

        <p className="about-description lead">
          <strong>Cila</strong> started with a simple dream — a gamer girl who spent hours in pixel worlds,  
          wishing to hold a legendary handheld console of her own.  
          A dreamer who didn't just want to play games — she wanted to live inside them.
        </p>

        <p className="about-description">
          Growing up, gaming wasn’t just a hobby — it was a lifeline.  
          A portal to new worlds, friendships, and adventures.  
          But high-end gaming handhelds? They were rare treasures, almost impossible to get without endless waiting and frustration.
        </p>

        <p className="about-description">
          That's when the idea sparked — what if gamers like me didn’t have to wish anymore?  
          What if the best devices could be right there, ready to power up new adventures?
        </p>

        {/* 🎥 GIF Banner */}
        <div className="gif-banner my-5" data-aos="fade-up">
        <div className="gif-cropper">
          <img src="/media/Kawaii Pixel Cyberpunk Room.gif" alt="Gaming Dreams" className="img-fluid rounded shadow" />
        </div>
        </div>


              {/* 🕹️ Our Journey */}
        <h2 className="section-title mb-4">🕹️ Our Journey</h2>
        <div className="timeline-horizontal" data-aos="fade-up">
          <div className="timeline-track">
            <div className="timeline-event">
              <span className="timeline-year">2005</span>
              <p>First time holding a controller.</p>
            </div>
            <div className="timeline-event">
              <span className="timeline-year">2010</span>
              <p>Dreamed of owning a handheld console.</p>
            </div>
            <div className="timeline-event">
              <span className="timeline-year">2015</span>
              <p>Joined global gaming communities.</p>
            </div>
            <div className="timeline-event">
              <span className="timeline-year">2020</span>
              <p>Realized gamers deserve better access to gear.</p>
            </div>
            <div className="timeline-event">
              <span className="timeline-year">2024</span>
              <p><strong>Cila</strong> was born — for dreamers and players.</p>
            </div>
          </div>
        </div>


        {/* ✨ Mission */}
        <h2 className="section-title mb-4">✨ Our Mission</h2>

        <p className="about-description">
          At <strong>Cila</strong>, we believe every gamer deserves access to the best gear —  
          whether you're conquering kingdoms, racing at light speed, or escaping reality for a while.  
          We’re here to power up your playtime with authentic handhelds that feel like they belong in your story.
        </p>

        <p className="about-description">
          Our mission is simple: to make gaming dreams tangible.  
          No more waiting. No more wondering.  
          Just pure, portable magic — shipped right to your hands.
        </p>

        <div className="fun-fact mt-5">
          🎮 Fun Fact: "Cila" means the spirit of every pixel you ever conquered.
        </div>
      </div>
    </section>
  );
};

export default About;
