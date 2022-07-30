import { useEffect } from "react";
import { Link } from "react-router-dom";

function Post({el}) {
  
  useEffect(()=>{
    console.log(el);
  }, [el])
  function calculateCount(post){
    let count = post.comments.length;
     post.comments.forEach((comment)=>{
      if(comment.reply){
        count += comment.reply.length;
      }        
     })
    return count;
  }

  return (
    <div className="post flex">
    <div className="ratingBox flex">
    <div className="ratingInner">
    <i className="fa-solid fa-angle-up"></i>
    <div>{el.rating}</div>
    </div>

    <Link to ={`comments/${el.key}`} className="commentsBtn flex">
    <i className="fa-solid fa-comment"></i>
    {calculateCount(el)}              
    </Link>


    </div>
    <div className="posts-content">
      <h3>{el.header}</h3>
        {el.description}
      <div className="tag">{el.tags}</div>
    </div>
    
    <Link to ={`comments/${el.key}`} className="commentsBtn flex">
    <i className="fa-solid fa-comment"></i>
    {calculateCount(el)}              
    </Link>
  </div>
  )
}

export default Post