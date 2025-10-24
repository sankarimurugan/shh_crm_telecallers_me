import React from "react";
import { leedtoggleList } from "../../Data/DummyJson";

const LeedsTab = ({ tabToggle, toggleFun }) => {
  return (
    <div>
      <div className="ac-js d-flex ">
        {leedtoggleList?.map((item) => {
          return (
            <button
              onClick={() => {
                toggleFun(item);
              }}
              className={` ${
                tabToggle?.name === item?.name
                  ? "bg-primary3 white  "
                  : "primary3 bg-transparent "
              }  toggle-btn togbottum `}
            >
              <p className="mb-0">{item?.name}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default LeedsTab;
