import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Card, CardContent, Button } from '@mui/material';
import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import {  useSelector } from 'react-redux/es/hooks/useSelector';

const Team = () => {
  const { id } = useParams();
  const [team, setTeam] = useState({});
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const navigate = useNavigate();
  const isAdmin = Boolean(useSelector((state)=>state.isAdmin))

  const getTeam = async () => {
    try {
      const res = await Axios.get(`http://localhost:5000/teams/getTeamDetails/${id}`);
      setTeam(res.data);
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

  const handleTeamDel = async(req,res) => {
    try{
        const res = Axios.delete(`http://localhost:5000/teams/del/team/${team._id}`)
        .then((res)=>{
            toast.error('Team Deleted', {autoClose: 2000 });
            setTimeout(()=>{
                navigate('/admin');
            },1000);
        })
    }
    catch(error){
        console.log(error)
    }
  }

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
        <Card sx={{ marginTop: '30px', marginBottom: '20px' }}>
          <CardContent>
          { isAdmin && 
          (  
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>  
          <div>
            <Link to={`/admin/add/team/${team._id}`} style={{textDecoration:"none"}}>
               <Button variant='outlined'>
                   Edit
               </Button>
            </Link>   
          </div>
          <div>
               <Button variant='container' style={{color:'red'}} onClick={handleDeleteConfirmationOpen}>
                   Delete
               </Button>
          </div>
          </div>
          )
          }
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <h1
                className='text-center mb4'
                style={{
                  fontFamily: "'Dancing Script', cursive",
                  fontSize: '2.5rem',
                  fontWeight: 'bold',
                  marginTop: '30px',
                }}
              >
                {team.teamname}
              </h1>
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
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginTop:"40px" }}>
              <FontAwesomeIcon icon={faLocationDot} style={{ marginRight: '10px' }} />
              <span>Hometown: {team.hometown}</span>
            </div>
            <div style={{marginTop:"40px"}}>
              <h3 style={{ position: 'relative', paddingBottom: '10px', fontWeight: 'bold', marginBottom:"10px" }}>
              Team Description
              </h3>
              <p>{team.teamdescription}</p>
            </div>
            <div style={{marginTop:"40px"}}>
            <h3 style={{ position: 'relative', paddingBottom: '10px', fontWeight: 'bold' }}>
            Team Members
             </h3>
              {team?.teammembers &&
                Object.keys(team.teammembers).map((type) => (
                  <div key={type} style={{ marginBottom: '20px' }}>
                    <h4 style={{ fontWeight: 'bold' }}>{type}</h4>
                    <ul style={{marginTop:"12px", marginBottom:"12px"}}>
                      {team?.teammembers[type]?.map((name, index) => (
                        <li key={index} style={{ fontFamily: 'italic' }}>
                          {name}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </Box>
      <Dialog open={deleteConfirmationOpen} onClose={handleDeleteConfirmationClose}>
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this team?</p>
          <p style={{color:"red"}}>Many unexpected things may happen!!</p> 
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteConfirmationClose}>Cancel</Button>
          <Button onClick={handleTeamDel} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Team;
