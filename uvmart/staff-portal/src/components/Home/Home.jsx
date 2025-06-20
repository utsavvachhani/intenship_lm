import React from 'react'
import { Button, Card, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux";
import { RoleExplanation } from "../../api/RoleExpalnation";
import CategoryIcon from '@mui/icons-material/Category';
function Home() {
  const navigate = useNavigate()
  const storedUser = useSelector((state) => state.auth.user)
  const buttons = RoleExplanation[storedUser?.role]?.buttons || [];
  return (
    <Card className="p-6 m-7 rounded-xl shadow-md overflow-hidden">
      <Typography className="flex justify-center text-3xl font-bold " variant="h5">
        <CategoryIcon className={`mr-4`} fontSize="large" />
        basic Deatils
      </Typography>
      <div className="w-full my-4 mx-auto h-auto bg-gray-100 rounded p-4 flex flex-wrap gap-4 justify-center">
        {buttons.length > 0 ? (
          buttons.map(({ _id, label, navigatePath, icon }) => (
            <Button
              key={_id}
              variant="contained"
              startIcon={icon}
              onClick={() => navigate(navigatePath)}
            >
              {label}
            </Button>
          ))
        ) : (
          <Typography className="text-center w-full" color="textSecondary">
            No actions available for your role.
          </Typography>
        )}
      </div>
    </Card>

  )
}

export default Home
