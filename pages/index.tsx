import type { NextPage } from 'next'
import { Layout } from '../components/layouts'
import { Card, CardHeader, Grid } from '@mui/material'
import { EntryList, NewEntry } from '../components/ui'

const HomePage: NextPage = () => {
  return (
    <Layout title="Home OpenJira">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title="Pendiente" />
            <NewEntry />
            <EntryList status="pending" />
          </Card>
        </Grid>
        {/* //item2 */}
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title="En Progreso" />
            <EntryList status="i-progress" />
          </Card>
        </Grid>
        {/* //item3 */}
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title="Completadas" />
            <EntryList status="finished" />
          </Card>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default HomePage
