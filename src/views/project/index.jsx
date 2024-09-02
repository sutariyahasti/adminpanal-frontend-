
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, TextField, Typography, Grid, Card, CardContent, CardMedia, Paper, Box, Modal } from '@mui/material';
import axiosServices from 'utils/axios';
import PreviewIcon from '@mui/icons-material/Preview';
import SphereViewer from './Image360Viewer';
import { BaseApi } from 'store/api/constant';

const Project = () => {
  const [files, setFiles] = useState([]);
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [uploadedData, setUploadedData] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProjectImages, setSelectedProjectImages] = useState([]);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectData = await getProjects();
        setProjects(projectData);
      } catch (error) {
        setError('Failed to load projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleFileChange = (e) => {
    setFiles([...e.target.files]); // Handle multiple file selections
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!files.length || !projectName || !description) return;

    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append('imageUrl', file); // Append all files with the same key
    });
    formData.append('projectName', projectName);
    formData.append('description', description);

    try {
      const response = await axiosServices.post('/project', formData ,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setUploadedData([...uploadedData, response.data]);
      alert('Upload successful!');
    } catch (error) {
      console.error('Error uploading files', error);
    }
  };

  const getProjects = async () => {
    try {
      const response = await axiosServices.get('/project');
      return response.data.projects;
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  };

  const handleOpen = (images) => {
    setSelectedProjectImages(images);
    setIsViewerOpen(true);
  };

  const handleCloseViewer = () => {
    setIsViewerOpen(false);
  };



  return (
    <div style={{ padding: '5px' }}>
      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px', boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)' }}>
        <Typography variant="h5" gutterBottom>
          Upload New Project
        </Typography>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          <TextField
            label="Project Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
          <TextField
            label="Description"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div style={{ display: 'flex', justifyContent: 'start' }}>
            <Box
              marginTop={2}
              marginBottom={2}
              marginRight={2}
              padding={2}
              border="2px dashed #ccc"
              borderRadius="8px"
              textAlign="center"
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  borderColor: '#999'
                }
              }}
            >
              <input
                type="file"
                id="file-upload"
                multiple // Allow multiple file selection
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              <label htmlFor="file-upload">
                <Typography variant="body1" color="textSecondary">
                  {files.length > 0 ? `${files.length} files selected` : 'Upload Images'}
                </Typography>
              </label>
            </Box>
            <Button variant="contained" color="primary" type="submit" style={{ marginTop: '16px', marginBottom: '16px' }}>
              Upload Images
            </Button>
          </div>
        </form>
      </Paper>

      {loading ? (
        <Typography>Loading...</Typography>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Grid container spacing={2}>
          {projects.map((data, index) => (
            <Grid item xs={12} sm={4} md={2} key={index}>
              <Card 
                sx={{ 
                  ':hover': { 
                    boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)',
                  }, 
                  height: '300px', 
                  overflow: 'hidden', 
                  paddingBottom: '0px',
                  position: 'relative',
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={`${data.imageUrl[0]}`}
                  alt="Project image"
                  sx={{
                    transition: 'transform 0.3s ease-in-out',
                    ':hover': {
                      transform: 'scale(1.1)',
                    },
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'rgba(0, 0, 0, 0.5)',
                    color: 'white',
                    opacity: 0,
                    transition: 'opacity 0.3s ease-in-out',
                    ':hover': {
                      opacity: 1,
                    },
                  }}
                >
                  <PreviewIcon 
                    sx={{ fontSize: 50 }}
                    onClick={() => handleOpen(data.imageUrl)}
                  />
                </Box>
                <CardContent>
                  <Typography variant="h4">{data.projectName}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {data.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      {isViewerOpen && (
        <Modal   open={open}
        onClose={handleCloseViewer}>
          <SphereViewer
            images={selectedProjectImages}
            onClose={handleCloseViewer}
          />
        </Modal>
      )}
    </div>
  );
};

export default Project;

