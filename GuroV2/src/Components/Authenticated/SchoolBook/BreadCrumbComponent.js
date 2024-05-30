import { Space } from "antd";
import React from "react";
import { useNavigate } from "react-router";

const BreadCrumbComponent = ({ bread = [], params }) => {
  const navigate = useNavigate();
  const excludeWords = ["of", "and", "the", "for", "as", "or", "in"];

  return (
    <div className="flex items-center text-white w-full">
      <Space>
        <div className="flex flex-wrap gap-3">
          {bread.map((b, i) => {
            const formattedLabel = b.label
              .toLowerCase()
              .split(" ")
              .map((word, index) => {
                if (excludeWords.includes(word) && index !== 0) {
                  return word;
                }
                return word.charAt(0).toUpperCase() + word.slice(1);
              })
              .join(" ");

            return (
              <div
                key={i}
                className="cursor-pointer text-sm sm:text-xl "
                onClick={() =>
                  navigate(b.link, {
                    state: {
                      ...params,
                      topicBread: params?.topicBread?.splice(0, i + 1),
                    },
                  })
                }
              >
                {formattedLabel} &nbsp; &gt; &nbsp; {}
              </div>
            );
          })}
        </div>
      </Space>
    </div>
  );
};

export default BreadCrumbComponent;
