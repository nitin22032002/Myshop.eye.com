import React,{createRef} from 'react'
import Footer from './Footer'
import Header from './header'
import { Button, Radio } from '@material-ui/core';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { postData, ServerUrl } from '../fetchfromnode'
import { useHistory } from 'react-router-dom'
import MoreProduct from './MoreProduct'
import {ArrowBackIos,ArrowForwardIos} from '@material-ui/icons'
import { Grid ,makeStyles} from '@material-ui/core'
import AddProductInCart from './AddProductInCart';

const useStyle=makeStyles((theme)=>({
    root:{
        display:"flex",
        flexDirection:"column",
        width:"83%",
        [theme.breakpoints.up('md')]: {
            width:"94%",
            flexDirection:"row"
          }
    },
    part1:{
        width:"100%",
        marginLeft:40,
        [theme.breakpoints.up('md')]: {
            width:"60%"
          }
    },
    part2:{
        width:"100%",
        marginLeft:"20%",
        [theme.breakpoints.up('md')]: {
            marginLeft:34,
            marginTop:-45,
            width:"40%"
          }
    }

}))

export default function ProductView(props) {
    const item = props.location.state
    const classes=useStyle()
    const bigSlider=createRef();
    const smallSlider=createRef();
    const [refresh,setRefresh]=React.useState(true)
    const [getSelected, setSelected] = React.useState(0)
    const [getChecked, setChecked] = React.useState(item.selected);
    const [getProduct, setProduct] = React.useState({ id: item.item.productid, colorid: item.selected.colorid })
    // eslint-disable-next-line
    const [getPicture, setPicture] = React.useState([])
    const history = useHistory()
    var settings = {
        infinite: true,
        speed: 500,
        arrows:false,
        draggable:false,
        slidesToScroll: 1
      };
    const handlePicture = async (id) => {

        let body = { productid: id }
        var result = await postData('finalproduct/getPicByProductId', body);
        await setPicture(result)
        result.length !== 0 && setSelected(0)
    }
    React.useEffect(function () {
        handlePicture(item.selected.finalproductid)
        // eslint-disable-next-line
    }, [])
    React.useEffect(()=>{
        window.scrollTo(window.scrollHeight,0)
    },[item.selected.productid])
    if (getProduct.id !== item.item.productid || getProduct.colorid !== item.selected.colorid) {
        setProduct({ id: item.item.productid, colorid: item.selected.colorid })
        setChecked(item.selected)
        handlePicture(item.selected.finalproductid)

    }
    const Path = () => {
        return (
            <div style={{ margin: 30 }}><span onMouseEnter={handleEnter} onMouseLeave={handleLeave} style={{ cursor: 'pointer' }} onClick={() => { history.push('/') }}> Home </span>/<span onMouseEnter={handleEnter} onMouseLeave={handleLeave} style={{ cursor: 'pointer' }} onClick={() => { history.push('/') }}> IndoForest </span>/<span style={{ cursor: 'pointer', fontWeight: "bold" }}> {item.item.productname}</span></div>
        )
    }
    const handleEnter = (e) => {
        e.target.style.fontWeight = "bold"
    }
    const handleLeave = (e) => {
        e.target.style.fontWeight = ""
    }
    return (
        <div>
            <Header setRefresh={setRefresh} refresh={refresh} />
            <Path />
            <div>
                <div className={classes.root}>
                    <div className={classes.part1}>
                        <div style={{fontSize:20,textAlign:'center'}}>Product View</div>
                    <div style={{marginTop:80}}>
                    <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                        <ArrowBackIos style={{cursor:'pointer'}} onClick={()=>{setSelected(getSelected===0?getPicture.length-1:getSelected-1);bigSlider.current.slickPrev();smallSlider.current.slickPrev();}}/>
                    <div style={{width:"100%"}}>
                    <Slider {...{...settings,arrows:false}} ref={bigSlider} slidesToShow={ 2} >
                        { 
                                getPicture.map((item, index) => {
                                    return (
                                        <div style={{ width:'100%' }}>
                                            <img alt="...." src={`${ServerUrl}/images/${item.image}`} width="100%" height="200" />
                                        </div>
                                    )
                                })
                            }
                        </Slider>
                            </div>
                        
                            <ArrowForwardIos style={{cursor:'pointer'}} onClick={()=>{setSelected(getSelected===getPicture.length-1?0:getSelected+1);bigSlider.current.slickNext();smallSlider.current.slickNext();}}/>
                                </div>
                            </div>
                        <div style={{display:'flex',marginTop:10}}>
                                            

                        {/* <div style={{marginTop:60,marginLeft:50}}>
                            <span style={{ border: '1px solid black', borderRadius: 50, padding: 10, textAlign: 'left',marginLeft:10 }}>4.7 <i class="fas fa-star"></i>|97</span>
                        </div> */}
                        {/* <div style={{marginTop:40,marginLeft:640}}>
                        <span style={{ fontSize: 30, color: '#95afc0' }}> <i class="far fa-heart"></i></span>
                        </div> */}
                        </div>
                    </div>
                    <div className={classes.part2}>
                        <h3>{item.item.productname}</h3>
                        <div style={{display:'flex',alignItems:"center",marginTop:-30}}>
                            <div style={{display:"flex",flexDirection:'column',width:'50%'}}>
                                <p>{getChecked.colorname}</p>
                                <div style={{ display: 'flex', flexDirection: 'row',marginTop:-10, marginLeft: -12 }}>
                                    {item.color.map((item1, index) => {

                                        return (
                                            <Radio title={item1.colorname} key={item1.finalproductId} checked={getChecked !== null ? getChecked === item1 : item.selected === item1} onClick={() => { setChecked(item1); handlePicture(item1.finalproductid) }} style={{ color: String(item1.colorname).toLowerCase() }}></Radio>
                                        )
                                    })}
                                </div>
                            </div>
                            <div style={{display:"flex",flexDirection:'column',width:'50%'}}>
                            <p style={{marginTop:0}}>
                                {item.color.length !== 0 ? ((getChecked ? getChecked.offerprice <= 0 ? <span>{"₹" + getChecked.price}</span> : <span><s>{"₹" + getChecked.price}</s><span style={{ color: "blue", marginLeft: 12 }}>{"₹" + getChecked.offerprice}</span></span> : "₹" + getChecked.price)) : "Out of Stock"}</p>
                            
                            <p>including premium <span style={{ cursor: 'pointer', border: "1px solid black", borderRadius: '300px', height: 2 }}>?</span><br />
                                anti-glare lenses</p>             
                            </div>
                            
                        </div>
                        <div style={{display:'flex',marginTop:10}}>
                            <div style={{width:"100%"}}>
                        <Slider ref={smallSlider} {...settings} slidesToShow={getPicture.length>3?4:2}>
                            {getPicture.map((item, index) => {
                               return (
                                    <div style={{width:90}}>
                                        <img src={`${ServerUrl}/images/${item.image}`} alt="...." width="70" onClick={() => { setSelected(index);bigSlider.current.slickGoTo(index);smallSlider.current.slickGoTo(index) }} height="80" style={{ cursor: "pointer", marginTop: 30, marginRight: 12, border: `2px solid ${getSelected === index ? 'black' : '#c8d6e5'}`, borderRadius: '14px' }} />
                                    </div>
                                )
                            })}
                            </Slider>
                            </div>
                        </div>
                        <div style={{marginTop:10}}>
                            {getChecked.stock>10?<div style={{color:"green"}}>Available</div>:getChecked.stock<=0?<div style={{color:"red"}}>Out Of Stock</div>:<div style={{color:"orange"}}>Hurry! Only {getChecked.stock} left in Stock </div>}
                        </div>
                        <div style={{display:"flex",flexDirection:"column",marginTop:20}}>
                            <AddProductInCart setRefresh={setRefresh} refresh={refresh} key={getChecked.finalproductid} item={{...getChecked,productname:item.item.productname}}/>
                        <Button variant='outlined' style={{ width: "80%", height: "60px",marginTop:15, color: '#303952' }}><img src="/whatsapp.jpg" alt="...." width="50" height="50" /> Let's Chat</Button>
                        </div>
                    </div>
                </div>
            </div>
           
            <center>
                <img src="/product1.jpg" alt="..." width="90%" />
                <Grid xs={10}>
                    <Grid container>
                        <ul>
                            <i class="fas fa-circle" style={{ fontSize: 10, marginTop: 15, }}></i> <li style={{ display: 'inline', marginTop: 15, fontSize: 17 }}>Best suited for powers upto -8 / +5. </li>
                            <i class="fas fa-circle" style={{ fontSize: 10, marginTop: 15, }}></i> <li style={{ display: 'inline', marginTop: 15, fontSize: 17 }}>Made in rich acetate from Italian powerhouse Mazzucchelli. </li>
                            <i class="fas fa-circle" style={{ fontSize: 10, marginTop: 15, }}></i> <li style={{ display: 'inline', marginTop: 15, fontSize: 17 }}>Sophisticated Rounds for a classic look. </li>
                            <i class="fas fa-circle" style={{ fontSize: 10, marginTop: 15, }}></i> <li style={{ display: 'inline', marginTop: 15, fontSize: 17 }}>Comes with a complimentary micro-fibre cloth and a classic JJ eyewear case. </li>
                            <i class="fas fa-circle" style={{ fontSize: 10, marginTop: 15, }}></i> <li style={{ display: 'inline', marginTop: 15, fontSize: 17 }}>Alias - Rich Acetate JJ E11515 Unisex Transparent Eyeglasses. </li>
                        </ul>
                    </Grid>
                </Grid>
                <img src="/product2.jpg" alt="..." width="90%" />
                <h2>Key Features</h2>
                <img src="/product3.jpg" alt="..." width="45%" />
                <img src="/product4.jpg" alt="..." width="45%" />
                <img src="/product5.jpg" alt="..." width="45%" />
                <img src="/product7.jpg" alt="..." width="45%" />
                <img src="/product8.jpg" alt="..." width="45%" />
                <img src="/product9.jpg" alt="..." width="45%" />
                <h2>Our Lenses</h2>
                <div>
                    <Grid xs={11} style={{ marginTop: 5 }}>
                        <div style={{ border: "1px solid black", textAlign: 'left', padding: 5 }}>
                            <h3>Single Vision</h3>
                            These lenses correct a single field of vision - near, intermediate, or distance
                        </div>
                    </Grid>
                    <Grid xs={11} style={{ marginTop: 5 }}>
                        <div style={{ border: "1px solid black", textAlign: 'left', padding: 5 }}>
                            <h3>Multifocal</h3>
                            These lenses correct near, intermediate and distant fields of vision, eliminating the need to switch eyeglasses
                        </div>
                    </Grid>
                    <Grid xs={11} style={{ marginTop: 5 }}>
                        <div style={{ border: "1px solid black", textAlign: 'left', padding: 5 }} >
                            <h3 >Zero Power</h3>
                            These protect your eyes from harmful blue light emitted by digital screens and keep the glare off in style
                        </div>
                    </Grid>
                </div>
                <img style={{marginTop:5}} src="/product6.jpg" alt="..." id="lens" width="90%" />
                <h2>
                    Frame Size
                </h2>
                <img src="/product11.jpg" alt="..." width="45%" />
                <img src="/product10.jpg" alt="..." width="45%" />
                <img src="/product12.jpg" alt="..." width="45%" />
                <img src="/product13.jpg" alt="..." width="45%" />
            </center>
            <MoreProduct productid={item.item.productid} categoryid={item.item.categoryid} materialid={item.item.materialid} shapeid={item.item.shapeid} frameid={item.item.frameid} />
            <Footer />
        </div>
    )
}
