
import {Link, useParams } from "react-router-dom";
import Post from "./component/post";
import profilePhoto from './assets/photo.jpg';
import {useState, useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';

function CommentPage(props) {
   const {postArray, setPostArray} = props;

    const {key} = useParams();
    const post = postArray.find((el)=>(el.key===key));
    const postIndex = postArray.findIndex((el)=>(el.key===key));
    const commentsCount = calculateCount();
    const [textAreaText, setTextAreaText] = useState('');
    const [textAreaLength, setTextAreaLength] = useState(250);
    const [reply, setReply] = useState(null);

    const handleTextArea = (text)=>{
      setTextAreaLength(250-text.length);
    }
    const handleAddCommentBtn = ()=>{
      if(!textAreaText) return;

      const updatePost = postArray;
      if(reply){
        const updateComment = {to:`${reply.nickname}`, key: uuidv4(), name: "Me", nickname: "@my_nickname", text: `${textAreaText}`, reply: []};
        const commentIndex = updatePost[postIndex].comments.findIndex((el)=>(el.key===reply.key));
        updatePost[postIndex].comments[commentIndex].reply.push(updateComment);
      }
      else{
        const updateComment = {key: uuidv4(), name: "Me", nickname: "@my_nickname", text: `${textAreaText}`, reply: []};
      updatePost[postIndex].comments.push(updateComment);     
      }
      setPostArray([...updatePost]);
      setTextAreaText('');
      localStorage.setItem('postArray', JSON.stringify(postArray));
    }
    const  handleParentReply = (nickname, key)=> {
      setReply({nickname, key});
    }
    function  calculateCount(){
      let count = post.comments.length;
       post.comments.forEach((comment)=>{
        if(comment.reply){
          count += comment.reply.length;
        }        
       })
      return count;
    }

    useEffect(()=>{
      console.log(postArray);
    },postArray)

  return (
    <div>
      <div className="rootcontainer commentPage">
      <div className="header-comment">
        <Link to="/">
        <div className="goBackBtn">
        <i className="fa-solid fa-angle-left"></i>
          Go Back
        </div>
        </Link>
        <div className="editFeedbackBtn">
        Edit Feedback            
        </div>
        </div> 
      <Post el = {post}/>
      <div className="commentsBox">
        <h3> {commentsCount} Comments</h3>
        {post.comments.map((parentComment, index)=>(
          
          <div className={`commentsDetail flex parent ${index === post.comments.length - 1 ? "last" : ""}`}  key={parentComment.key}>
            <img src={profilePhoto} alt="" />
            <div className="innerField">
              <h3>{parentComment.name}</h3>
              <div className="nickname flex">{parentComment.nickname} <span onClick={()=>handleParentReply(parentComment.nickname, parentComment.key)}>Reply</span></div>
              <div className={`text ${parentComment.reply.length !== 0 ? "line" : ""}`}>{parentComment.text}</div>
              <div className="replyBox" >
                {parentComment.reply ?  parentComment.reply.map((childComment, index)=>(
                <div className="commentsDetail flex child" key={childComment.key}>
                  <div className={`lineReply ${index === parentComment.reply.length - 1 ? "lastElementLineReply" : "no"}`}></div>
                <img src={profilePhoto} alt="" />
                <div className="innerField">
                <h3>{childComment.name}</h3>
                <div className="nickname flex">{childComment.nickname} <span onClick={()=>handleParentReply(childComment.nickname, parentComment.key)}>Reply</span></div>
                <div className="text">
                 <span>{childComment.to} </span>
                 {childComment.text}</div>
                </div>
                </div>
              )): ""}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="addCommentBox">
        <h3>Add Comment</h3>
        <div className={`reply ${reply ? "" : "hide"}`} onClick={()=>setReply(null)}> Reply to: {reply?.nickname}</div>
        <textarea maxLength="250" placeholder="Type your comment here"  value={textAreaText} onChange={e=> {setTextAreaText(e.target.value);handleTextArea(e.target.value)}}/>
        <div className="postComment flex">{textAreaLength} Characters left <div className="addCommentBtn" onClick={handleAddCommentBtn}>Post Comment</div></div>
      </div>
      </div>
    </div>
  )
}

export default CommentPage