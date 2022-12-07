import styled from "styled-components";
import { Box } from "@mui/material";

const NotFound = () => {
  return (
    <Box>
      <Content>
        <h1>404 NOT FOUND</h1>
        <p>this page does not exist</p>
      </Content>
    </Box>
  );
};

const Content = styled.div`
  display: flex;
  justify-content: center;
  padding-left: 30%;
  height: 60vh;
  flex-direction: column;
`;
export default NotFound;