import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const WithAuth = (WrappedComponent) => {
    return () => {
        const router = useRouter();
        const [isLogged, setIsLogged] = useState(false);

        useEffect(() => {
            const token = localStorage.getItem('token');
            if (!token) {
                setIsLogged(false);
                router.push('/login');
            }
            else {
                setIsLogged(true)
            }

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
