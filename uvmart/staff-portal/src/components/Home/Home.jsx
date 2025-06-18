import React from 'react'
import {Button, Card} from'@mui/material';
import { useStyles } from '../../styles';
import { useNavigate} from 'react-router-dom'

function Home() {
  const classes = useStyles();
  const navigate = useNavigate()
  return (
    <div className="mt-5 p-5" >
      <div className="flex align-middle items-center m-3 p-3 w-full">
        <Card>
          <Button className={classes.siginbutton} onClick={()=>{ navigate('/added-categories') }}>
              Add Categories
          </Button>
        </Card>
      </div>
    </div>
  )
}

export default Home
