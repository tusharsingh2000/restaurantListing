import React from "react";
import { useHistory } from "react-router-dom";

export const RestaurantCard = ({ data }) => {
    const history = useHistory();
    return (
        <div style={{ display: "flex", marginTop: "3vh" }} onClick={() => history.push(`/restaurant/${data.restaurant_id}/`, {data : data})} >
            <div style={{ marginRight: "1vw", padding: "2vh", cursor: "pointer" }}>
                {/* image */}
                <img style={{ height: "13vh" }} src={data.images[0].url} alt="img" />
            </div>
            <div style={{ cursor: "pointer" }}>
                {/* details */}
                <div style={{ fontSize: "20px", fontWeight: "700" }}>{data.restaurant_name}</div>
                <div style={{ fontSize: "16px", fontWeight: "500", color: "rgba(210, 210, 210, 1)" }}>Cakes</div>
                <div style={{ fontSize: "16px", fontWeight: "500", color: "rgba(210, 210, 210, 1)" }}>
                    {`${data.location ? (data.location.location_locality ? data.location.location_locality + "," : "") : ""} 
                    ${data.location ? (data.location.city_name ? data.location.city_name + "," : "") : ""} 
                    ${data.location ? (data.location.state_name ? data.location.state_name : "") : ""}`}
                </div>
                <div>4 offers trending</div>
                <div style={{ display: "flex" }}>
                    <div>
                        <div>{data.rating.restaurant_avg_rating}</div>
                        <div style={{ fontSize: "14px", fontWeight: "300", color: "rgba(210, 210, 210, 1)" }}>Popularity</div>
                    </div>
                    <div style={{ paddingLeft: "5vw" }}>
                        <div>{data.currency.symbol}{data.avg_cost_for_two}</div>
                        <div style={{ fontSize: "14px", fontWeight: "300", color: "rgba(210, 210, 210, 1)" }}>Cost for two</div>
                    </div>
                </div>
            </div>
        </div>
    )
}