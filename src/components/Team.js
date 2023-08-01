import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Paper, Button, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { toast } from 'react-toastify';

const Team = () => {
  const { id } = useParams();
  const searchName = new URLSearchParams(window.location.search);
  const name = searchName.get('name');
  const [team, setTeam] = useState({});
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const navigate = useNavigate();
  const isAdmin = Boolean(useSelector((state) => state.isAdmin));

  const getTeam = async () => {
    try {
      if(!(id === undefined)){
        console.log(id)
      const res = await Axios.get(`https://quidditch-realm-rgxcs2bg2-saumya40-codes.vercel.app/teams/getTeamDetails/${id}`);
      setTeam(res.data);
      }
      else if(name){
        console.log(name);
        const res = await Axios.get(`https://quidditch-realm-rgxcs2bg2-saumya40-codes.vercel.app/teams/name/${name}`)
        console.log(res.data);
        setTeam(res.data);
      }
      else{
        alert("You dumb")
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTeam();
  }, []);

  const handleDeleteConfirmationOpen = (event) => {
    setEventToDelete(event);
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirmationClose = () => {
    setDeleteConfirmationOpen(false);
    setEventToDelete(null);
  };

  const handleTeamDel = async (req, res) => {
    try {
      const res = Axios.delete(`https://quidditch-realm-rgxcs2bg2-saumya40-codes.vercel.app/teams/del/team/${team._id}`).then((res) => {
        toast.error('Team Deleted', { autoClose: 2000 });
        setTimeout(() => {
          navigate('/admin');
        }, 1000);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
      <Paper sx={{ marginTop: '30px', marginBottom: '20px', padding: '20px' }}>
        {/* Admin edit and delete buttons */}
        {isAdmin && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <Link to={`/admin/add/team/${team._id}`} style={{ textDecoration: 'none' }}>
              <Button variant='outlined'>Edit</Button>
            </Link>
            <Button variant='contained' style={{ color: 'red' }} onClick={handleDeleteConfirmationOpen}>
              Delete
            </Button>
          </Box>
        )}

        {/* Team Name and Logo */}
        <Box sx={{ textAlign: 'center', marginBottom: '30px' }}>
          <Typography variant="h3" component="h1" style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 'bold', marginTop: '30px', marginBottom:"20px" }}>
            {team.teamname}
          </Typography>
          <img
            src={team.teamlogo}
            alt="team logo"
            style={{
              width: '250px',
              height: '290px',
              objectFit: 'cover',
              margin: '0 auto',
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
              borderRadius: '8px',
            }}
          />
        </Box>

        {/* Hometown */}
        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '40px' }}>
          <FontAwesomeIcon icon={faLocationDot} style={{ marginRight: '10px' }} />
          <Typography variant="body1" component="span">
            Hometown: {team.hometown}
          </Typography>
        </Box>

        {/* Team Description */}
        <Box sx={{ marginTop: '40px' }}>
          <Typography variant="h4" component="h3" style={{ fontWeight: 'bold', marginBottom: '10px' }}>
            Team Description
          </Typography>
          <Typography variant="body1" component="p">
            {team.teamdescription}
          </Typography>
        </Box>

        {/* Team Members */}
        <Box sx={{ marginTop: '40px' }}>
          <Typography variant="h4" component="h3" style={{ fontWeight: 'bold', marginBottom: '20px' }}>
            Team Members
          </Typography>
          {team?.teammembers &&
            Object.keys(team.teammembers).map((type) => (
              <Box key={type} sx={{ marginBottom: '20px' }}>
                <Typography variant="h5" component="h4" style={{ fontWeight: 'bold' }}>
                  {type}
                </Typography>
                <ul style={{ marginTop: '12px', marginBottom: '12px', listStyleType: 'none', paddingLeft: '0' }}>
                  {team?.teammembers[type]?.map((name, index) => (
                    <li key={index} style={{ fontFamily: 'italic' }}>
                      {name}
                    </li>
                  ))}
                </ul>
              </Box>
            ))}
        </Box>
      </Paper>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmationOpen} onClose={handleDeleteConfirmationClose}>
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          <Typography variant="body1" component="p">
            Are you sure you want to delete this team?
          </Typography>
          <Typography variant="body1" component="p" style={{ color: 'red' }}>
            Many unexpected things may happen!!
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteConfirmationClose}>Cancel</Button>
          <Button onClick={handleTeamDel} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Team;
