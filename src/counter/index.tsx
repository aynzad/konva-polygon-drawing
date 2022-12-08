import React, { useState } from 'react'

import { Button, Grid, TextField, Typography } from '@mui/material'

import { useAppDispatch,useAppSelector } from '../store/hooks'

import {
  decrement,
  increment,
  incrementByAmount,
  incrementIfOdd,
  selectCount
} from './counterSlice'

export function Counter() {
  const count = useAppSelector(selectCount)
  const dispatch = useAppDispatch()
  const [incrementAmount, setIncrementAmount] = useState('2')

  const incrementValue = Number(incrementAmount) || 0

  return (
    <Grid gap={2} sx={{ my: 5 }}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        gap={2}
        sx={{ mb: 5 }}
      >
        <Button
          variant="outlined"
          size="small"
          color="primary"
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </Button>
        <Typography variant="h2">{count}</Typography>
        <Button
          variant="outlined"
          size="small"
          color="primary"
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </Button>
      </Grid>
      <Grid container justifyContent="center" alignItems="center" gap={2}>
        <TextField
          margin="dense"
          size="small"
          label="Set increment amount"
          variant="outlined"
          value={incrementAmount}
          onChange={e => setIncrementAmount(e.target.value)}
        />
        <Button
          size="medium"
          variant="outlined"
          color="primary"
          onClick={() => dispatch(incrementByAmount(incrementValue))}
        >
          Add Amount
        </Button>
        <Button
          size="medium"
          variant="outlined"
          color="primary"
          onClick={() => dispatch(incrementIfOdd(incrementValue))}
        >
          Add If Odd
        </Button>
      </Grid>
    </Grid>
  )
}
