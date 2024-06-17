import {useEffect, useState} from "react";

interface Prop {
    username: string | null
}

//TEMPORARY
const Avatar = (prop:Prop) => {

    const [src, setSrc] = useState<string>('./img/waitress.jpeg')
    const [isKitchen,setKitchen] = useState<boolean>(false)

    useEffect(() => {
        if(prop.username === "liam"){
            setSrc('./img/waiter.jpg')
        }

        if(prop.username === "basile" || prop.username === "arnaud"){
            setSrc('./img/chef.jpg.avif')
            setKitchen(true)
        }

        if(prop.username === "julie" || prop.username === "alicia"){
            setSrc('./img/cheffe.jpg')
            setKitchen(true)
        }


    })

    return (
        <div className={'flex items-center justify-center'}>
            <img src={src} alt={`avatar ${prop.username}`} className={!isKitchen ? "w-[150px] h-[150px] rounded-full" : "w-[120px] h-[120px] rounded-full "}/>
        </div>
    );
};
export default Avatar