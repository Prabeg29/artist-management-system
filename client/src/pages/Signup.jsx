import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Box, Button, Container, CssBaseline, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

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
  const { control, handleSubmit } = useForm({ defaultValues: initialUserInfo });
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
                rules={{ required: "First name is required" }}
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
                rules={{ required: "Last name is required" }}
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
                rules={{ required: "Email is required" }}
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
                rules={{ required: "Password is required" }}
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
                rules={{ required: "Phone is required" }}
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
                  rules={{ required: "Date is required" }}
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
                rules={{ required: "Gender is required" }}
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
                rules={{ required: "Address is required" }}
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
                rules={{ required: "Gender is required" }}
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
