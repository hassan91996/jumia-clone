import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import classes from './pagination.module.css'


const PagePagination = ({currentpage,handlechange,totalpages}) => {
    return (
        <div className={classes.PagePagination}>
            <button onClick={()=>handlechange("first")}  value={30} disabled={currentpage<=1}><LastPageIcon/></button>
            <button onClick={()=>handlechange("subone")}  disabled={currentpage<=1}><NavigateNextIcon/></button>

            <button  onClick={()=>handlechange("subtwo")} style={{display:totalpages>=3&&currentpage===totalpages?"flex":"none"}}>{currentpage-2}</button>
            <button className={currentpage===1?classes.active:null} onClick={()=>handlechange(currentpage!==1?"subone":null)}>{currentpage>1?currentpage-1:1}</button>


            <button style={{display:currentpage===1?"flex":"none"}} onClick={()=>handlechange("addone")}>{currentpage>1?currentpage:currentpage+1}</button>
            <button className={classes.active} style={{display:currentpage!==1?"flex":"none"}} >{currentpage>1?currentpage:currentpage+1}</button>
             
            <button onClick={()=>handlechange(currentpage===1?"addtwo":"addone")} style={{display:totalpages>=3&&currentpage<totalpages?"flex":"none"}}>{currentpage===1?currentpage+2:currentpage+1}</button>
            <button  onClick={()=>handlechange("addone")}disabled={currentpage===totalpages}><NavigateBeforeIcon/></button>
            <button onClick={()=>handlechange("last")} disabled={currentpage===totalpages}><FirstPageIcon/></button>
            
        </div>
    )
}

export default PagePagination
