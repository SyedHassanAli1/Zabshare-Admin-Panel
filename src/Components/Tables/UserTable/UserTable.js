import React, { useState, useEffect } from 'react'
import { Grid, Paper, TextField, InputAdornment, Typography, Breadcrumbs, Avatar, Chip, IconButton} from '@mui/material'
import { DataGrid, gridPageCountSelector, gridPageSelector, 
    useGridApiContext, useGridSelector } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from "@mui/icons-material/Delete";
import Pagination from '@mui/material/Pagination';
import { db } from '../../../FirebaseConfig';
// import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, } from 'firebase/firestore';

function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      color="primary"
      count={pageCount}
      page={page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}

export default function UserTable() {

  // let navigate = useNavigate();

  //SEARCH STATES
  const [search, setSearch] = useState('');
    //Data STATES
    const [userData, setUserData] = useState([]);

    useEffect(() => {
      getUsersData()
    }, [])

  const getUsersData = async () => {
    let tempdata = [];
    const data = db;
    const snapshot = await data
        .collection("users")
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                let tempobj = {
                uid: doc.id,
                student_name: doc.data().student_name,
                student_contact: doc.data().student_contact,
                student_id: doc.data().student_id,
                email: doc.data().email,
                password: doc.data().password,
                designation: doc.data().designation,
                verification_status: doc.data().verification_status,
                publishTime: doc.data().publishTime
                };
                {
                  if (tempobj.verification_status !== 'pending') {
                    tempdata.push(tempobj)
                  } else {
                    console.log('No Data')
                  }                }
                
              });
            })
            .catch(function (error) {
            });
            setUserData(tempdata)
            // console.log('Users data is: ',userData)
}

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}`,
    };
  }

  
 const deleteUser = async (delete_id) => {
    // const db = firebase.firestore();
    // const res = await db.collection("users").doc(delete_id).delete();
    const data = db;
    const snapshot = await data.collection("users").doc(delete_id).delete();
    alert('User Deleted');
    getUsersData();
  };

  const rows = userData.filter((val) => {
    if (search == '') {
      return val
    }
    else if (val.student_contact.includes(search)) {
      return val
    }
  }).map((val) => {
    return {
      id: val.uid,
      Name: { User_Name: val.student_name, User_Id: val.student_id },
      Contact: { User_Contact: val.student_contact },
      Credential: {Email: val.email, Password: val.password},
      Designation: { Designation: val.designation },
      Status: { Stat: val.verification_status },
      UID: {uid: val.uid},
    }
  })

  const columns = [
    {
      flex: 0.5, field: 'Name', headerName: 'Name', headerClassName: 'super-app-theme--header', cellClassName: 'super-app',
      valueFormatter: (params) => {
        const valueStudentName = params.value.User_Name;
        const valueStudentId = params.value.User_Id;
        return `${valueStudentName}, ${valueStudentId}`;
      },
      renderCell: (params) => (
        <>
          <Avatar {...stringAvatar(params.value.User_Name)} />
          <div>
            <Typography variant="body2" sx={{ ml: '5%' }}>{params.value.User_Name}</Typography>
            <Typography color="textSecondary" variant="caption" sx={{ ml: '5%' }}>{params.value.User_Id}</Typography>
          </div>
        </>
      )
    },
    {
      flex: 0.5, field: 'Contact', headerName: 'Contact', headerClassName: 'super-app-theme--header',
      valueFormatter: (params) => {
        const valueStudentContact = params.value.User_Contact;
        return `${valueStudentContact}`;
      },
      renderCell: (params) => (
        <>
            <Typography variant="body2">{params.value.User_Contact}</Typography>
        </>
      )
    },
    {
      flex: 0.5, field: 'Credential', headerName: 'Credential', headerClassName: 'super-app-theme--header',
      valueFormatter: (params) => {
        const valueEmail = params.value.Email;
        const valuePassword = params.value.Password;
        return `${valueEmail}, ${valuePassword}`;
      },
      renderCell: (params) => (
        <>
        {/* <Avatar {...stringAvatar(params.value.hospitalName)} /> */}
        <div>
          <Typography variant="body2">{params.value.Email}</Typography>
          <Typography color="textSecondary" variant="caption">{params.value.Password}</Typography>
        </div>
      </>
      )
    },
    {
      flex: 0.5, field: 'Designation', headerName: 'Designation', headerClassName: 'super-app-theme--header',
      valueFormatter: (params) => {
        const valueDesignation = params.value.Designation;
        return `${valueDesignation}`;
      },
      renderCell: (params) => (
        <div>
          {params.value.Designation == 0 ?
            (<Typography variant="body2">Driver</Typography>
            )
            :
            (<Typography variant="body2">Passenger</Typography>)
          }
        </div>
      )
    },
    {
      flex: 0.5, field: 'Status', headerName: 'Status', headerClassName: 'super-app-theme--header',
      valueFormatter: (params) => {
        const valueStatus = params.value.Stat;
        return `${valueStatus}`;
      },
      renderCell: (params) => (
        <div>
          {/* <Tag color="success">success</Tag> */}
          {params.value.Stat == 'accepted' ?
            (<Chip label="Accepted" color="success"/>)
            :
            (<Chip label="Rejected" color="error"/>
            )
          }
        </div>
      )
    },
    {
      flex: 0.3, field: 'UID', headerName: 'Actions', headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <IconButton color="error">
        <DeleteIcon onClick={()=>{deleteUser(params.value.uid)}} />
        </IconButton>
      //   <div style={{display:'flex', width:'100%', justifyContent:'space-around'}}>
      //     <Button variant='contained' color='primary' onClick={()=>{updateStatus(params.value.uid, 'accepted')}}>Accept</Button>
      // </div>
      )
    }
  ];

  return (
    <Grid container rowSpacing={1} columnSpacing={1} >
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Paper elevation={10} style={{ padding: '1%' }}>

          <div role="presentation">
            <Breadcrumbs aria-label="breadcrumb">
            <Typography variant='caption' color="text.primary">Dashboard</Typography>
              <Typography variant='caption' color="text.primary">All Users</Typography>
            </Breadcrumbs>
          </div>

          <Grid container rowSpacing={1} style={{ marginTop: '1%' }}>
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6} >
              <TextField style={{ width: '100%' }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search By Student Contact....."
                autoComplete='off'
                id="outlined-basic"
                label="Search..."
                variant="outlined"
                size='small'
              />
            </Grid>
          </Grid>

          <Grid container rowSpacing={1}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ height: '95vh', marginTop: '1%' }}>
              <DataGrid
                style={{ padding: '1%' }}
                // getRowId={(row) => row.id}
                components={{ Pagination: CustomPagination }}
                disableColumnFilter
                columns={columns}
                rows={rows}
                pagination
                pageSize={10}
                rowsPerPageOptions={[10]}
                sx={{
                  '& .super-app-theme--header': {
                    fontWeight: '800',
                  },
                  '& .super-app': {
                    textTransform: 'capitalize',
                  },
                }}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}