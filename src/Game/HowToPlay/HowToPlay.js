import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import "../../App.css";

class howToPlay extends Component {
  state = {
    isOpen: this.props.isOpen,
  };

  openBig() {
    if (this.props.isOpen) {
      return (
        <div id="howToPlay">
          <FontAwesomeIcon
            icon={faTimesCircle}
            className="info-icon"
            onClick={() => {
              this.props.updateClick(false);
            }}
          />
          <div className="how-toplay__header">
            <p>Правила игры</p>{" "}
          </div>
          <div className="instraction-list">
            <ol>
              <li>
                Выберите уровень сложности кликнув на одну из трех точек. Самый
                легкий уровень слева.
              </li>
              <li>
                Таймер отсчитает 3 секунды чтобы у вас было время приготовиться.
              </li>
              <li>
                В зависимости от выбранного уровня вы увидите сетку из
                прямоугольников 3*3 для легкого, 4*4 для среднего, и 5*5 для
                сложного уровней
              </li>
              <li>
                Один из прямоугольников будет закрашен в зеленый цвет, вам нужно
                успеть кликнуть по нему, иначе игра оконяена.
              </li>
              <li>
                Игра начнется в медленном темпе для легкого уровня, и среднем
                для сложного уровня.
              </li>
              <li>
                Каждый раз кликая по прямоугольнику вы зарабатываете 1 балл, и
                одновременно появлятся новый зеленый прямоугольник{" "}
              </li>
              <li>
                Продолжайте играть до тех пор пока игра не станет слишком
                быстрой.
              </li>
            </ol>
          </div>
        </div>
      );
    } else {
      return;
    }
  }
  render() {
    return <>{this.openBig()}</>;
  }
}

export default howToPlay;
