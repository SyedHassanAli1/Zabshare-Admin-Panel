import React from 'react'
import {
    Grid
} from '@mui/material'
import FeedbackTable from '../../Components/Tables/FeedbackTable/FeedbackTable'

export default function Feedback() {
    return (
        <Grid container style={{height:'100%'}}>

            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <FeedbackTable/>    
            </Grid>
        </Grid>
    )
}
