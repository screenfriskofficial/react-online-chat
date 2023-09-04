import { useEffect, useState } from "react";
import {onAuthStateChanged,signOut } from 'firebase/auth'
import {auth} from "../firebase.js";
import "firebase/auth";
import {useNavigate} from "react-router-dom";


export const Navbar = () => {
    const navigate = useNavigate()

    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (authUser) => {
            if (authUser) {
                setUser(authUser);
            } else {
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        await signOut(auth).then(() => {
            navigate('/login')
        }).catch((error) => {
            console.log(error)
        });

    };

    return (
        <div className="navbar">
            <span className="logo">Chat</span>
            {user && (
                <div className="user">
                    <img src={user.photoURL} alt="" />
                    <span>{user.displayName}</span>
                    <button onClick={handleLogout}>logout</button>
                </div>
            )}
        </div>
    );
};