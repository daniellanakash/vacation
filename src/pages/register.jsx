import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link as RouterLink } from "react-router-dom";
import { Redirect } from "react-router-dom";
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
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
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

export function Register() {
  const classes = useStyles();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [firstname, setFirstname] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [toLoginPage, setToLoginPage] = React.useState(false);

  const reg = async () => {
    await fetch("http://localhost:5000/api/users/register", {
      method: "POST",
      body: qs.stringify({ username, password, firstname, lastname }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(async res => {
        const results = await res.json();
        setToLoginPage(results);
        console.log(results);
      })
      .catch(res => {
        console.log(res);
      });
  };

  if (toLoginPage) {
    return <Redirect to="/" />;
  }

  const onSubmit = e => {
    e.preventDefault();
    reg();
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
            Sign up
          </Typography>
          <form className={classes.form} onSubmit={onSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={e => setFirstname(e.currentTarget.value)}
                  value={firstname}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  onChange={e => setLastname(e.currentTarget.value)}
                  value={lastname}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  onChange={e => setUsername(e.currentTarget.value)}
                  value={username}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={e => setPassword(e.currentTarget.value)}
                  value={password}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <RouterLink to="/">Already have an account? Sign in</RouterLink>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  );
}
