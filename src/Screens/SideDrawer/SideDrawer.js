import React from 'react';
import './Style.css'
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import Tooltip from '@mui/material/Tooltip';
import { Link } from 'react-router-dom'
import { FaUserFriends } from 'react-icons/fa';
import { MdDashboard, MdLogout } from 'react-icons/md';
import Container from '@mui/material/Container';

const drawerWidth = 245;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer(props) {
  const { children } = props;
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* <ThemeProvider> */}
      <AppBar position="fixed" open={open} style={{ backgroundColor: 'white' }}>
      <Container maxWidth="xl">
      <Toolbar disableGutters>

{/* MEnu Icon for Big Screen */}
      <IconButton
            color="info"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>

          <Box className='AppBarLogo' sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
         
{/* For Small Screen */}
        
          <Box className='AppBarLogo' sx={{ display: { xs: 'flex', md: 'none', flexGrow: 1 } }} />
      
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          </Box>
          
{/* AVATAR */}
          {/* <Box sx={{ flexGrow: 0, display:'flex', flexDirection:'row' }}>
            <div style={{ display:'flex', flexDirection:'column', marginRight:5}}>
              <Typography variant='caption' color='textSecondary'>{localStorage.getItem('User_First_Name')} {localStorage.getItem('User_Last_Name')}</Typography>
                {localStorage.getItem('User_Designation') == 1 ?
                (<Typography variant='caption' color='textSecondary'>Admin</Typography>)
              :
              (<Typography variant='caption' color='textSecondary'>Sub-Admin</Typography>)
              }
            </div>
            <Tooltip title="Open settings">
              <IconButton 
              onClick={handleOpenUserMenu}
               sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>Profile</MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>My account</MenuItem>
            </Menu>
          </Box> */}

        </Toolbar>
      </Container>
      </AppBar>
      {/* </ThemeProvider> */}
      <Drawer variant="permanent" open={open} >
        <DrawerHeader style={{ backgroundColor: '#0c54a3' }}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon color='inherit' /> : <ChevronLeftIcon color='inherit' />}
          </IconButton>
        </DrawerHeader>

            <List style={{ backgroundColor: '#0c54a3', height: '100%' }}>
              <ListItem className='drawerListButton' component={Link} to='/dashboard'>
                <Tooltip title='Dashboard' arrow>
                  <ListItemIcon><MdDashboard size='2.5vh' color='white' /></ListItemIcon>
                </Tooltip>
                <Tooltip title='Dashboard' arrow>
                  <ListItemText primary="Dashboard"
                    primaryTypographyProps={{
                      color: 'white',
                      fontWeight: 'medium',
                      variant: 'subtitle2',
                    }} />
                </Tooltip>
              </ListItem>

              <ListItem className='drawerListButton' component={Link} to='pending-users'>
                <Tooltip title='Pending Users' arrow>
                  <ListItemIcon><FaUserFriends size='3vh' color='white' /></ListItemIcon>
                </Tooltip>
                <Tooltip title='Pending Users' arrow>
                  <ListItemText primary="Pending Users"
                    primaryTypographyProps={{
                      color: 'white',
                      fontWeight: 'medium',
                      variant: 'subtitle2',
                    }} />
                </Tooltip>
              </ListItem>

              <ListItem className='drawerListButton' component={Link} to='all-users'>
                <Tooltip title='Users' arrow>
                  <ListItemIcon><FaUserFriends size='3vh' color='white' /></ListItemIcon>
                </Tooltip>
                <Tooltip title='Users' arrow>
                  <ListItemText primary="Users"
                    primaryTypographyProps={{
                      color: 'white',
                      fontWeight: 'medium',
                      variant: 'subtitle2',
                    }} />
                </Tooltip>
              </ListItem>

              <ListItem className='drawerListButton' component={Link} to='feedback'>
                <Tooltip title='Feedback' arrow>
                  <ListItemIcon><FaUserFriends size='3vh' color='white' /></ListItemIcon>
                </Tooltip>
                <Tooltip title='Feedback' arrow>
                  <ListItemText primary="Feedback"
                    primaryTypographyProps={{
                      color: 'white',
                      fontWeight: 'medium',
                      variant: 'subtitle2',
                    }} />
                </Tooltip>
              </ListItem>

              <ListItem className='drawerListButton' component={Link} to='/login'>
                <Tooltip title='Sign Out' arrow>
                  <ListItemIcon><MdLogout size='3vh' color='white' /></ListItemIcon>
                </Tooltip>
                <Tooltip title='Sign Out' arrow>
                  <ListItemText primary="Sign Out"
                    primaryTypographyProps={{
                      color: 'white',
                      fontWeight: 'medium',
                      variant: 'subtitle2',
                    }} />
                </Tooltip>
              </ListItem>
            </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, paddingTop: '5vh' }}>
        {/* <Toolbar /> */}
        <DrawerHeader />
        {children}
      </Box>
    </Box>

  );
}
