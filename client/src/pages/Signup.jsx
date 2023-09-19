import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Box, Button, Container, CssBaseline, Grid, MenuItem, TextField, Typography } from "@mui/material";

const initialUserInfo = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  phone: "",
  dob: "",
  gender: "female",
  address: "",
  role: "artist",
};

const Signup = () => {
  const { control, register, handleSubmit } = useForm({
    defaultValues: initialUserInfo,
  });
  const onSubmit = (data) => console.log(data);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                {...register("firstName", { required: true })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="lastName"
                fullWidth
                id="lastName"
                label="Last Name"
                autoFocus
                {...register("lastName", { required: true })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="email"
                fullWidth
                id="email"
                label="Email"
                autoFocus
                {...register("email", { required: true })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="password"
                fullWidth
                id="password"
                label="Password"
                autoFocus
                {...register("password", { required: true })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="phone"
                fullWidth
                id="phone"
                label="Phone"
                autoFocus
                {...register("phone", { required: true })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField name="dob" fullWidth id="dob" label="DOB" autoFocus {...register("dob", { required: true })} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    name="gender"
                    fullWidth
                    id="gender"
                    label="Gender"
                    autoFocus
                    select
                    {...register("gender", { required: true })}
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="address"
                fullWidth
                id="address"
                label="Address"
                autoFocus
                {...register("address", { required: true })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    name="role"
                    fullWidth
                    id="role"
                    label="Role"
                    autoFocus
                    select
                    {...register("role", { required: true })}
                  >
                    <MenuItem value="artist">Artist</MenuItem>
                    <MenuItem value="artist_manager">Artist Manager</MenuItem>
                  </TextField>
                )}
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to={`/login`} variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;
