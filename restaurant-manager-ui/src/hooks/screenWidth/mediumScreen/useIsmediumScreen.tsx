import {useEffect, useState} from "react";

const useIsMediumScreen = () => {
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

    const isMediumScreen = windowWidth !== null && windowWidth >= 768 && windowWidth < 1280
    return isMediumScreen;
};
export default useIsMediumScreen;