import { Box, Card, TextField, Button, CardContent, Typography } from "@mui/material"
import { useState, useEffect } from "react"
import Axios from "axios"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons"

const Comments = () => {
    const {id} = useParams()
    const user = useSelector((state)=>state.user)
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState('')
    const [existingComments, setExistingComments] = useState([{}] || [])

    const getAdminComments = async () => {
        try{
            const res = await Axios.get(`http://localhost:5000/events/get/${id}`)
            setComments(res.data.comment)
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAdminComments()
    }, [])

    const handleCommentChange = async (e) => {
        setComment(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const res = await Axios.put(`http://localhost:5000/events/addComment/${id}`, {
                comment: comment,
                username: user.username,
                date: new Date()
            })
            .then((res) => {
                setExistingComments(res.data.usercomments);
                setComment('');
            })
        }
        catch (error) {
            console.log(error)
        }
    }

    const getExistingComments = async () => {
        try{
            const res = await Axios.get(`http://localhost:5000/events/get/${id}`)
            setExistingComments(res.data.usercomments)
            console.log(res.data.usercomments)
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getExistingComments()
    }, [])


  return (
    <div>
        <Box sx={{ display: 'flex', marginTop:"60px", borderRadius:"12px" }}>
        <Card style={{width:"100%"}}>
        <Typography variant="h3" component="h1" gutterBottom style={{margin:"20px", fontFamily:"italic", fontSize:"18px", marginBottom:"5px", fontWeight:"bold"}}>
        {comments}
        </Typography>
        <Typography variant="h3" component="h1" gutterBottom style={{margin:"20px", fontFamily:"italic", fontSize:"18px", marginBottom:"5px", fontWeight:"bold"}}>
        Share your thoughts!!
        </Typography>
        <div style={{ display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
        <TextField
        id="outlined-multiline-static"
        label="Comment"
        multiline
        rows={4}
        value={comment}
        placeholder="Enter your comment here"
        style={{width:"90%", margin:"20px"}}
        onChange={handleCommentChange}
        />
        <Button variant="contained" size="large" sx={{ flex: 1, width: "380px", marginLeft:"20px", marginBottom:"20px" }} onClick={handleSubmit}>
        Submit
        </Button>
        </div>
        <hr />
        <div style={{ display:"flex", justifyContent:"center", alignItems:"center"}}>
        <Typography variant="h3" component="h1" gutterBottom style={{margin:"20px", fontFamily:"italic", fontSize:"18px", marginBottom:"5px", fontWeight:"bold"}}>
        Comments
        </Typography>
        </div>

        {existingComments?.map((comment) => (
            <div style={{display:"flex", flexDirection:"column"}}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center"}}>
            <Typography variant="h3" component="h1" gutterBottom style={{margin:"20px", fontFamily:"italic", fontSize:"18px", marginBottom:"5px", fontWeight:"bold"}}>
            <FontAwesomeIcon icon={faUser} style={{color:"#2862c8", width:"30px", height:"30px", marginRight:"5px"}} />
            {comment.username}
            </Typography>
            <Typography variant="h3" component="h1" gutterBottom style={{margin:"20px", fontFamily:"italic", fontSize:"18px", marginBottom:"5px", fontWeight:"bold"}}>
             Posted on: {String(comment.date).toLocaleString().substring(0,10)}
            </Typography>
            </div>
            <Typography variant="h3" component="h1" gutterBottom style={{margin:"20px", fontFamily:"italic", fontSize:"18px", marginBottom:"5px"}}>
            {comment.comment}
            </Typography>
            <hr />
            </div>
        ))}
        </Card>
        </Box>      
    </div>
  )
}

export default Comments