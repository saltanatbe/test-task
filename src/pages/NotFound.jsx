import styled from "styled-components";
import { Box } from "@mui/material";
import Header from "../components/Header";

/**
 * NotFound component renders a 404 not found page that contains header and
 * text in case of any invalid url
 *
 */
const NotFound = () => {
  return (
    <Box>
      <Header />;
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
