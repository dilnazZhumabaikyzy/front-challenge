import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import {useEffect, useState} from 'react';
import {tagsArray} from './modules/posts';
import { Link} from "react-router-dom";
import Post from './component/post';


function App({postArray, setPostArray}) {
  useEffect(()=>{
console.log(postArray)
  }, [postArray])
  const [option, setOption] = useState(tagsArray[0]);
  const [sort, setSort] = useState("Most Upvotes");

  const handleOptions  = (el)=>{
    setOption(el);
    if(el!== tagsArray[0]){
      const temp = postArray.filter((post)=>post.tags === el);
      setPostArray(temp);
    }
    else{
      setPostArray(postArray);
    }
  }

  const handleSort = ()=>{
    if(sort==="Most Upvotes"){
      setSort("Least Upvotes");
    }
    else{
      setSort("Most Upvotes");
    }
  }

  useEffect(()=>{
    if(sort === "Most Upvotes"){
      setPostArray([...postArray.sort(( a, b ) => b.rating - a.rating)]);
    }
    else{
      setPostArray([...postArray.sort(( a, b ) => a.rating - b.rating)]);
    }
  },[sort, option]);

  return (
   <div className="rootcontainer">
      <div className="menu-box">
        <div className="card">
          <div>
          <h2>Frontend Mentor</h2>
          <h4>Feedback Board</h4>
          </div>
          <div className='menuSlider'>
          <i className="fa-solid fa-bars"></i>
          </div>          
        </div> 
        <div className="options">
          {tagsArray.map((el)=>(
            <div className={`option ${option===el?"marked" : ""}`} onClick={()=>handleOptions(el)} key={el}>{el}</div>
          ))}
        </div> 
        <div className="roadmap">
          <div style={{display: "flex", justifyContent:"space-between", alignItems: "center"}}>
            <h3>Roadmap</h3>
            <h5>View</h5>
          </div>
          <div className = "roadmap-inner">
          <div className="status">
            <li>Planned</li>
            <div className="count">2</div>
          </div>
          <div className="status">
            <li>In-Progress</li>
            <div className="count">3</div>
          </div>
          <div className="status">
            <li>Live</li>
            <div className="count">1</div>
          </div>          
        </div>
        </div> 
      </div>
      <div className="content-box">
        <div className="header flex">
          <div className="flex" >
          <i className="fa-solid fa-lightbulb" style ={{fontSize:"1.5em", margin: "0 1rem"}}></i>      
          <h3 style={{marginRight: "4rem"}}>6 Suggestions</h3>
          <div className="sort" onClick={()=>handleSort()}>
            <span>Sort by : </span>
            <span>{sort}</span>
            <span><i className={`fa-solid fa-angle-${sort === "Most Upvotes" ? "down" : "up"}`}></i></span>
          </div>
          </div>
          <div className="feedbackBtn">+ Add Feedback</div>
        </div>
        <div className="postArray">
        {postArray.map((el)=>( 
            <Post el ={el}  key={el.key}/>
        ))}
        </div>
      </div>
   </div>
  );
}

export default App;
