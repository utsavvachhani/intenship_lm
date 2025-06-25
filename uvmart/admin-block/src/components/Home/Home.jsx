import React from 'react';
import { Button, Card, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { RoleExplanation } from '../../api/RoleExplanation';
import {useStyles} from '../../styles';
function Home() {
  const navigate = useNavigate();
const classes = useStyles();
  return (
    <div className="p-6 space-y-6">
      {Object.entries(RoleExplanation).map(([sectionTitle, { icon: SectionIcon, action }]) => (
        
        <Card key={sectionTitle} style={{borderRadius : "20px", borderLeft : "black 4px solid"}} className="p-5">
          <div className="my-3">
            <Typography variant="h5" className="flex items-center text-xl font-semibold capitalize " >
              {SectionIcon}
              <span className="ml-2">{sectionTitle}</span>
            </Typography>

          </div>
          <div className="flex flex-wrap gap-4">
            {action.map(({ _id, label, navigatePath, icon }) => (
              <Button
                key={_id}
                variant="contained"
                startIcon={icon}
                onClick={() => navigate(navigatePath)}
                className={`min-w-[200px] ${classes.siginbutton}`} 
              >
                {label}
              </Button>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}

export default Home;
