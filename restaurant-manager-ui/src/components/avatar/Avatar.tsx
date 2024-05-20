import {useEffect, useState} from "react";

interface Prop {
    username: string
}

const Avatar = (prop:Prop) => {

    const [src, setSrc] = useState<string>('./img/waitress.jpeg')

    useEffect(() => {
        if(prop.username === "liam"){
            setSrc('./img/waiter.jpg')
        }
    })

    return (
        <div className={'flex items-center justify-center'}>
            <img src={src} alt={`avatar ${prop.username}`} className={"w-[150px] h-[150px] rounded-full"}/>
        </div>
    );
};
export default Avatar