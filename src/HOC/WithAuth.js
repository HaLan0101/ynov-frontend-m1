import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import userService from '../services/user.service';
const WithAuth = (WrappedComponent) => {
    return () => {
        const router = useRouter();
        const [isLogged, setIsLogged] = useState(false);

        useEffect(() => {
            const token = localStorage.getItem('token');
            userService.getMe(token)
            .then((user) => {
            if (user.type == "OWNER" || user.type == "CUSTOMER" || user.idAmin == true) {
                setIsLogged(true);
            }
            else {
                setIsLogged(false);
                router.push('/login');
            }})

        }, []);
        if (isLogged) {
            return <WrappedComponent/>;
        }
        else {
            return false;
        }
    }
}



export default WithAuth;
