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

  return (
    <div class className="task">
      <h3>{taskObj.title}</h3>
      <div className="deadline">
        son teslim:
        {differenceAbs > 0 && (
          <SCSpan day={differenceAbs}>{differenceAbs} gün sonra</SCSpan>
        )}
        {differenceAbs < 0 && (
          <SCSpan day={differenceAbs}>{-differenceAbs} gün önce</SCSpan>
        )}
        {differenceAbs == 0 && differenceHoursAbs > 0 && (
          <SCSpan day={differenceAbs}>
            yaklaşık {differenceHoursAbs} saat sonra
          </SCSpan>
        )}
        {differenceAbs == 0 && differenceHoursAbs < 0 && (
          <SCSpan day={differenceAbs}>
            yaklaşık {-differenceHoursAbs} saat önce
          </SCSpan>
        )}
      </div>
      <p>{taskObj.description}</p>
      <div>
        {taskObj.people.map((p) => (
          <span className="pill" key={p}>
            {p}
          </span>
        ))}
      </div>
      {onComplete && (
        <button onClick={() => onComplete(taskObj.id)}>Tamamlandı</button>
      )}
    </div>
  );
};

export default Task;
