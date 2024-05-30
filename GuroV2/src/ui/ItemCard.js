import React from "react";
import "tw-elements";
import placeholder from "../assets/img/placeholder.png";
import { baseURL } from "../constants/constants";

const ItemCard = ({ item, onClick }) => {
  return (
    <div
      className="flex flex-col  rounded-xl items-center shadow-lg relative mb-8  duration-150 cursor-pointer"
      onClick={onClick}
    >
      <img
        className=" w-full object-contain"
        src={
          !!item.image
            ? item.image[0] === "/"
              ? item.image
              : baseURL + `/${item.image}`
            : placeholder
        }
        alt={item.name}
      />
    </div>
  );
};

export default ItemCard;
