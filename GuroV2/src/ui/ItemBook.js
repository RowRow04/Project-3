import React from "react";
import book from "../assets/img/book.png";

const ItemBook = ({ item, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="relative w-[352px] hover:scale-105 duration-150 cursor-pointer"
    >
      <div className="absolute w-full h-full flex flex-row items-center justify-center">
        <span className="w-4/5 text-center text-3xl font-medium">
          {item.name}
        </span>
      </div>
      <img className="w-full" alt="book" src={book} />
    </div>
  );
};

export default ItemBook;
