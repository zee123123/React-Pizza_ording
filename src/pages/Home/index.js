import React from "react";
import { connect } from "dva";
import style from "./index.scss";

function index(props) {
  return (
    <div className={style.home}>
      <div className={style.background}>
        <h1>Welcome to Ze-Pizza!</h1>
        <h2>We have best pizza and snacks!</h2>
        <p>{props.text}</p>
      </div>
    </div>
  );
}

// coonect home.js(model) and the component of index.js(home component)
export default connect(({ home }) => ({ ...home }))(index);
