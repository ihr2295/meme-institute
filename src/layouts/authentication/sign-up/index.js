// src/layouts/authentication/sign-up/index.js
import { useState } from "react";
import { Card, Checkbox, Grid, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

import bgImage from "assets/images/bg-sign-up-cover.jpeg";

function SignUp() {
  const [username, setUsername] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://127.0.0.1:8001/dj-rest-auth/registration/', {
      username,
      password1,
      password2,
    });
    navigate('/login');
  };

  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign up
          </MDTypography>
          <Grid container spacing={1} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography component={Link} href="#" variant="body1" color="white">
                <i className="fab fa-facebook" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={Link} href="#" variant="body1" color="white">
                <i className="fab fa-github" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={Link} href="#" variant="body1" color="white">
                <i className="fab fa-google" />
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleSubmit}>
            <MDBox mb={2}>
              <MDInput type="username" label="Username" fullWidth value={username} onChange={(e) => setUsername(e.target.value)} />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Password" fullWidth value={password1} onChange={(e) => setPassword1(e.target.value)} />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Confirm Password" fullWidth value={password2} onChange={(e) => setPassword2(e.target.value)} />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </MDTypography>
              <MDTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                color="info"
                textGradient
              >
                Terms and Conditions
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth type="submit">
                Sign up
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/login"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign in
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default SignUp;
