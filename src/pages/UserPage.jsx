import Header from "../components/Header";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// import { getPageUser, findUser } from "../users/userSlice";
import { useEffect } from "react";
import { getPageUser } from "../users/userSlice";

const UserPage = () => {
  const params = useParams();
  const id = params.id;
  const users = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("uf");
    dispatch(getPageUser({ id: id }));
    console.log(users.pageUser);
  }, [params.id]);

  return (
    <div>
      <Header />
      <Container className="justify-content-md-center">
        <Row>
          <Col>
            <Card className="mt-5" style={{ color: "#000", width: "30vw" }}>
              <Card.Img
                src={
                  (users.pageUser && users.pageUser.avatar) ||
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                }
                style={{ width: "290px" }}
              />
              <Card.Body>
                <Card.Title>
                  {users.pageUser &&
                    users.pageUser.first_name + " " + users.pageUser.last_name}
                </Card.Title>
                {/* <Card.Text>{users.pageUser && users.pageUser.}</Card.Text> */}
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Container
              className="mt-5"
              style={{
                height: "350px",
              }}
            >
              <Row>
                <Col xs lg="2">
                  Name:
                </Col>
                <Col>{users.pageUser && users.pageUser.first_name}</Col>
              </Row>
              <Row>
                <Col xs lg="2">
                  Surname:
                </Col>
                <Col>{users.pageUser && users.pageUser.last_name}</Col>
              </Row>
              <Row>
                <Col xs lg="2">
                  email:
                </Col>
                <Col>{users.pageUser && users.pageUser.email}</Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UserPage;
