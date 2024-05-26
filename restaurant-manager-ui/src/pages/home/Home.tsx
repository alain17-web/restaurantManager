import BookButton from "../../components/bookButton/BookButton.tsx";
import MenuButton from "../../components/menuButton/MenuButton.tsx";

export const Home = () => {
    return (

        <section className={"w-full h-screen bg-[url('./img/dishes.jpg')] bg-no-repeat bg-center bg-cover flex flex-col items-center"}>
            <div className={"w-[80%] mt-5 flex justify-end"}>
                <BookButton/>
            </div>
            <h1 className={"font-inter text-6xl text-white text-center font-semibold italic pt-[20%]"}>La Branche d'Olivier</h1>
            <MenuButton/>
        </section>

    );
};