import React, { useEffect, useState } from "react";
import axios from "axios";
import { RestaurantCard } from "../Components/restaurantCard";

export const Home = () => {
    const [restaurantList, setRestaurantList] = useState([]);
    useEffect(() => {

        axios
            .get("m/restaurant?city_id=118&&", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.access,
                },
            })
            .then((res) => {
                console.log(res);
                setRestaurantList(res.data)
            })
    }, [])

    return (
        <div>
            <div style={{ textAlign: "center", fontSize: "7vh" }}>Popular One's</div>
            {
                restaurantList.map((eachItem, index) => (
                    <div key={index}>
                        <RestaurantCard data={eachItem} />
                    </div>
                ))
            }
        </div>
    )
}