import React from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import MyProfile from "./MyProfile";

export default function ProfilePage() {
    const user = useSelector((state) => {
        return state.session.user;
    });
    const { userId } = useParams();
    const history = useHistory();

    if (!user) {
        history.push("/login");
        return null;
    } else if (user.id === parseInt(userId, 10)) {
        return <MyProfile user={user}></MyProfile>;
    } else {
        return <div>Not your account</div>;
    }
}
