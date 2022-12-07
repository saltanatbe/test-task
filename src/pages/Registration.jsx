import { Button, TextField } from "@mui/material";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { setCredentials, selectusers } from "../users/userSlice";

require("react-dom");
window.React2 = require("react");
console.log(window.React1 === window.React2);

const Registration = () => {
  const users = useSelector((state) => state.userData);

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "e",
      surname: "e",
      email: "e@m.s",
      username: "e",
      password: "e",
    },
    validationSchema: yup.object().shape({
      name: yup.string().required("required"),
      surname: yup.string().required("required"),
      email: yup.string().email("Invalid email").required("required"),
      username: yup
        .string()
        // .matches(phoneRegExp, "Phone number is not valid")
        .required("required"),
      password: yup.string().required("required"),
    }),
    onSubmit: (values, actions) => {
      dispatch(
        setCredentials({
          id: new Date().getTime(),
          name: values.name,
          surname: values.surname,
          email: values.email,
          username: values.username,
          password: values.password,
        })
      );
      alert(JSON.stringify(values, null, 2));
      actions.setSubmitting(false);
      actions.resetForm({
        values: {
          // the type of `values` inferred to be Blog
          name: "",
          surname: "",
          email: "",
          username: "",
          password: "",
        },
        // you can also set the other form states here
      });
    },
  });

  return (
    <RegistrationBox>
      {users.users.map((user) => {
        return <div>{user.name}</div>;
      })}
      <Header>Create your account</Header>
      <Formik
        onSubmit={formik.handleSubmit}
        values={formik.values}
        validationSchema={formik.validationSchema}
      >
        <form onSubmit={formik.handleSubmit}>
          <RegistrationForm>
            {Object.keys(formik.initialValues).map((key, index) => {
              return (
                <TextField
                  fullWidth
                  variant="filled"
                  type={key === "password" ? "password" : "text"}
                  label={key}
                  value={formik.values[key]}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  name={key}
                  error={!!formik.touched[key] && !!formik.errors[key]}
                  helperText={formik.touched[key] && formik.errors[key]}
                  sx={{
                    backgroundColor: "white",
                    // borderRadius: "5%",
                    gridColumn: "span 4",
                    fontSize: "20px",
                  }}
                  InputProps={{
                    style: {
                      fontSize: "18px",
                    },
                  }}
                ></TextField>
              );
            })}
            <Button
              onSubmit={formik.handleSubmit}
              type="submit"
              color="secondary"
              variant="contained"
              sx={{ width: "100%", p: "15px", gridColumn: "span 4" }}
            >
              Register
            </Button>
          </RegistrationForm>
        </form>
      </Formik>
    </RegistrationBox>
  );
};

const RegistrationBox = styled.div`
  margin: 10vh 33% 0;
  background-color: #e8bcf0;
  padding: 40px;
  border-radius: 5%;
`;

const RegistrationForm = styled.div`
  display: grid;
  gap: 30px;
  grid-template-columns: repeat(4, minmax(0, 1fr));

  "& > div": {
    gridcolumn: "span 4";
  }
`;

const Header = styled.div`
  ${"" /* color: white; */}
  font-size: 30px;
  display: flex;
  justify-content: center;
  margin: 0 0 20px;
`;

// const RegisterButton = styled.
export default Registration;
