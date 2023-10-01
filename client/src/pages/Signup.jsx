import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Box, Button, Container, CssBaseline, Grid, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { yupResolver } from "@hookform/resolvers/yup";

import FormInputText from "../components/FormInputText";
import FormInputSelect from "../components/FormInputSelect";
import { RegistrationSchema } from "../schemas/RegistrationSchema";

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
  const { control, handleSubmit } = useForm({
    defaultValues: initialUserInfo,
    resolver: yupResolver(RegistrationSchema),
  });

  const onSubmit = (data) => console.log(data);

  const textFields = [
    { name: "firstName", label: "First Name" },
    { name: "lastName", label: "Last Name" },
    { name: "email", label: "Email" },
    { name: "password", label: "Password" },
    { name: "phone", label: "Phone" },
    { name: "address", label: "Address" },
  ];

  const selectFields = [
    {
      name: "gender",
      label: "Gender",
      options: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
        { label: "Other", value: "other" },
      ],
    },
    {
      name: "role",
      label: "Role",
      options: [
        { label: "Artist", value: "artist" },
        { label: "Artist Manager", value: "artist_manager" },
      ],
    },
  ];

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
            {textFields.map((textField) => (
              <Grid key={textField.name} item xs={12} sm={6}>
                <FormInputText name={textField.name} control={control} label={textField.label} />
              </Grid>
            ))}
            {/* <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller
                  name="date"
                  control={control}
                  render={({ field: { onChange, value }, fieldState: { error }, formState }) => (
                    <DatePicker value={value} onChange={onChange} />
                  )}
                />
              </LocalizationProvider>
            </Grid> */}
            {selectFields.map((selectField) => (
              <Grid key={selectField.name} item xs={12} sm={6}>
                <FormInputSelect
                  name={selectField.name}
                  control={control}
                  label={selectField.label}
                  options={selectField.options}
                />
              </Grid>
            ))}
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
