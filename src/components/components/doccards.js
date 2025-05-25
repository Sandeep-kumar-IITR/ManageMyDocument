import React, { useEffect, useContext } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import DocCard from './doccard';
import UserContext from '../../allcontext';
// import { red } from '@mui/material/colors';

export default function DocCards() {
  const { user, data, setData, createdoc } = useContext(UserContext);

  useEffect(() => {
    const token = user.access;

    const fetchData = async () => {
      try {
        const response = await fetch("/ap/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data1 = await response.json();
        setData(data1);
        console.log("Data from API:", data1);
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]); // Reset data on error
      }
    };

    fetchData();
  }, [createdoc,user.access, setData]);

  return (
    <Box
      sx={{
        // width: '100%',
        flexGrow: 1,
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #3b82f6, #8b5cf6, #bfdbfe)',
        py: 4,
        px: { xs: 2, sm: 4, md: 8 },
      }}
    >
      <Typography variant="h4" align="center" gutterBottom color="white" fontWeight="bold">
        Document Library
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {Array.isArray(data) &&
          data.map((item, index) => (
            <Grid
              item
              key={item.id || index}
              xs={12}     // 1 column on xs
              sm={12}     // 1 column on sm
              md={6}      // 2 columns on md and up
              lg={6}
              sx={{
                // width:"50%",
                // display: 'flex',
                // justifyContent: 'center',
              }}
            >
              <Box
                sx={{
                  // width: '50%',
                  // maxWidth: 400,
                  height : "100%",
                  // backgroundColor: red[200],
                  borderRadius: 2,
                  p: 2,
                }}
              >
                <DocCard item={item} />
              </Box>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}
