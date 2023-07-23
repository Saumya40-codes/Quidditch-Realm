import { Box, Card, TextField, Button, CardContent, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faThumbsUp, faMagic, faTrash } from "@fortawesome/free-solid-svg-icons";

const Comments = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [likes, setLikes] = useState(0);
  const [existingComments, setExistingComments] = useState([]);
  const [editMode, setEditMode] = useState({});

  const getAdminComments = async () => {
    try {
      const res = await Axios.get(`http://localhost:5000/events/get/${id}`);
      setComments(res.data.comment);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAdminComments();
  }, []);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await Axios.put(`http://localhost:5000/events/addComment/${id}`, {
        comment: comment,
        username: user.username,
        date: new Date(),
        likes: 0,
      });
      setExistingComments(res.data.usercomments);
      setComment('');
    } catch (error) {
      console.log(error);
    }
  };

  const getExistingComments = async () => {
    try {
      const res = await Axios.get(`http://localhost:5000/events/get/${id}`);
      setExistingComments(res.data.usercomments);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getExistingComments();
  }, []);

  const handleDeleteComment = async (e, comment_id) => {
    e.preventDefault();
    try {
      const res = await Axios.put(`http://localhost:5000/events/deleteComment/${id}`, {
        commentId: comment_id,
      });
      setExistingComments(res.data.usercomments);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditMode = (id) => {
    setEditMode((prevEditMode) => ({
      ...prevEditMode,
      [id]: !prevEditMode[id],
    }));
    console.log(existingComments)
  };

  const handleChange = (e, id) => {
    const commentIndex = existingComments.findIndex((comment) => comment._id === id);
    if (commentIndex !== -1) {
      const updatedComments = [...existingComments];
      updatedComments[commentIndex].comment = e.target.value;
      setExistingComments(updatedComments);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
        const res = await Axios.put(`http://localhost:5000/events/editComment/${id}`, {
            usercomments: existingComments,
        });
        setExistingComments(res.data.usercomments);
        setEditMode({})
    } catch (error) {
        console.log(error);
    }
};

const handleLike = async (comment_id) => {
    try {
      const commentIndex = existingComments.findIndex((comment) => comment._id === comment_id);
      if (commentIndex !== -1) {
        const updatedComments = [...existingComments];
        if (updatedComments[commentIndex].likes === 0) {
          updatedComments[commentIndex].likes += 1;
        } else {
          updatedComments[commentIndex].likes -= 1;
        }
        setExistingComments(updatedComments);

        const res = await Axios.put(`http://localhost:5000/events/editComment/${id}`, {
            usercomments: existingComments,
        });
        setExistingComments(res.data.usercomments);
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div>
      <Box sx={{ display: "flex", marginTop: "60px", borderRadius: "12px" }}>
        <Card style={{ width: "100%" }}>
          <Typography variant="h3" component="h1" gutterBottom style={{ margin: "20px", fontFamily: "italic", fontSize: "18px", marginBottom: "5px", fontWeight: "bold" }}>
            {comments}
          </Typography>
          <Typography variant="h3" component="h1" gutterBottom style={{ margin: "20px", fontFamily: "italic", fontSize: "18px", marginBottom: "5px", fontWeight: "bold" }}>
            Share your thoughts!!
          </Typography>
          <div style={{ display: "flex", flexDirection: "column"}}>
            <TextField id="outlined-multiline-static" label="Comment" multiline rows={4} value={comment} placeholder="Enter your comment here" style={{ width: "90%", margin: "20px", marginLeft:"20px"}} onChange={handleCommentChange} />
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Button variant="contained" size="large" sx={{ width: "380px", marginLeft: "20px", marginBottom: "20px" }} onClick={handleSubmit}>
              Submit
            </Button>
            </div>
          </div>
          <hr />
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Typography variant="h3" component="h1" gutterBottom style={{ margin: "20px", fontFamily: "italic", fontSize: "18px", marginBottom: "5px", fontWeight: "bold" }}>
              Comments
            </Typography>
          </div>

          {existingComments?.map((comment) => (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h3" component="h1" gutterBottom style={{ margin: "20px", fontFamily: "italic", fontSize: "18px", marginBottom: "5px", fontWeight: "bold" }}>
                  <FontAwesomeIcon icon={faUser} style={{ color: "#2862c8", width: "30px", height: "30px", marginRight: "5px" }} />
                  {comment.username}
                </Typography>
                <Typography variant="h3" component="h1" gutterBottom style={{ margin: "20px", fontFamily: "italic", fontSize: "18px", marginBottom: "5px", fontWeight: "bold" }}>
                  Posted on: {String(comment.date).toLocaleString().substring(0, 10)}
                </Typography>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              {!editMode[comment._id] ? (
                  <Typography variant="h3" component="h1" gutterBottom style={{ margin: "20px", fontFamily: "italic", fontSize: "18px", marginBottom: "5px" }}>
                    {comment.comment}
                  </Typography>
                ) : (
                  <div style={{ display: "flex" }}>
                    <TextField
                      id="outlined-multiline-static"
                      label="Comment"
                      value={comment.comment}
                      placeholder="Enter your comment here"
                      onChange={(e) => handleChange(e, comment._id)}
                      multiline
                      rows={2}
                      sx={{ margin:"20px 25px 20px 20px"}}
                      inputProps={{ style: { width: "680px" } }}
                    />
                    <Button variant="contained" size="small" onClick={handleEdit} style={{width:"90px", height:"40px", marginTop:"30px", marginBottom:"20px"}}>
                      Edit
                    </Button>
                  </div>
                )}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography variant="h3" component="h1" gutterBottom style={{ margin: "20px", fontFamily: "italic", fontSize: "18px", marginBottom: "5px" }}>
                    <FontAwesomeIcon icon={faMagic} style={{ color: "#2862c8", marginRight: "5px", cursor: "pointer" }} onClick={() => handleEditMode(comment._id)} />
                  </Typography>
                  <Typography variant="h3" component="h1" gutterBottom style={{ margin: "20px", fontFamily: "italic", fontSize: "18px", marginBottom: "5px" }}>
                    <FontAwesomeIcon icon={faTrash} style={{ color: "red", marginRight: "5px", cursor: "pointer" }} onClick={(e) => handleDeleteComment(e, comment._id)} />
                  </Typography>
                </div>
              </div>
              <div style={{ display: "flex" }}>
                <Typography variant="h3" component="h1" gutterBottom style={{ margin: "20px", fontFamily: "italic", fontSize: "18px", marginBottom: "5px" }}>
                  <FontAwesomeIcon icon={faThumbsUp} style={{ color: "#2862c8", marginRight: "5px", cursor: "pointer" }} onClick={(e)=>handleLike(comment._id)} /> {comment.likes}
                </Typography>
              </div>
              <hr />
            </div>
          ))}
        </Card>
      </Box>
    </div>
  );
};

export default Comments;
