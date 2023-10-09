import { useState } from "react";
import { useMutation } from 'react-query';
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Alert, Box, Button, Container, CssBaseline, Grid, Typography } from "@mui/material";

import { signUp } from '../api/authService';
import InputText from "../components/form/InputText";
import InputSelect from "../components/form/InputSelect";
import { RegistrationSchema } from "../schemas/RegistrationSchema";

const Signup = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      phone: "",
      dob: "",
      gender: "female",
      address: "",
      role: "artist",
    },
    resolver: yupResolver(RegistrationSchema),
  });

  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const { mutate } = useMutation(
    data => signUp(data),
    {
        onSuccess: () => navigate('/signin'),
        onError: ({ response: { data } }) => setErrorMessage(data.message),
    }
  ); 

  const textFields = [
    { name: "first_name", label: "First Name" },
    { name: "last_name", label: "Last Name" },
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
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <Box component="form" onSubmit={handleSubmit(mutate)} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {textFields.map((textField) => (
              <Grid key={textField.name} item xs={12} sm={6}>
                <InputText name={textField.name} control={control} label={textField.label} />
              </Grid>
            ))}
            <Grid item xs={12} sm={6}>
              <Controller
                control={control}
                name="dob"
                defaultValue={null}
                render={({ field: {value, onChange}, fieldState: { error } }) => (
                    <DatePicker 
                        label="Date of Birth"
                        disableFuture
                        value={value} 
                        onChange={onChange}
                        slotProps={{ 
                            textField: { 
                                error: !!error,
                                helperText: error?.message
                            }
                        }}
                    />
                )}
              />
            </Grid>
            {selectFields.map((selectField) => (
              <Grid key={selectField.name} item xs={12} sm={6}>
                <InputSelect
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
              <Link to={`/signin`} variant="body2">
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
