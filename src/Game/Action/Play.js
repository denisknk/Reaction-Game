import React, { useState } from "react";
import "./Action.css";
import PropTypes from "prop-types";
import {
  updateScore,
  endTimeCount,
  getAverageReactionTime,
  handleTimeout,
} from "../../services/all";

const Play = ({ column, changeLevel, timeOut }) => {
  const randomNumber = () => {
    return Math.floor(Math.random() * column) + 1;
  };
  const createRandom = () => {
    let rand1 = randomNumber();
    let rand2 = randomNumber();
    if (rand1 !== lastRandomNumber[0] && rand2 !== lastRandomNumber[1]) {
      setLastRandomNumber([rand1, rand2]);
      return [rand1, rand2];
    }
    createRandom();
  };
  const [check, setCheck] = useState(false);
  const [lastRandomNumber, setLastRandomNumber] = useState([
    randomNumber(),
    randomNumber(),
  ]);
  let arr1 = [];
  let arr2 = []; // двумерный массив
  arr1.length = column;
  arr1.fill(1);
  arr2.length = column;
  arr2.fill(1);
  const style = { backgroundColor: "rgb(74, 222, 155)" };
  // const  = () => {

  // }
  const onClick = (val) => {
    // if (reactionTime > minReactionTime) {
    //   changeLevel(column - 2, "end");
    //   return;
    // }
    endTimeCount();
    // console.log("we're here", val);
    if (val) {
      handleTimeout(changeLevel, timeOut);
      // console.log("were here");
      updateScore(); // добавляем балл за правильно нажатый квадратик
      setCheck(true); // сравнить рандомы тут, иметь переменную в которой хранить прошлое значение квадратика
    } else {
      console.log(false);
      getAverageReactionTime();
      changeLevel(column - 2, "end");
    }
  };
  if (check) {
    createRandom();
    setCheck(false);
  }
  // логика должна остатьтся максимально до рендера
  // чекать время в сервисе и счет тоже, история,

  return (
    <table>
      <tbody>
        {arr1.map((el, ind) => {
          return (
            <tr key={ind}>
              {arr2.map((el, indd) => {
                if (
                  ind + 1 === lastRandomNumber[0] &&
                  indd + 1 === lastRandomNumber[1]
                ) {
                  return (
                    <td
                      key={indd}
                      style={style}
                      onClick={() => onClick(true)}
                    ></td>
                  );
                }
                return <td key={indd} onClick={() => onClick(false)}></td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

Play.propTypes = {
  changeLevel: PropTypes.func,
};
export default Play;
