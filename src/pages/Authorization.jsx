import { Button, TextField, Link } from "@mui/material";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import {
  setCredentials,
  selectusers,
  checkCredentials,
} from "../users/userSlice";
import { useNavigate } from "react-router-dom";

const Authorization = () => {
  const users = useSelector((state) => state.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      username: "e",
      password: "e",
    },
    validationSchema: yup.object().shape({
      username: yup.string().required("required"),
      password: yup.string().required("required"),
    }),
    onSubmit: (values, actions) => {
      dispatch(
        checkCredentials({
          username: values.username,
          password: values.password,
        })
      );

      alert(JSON.stringify(values, null, 2));
      actions.setSubmitting(false);
      actions.resetForm({
        values: {
          username: "",
          password: "",
        },
        // you can also set the other form states here
      });
      if (users.loggedInUser != null) {
        navigate("/");
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
              Log in
            </Button>
            <p>
              Don't have an account?{" "}
              <button onClick={() => navigate("/registr")}>Register</button>
            </p>
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

export default Authorization;
