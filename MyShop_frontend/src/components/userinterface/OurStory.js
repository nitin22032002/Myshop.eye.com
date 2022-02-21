import { Grid } from '@material-ui/core'
import React from 'react'
import Footer from './Footer'
import Header from './header'
import {PlayCircleOutlineOutlined} from '@material-ui/icons'
export default function OurStory() {
    return (
        <div>
            <Header/>
            <h1 style={{textAlign:'center'}}>Our Story</h1>
            <div style={{position:'relative',width:"100%"}}>
                <img src="/ourstory.jpg" alt="...."/>
                <PlayCircleOutlineOutlined style={{position:'absolute',left:650,top:420,cursor:"pointer",fontSize:70,color:"grey"}} onMouseEnter={(e)=>{e.target.style.color="black"}} onMouseLeave={(e)=>{e.target.style.color="grey"}} />
                </div>
          <center>
            <Grid container spacing={1} style={{backgroundColor:'#81ecec',width:"100%"}}>
                <Grid xs={4} >
                <img src="/story1.png" style={{marginTop:25}}  alt="...."/>
                    </Grid>
                <Grid xs={4} >
                <img src="/story2.png" style={{marginTop:25}} alt="...."/>
                    </Grid>
                <Grid xs={4} >
                <img src="/story3.png" style={{marginTop:25}} alt="...."/>
                    </Grid>
                </Grid>
                </center>
            <Footer/>
        </div>
    )
}
