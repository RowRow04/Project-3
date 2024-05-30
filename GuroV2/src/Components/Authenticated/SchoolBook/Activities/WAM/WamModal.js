import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { CloseOutlined } from "@ant-design/icons";
import { baseURL } from "../../../../../constants/constants";

const WamModal = ({ onClose, isOpen }) => {
  const { title, type } = useParams();
  const { modules } = useSelector((state) => state.subjects);
  const [activity, setActivity] = useState(null);

  useEffect(() => {
    const getAct = modules.find(
      (m) => m.activityType === title && type === m.type
    );

    setActivity(getAct?.activity);
  }, [title, modules, type]);

  return (
    <div className="">
      <div
        className={`fixed inset-0 bg-black opacity-60 ${
          isOpen ? "visible" : "hidden"
        }`}
      ></div>
      <div
        className={`fixed inset-0 flex items-center justify-center p-5  z-10 ${
          isOpen ? "visible" : "hidden"
        }`}
      >
        <div className="bg-white border-b-8 border-gray-300 p-5 shadow-lg rounded-lg">
          <div className="flex justify-end items-center w-full p-2 pr-0">
            <button className="flex items-center" onClick={onClose}>
              <CloseOutlined style={{ color: "gray", fontSize: "20px" }} />
            </button>
          </div>
          <h2 className="text-2xl font-bold mb-4">Answer Key</h2>

          <div className="bg-white rounded-md lg:w-[600px] max-h-[600px] relative overflow-auto">
            {/* Close circle button */}
            <div>
              <div className="flex justify-center flex-wrap text-base font-normal ">
                {activity?.choices
                  ?.filter((choice) => choice.isCorrect === 1)
                  .map((choice) => (
                    <div
                      key={choice.choiceId}
                      className="flex justify-center  border-[#AFAEDC] border-4 m-2 rounded-xl"
                    >
                      <div className="flex items-center p-2">
                        <img
                          alt="mc"
                          className="sm:h-36 h-20 w-fit rounded-2xl"
                          src={baseURL + `/${choice.image}`}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WamModal;
