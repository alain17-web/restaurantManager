import {useState} from "react";

const Notepad = () => {

    const [isValidated, setIsValidated] = useState<boolean>(false);

    const handleValidate = () => {
        setIsValidated(!isValidated);
    }
    return (
        <main
            className={"w-[500px] h-[900px] bg-[url('./img/bloc-notes.png')] bg-no-repeat bg-center bg-cover flex flex-col justify-center items-center ml-20"}>

            {!isValidated ? (
                <div className={"w-full h-auto mt-3 flex flex-col items-center justify-center"}>
                    <h1 className={"text-xl font-inter mt-22"}>Commande n°22 : 6 pers</h1>
                    <h2 className={"text-lg font-inter font-semibold italic"}>Plats :</h2>
                    <p className={'text-base font-inter'}>1 Assiette Artichauts</p>
                    <p className={'text-base font-inter'}>1 Assortiment Mixte Grill</p>
                    <p className={'text-base font-inter'}>1 Plateau végétarien</p>
                    <p className={'text-base font-inter'}>1 Assiette Falafel d'Akko</p>
                    <p className={'text-base font-inter'}>1 Assiette Kebbeh d'Arraba</p>
                    <p className={'text-base font-inter'}>1 Assiette Chich Taouk</p>
                    <h2 className={"text-lg font-inter font-semibold italic"}>Desserts :</h2>
                    <p className={'text-base font-inter'}>2 Aish el saraya</p>
                    <p className={'text-base font-inter'}>2 Baklava</p>
                    <p className={'text-base font-inter'}>1 Namoura</p>
                    <p className={'text-base font-inter'}>1 Chyabat achta</p>
                </div>
            ) : (
                <div className={"w-full h-auto mt-3 flex flex-col items-center justify-center"}>
                    <h2 className={"text-xl text-green-600 font-inter font-semibold italic"}>Commande 22
                        validée</h2>
                    <h2 className={"text-lg font-inter font-semibold italic"}>Pas d'autre commande en attente</h2>
                </div>
            )}
            <button
                className={"w-[80%] mx-auto h-12 px-6 py-auto bg-[#013220] hover:bg-[#6B8E23] text-white text-base font-inter rounded-md cursor-pointer"}
                onClick={handleValidate}
            >
                {!isValidated ? "Valider" : "Reset"}

            </button>
        </main>
    );
};
export default Notepad;