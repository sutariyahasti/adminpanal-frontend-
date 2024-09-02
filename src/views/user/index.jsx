import React, { useEffect, useState } from 'react'
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Avatar, Chip, IconButton,
  Typography
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied'
import DeleteIcon from '@mui/icons-material/Delete';
import axiosServices from 'utils/axios';
import { Box } from '@mui/system';

function Users() {
  const [headers, setHeaders] = useState([]);
  const [users, setUsers] = useState([]);


  useEffect(() => {
    axiosServices.get('users')
      .then((response) => {
        const usersData = response.data.users;
        if (usersData.length > 0) {
          const keys = Object.keys(usersData[0]);
          const filteredKeys = keys.filter(key => !['_id', 'password', 'lastLogin','__v'].includes(key));
          setHeaders(filteredKeys); 
        }
        setUsers(response.data.users);
      
               
      })
      
      .catch((error) => {
       console.log("error in getting user:",error);
       
      });
  }, []);
 
  const statusColors = {
    Active: 'success',
    Pending: 'warning',
    Rejected: 'error',
  };
  return (
    <>
    {users.length > 0 ?
   <TableContainer component={Paper}>
      <Table>
        <TableHead style={{backgroundColor : '#ede7f6'}}>
          <TableRow>
            {headers.map((header, index) => (
              <TableCell key={index}>{header.charAt(0).toUpperCase() + header.slice(1)}</TableCell>
            ))}
            <TableCell>Actions</TableCell> 
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={user.id} sx={{
              '&:hover': {
                backgroundColor: '#ede7f6',
              }
            }} >
              {headers.map((header) => (
                <TableCell key={header}>
                  {header === 'avatar' ? (
                    <Avatar src={user[header]} alt={user.name} style={{ marginRight: 10 }} />
                  ) : header === 'status' ? (
                    <Chip
                      label={user[header]}
                      color={statusColors[user[header]]}
                      variant="filled"
                    />
                  ) : (
                    user[header]
                  )}
                </TableCell>
              ))}
              <TableCell>
                <IconButton>
                  <EditIcon />
                </IconButton>
                <IconButton color="error">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> :

<Box
display="flex"
flexDirection="column"
alignItems="center"
justifyContent="center"
height="100%"
p={2}
textAlign="center"
style={{ color: '#555' }} // Customize the color
>
<SentimentDissatisfiedIcon style={{ fontSize: 80, color: '#f57c00' }} />
<Typography variant="h1" style={{ marginTop: 16, fontWeight: 'bold' }}>
  No Data Found
</Typography>
<Typography variant="body1" style={{ marginTop: 8 }}>
  It looks like we couldn’t find any data. Please try again later!
</Typography>
</Box>
    }
  </>
  )
}

export default Users