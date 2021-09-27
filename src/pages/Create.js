import React from 'react'
import { useState } from 'react'

import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Container from '@material-ui/core/Container';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { FormControlLabel, FormLabel, makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl'
import { useHistory } from 'react-router';



const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block'
  }
});


export default function Create() {
  const classes = useStyles();
  const history=useHistory();
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [titleError, setTitleError] = useState(false)
  const [detailsError, setDetailsError] = useState(false)
  const [category, setCategory] = useState('link')

  const handleSubmit = (e) => {
    e.preventDefault()
    setTitleError(false)
    setDetailsError(false)
    title == '' && setTitleError(true)
    details == '' && setDetailsError(true)
   if(title&&details){
     fetch('https://notes-app-ahmtadm.herokuapp.com/notes',{
       method:'POST',
       headers:{'Content-type':'application/json'},
       body:JSON.stringify({title,details,category})
     }).then(()=>history.push('/'))
   }

  }

  return (
    <Container>
      <Typography
        className={classes.title}
        variant='h6'
        component='h2'
        gutterBottom
        color='textSecondary'
      >
        Create a New Note
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>

        <TextField
          onChange={(e) => setTitle(e.target.value)}
          className={classes.field}
          label='Note Title'
          variant='outlined'
          color='secondary'
          fullWidth
          required
          error={titleError}

        />


        <TextField
          onChange={(e) => setDetails(e.target.value)}
          className={classes.field}
          label='Note Details'
          variant='outlined'
          color='secondary'
          fullWidth
          required
          multiline
          rows={4}
          error={detailsError}
        />
          <FormControl className={classes.field}>
          <FormLabel>Note Category</FormLabel>
          <RadioGroup value={category} onChange={(e) => setCategory(e.target.value)}>
            <FormControlLabel value='link' control={<Radio />} label='Link' />
            <FormControlLabel value='todos' control={<Radio />} label='Todos' />
            <FormControlLabel value='reminders' control={<Radio />} label='Reminders' />
            <FormControlLabel value='work' control={<Radio />} label='Work' />
          </RadioGroup>
          </FormControl>

        <Button

          type='submit'
          color='secondary'
          variant='contained'
          // startIcon={<SendIcon/>}
          endIcon={<KeyboardArrowRightIcon />}
          className={classes.btn}
        >
          Submit
        </Button>
      </form>


    </Container>
  )
}
