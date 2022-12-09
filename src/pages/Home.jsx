import Header from "../components/Header";
import Table from "react-bootstrap/Table";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

/**
 * Home component renders a home page with users table with all information and icons
 *
 */
const Home = () => {
  const u = useSelector((state) => state.userData);
  const users = u.users;
  const rows = [];

  //creates a table variable rows with table row tags in it
  //for every user to later put it in the table
  for (let i = 0; i < users.length; i++) {
    rows.push(
      <tr>
        <td>{i}</td>
        <td>{users[i].first_name}</td>
        <td>{users[i].last_name}</td>
        <td>{users[i].email}</td>
        <td>
          <Link to={"/user/" + users[i].id}>
            <img
              alt="profile"
              style={{ width: "50px" }}
              src={
                users[i].avatar ||
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
              }
            />
          </Link>
        </td>
      </tr>
    );
  }
  // console.log(rows);
  return (
    <div>
      <Header />

      <Table className="m-5" bordered hover>
        <thead className="">
          <tr>
            {Object.keys(users[0]).map((key) => {
              return <th scope="row">{key}</th>;
            })}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </div>
  );
};

export default Home;
