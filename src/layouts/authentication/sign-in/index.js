// src/layouts/authentication/sign-in/index.js
import { useState } from "react";
import { Card, Checkbox, Grid, Link, Switch, FormControlLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

import bgImage from "assets/images/bg-sign-in-basic.jpeg";

function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginUser(username, password);
    navigate('/');
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
            Sign in
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
              <MDInput type="password" label="Password" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth type="submit">
                Sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/register"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default SignIn;
