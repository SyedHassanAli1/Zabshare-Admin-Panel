import React from 'react'
import {
  Grid
} from '@mui/material'
import RecentUserCard from '../../Components/Cards/RecentUserCard/RecentUserCard';

export default function Dashboard() {
  return (
      <Grid container rowSpacing={1} columnSpacing={1} direction={'row'}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ backgroundColor: 'none' }}>
          <RecentUserCard />
        </Grid>
      </Grid>
  )
}
