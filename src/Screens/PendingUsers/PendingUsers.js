import React from 'react'
import {
    Grid
} from '@mui/material'
import PendingUserTable from '../../Components/Tables/PendingUserTable/PendingUserTable'

export default function PendingUsers() {
    return (
        <Grid container style={{height:'100%'}}>

            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <PendingUserTable/>    
            </Grid>
        </Grid>
    )
}
