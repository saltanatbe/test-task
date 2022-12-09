import { Button, TextField } from "@mui/material";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { checkCredentials } from "../users/userSlice";
import { useNavigate, Link } from "react-router-dom";

const Authorization = () => {
  const users = useSelector((state) => state.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "michael.lawson@reqres.in",
      password: "12345",
    },
    validationSchema: yup.object().shape({
      email: yup.string().email("Invalid email").required("required"),
      password: yup.string().required("required"),
    }),
    onSubmit: (values, actions) => {
      console.log(values);
      dispatch(
        // { type: "auth", payload: { email: values.email } }
        checkCredentials({
          email: values.email,
        })
      );

      //   alert(JSON.stringify(values, null, 2));
      actions.setSubmitting(false);
      console.log(users.loggedInUser);
      if (users.loggedInUser != null) {
        navigate("/");
      } else {
        alert(JSON.stringify("feew", null, 2));
      }
    },
  });

  return (
    <RegistrationBox>
      <Header>Create your account</Header>
      <Formik
        onSubmit={formik.handleSubmit}
        values={formik.values}
        validationSchema={formik.validationSchema}
      >
        <form onSubmit={formik.handleSubmit}>
          <RegistrationForm>
            {Object.keys(formik.initialValues).map((key) => {
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
                    gridColumn: "span",
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
              sx={{ width: "100%", p: "15px", gridColumn: "" }}
            >
              Log in
            </Button>

            <Text>
              Don't have an account?
              <Link to="/registr">Register</Link>
            </Text>
          </RegistrationForm>
        </form>
      </Formik>
    </RegistrationBox>
  );
};

const RegistrationBox = styled.div`
  margin: 7vh 33% 0;
  background-color: #e8bcf0;
  padding: 40px;
  border-radius: 5%;
`;

const RegistrationForm = styled.div`
  display: grid;
  gap: 30px;
  grid-template-columns: minmax(0, 1fr);

  "& > div": {
    grid-column: "span";
  }
`;

const Header = styled.div`
  ${"" /* color: white; */}
  font-size: 30px;
  display: flex;
  justify-content: center;
  margin: 0 0 20px;
`;

const Text = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
`;

export default Authorization;
