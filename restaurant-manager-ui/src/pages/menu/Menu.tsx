import Navbar from "../../components/navbar/Navbar.tsx";


export const Menu = () => {
    return (
        <div className={"w-full h-screen bg-no-repeat bg-center bg-cover"}
             style={{backgroundImage: `url('./img/scenery.jpg')`}}>
            <Navbar/>

        </div>
    );
};