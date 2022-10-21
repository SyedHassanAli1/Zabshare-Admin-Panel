import React, { useState, useEffect } from 'react'
import './Style.css';
import {
    Grid,
    Paper,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Skeleton
} from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { db } from '../../../FirebaseConfig';



export default function RecentUserCard() {

    let navigate = useNavigate();

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
         .orderBy('student_name').limit(6)
         .get()
         .then(function (querySnapshot) {
             querySnapshot.forEach(function (doc) {
                 let tempobj = {
                 uid: doc.id,
                 student_name: doc.data().student_name,
                 student_contact: doc.data().student_contact,
                 designation: doc.data().designation,
                 };
                 {
                   tempdata.push(tempobj)
                 }
                 
               });
             })
             .catch(function (error) {
             });
             setUserData(tempdata)
             // console.log('Users data is: ',userData)
 }

    return (
        <Grid container rowSpacing={1} columnSpacing={1}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Paper elevation={10} className='userCardPaperContainer'>
                    <div className='userCardContainerHeader'>
                        <Typography variant='subtitle2' align='left' color='#4f5ace' style={{ fontWeight: 'bolder' }}>Recent Users</Typography>
                    </div>
                    <Table aria-label="simple table">
                        <TableHead className='userCardTableHeader'>
                            <TableRow>
                                <TableCell size='small' style={{ fontWeight: 'bold', borderTopLeftRadius:'1vh' }}>NAME</TableCell>
                                <TableCell size='small' style={{ fontWeight: 'bold', borderTopLeftRadius:'1vh' }}>CONTACT</TableCell>
                                <TableCell size='small' style={{ fontWeight: 'bold', borderTopRightRadius:'1vh' }}>DESIGNATION</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {userData ?
                                (
                                    userData.map((value, index) => {
                                        return (
                                            <TableRow key={index}>
                                                <TableCell size='small' style={{ textTransform: 'capitalize', fontSize: 'small' }}>{value.student_name}</TableCell>
                                                <TableCell size='small' style={{ textTransform: 'capitalize', fontSize: 'small' }}>{value.student_contact}</TableCell>
                                                <TableCell size='small' style={{ textTransform: 'capitalize', fontSize: 'small' }}>
                                                    {value.designation == 0 ? ('Driver'): ('Passenger')}
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                )
                                :
                                (
                                    <><Skeleton variant="text" />
                                        <Skeleton variant="text" />
                                        <Skeleton variant="text" />
                                        <Skeleton variant="text" />
                                        <Skeleton variant="text" /></>
                                )
                            }
                        </TableBody>
                    </Table>
                    <Typography variant='caption' color='textSecondary' className='userCardContainerHeaderText'
                        onClick={() => { navigate('all-users') }}>
                        View More
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    )
}
