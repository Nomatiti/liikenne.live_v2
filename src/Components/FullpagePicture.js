// import './App.css';
import { ParallaxBanner } from "react-scroll-parallax";

function FullpagePicture() {
    return (
        <ParallaxBanner
            className="your-class"
            layers={[
                {
                    image: 'https://images.unsplash.com/photo-1609342122563-a43ac8917a3a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80',
                    amount: 0.2,
                },
            ]}
            style={{
                height: '100vh',
                clipPath: "polygon(0% 0%, 0% 100%, 45% 100%, 50% 95%, 55% 100%, 100% 100%, 100% 0%)"
            }}
        >
            <h1>Banner Children</h1>
        </ParallaxBanner>
    );
}

export default FullpagePicture;