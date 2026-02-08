import './App.css';
import { FcDoughnutChart } from "react-icons/fc";
import { FcAcceptDatabase } from "react-icons/fc";
import { CiShare2 } from "react-icons/ci";

import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

function App() {

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <>
      <div className='landing-page'>
        <div className='hero-parent'>

          <div className='hero-heading'>
            <p>Tomorrow's Data Today</p>
          </div>

          <div className='hero-content'>
            <p>Making sporting data analytics more powerful and accessible through advanced technologies. Predictable, reliable and efficient.
              This is how our systems operate to providing you with the best quality
              options in the industry.</p>
          </div>

        </div>
      </div>

      <div className='extra-content'>
        <div className='extra-heading'>
          <h1>{"["}Learn about sports data analytics{"]"}</h1>
          <p>We produce the best and most reliable sporting data in the world. Check out our features on the platform now.</p>
        </div>

        <div className='extra-icons'>
          <div className='icon-item'>
            <FcDoughnutChart size={64} />
            <p>Analytics</p>
          </div>

          <div className='icon-item'>
            <FcAcceptDatabase size={64} />
            <p>Databases</p>
          </div>

          <div className='icon-item'>
            <CiShare2 id='polygon-icon' size={64} />
            <p>Connect</p>
          </div>

        </div>
      </div>

      <div className='slider-content'>
        <div className='slider-text'>
          <h1>Statistics, analysis, details and more</h1>
          <p>As a TeamKeys user you get premium access to highly sensitive data provided through the platform. Browse or edit data and view teams and match trends including scores and other forms of
            metrics.
          </p>
        </div>

        <div className='slider-carousel'>
          <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  height: '21vh',
                  backgroundColor: '#6c757dff',
                  color: 'white',
                  fontSize: '2rem',
                  borderRadius: '1.4rem',
                }}
              >
              </div>
              <Carousel.Caption className='caption-text'>
                <h3>Accuracy</h3>
                <p>Complete data prescriptions for all game matches.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  height: '21vh',
                  backgroundColor: '#6c757d',
                  color: 'white',
                  fontSize: '2rem',
                  borderRadius: '1.4rem',
                }}
              >
              </div>
              <Carousel.Caption className='caption-text'>
                <h3>Highlights</h3>
                <p>Detailed team metrics for every match.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  height: '21vh',
                  backgroundColor: '#6c757d',
                  color: 'white',
                  fontSize: '2rem',
                  borderRadius: '1.4rem',
                }}
              >
              </div>
              <Carousel.Caption className='caption-text'>
                <h3>Versatility</h3>
                <p>Combined performance throughput for all avenues.</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>

      </div>

    </>
  )

}

export default App