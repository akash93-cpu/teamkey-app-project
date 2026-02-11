import '../css/about-styles.css';
import bImage from '../assets/about-image-1.svg';
import cImage from '../assets/about-us-image-2.svg';

export default function About() {
    return (
        <>
            <div className="about-main">
                <div className="container-about">
                    <div className="row">
                        <div className="column-66">
                            <h1 className="xlarge-font">
                                <b>The App</b>
                            </h1>

                            <h1
                                className="large-font"
                                style={{ color: "MediumSeaGreen" }}
                            >
                                <b>Why use it?</b>
                            </h1>

                            <p>
                                <span style={{ fontSize: "36px" }}>
                                    Experience next level data analytics
                                </span>{" "}
                                
                            </p>
                            <p style={{ width: '75%' }}>
                                Our own TeamKeys Data app can be used to proficiently enhance the quality of data 
                                obtained through employing a wide range of technological multiplicities quite so as to 
                                provide excellent end-to-end user experiences.  
                            </p>

                        </div>

                        <div className="column-33">
                            <img
                                className="image-about"
                                src={bImage}
                                width="335"
                                height="471"
                                alt="App preview"
                            />
                        </div>
                    </div>
                </div>

                <div
                    className="container-about"
                    style={{ backgroundColor: "#f1f1f1" }}
                >
                    <div className="row">
                        <div className="column-33">
                            <img
                                className="image-about"
                                src={cImage}
                                alt="App"
                                width="335"
                                height="471"
                            />
                        </div>

                        <div className="column-66">
                            <h1 className="xlarge-font">
                                <b>The Company</b>
                            </h1>

                            <h1
                                className="large-font"
                                style={{ color: "red" }}
                            >
                                <b>Our team</b>
                            </h1>

                            <p>
                                <span style={{ fontSize: "24px" }}>
                                    We provide specialized services in computing and other technologies by 
                                    making everything in our workspace available to consumers and businesses 
                                    out there. 
                                </span>{" "}
                            </p>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}