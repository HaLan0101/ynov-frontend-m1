import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import userService from '../services/user.service';
const WithAdmin = (WrappedComponent) => {
    return () => {
        const router = useRouter();
        const [isAdmin, setIsAmin] = useState(false);

        useEffect(() => {
            const token = localStorage.getItem('token');
            userService.getMe(token)
            .then((user) => {
            if (user.isAdmin == true) {
                setIsAmin(true);
            }
            else {
                setIsAmin(false);
                router.push('/login');
            }})

        }, []);
        if (isAdmin) {
            return <WrappedComponent/>;
        }
        else {
            return false;
        }
    }
}



export default WithAdmin;
