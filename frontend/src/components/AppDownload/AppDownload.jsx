import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/assets/frontend_assets/assets'

const AppDownload = () => {
  return (
    <div className="app-download" id="app-download">
      <div className="app-download-content">

        {/* Text side */}
        <div className="app-download-text">
          <p className="app-download-badge">📱 Mobile App</p>
          <h2>For a Better Experience,<br />Download Our App</h2>
          <p className="app-download-sub">
            Order food faster, track your delivery in real-time,
            and get exclusive app-only deals — all from your phone.
          </p>
          <div className="app-download-buttons">
            <a href="#" className="app-btn" aria-label="Download on the App Store">
              <img src={assets.app_store} alt="Download on the App Store" />
            </a>
            <a href="#" className="app-btn" aria-label="Get it on Google Play">
              <img src={assets.play_store} alt="Get it on Google Play" />
            </a>
          </div>
        </div>

        {/* Visual side */}
        <div className="app-download-visual">
          <div className="app-download-phone">
            <div className="phone-mockup">
              <div className="phone-screen">
                <div className="phone-screen-content">
                  <div className="ps-logo">🍕</div>
                  <div className="ps-title">Foodie.</div>
                  <div className="ps-sub">Order your favourite food</div>
                  <div className="ps-card">
                    <span>🥗</span> Greek Salad — $12
                  </div>
                  <div className="ps-card">
                    <span>🍜</span> Butter Noodles — $14
                  </div>
                  <div className="ps-card">
                    <span>🍰</span> Cup Cake — $10
                  </div>
                  <div className="ps-cta">Order Now →</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default AppDownload