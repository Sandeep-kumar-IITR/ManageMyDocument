
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
import UserContext from "../allcontext.js";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { logindone, setlogindone } = useContext(UserContext);
  const {loginsign, setloginsign} = useContext(UserContext);
  const { user, setUser } = useContext(UserContext);
  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLoginsignup = () => {
    setloginsign(1); // Switch to signup page 
  }

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent form from refreshing the page

    try {
      const response = await fetch("https://managemydoc.onrender.com/api/api/auth/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();
      setUser(data); // Save user data to context


      if (response.ok) {
        console.log("Login successful:", data);
        setlogindone(1); // Or handle token, redirect, etc.
        // You could also save token to context/localStorage here
      } else {
        console.error("Login failed:", data);
        alert("Login failed: " + (data.detail || "Invalid credentials"));
      }
    } catch (error) {
      console.error("Error during login:", error);
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
        background: "linear-gradient(to bottom right, #3b82f6, #8b5cf6, #bfdbfe)",
        p: 3,
      }}
    >
      <Card sx={{ maxWidth: 400, borderRadius: 3, boxShadow: 5 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Welcome Back!
          </Typography>
          <Typography
            variant="body2"
            align="center"
            color="text.secondary"
            gutterBottom
          >
            We missed you! Please enter your details.
          </Typography>

          <form noValidate autoComplete="off" onSubmit={handleLogin}>
            <TextField
              id="Username"
              label="Username"
              type="text"
              placeholder="Enter your Username"
              fullWidth
              margin="normal"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 1,
                mb: 3,
              }}
            >
              <FormControlLabel
                control={<Checkbox id="remember" />}
                label="Remember me"
              />
              <Link href="#" underline="hover" sx={{ fontSize: "0.875rem" }}>
                Forgot password?
              </Link>
            </Box>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mb: 2 }}
            >
              Sign in
            </Button>
            <Button
              variant="outlined"
              fullWidth
              startIcon={
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  style={{ width: 20, height: 20 }}
                />
              }
            >
              Sign in with Google
            </Button>
          </form>

          <Typography
            variant="body2"
            align="center"
            color="text.secondary"
            sx={{ mt: 3 }}
          >
            Don’t have an account?{" "}
            <span
              onClick={handleLoginsignup}
              style={{ display: "inline", color: "blue", cursor: "pointer" }}
            >
              Sign up
            </span>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
