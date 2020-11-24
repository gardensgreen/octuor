import React from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import MyProfile from "./MyProfile";

export default function ProfilePage() {
    const user = useSelector((state) => {
        return state.session.user;
    });

    const { userId } = useParams();
    console.log(userId);
    console.log(user.id);
    return (
        <div>
            {user.id === parseInt(userId, 10) ? (
                <MyProfile user={user}></MyProfile>
            ) : (
                <div>Not your account</div>
            )}
        </div>
    );
}
