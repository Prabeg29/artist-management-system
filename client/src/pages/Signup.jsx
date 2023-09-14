import { ThemeProvider, createTheme } from '@mui/material/styles';
import { 
    Box, 
    Button, 
    Container, 
    CssBaseline, 
    Grid, 
    MenuItem, 
    TextField, 
    Typography 
} from '@mui/material';
import { Link } from 'react-router-dom';

const theme = createTheme();

const Signup = () => {
    return (
       <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant='h5'>
                    Sign Up
                </Typography>
                <Box component="form" sx={{ mt: 3}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="lastName"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="email"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="password"
                                required
                                fullWidth
                                id="password"
                                label="Password"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="phone"
                                required
                                fullWidth
                                id="phone"
                                label="Phone"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="dob"
                                required
                                fullWidth
                                id="dob"
                                label="DOB"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="gender"
                                required
                                fullWidth
                                id="gender"
                                label="Gender"
                                autoFocus
                                select
                                defaultValue="female"
                            >
                                <MenuItem value="male">Male</MenuItem>
                                <MenuItem value="female">Female</MenuItem>
                                <MenuItem value="other">Other</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="address"
                                required
                                fullWidth
                                id="address"
                                label="Address"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="role"
                                required
                                fullWidth
                                id="role"
                                label="Role"
                                autoFocus
                                select
                                defaultValue="artist"
                            >
                                <MenuItem value="artist">Artist</MenuItem>
                                <MenuItem value="artist_manager">Artist Manager</MenuItem>
                            </TextField>
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        >
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
       </ThemeProvider>
    );
};

export default Signup;
