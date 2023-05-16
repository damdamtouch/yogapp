//import React from 'react'
// import { IconFacebook } from "/src/assets/icons/facebook.svg";
// import { ReactComponent as IconTwitter } from "/src/assets/icons/twitter.svg";
// import { ReactComponent as IconGithub } from "/src/assets/icons/github.svg";
import "./UnderConstruction.css";
function UnderContruction() {
  return (
    <div className="card">
      <div className="header">
        <div className="logo">
          <a href=".">YogApp</a>
        </div>
        <div className="social">
          <a
            href="https://facebook.com"
            title="Facebook"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* <IconFacebook className="icon" /> */}
          </a>
          <a
            href="https://twitter.com"
            title="Twitter"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* <IconTwitter className="icon" /> */}
          </a>
          <a
            href="https://github.com/arkn98/coming-soon"
            title="GitHub"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* <IconGithub className="icon" /> */}
          </a>
        </div>
      </div>
      <div className="content">
        <div className="title-holder">
          <h1>Get ready for the change.</h1>
          <p>
            Website coming soon. Please check back to know more. Shoot us an
            email if you're curious.
          </p>
        </div>
        <a href="mailto:damdam@example.com">
          <div className="cta">Send me an email</div>
        </a>
      </div>
      <div className="footer"></div>
    </div>
  );
}

export default UnderContruction;
