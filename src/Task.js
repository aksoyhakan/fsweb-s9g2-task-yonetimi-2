import React from "react";
import {
  differenceInDays,
  formatDistanceToNow,
  differenceInHours,
} from "date-fns";
import styled from "styled-components";

const Task = ({ taskObj, onComplete }) => {
  const deadlineArray = taskObj.deadline.split("-");

  const differenceAbs = differenceInDays(
    new Date(
      Number(deadlineArray[0]),
      Number(deadlineArray[1]) - 1,
      Number(deadlineArray[2])
    ),
    new Date()
  );
  const difference = formatDistanceToNow(
    new Date(
      Number(deadlineArray[0]),
      Number(deadlineArray[1]) - 1,
      Number(deadlineArray[2])
    )
  );

  const differenceHoursAbs = differenceInHours(
    new Date(
      Number(deadlineArray[0]),
      Number(deadlineArray[1]) - 1,
      Number(deadlineArray[2])
    ),
    new Date()
  );

  const SCSpan = styled.span`
    padding: 0.2rem;
    margin-left: 0.2rem;
    border-radius: 25%;
    background-color: ${(props) =>
      props.day < 3 ? "#ffd9d4" : "rgb(130,164,240)"};
  `;

  function determineColor() {
    let colorValue = "bg-[#ffd9d4]";
    let whiteValue = "bg-[#00FFFF]";
    if (differenceAbs < 3) {
      return colorValue;
    }
    return whiteValue;
  }

  return (
    <div
      class
      className="p-4 bg-white rounded-md leading-normal mt-4 shadow-md"
    >
      <h3 className=" text-[#c8781a]">{taskObj.title}</h3>
      <div className="text-xs pt-1">
        son teslim:
        {differenceAbs > 0 && (
          <span
            className={`px-1 py-2 ml-1 rounded-md inline-block ${determineColor()}`}
          >
            {differenceAbs} gün sonra
          </span>
        )}
        {differenceAbs < 0 && (
          <span
            className={`px-1 py-2 ml-1 rounded-md inline-block ${determineColor()}`}
          >
            {-differenceAbs} gün önce
          </span>
        )}
        {differenceAbs == 0 && differenceHoursAbs > 0 && (
          <span
            className={`px-1 py-2 ml-1 rounded-md inline-block ${determineColor()}`}
          >
            yaklaşık {differenceHoursAbs} saat sonra
          </span>
        )}
        {differenceAbs == 0 && differenceHoursAbs < 0 && (
          <span
            className={`px-1 py-2 ml-1 rounded-md inline-block ${determineColor()}`}
          >
            yaklaşık {-differenceHoursAbs} saat önce
          </span>
        )}
      </div>
      <p className="pt-2 pl-0 text-sm text-[#444]">{taskObj.description}</p>
      <div>
        {taskObj.people.map((p) => (
          <span
            className="inline-block py-1 px-4 text-sm border border-solid border-[#ccc] mr-1 my-2 rounded-2xl"
            key={p}
          >
            {p}
          </span>
        ))}
      </div>
      {onComplete && (
        <button
          className="block py-2 px-4 ml-auto bg-[#fecc91] shadow-md rounded border-0 cursor-pointer"
          onClick={() => onComplete(taskObj.id)}
        >
          Tamamlandı
        </button>
      )}
    </div>
  );
};

export default Task;
