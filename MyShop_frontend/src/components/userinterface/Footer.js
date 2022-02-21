import React from 'react'
import {useHistory} from 'react-router-dom'
export default function Footer(props) {
    const history=useHistory()
    const handleEnter=(e)=>{
        e.target.style.fontWeight="bold"
    }
    const handleLeave=(e)=>{
        e.target.style.fontWeight=""
    }
    return (
        <div style={{height:325,width:"98%",paddingLeft:10}}>
            <div>
                <hr />
                <h2 style={{ marginLeft: 20, marginTop: 5, letterSpacing: 1,cursor:'default' }}>Connect With Us</h2>
            </div>
            <div style={{ display: "flex" }}>
                <img alt="..."  src="/google.png" width="15%" style={{ margin: 10,cursor:'pointer' }} />
                <img alt="..."  src="/app.png" width="15%" style={{ margin: 10 ,cursor:'pointer'}} />
            </div>
            <div style={{display:"flex",flexDirection:"row",flexWrap:"wrap",justifyContent:"space-between"}}>
                <div style={{marginTop:5}}>
                    <h3 style={{ marginLeft: 20, marginTop: 5,marginBottom:5, letterSpacing: 1,cursor:"default" }}>Contact</h3>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <a href="mailto:support@john-jacobs.com" style={{ marginLeft: 22, margin: 3, letterSpacing: 1,textDecoration:'none',textDecorationColor:'black',color:"black",fontFamily:"'Open Sans Condensed', sans-serif" }} onMouseEnter={handleEnter} onMouseLeave={handleLeave} >support@john-jacobs.com</a>
                        <a href="tel:+91 92118 44000" style={{ marginLeft: 22,textDecoration:'none',textDecorationColor:'black',color:"black", margin: 3, letterSpacing: 1,fontFamily:"'Open Sans Condensed', sans-serif" }} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>+91 92118 44000</a>
                    </div>
                </div>
                <div style={{marginTop:5}}>
                    <h3 style={{ marginLeft: 5,cursor:'default', marginTop: 2,marginBottom:5, letterSpacing: 1 }}>Shop</h3>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <p style={{ marginLeft: 20, margin: 3,cursor:'pointer', letterSpacing: 1,fontFamily:"'Open Sans Condensed', sans-serif" }} onClick={()=>{ history.push('/products', { id: 6, name: "EyeGlass" });document.title="IndoForest-EyeGlass"}} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>EyeGlass</p>
                        <p onClick={()=>{ history.push('/products', { id: 7, name: "SunGlass" });document.title="IndoForest-SunGlass"}} style={{ marginLeft: 20, margin: 3,cursor:'pointer', letterSpacing: 1,fontFamily:"'Open Sans Condensed', sans-serif" }} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>SunGlass</p>
                        <p style={{ marginLeft: 20, margin: 3,cursor:'pointer', letterSpacing: 1 ,fontFamily:"'Open Sans Condensed', sans-serif"}} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>Collection</p>
                    </div>
                </div>
                <div style={{marginTop:5}}>
                    <h3 style={{ marginTop: 5, marginBottom: 5,cursor:'default', letterSpacing: 1 }}>About</h3>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <p style={{ marginLeft: 20,cursor:'pointer', margin: 2, letterSpacing: 1,fontFamily:"'Open Sans Condensed', sans-serif" }} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>Our Story</p>
                        <p style={{ marginLeft: 20,cursor:'pointer', margin: 2, letterSpacing: 1,fontFamily:"'Open Sans Condensed', sans-serif" }} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>Careers</p>
                        <p style={{ marginLeft: 20,cursor:'pointer', margin: 2, letterSpacing: 1,fontFamily:"'Open Sans Condensed', sans-serif" }} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>Press</p>
                        <p style={{ marginLeft: 20,cursor:'pointer', margin: 2, letterSpacing: 1,fontFamily:"'Open Sans Condensed', sans-serif" }} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>Blog</p>
                        <p style={{ marginLeft: 20,cursor:'pointer', margin: 2, letterSpacing: 1,fontFamily:"'Open Sans Condensed', sans-serif" }} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>Store Locator</p>
                    </div>
                </div>
                <div style={{marginTop:5}}>
                    <h3 style={{ marginTop: 5,cursor:'default', marginBottom: 5, letterSpacing: 1 }}>Information</h3>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                    <p style={{ marginLeft: 20,cursor:"pointer", margin: 2, letterSpacing: 1,fontFamily:"'Open Sans Condensed', sans-serif" }} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>Help</p>
                    <p style={{ marginLeft: 20,cursor:"pointer", margin: 2, letterSpacing: 1,fontFamily:"'Open Sans Condensed', sans-serif" }} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>Shipping Handling</p>
                    <p style={{ marginLeft: 20,cursor:"pointer", margin: 2, letterSpacing: 1,fontFamily:"'Open Sans Condensed', sans-serif" }} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>Exchanges & Returns</p>
                    <p style={{ marginLeft: 20,cursor:"pointer", margin: 2, letterSpacing: 1,fontFamily:"'Open Sans Condensed', sans-serif" }} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>Terms & Conditions</p>
                    <p style={{ marginLeft: 20,cursor:"pointer", margin: 2, letterSpacing: 1,fontFamily:"'Open Sans Condensed', sans-serif" }} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>Privacy Policy</p>
                </div>
                </div>
            </div>
        </div>
    )
}
