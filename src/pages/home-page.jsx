import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Redirect, Link } from "react-router-dom";
import userService from "../services/user.service";
import qs from "qs";
import Image from "../pages/source.gif";
const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  error: {
    color: "red"
  },
  myHeader: {
    backgroundColor: "black",
    width: "100%",
    height: 60,
    opacity: 0.8
  },
  logo: {
    fontFamily: "Orbitron",
    color: "#FFFFFF",
    fontSize: 30,
    paddingTop: 6,
    paddingLeft: 5
  },
  background: {
    backgroundImage: `url(${Image})`,
    height: "100%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "left bottom"
  },
  container: {
    height: 500,
    marginTop: 110
  }
}));

export function HomePage() {
  const classes = useStyles();

  const [error, setError] = React.useState("");
  const [toVacationPage, setToVacationPage] = React.useState(false);
  const [toAdminPage, setToAdminPage] = React.useState(false);

  const login = async (username, password) => {
    await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      body: qs.stringify({ username, password }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(async res => {
        const results = await res.json();
        userService.user = results.user;
        sessionStorage.setItem("vacation_user", JSON.stringify(results.user));
        if (userService.user.admin) {
          setToAdminPage(true);
        } else {
          setToVacationPage(results.ok);
        }
        setError(!results.ok);
        console.log(results);
      })
      .catch(res => {
        console.log(res);
      });
  };

  if (toAdminPage) {
    return <Redirect to="/admin" />;
  }

  if (toVacationPage) {
    return <Redirect to="/vacations" />;
  }

  const handleSubmit = e => {
    e.preventDefault();
    const { username, password } = e.target.elements;
    login(username.value, password.value);
  };

  return (
    <div className={classes.background}>
      <div className={classes.myHeader}>
        <div className={classes.logo}>Nakash tours</div>
      </div>
      <Container className={classes.container} component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <div className={classes.form}>
            <form onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
            </form>
            <Link to="/register" className="regNow">
              register now!
            </Link>
            {error && (
              <div className={classes.error}>
                Error! Check the username and password and try again
              </div>
            )}
          </div>
        </div>
        <Box mt={5} />
      </Container>
    </div>
  );
}
