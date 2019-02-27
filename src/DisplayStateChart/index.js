import React from "react";
import "./styles.css";

export default function DisplayStateChart(props) {
  function stateValue(v) {
    let result = [];
    if (typeof v === "object") {
      Object.keys(v).forEach(k => {
        let value = `${k}: `;
        if (k === "memoizedState" || k === "baseState") {
          //console.log("K :", v[k]);
          value += `${JSON.stringify(v[k])}`;
        } else if (k === "next") {
          value += "===================>";
        }
        result.push(<div key={k}>{value}</div>);
      });
    }
    return result;
  }
  let data1 = stateValue(props.stateData);
  let data2 = stateValue(props.stateData.next);
  let data3 = stateValue(props.stateData.next.next);
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div className="state-node">
        <center>First useState</center>
        {data1}
      </div>
      <div className="state-node">
        <center>Second useState</center>
        {data2}
      </div>
      <div className="state-node">
        <center>Third useState</center>
        {data3}
      </div>
    </div>
  );
}
