import styled from "styled-components";

const TabItem = ({ children, active }) => {
  return (
    <TabContent className={`tab-content ${active ? "open" : ""}`}>
      {children}
    </TabContent>
  );
};

const TabContent = styled.div`
  display: none;
  margin-top: 6px;
  text-align: center;

  &.open {
    display: block;
  }
`;

export default TabItem;
