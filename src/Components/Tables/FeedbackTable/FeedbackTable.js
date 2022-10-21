import React, { useState, useEffect } from 'react'
import { Grid, Paper, TextField, InputAdornment, Typography, Breadcrumbs, Avatar, Button} from '@mui/material'
import { DataGrid, gridPageCountSelector, gridPageSelector, 
    useGridApiContext, useGridSelector } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import Pagination from '@mui/material/Pagination';
import { db } from '../../../FirebaseConfig';

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

export default function FeedbackTable() {

  // let navigate = useNavigate();

  //SEARCH STATES
  const [search, setSearch] = useState('');
    //Data STATES
    const [feedBackData, setfeedbackData] = useState([]);

    useEffect(() => {
      getfeedback()
    }, [])

  const getfeedback = async () => {
    let tempdata = [];
    const data = db;
    const snapshot = await data
        .collection("feedback")
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                let tempobj = {
                uid: doc.id,
                driver_name: doc.data().driver_name,
                user_name: doc.data().user_name,
                experience: doc.data().feedback,
                behaviour: doc.data().behaviour,
                publishtime: doc.data().publishtime
                };
                tempdata.push(tempobj)
                console.log(tempdata)
              });
            })
            setfeedbackData(tempdata)
            .catch(function (error) {
            });
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

  const rows = feedBackData.filter((val) => {
    if (search == '') {
      return val
    }
    else if (val.user_name.includes(search)) {
      return val
    }
  }).map((val) => {
    return {
      id: val.uid,
      PassengerName: { User_Name: val.user_name},
      DriverName: { Driver_Name: val.driver_name },
      Behaviour: {Behaviour: val.behaviour},
      Experience: { Experience: val.experience },
    }
  })

  const columns = [
    {
      flex: 0.5, field: 'PassengerName', headerName: 'Passenger Name', headerClassName: 'super-app-theme--header', cellClassName: 'super-app',
      valueFormatter: (params) => {
        const valuePassengerName = params.value.User_Name;
        return `${valuePassengerName}`;
      },
      renderCell: (params) => (
        <>
          <Avatar {...stringAvatar(params.value.User_Name)} />
          <div>
            <Typography variant="body2" sx={{ ml: '5%' }}>{params.value.User_Name}</Typography>
            {/* <Typography color="textSecondary" variant="caption" sx={{ ml: '5%' }}>{params.value.User_Id}</Typography> */}
          </div>
        </>
      )
    },
    {
      flex: 0.5, field: 'DriverName', headerName: 'Driver Name', headerClassName: 'super-app-theme--header',
      valueFormatter: (params) => {
        const valueDriverName = params.value.Driver_Name;
        return `${valueDriverName}`;
      },
      renderCell: (params) => (
        <>
            <Typography variant="body2">{params.value.Driver_Name}</Typography>
        </>
      )
    },
    {
      flex: 0.5, field: 'Experience', headerName: 'Passenger Experience', headerClassName: 'super-app-theme--header',
      valueFormatter: (params) => {
        const valueExperience = params.value.Experience;
        return `${valueExperience}`;
      },
      renderCell: (params) => (
        <>
        {/* <Avatar {...stringAvatar(params.value.hospitalName)} /> */}
        <div>
          <Typography variant="body2">{params.value.Experience}</Typography>
          {/* <Typography color="textSecondary" variant="caption">{params.value.Password}</Typography> */}
        </div>
      </>
      )
    },
    {
      flex: 0.5, field: 'Behaviour', headerName: 'Behaviour', headerClassName: 'super-app-theme--header',
      valueFormatter: (params) => {
        const valueBehaviour = params.value.Behaviour;
        return `${valueBehaviour}`;
      },
      renderCell: (params) => (
        <div>
           <Typography variant="body2">{params.value.Behaviour}</Typography>
        </div>
      )
    },
    // {
    //   flex: 0.5, field: 'UID', headerName: 'Actions', headerClassName: 'super-app-theme--header',
    //   renderCell: (params) => (
    //     <div style={{display:'flex', width:'100%', justifyContent:'space-around'}}>
    //       <Button variant='contained' color='primary' onClick={()=>{updateStatus(params.value.uid, 'accepted')}}>Accept</Button>
    //       <Button variant='contained' color='primary' onClick={()=>{updateStatus(params.value.uid, 'rejected')}}>Reject</Button>
    //   </div>
    //   )
    // }
  ];

  return (
    <Grid container rowSpacing={1} columnSpacing={1} >
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Paper elevation={10} style={{ padding: '1%' }}>

          <div role="presentation">
            <Breadcrumbs aria-label="breadcrumb">
            <Typography variant='caption' color="text.primary">Dashboard</Typography>
              <Typography variant='caption' color="text.primary">Feedback</Typography>
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
                placeholder="Search By User Name....."
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
                components={{  Pagination: CustomPagination }}
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