import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Box, Button, Container, CssBaseline, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

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

const schema = yup.object({
    firstName: yup.string()
        .ensure()
        .max(255, "Must not be greater than 255 characters")
        .required("Is a required field"),
    lastName: yup.string()
        .ensure()
        .max(255, "Must not be greater than 255 characters")
        .required("Is a required field"),
    email: yup.string()
        .ensure()
        .email()
        .max(255, "Must not be greater than 255 characters")
        .required("Is a required field"),
    password: yup.string()
        .ensure()
        .min(8, "Must not be less than 8 character")
        .max(255, "Must not be greater than 255 characters")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]*$/,
         'Must have atleast 1 uppercase, 1 lowercase, 1 number, and 1 special character')
        .required("Is a required field"),
    phone: yup.string()
        .ensure()
        .max(20, "Must not be greater than 20 characters")
        .required("Is a required field"),
    dob: yup.date(),
    gender: yup.string()
        .ensure()
        .matches(/(male|female|other)/)
        .required("Is a required field"),
    address: yup.string()
        .ensure()
        .max(255, "Must not be greater than 255 characters")
        .required("Is a required field"),
    role: yup.string()
        .ensure()
        .matches(/(artist|artist_manager)/)
        .required("Is a required field"),
})
.required();

const Signup = () => {
  const { control, handleSubmit } = useForm({ defaultValues: initialUserInfo, resolver: yupResolver(schema) });
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
              <Controller
                name="firstName"
                control={control}
                render={({ field: { onChange, value }, fieldState: { error }, formState }) => (
                  <TextField
                    autoFocus
                    fullWidth
                    label="First Name"
                    value={value}
                    onChange={onChange}
                    error={Boolean(error)}
                    helperText={error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="lastName"
                control={control}
                render={({ field: { onChange, value }, fieldState: { error }, formState }) => (
                  <TextField
                    autoFocus
                    fullWidth
                    label="Last Name"
                    value={value}
                    onChange={onChange}
                    error={Boolean(error)}
                    helperText={error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="email"
                control={control}
                render={({ field: { onChange, value }, fieldState: { error }, formState }) => (
                  <TextField
                    autoFocus
                    fullWidth
                    label="Email"
                    value={value}
                    onChange={onChange}
                    error={Boolean(error)}
                    helperText={error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="password"
                control={control}
                render={({ field: { onChange, value }, fieldState: { error }, formState }) => (
                  <TextField
                    autoFocus
                    fullWidth
                    label="Password"
                    value={value}
                    onChange={onChange}
                    error={Boolean(error)}
                    helperText={error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="phone"
                control={control}
                render={({ field: { onChange, value }, fieldState: { error }, formState }) => (
                  <TextField
                    autoFocus
                    fullWidth
                    label="Phone"
                    value={value}
                    onChange={onChange}
                    error={Boolean(error)}
                    helperText={error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller
                  name="date"
                  control={control}
                  render={({ field: { onChange, value }, fieldState: { error }, formState }) => (
                    <DatePicker value={value} onChange={onChange} />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="gender"
                control={control}
                render={({ field: { onChange, value }, fieldState: { error }, formState }) => (
                  <TextField
                    autoFocus
                    fullWidth
                    label="Gender"
                    select
                    value={value}
                    onChange={onChange}
                    error={Boolean(error)}
                    helperText={error?.message}
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="address"
                control={control}
                render={({ field: { onChange, value }, fieldState: { error }, formState }) => (
                  <TextField
                    autoFocus
                    fullWidth
                    label="Address"
                    value={value}
                    onChange={onChange}
                    error={Boolean(error)}
                    helperText={error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="role"
                control={control}
                render={({ field: { onChange, value }, fieldState: { error }, formState }) => (
                  <TextField
                    autoFocus
                    fullWidth
                    label="Role"
                    select
                    value={value}
                    onChange={onChange}
                    error={Boolean(error)}
                    helperText={error?.message}
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
