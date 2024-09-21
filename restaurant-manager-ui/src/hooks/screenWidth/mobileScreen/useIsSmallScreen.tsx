import {useEffect, useState} from "react";

const useIsSmallScreen = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth !== undefined ? window.innerWidth : null);

    // Use useEffect to listen to window resize event
    useEffect(() => {
        // Function to update the window width state
        const handleResize = () => setWindowWidth(window.innerWidth);

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Cleanup the event listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isSmallScreen = windowWidth !== null && windowWidth >= 360 && windowWidth < 820
    return isSmallScreen;
};
export default useIsSmallScreen;