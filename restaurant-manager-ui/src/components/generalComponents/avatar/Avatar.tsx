import {useEffect, useState} from "react";
import {AvatarData} from "../../../types/types.ts";


const Avatar = (prop:AvatarData) => {

    const [src, setSrc] = useState<string>('')

    // Define a state to determine whether the role is related to the kitchen
    const [isKitchen,setKitchen] = useState<boolean>(false)

    // useEffect runs whenever the component renders, and it will also re-run
    // when 'prop.roleId' or 'prop.gender' changes
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

    // The component renders an image (avatar) based on the determined src
    // If it's not a kitchen role, the avatar size is 150x150 and fully rounded
    // If it's a kitchen role, the avatar is slightly smaller (120x120) but still rounded
    return (
        <div className={'flex items-center justify-center'}>
            <img src={src} alt={`avatar ${prop.username}`} className={!isKitchen ? "w-[150px] h-[150px] rounded-full" : "w-[120px] h-[120px] rounded-full "}/>
        </div>
    );
};
export default Avatar