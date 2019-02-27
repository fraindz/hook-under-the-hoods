import React from "react";
import ReactDOM from "react-dom";

import Hooks from "./Hooks";
import DisplayStateChart from "./DisplayStateChart";

import "./styles.css";

const Component = Hooks;

const friendStatusList = [
  { id: "S1", name: "Anand" },
  { id: "S2", name: "Bony" },
  { id: "S3", name: "Charmy" }
];
const friendItemList = [
  { id: "L1", name: "Alex" },
  { id: "L2", name: "Baz" },
  { id: "L3", name: "Cherry" }
];

function App() {
  return (
    <div className="App">
      <h1>Reuse stateful components - HOC, Render Prop, Hooks</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <div style={{ flexDirection: "row" }}>
          <div className="tcell">
            <h4>Status Component</h4>
          </div>
          {friendStatusList.map(f => (
            <div key={f.id}>
              <Component.FriendStatus friend={{ ...f }} />
            </div>
          ))}
        </div>
        <div style={{ flexDirection: "row" }}>
          <div className="tcell">
            <h4>List Component</h4>
          </div>
          {friendItemList.map(f => (
            <div key={f.id}>
              <Component.FriendListItem friend={{ ...f }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

class Tree extends React.Component {
  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState(
        document.getElementById("root")._reactRootContainer._internalRoot
          .current.child.child.child.sibling.child.child.sibling.child.child
          .memoizedState
      );
    }, 1000);
  }
  componentWillUnMount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
  render() {
    let useState1 = this.state;
    /*let useState2 = useState1 ? useState1.next : {};
    let useState3 = useState2 ? useState2.next : {};
    console.log("us 3", useState3);*/
    if (useState1) {
      if (useState1.next) {
        useState1.next.next.next = null;
      }
    }
    //console.log("us 1", useState1);
    //useState3 = {}
    return (
      <div>
        <br />
        <br />
        <div>
          <h3>useState data structure</h3>
        </div>
        {useState1 && useState1.next && (
          <DisplayStateChart stateData={useState1} />
        )}
      </div>
    );
  }
}

const treeElement = document.getElementById("treedemo");
ReactDOM.render(<Tree />, treeElement);
