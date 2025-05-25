
import * as React from 'react';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Modal,
  Divider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useContext } from 'react';
import UserContext from '../../allcontext';

export default function DocCard({ item }) {
  const [hovered, setHovered] = React.useState(false);
  const [detailsOpen, setDetailsOpen] = React.useState(false);

  const {  user, setCreatedoc } = useContext(UserContext);

  const handledelete = async () => {
    const token = user.access;
    const id = item.id;

    try {
      const response = await fetch(`/ap/delete/${id}/`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      setCreatedoc((prev) => prev + 1);

      if (response.ok) {
        console.log('Item deleted successfully');
      } else {
        console.error('Failed to delete item:', response.statusText);
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  const handleedit = () => {
    // your edit logic here
  };

  const handledetails = () => {
    setDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
  };

  return (
    <>
       <Box
      sx={{
        // width: '100%',
        // Width: 400,
        Height: 360,
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        transform: hovered ? 'translateY(-4px)' : 'none',
        '&:hover': {
          boxShadow: '0 8px 24px rgba(59,130,246,0.25)',
        },
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Card
        sx={{
          width: '100%',
          height: '100%',
          borderRadius: 4,
          backgroundColor: '#ffffff',
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          border: '1.5px solid transparent',
          backgroundImage: `
            linear-gradient(#fff, #fff),
            linear-gradient(to bottom right, #3b82f6, #8b5cf6)
          `,
          backgroundOrigin: 'border-box',
          backgroundClip: 'content-box, border-box',
          transition: 'border 0.3s ease',
          ...(hovered && {
            border: '1.5px solid #3b82f6',
          }),
        }}
      >
        {/* Edit & Delete Buttons on Hover */}
        {hovered && (
          <Box
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              display: 'flex',
              gap: 1,
              zIndex: 1,
            }}
          >
            <Tooltip title="Edit" arrow>
              <IconButton
                onClick={handleedit}
                sx={{
                  backgroundColor: '#e0f2fe',
                  '&:hover': {
                    backgroundColor: '#bfdbfe',
                  },
                }}
                size="small"
              >
                <EditIcon sx={{ color: '#3b82f6', fontSize: 18 }} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Delete" arrow>
              <IconButton
                onClick={handledelete}
                sx={{
                  backgroundColor: '#fee2e2',
                  '&:hover': {
                    backgroundColor: '#fecaca',
                  },
                }}
                size="small"
              >
                <DeleteIcon sx={{ color: '#ef4444', fontSize: 18 }} />
              </IconButton>
            </Tooltip>
          </Box>
        )}

        {/* Card Content */}
        <CardContent sx={{ flexGrow: 1, px: 2 ,//width: '100%',
              // whiteSpace: 'nowrap',
              height:"100%",}}>
          <Typography
            variant="h6"
            align="center"
            fontWeight="bold"
            gutterBottom
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {item.Title}
          </Typography>
          <Typography
            variant="body2"
            align="center"
            color="text.secondary"
            sx={{
              // maxHeight: 80,
              
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {item?.AI_description}
          </Typography>
        </CardContent>

        {/* Action Buttons */}
        <CardActions
          sx={{
            mt: 'auto',
            justifyContent: 'center',
            gap: 1,
            pb: 2,
            pt: 1,
            borderTop: '1px solid #f3f4f6',
            backgroundColor: '#f9fafb',
          }}
        >
          <Button
            variant="contained"
            href={item?.pdf_file}
            target="_blank"
            rel="noopener"
            sx={{
              textTransform: 'none',
              borderRadius: 2,
              px: 3,
              backgroundColor: '#3b82f6',
              fontWeight: 500,
              '&:hover': {
                backgroundColor: '#2563eb',
              },
            }}
          >
            Open PDF
          </Button>
          <Button
            variant="outlined"
            onClick={handledetails}
            sx={{
              textTransform: 'none',
              borderRadius: 2,
              px: 3,
              borderColor: '#3b82f6',
              color: '#3b82f6',
              fontWeight: 500,
              '&:hover': {
                backgroundColor: '#e0e7ff',
              },
            }}
          >
            Details
          </Button>
        </CardActions>
      </Card>
    </Box>

      {/* Details Modal */}
    <Modal
  open={detailsOpen}
  onClose={handleCloseDetails}
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
>
  <Box
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: { xs: '90%', sm: '80%' },
      background: 'linear-gradient(to bottom right,rgb(255, 255, 255),rgb(255, 255, 255),rgb(158, 167, 177))',
      borderRadius: 3,
      boxShadow: '0 4px 20px rgba(151, 39, 145, 0.6)',
      p: 4,
      maxHeight: '80vh',
      overflowY: 'auto',
      color: '#e0e0ff', // soft light font color
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    }}
  >
    <Typography
      id="modal-title"
      variant="h5"
      component="h2"
      gutterBottom
      sx={{ color: '#82aaff', fontWeight: '700', letterSpacing: '0.05em' }}
    >
      Document Details
    </Typography>
    <Divider sx={{ mb: 3, borderColor: '#444a7a' }} />

    {Object.entries(item)
      .filter(([key]) => key !== 'user' && key !== 'id')
      .map(([key, value]) => (
        <Box key={key} sx={{ mb: 2 }}>
          <Typography
            variant="subtitle1"
            component="span"
            sx={{
              fontWeight: '600',
              textTransform: 'capitalize',
              color: '#a3befc',
            }}
          >
            {key.replace(/_/g, ' ')}:
          </Typography>{' '}
          <Typography
            variant="body1"
            component="span"
            sx={{ wordBreak: 'break-word', color: 'black' }}
          >
            {key === 'pdf file' ? (
              <a
                href={value}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#ffb86c',
                  textDecoration: 'underline',
                  fontWeight: '500',
                }}
              >
                {value}
              </a>
            ) : typeof value === 'object' && value !== null ? (
              <pre
                style={{
                  whiteSpace: 'pre-wrap',
                  margin: 0,
                  fontFamily: 'monospace',
                  color: '#cdd6f4',
                }}
              >
                {JSON.stringify(value, null, 2)}
              </pre>
            ) : (
              String(value)
            )}
          </Typography>
        </Box>
      ))}

    <Box textAlign="right" mt={4}>
      <Button
        onClick={handleCloseDetails}
        variant="contained"
        sx={{
          backgroundColor: '#82aaff',
          color: '#1e1e2f',
          fontWeight: '700',
          px: 3,
          '&:hover': {
            backgroundColor: '#5a82e4',
          },
        }}
      >
        Close
      </Button>
    </Box>
  </Box>
</Modal>

    </>
  );
}
