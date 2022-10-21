import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom'
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// toast.configure();


export default function Login() {
  
  const theme = createTheme();
  let navigate = useNavigate();

  const [Email, setEmail] = React.useState('');
  const [Password, setPassword] = React.useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!Email.trim()) {
      alert('Please Enter Correct Email')

}
    else if (!Password.trim()) {
      alert('Please Enter Correct Password')

    }
    Login()
  };

  const Login=()=>{
    return(
        <>
    {Email == 'zabshare@gmail.com' && Password == 'zabshare123' ?
(
  alert('Login Successful'),
      navigate('/dashboard')

)
: 
(
  alert('Login Unsuccessful')

)
}
</>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/zabshare-65702.appspot.com/o/Image2.jpg?alt=media&token=aa0eb647-7166-479b-b2e9-af0fac61d16a)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          style={{height:'100vh', width:'100%'}}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={1} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="off"
                autoFocus
                value={Email}
                onChange={e => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="off"
                value={Password}
                onChange={e => setPassword(e.target.value)}
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}