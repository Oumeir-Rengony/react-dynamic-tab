import styled from "styled-components";
import Tab from "./components/Tab";
import TabItem from "./components/TabItem";

export default function App() {
  return (
    <AppWrapper>
      <Tab>
        <TabItem title="Tab selected 1" active>
          <div className="card">
            <h1 className="header">Tab selected 1</h1>
          </div>
        </TabItem>

        <TabItem title="Tab unselected 2">
          <div className="card">
            <h1 className="header">Tab unselected 2</h1>
          </div>
        </TabItem>

        <TabItem title="Tab unselected 3">
          <div className="card">
            <h1 className="header">Tab unselected 3</h1>
          </div>
        </TabItem>

        <TabItem title="Tab unselected 4">
          <div className="card">
            <h1 className="header">Tab unselected 4</h1>
          </div>
        </TabItem>
      </Tab>
    </AppWrapper>
  );
}

const AppWrapper = styled.div``;
