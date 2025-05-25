
import React, { useState, useContext } from "react";
import {
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Card,
  CardContent,
  Typography,
  InputAdornment,
  IconButton,
  Link,
  Box,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import UserContext from "../allcontext";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // const { logindone, setlogindone } = useContext(UserContext);
  const { setloginsign } = useContext(UserContext);

  const handleloginsign = () => {
    setloginsign(0); // switch to login page
  }

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  // const handleLogin = () => {
  //   setlogindone(0); // switch to login page
  // };

  const handleSignup = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("/api/api/auth/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Signup successful:", data);
        alert("Signup successful! Please log in.");
        setloginsign(0); // Go back to login page after successful signup
      } else {
        console.error("Signup failed:", data);
        alert("Signup failed: " + (data.detail || JSON.stringify(data)));
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("An error occurred. Check the console.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(to bottom right, #3b82f6, #8b5cf6, #bfdbfe)",
        p: 3,
      }}
    >
      <Card sx={{ maxWidth: 400, borderRadius: 3, boxShadow: 5 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Create Account
          </Typography>
          <Typography
            variant="body2"
            align="center"
            color="text.secondary"
            gutterBottom
          >
            Join us! Please fill in your details.
          </Typography>

          <form noValidate autoComplete="off" onSubmit={handleSignup}>
            <TextField
              id="username"
              label="Username"
              placeholder="Enter your username"
              fullWidth
              margin="normal"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              id="email"
              label="Email"
              type="email"
              placeholder="Enter your Email"
              fullWidth
              margin="normal"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              fullWidth
              margin="normal"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePassword}
                      edge="end"
                      aria-label="toggle password visibility"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              id="confirmPassword"
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              fullWidth
              margin="normal"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleToggleConfirmPassword}
                      edge="end"
                      aria-label="toggle confirm password visibility"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <FormControlLabel
              control={<Checkbox id="terms" required />}
              label={
                <>
                  I agree to the{" "}
                  <Link href="#" underline="hover">
                    Terms and Conditions
                  </Link>
                </>
              }
              sx={{ mt: 2 }}
            />
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
              Sign up
            </Button>
            <Button
              variant="outlined"
              fullWidth
              startIcon={
                <Box
                  component="img"
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  sx={{ width: 20, height: 20 }}
                />
              }
              sx={{ mt: 2 }}
            >
              Sign up with Google
            </Button>
          </form>

          <Typography
            variant="body2"
            align="center"
            color="text.secondary"
            sx={{ mt: 3 }}
          >
            Already have an account?{" "}
            <span
              onClick={handleloginsign}
              style={{ display: "inline", color: "blue", cursor: "pointer" }}
            >
              Sign in
            </span>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
