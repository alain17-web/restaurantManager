import {useEffect, useState} from "react";

interface Prop {
    username: string | null
    gender?: string | null
    roleId?: number | null
}


const Avatar = (prop:Prop) => {

    const [src, setSrc] = useState<string>('')
    const [isKitchen,setKitchen] = useState<boolean>(false)

    useEffect(() => {
        if(prop.roleId === 2 && prop.gender === "F"){
            setSrc('./img/waitress.jpeg')
        }

        if(prop.roleId === 2 && prop.gender === "M"){
            setSrc('./img/waiter.jpg')
        }

        if(prop.roleId === 9 && prop.gender === "M"){
            setSrc('./img/chef.jpg.avif')
            setKitchen(true)
        }

        if(prop.roleId === 9 && prop.gender === "F"){
            setSrc('./img/cheffe.jpg')
            setKitchen(true)
        }

        if(prop.roleId === 10 && prop.gender === "autre"){
            setSrc('./img/guest.png')
            setKitchen(true)
        }

    },[prop.roleId, prop.gender])



    return (
        <div className={'flex items-center justify-center'}>
            <img src={src} alt={`avatar ${prop.username}`} className={!isKitchen ? "w-[150px] h-[150px] rounded-full" : "w-[120px] h-[120px] rounded-full "}/>
        </div>
    );
};
export default Avatar