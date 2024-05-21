import {useEffect, useState} from "react";

interface Prop {
    username: string
}

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
            <img src={src} alt={`avatar ${prop.username}`} className={!isKitchen ? "w-[150px] h-[150px] rounded-full" : "w-[80px] h-[80px] rounded-full"}/>
        </div>
    );
};
export default Avatar