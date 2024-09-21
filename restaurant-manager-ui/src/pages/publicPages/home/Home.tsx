import BookButton from "../../../components/generalComponents/bookButton/BookButton.tsx";
import MenuButton from "../../../components/generalComponents/menuButton/MenuButton.tsx";
import GuestLoginButton from "../../../components/generalComponents/guestLoginButton/GuestLoginButton.tsx";
import useIsLargeScreen from "../../../hooks/screenWidth/largeScreen/useIsLargeScreen.tsx";


export const Home = () => {

    //defines a screen >= 1280px calling a hook
    const isLargeScreen = useIsLargeScreen()

    return (

        <section
            className={"w-full h-screen bg-[url('./img/dishes.jpg')] bg-no-repeat bg-center bg-cover flex flex-col items-center"}>
            <div className={"w-[80%] mt-5 flex justify-end"}>
                <BookButton/>
            </div>
            <h1 className={"font-inter text-6xl text-white text-center font-semibold italic pt-[10%] mb-12"}>La Branche
                d'Olivier</h1>
            <MenuButton/>
            {/* Component rendered if the screen width is 1280px or larger */}
            {isLargeScreen && <GuestLoginButton/>}
        </section>
    );
};