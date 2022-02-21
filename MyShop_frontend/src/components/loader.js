import {React} from "react"
import {makeStyles} from "@material-ui/core"

const useStyle=makeStyles((theme)=>({
    "body": {
        fontFamily:"Montserrat",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      },
      
      "section" :{
        marginBottom: "20px",
        display: "grid",
        gridTemplateColumns: "100px",
        gridTemplateRows: "100px"
        /* overflow: hidden; */
      },
      
      /* put images on the same grid cell */
      "div" :{
        gridColumn: 1,
        gridRow: 1,
        zIndex: 0,
        position: "relative", /* for z-index to work properly */
        backgroundColor: "hsl(35, 100%, 63%)",
      },
      
}))

export default function Loader(props){
   
        const classes=useStyle()
    return(
        <div className={classes.body}>
            
        <section className={classes.section}>
      <div className={classes.div}></div>
      <div className={classes.div}></div>
      <div className={classes.div}></div>
      <div className={classes.div}></div>
      <div className={classes.div}></div>
      <div className={classes.div}></div>
      <div className={classes.div}></div>
      <div className={classes.div}></div>
      <div className={classes.div}></div>
      <div className="h1"></div>
    </section>
        </div>
    )
}