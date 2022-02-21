import React from 'react'
import Footer from './Footer'
import Header from './header'
import { Button, Radio } from '@material-ui/core';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { postData, ServerUrl } from '../fetchfromnode'
import { useHistory } from 'react-router-dom'
import MoreProduct from './MoreProduct'
import { Grid } from '@material-ui/core'
export default function ProductView(props) {
    const item = props.location.state
    window.scrollTo=0
    
    const [getSelected, setSelected] = React.useState("")
    const [getChecked, setChecked] = React.useState(item.selected);
    const [getProduct, setProduct] = React.useState({ id: item.item.productid, colorid: item.selected.colorid })
    // eslint-disable-next-line
    const [getPicture, setPicture] = React.useState([])
    const history = useHistory()
    var settings = {
        infinite: true,
        speed: 500,
        arrows:false,
        slidesToScroll: 1
      };
    const handlePicture = async (id) => {

        let body = { productid: id }
        var result = await postData('finalproduct/getPicByProductId', body);
        await setPicture(result)
        result.length !== 0 && setSelected(result[0].pictureid)
    }
    React.useEffect(function () {
        handlePicture(item.selected.finalproductid)
        // eslint-disable-next-line
    }, [])
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
            <Header />
            <Path />
            <Grid container>
                <Grid xs={7} style={{ height: 400 }}>
                    <div style={{ marginTop: 80 }}>
                        <Slider {...settings} slidesToShow={ 2} >
                            {
                                getPicture.map((item, index) => {
                                    return (
                                        <div style={{ width: 600 }}>
                                            <img alt="...." src={`${ServerUrl}/images/${item.image}`} width="300" height="200" />
                                        </div>
                                    )
                                })
                            }
                        </Slider>
                    </div>

                    <div style={{ disply: 'flex', justifyContent: 'space-evenly', marginTop: 30, marginLeft: 25 }}>
                        <Grid xs={2}>
                            <span style={{ border: '2px solid black', borderRadius: 50, padding: 10, textAlign: 'left' }}>4.7 <i class="fas fa-star"></i>|97</span>
                        </Grid>

                    </div>
                </Grid>
                <Grid xs={4}>
                    <span style={{ marginBottom: 2 }}>{item.item.productname}</span>
                    <Grid container spacing={2} style={{ marginLeft: 2, marginTop: 15 }}>
                        <Grid xs={6}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span>{item.selected.colorname}</span>
                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: -12, marginTop: 8 }}>
                                    {item.color.map((item1, index) => {

                                        return (
                                            <Radio title={item1.colorname} key={item1.finalproductId} checked={getChecked !== null ? getChecked === item1 : item.selected === item1} onClick={() => { setChecked(item1); handlePicture(item1.finalproductid) }} style={{ color: String(item1.colorname).toLowerCase() }}></Radio>
                                        )
                                    })}</div>
                            </div>
                        </Grid>
                        <Grid xs={6} style={{ marginTop: -28 }}>
                            <p>
                                {item.color.length !== 0 ? ((getChecked ? getChecked.offerprice <= 0 ? <span>{"₹" + getChecked.price}</span> : <span><s>{"₹" + getChecked.price}</s><span style={{ color: "blue", marginLeft: 12 }}>{"₹" + getChecked.offerprice}</span></span> : "₹" + getChecked.price)) : "Out of Stock"}</p>
                            <p>including premium <span style={{ cursor: 'pointer', border: "1px solid black", borderRadius: '300px', height: 2 }}>?</span><br />
                                anti-glare lenses</p>
                        </Grid>
                    </Grid>
                    <Grid xs={12} >
                        <div style={{ display: 'flex', flexDirection: "row"}}>
                            {/* <Carousel responsive={responsive1}> */}
                           <Slider {...{...settings,infinite:false}} slidesToShow={4}>
                            {getPicture.map((item, index) => {
                                return (
                                    <div>
                                        <img src={`${ServerUrl}/images/${item.image}`} alt="...." width="80" onClick={() => { setSelected(item.pictureid) }} height="80" style={{ cursor: "pointer", marginTop: 30, marginRight: 12, border: `2px solid ${getSelected === item.pictureid ? 'black' : '#c8d6e5'}`, borderRadius: '14px' }} />
                                    </div>
                                )
                            })}
                            </Slider>
                            {/* </Carousel> */}
                        </div>
                    </Grid>
                    <Grid xs={1} style={{ position: 'absolute', right: "47%", top: "82%", cursor: 'pointer' }}>

                        <span style={{ fontSize: 30, color: '#95afc0' }}> <i class="far fa-heart"></i></span>
                    </Grid>
                    <Grid xs={12} style={{ marginTop: 30 }}>

                        <Button variant='outlined' style={{ width: "90%", height: "50px", backgroundColor: "#303952", color: 'white' }}>Select Lenses</Button>

                    </Grid>
                    <Grid xs={12} style={{ marginTop: 10 }}>

                        <Button variant='outlined' style={{ width: "90%", height: "50px", color: '#303952' }}><img src="/whatsapp.jpg" alt="...." width="50" height="50" /> Let's Chat</Button>

                    </Grid>

                </Grid>

            </Grid>
            <center>
                <img src="/product1.jpg" alt="..." width="90%" />
                <Grid xs={10}>
                    <center>
                        <ul>
                            <i class="fas fa-circle" style={{ fontSize: 10, marginTop: 15, }}></i> <li style={{ display: 'inline', marginTop: 15, fontSize: 20 }}>Best suited for powers upto -8 / +5. </li>
                            <i class="fas fa-circle" style={{ fontSize: 10, marginTop: 15, }}></i> <li style={{ display: 'inline', marginTop: 15, fontSize: 20 }}>Made in rich acetate from Italian powerhouse Mazzucchelli. </li>
                            <i class="fas fa-circle" style={{ fontSize: 10, marginTop: 15, }}></i> <li style={{ display: 'inline', marginTop: 15, fontSize: 20 }}>Sophisticated Rounds for a classic look. </li>
                            <i class="fas fa-circle" style={{ fontSize: 10, marginTop: 15, }}></i> <li style={{ display: 'inline', marginTop: 15, fontSize: 20 }}>Comes with a complimentary micro-fibre cloth and a classic JJ eyewear case. </li>
                            <i class="fas fa-circle" style={{ fontSize: 10, marginTop: 15, }}></i> <li style={{ display: 'inline', marginTop: 15, fontSize: 20 }}>Alias - Rich Acetate JJ E11515 Unisex Transparent Eyeglasses. </li>
                        </ul>
                    </center>
                </Grid>
                <img src="/product2.jpg" alt="..." width="90%" />
                <h1>Key Features</h1>
                <img src="/product3.jpg" alt="..." width="45%" />
                <img src="/product4.jpg" alt="..." width="45%" />
                <img src="/product5.jpg" alt="..." width="45%" />
                <img src="/product7.jpg" alt="..." width="45%" />
                <img src="/product8.jpg" alt="..." width="45%" />
                <img src="/product9.jpg" alt="..." width="45%" />
                <h1>Our Lenses</h1>
                <div>
                    <Grid xs={11} style={{ marginTop: 5 }}>
                        <div style={{ border: "1px solid black", textAlign: 'left', padding: 5 }}>
                            <h2>Single Vision</h2>
                            These lenses correct a single field of vision - near, intermediate, or distance
                        </div>
                    </Grid>
                    <Grid xs={11} style={{ marginTop: 5 }}>
                        <div style={{ border: "1px solid black", textAlign: 'left', padding: 5 }}>
                            <h2>Multifocal</h2>
                            These lenses correct near, intermediate and distant fields of vision, eliminating the need to switch eyeglasses
                        </div>
                    </Grid>
                    <Grid xs={11} style={{ marginTop: 5 }}>
                        <div style={{ border: "1px solid black", textAlign: 'left', padding: 5 }} >
                            <h2 >Zero Power</h2>
                            These protect your eyes from harmful blue light emitted by digital screens and keep the glare off in style
                        </div>
                    </Grid>
                </div>
                <img src="/product6.jpg" alt="..." id="lens" width="90%" />
                <h1>
                    Frame Size
                </h1>
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
