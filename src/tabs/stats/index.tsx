import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import {
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'

import {
  selectMaxPoints,
  selectMinPoints,
  selectTotalPoints,
  selectTotalPolygons
} from '../editor/editorSlice'

export function Stats() {
  const totalPolygons = useSelector(selectTotalPolygons)
  const totalPoints = useSelector(selectTotalPoints)
  const maxPoints = useSelector(selectMaxPoints)
  const minPoints = useSelector(selectMinPoints)

  const rows = useMemo(() => {
    return [
      {
        title: 'Total number of drawn polygons',
        value: totalPolygons
      },
      {
        title: 'Total number of points',
        value: totalPoints
      },
      {
        title: 'Maximum points of a polygon',
        value: maxPoints
      },
      {
        title: 'Minimum points of a polygon',
        value: minPoints
      }
    ]
  }, [maxPoints, minPoints, totalPoints, totalPolygons])

  return (
    <Grid sx={{ py: 5, px: 2 }}>
      <Container maxWidth="md">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="stats table">
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: 'secondary.light'
                }}
              >
                <TableCell variant="head" color="white">
                  Title
                </TableCell>
                <TableCell variant="head" align="right">
                  Value
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.title}
                  </TableCell>
                  <TableCell align="right">{row.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Grid>
  )
}
