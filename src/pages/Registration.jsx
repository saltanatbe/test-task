import { Button, TextField } from "@mui/material";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import React from "react";
import { setCredentials } from "../users/userSlice";
import { Link, useNavigate } from "react-router-dom";

/**
 * Registration page renders a page with registration for the user
 * that has form with validation schema with yup.
 * Enables user to go to the authorization page if needed
 * when successfully registered enable to the destinate url and saves user
 */
const Registration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "12345",
    },
    validationSchema: yup.object().shape({
      first_name: yup.string().required("required"),
      last_name: yup.string().required("required"),
      email: yup.string().email("Invalid email").required("required"),
      password: yup.string().required("required"),
    }),
    //when form submitted sets the logged in user data in the redux state
    onSubmit: (values, actions) => {
      dispatch(
        setCredentials({
          id: new Date().getTime(),
          first_name: values.first_name,
          last_name: values.last_name,
          email: values.email,
        })
      );
      actions.setSubmitting(false);
      actions.resetForm({
        values: {
          first_name: "",
          last_name: "",
          email: "",
          password: "",
        },
      });
      //when form submitted navigates to destination
      navigate("/");
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
              sx={{ width: "100%", p: "15px" }}
            >
              Register
            </Button>
            <Text>
              Already have an account?
              <Link to="/auth">Login</Link>
            </Text>
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
  grid-template-columns: minmax(0, 1fr);
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
// const RegisterButton = styled.
export default Registration;
