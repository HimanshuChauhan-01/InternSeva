import React from 'react'
import "./sugg_card.css"

const Sugg_card = () => {
  return (
    <div>
      <div className="sugg-container">
        <div className="sugg-map">
            <img src="src/assets/in.svg" alt="" />
        </div>

        <div className="sugg-cards">
            {/* card 1 */}
            <div className="card-box">
                <div className="card-img">
                    <img src="src/assets/python.svg" alt="" />
                </div>
                <div className="card-content">
                    <p className="duration">2 Months Internship</p>
                    <h2>Python With AI</h2>
                    <p className="desc">
                        Learn Python fundamentals, AI concepts, and real-world projects 
                        designed to boost your career.
                    </p>
                    <a href="">Know More →</a>
                </div>
            </div>

            {/* card 2 */}
            <div className="card-box">
                <div className="card-img card-img-ai">
                    <img src="src/assets/Artificial-intelligence-Illustration.jpg" alt="" />
                </div>
                <div className="card-content">
                    <p className="duration">2 Months Internship</p>
                    <h2>AI & Machine Learning</h2>
                    <p className="desc">
                        Work on ML models, neural networks, and hands-on AI solutions 
                        with expert guidance.
                    </p>
                    <a href="">Know More →</a>
                </div>
            </div>

            {/* card 3 */}
            <div className="card-box">
                <div className="card-img card-img-web">
                    <img src="src/assets/UI-UX-Vector-Illustration.jpg" alt="" />
                </div>
                <div className="card-content">
                    <p className="duration">2 Months Internship</p>
                    <h2>UI/UX & Web Dev</h2>
                    <p className="desc">
                        Build creative websites and design modern UI/UX layouts 
                        for real-time projects.
                    </p>
                    <a href="">Know More →</a>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Sugg_card
