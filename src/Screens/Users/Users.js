import React from 'react'
import {
    Grid
} from '@mui/material'
import UserTable from '../../Components/Tables/UserTable/UserTable'

export default function Users() {
    return (
        <Grid container style={{height:'100%'}}>

            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <UserTable/>    
            </Grid>

        </Grid>
    )
}
