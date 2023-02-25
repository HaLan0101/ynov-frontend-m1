import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import userService from '../services/user.service';
const WithOwner = (WrappedComponent) => {
    return () => {
        const router = useRouter();
        const [isOwner, setIsOwner] = useState(false);

        useEffect(() => {
            const token = localStorage.getItem('token');
            userService.getMe(token)
            .then((user) => {
            if (user.type == "CUSTOMER") {
                setIsOwner(false);
                router.push('/login');
            }
            else {
                setIsOwner(true)
            }})

        }, []);
        if (isOwner) {
            return <WrappedComponent/>;
        }
        else {
            return false;
        }
    }
}



export default WithOwner;
