import React, { useEffect, useState } from 'react';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import Hidden from '@material-ui/core/Hidden';
import Avatar from '@material-ui/core/Avatar';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import InfoIcon from '@material-ui/icons/Info';
import MenuIcon from '@material-ui/icons/Menu';
import { alpha, makeStyles } from '@material-ui/core';
import {useHistory} from 'react-router-dom'
import {Fab} from '@material-ui/core'
import {Remove} from '@material-ui/icons'
import AddIcon from '@material-ui/icons/Add'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Menu from '@material-ui/core/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {ShoppingCart} from '@material-ui/icons'
import {useSelector,useDispatch} from 'react-redux';
import { fetchdata,ServerUrl } from '../fetchfromnode';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import { Button } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  title: {
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      marginLeft:10,
      flexDirection:"center"
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },

  inputRoot: {
    border: "solid 2px #dfe6e9"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  list: {
    width:366,
    [theme.breakpoints.up("sm")]:{
      width: 400,
      overflow:"auto",
    }
  },
  fullList: {
    width: 'auto',
  },
}));

export default function Header(props) {
  const dispatch=useDispatch()
  const [refresh,setRefresh]=useState(false)
  const [cartDrawerState, setCartDrawerState] = React.useState(false);
  const [subMenuDrawerState, setSubMenuDrawerState] = React.useState(false);
  const cartState=useSelector(state=>state);
  const history=useHistory();
  const [open,setOpen]=useState({status:false,which:""})
  if(history.location.pathname==="/"){
    document.title="IndoForest-Home"
  }
 else if(history.location.pathname==="/our-story"){
    document.title="IndoForest-Our Story"
  }
  const classes = useStyles();
  const [getMenuItem, setMenuItem] = React.useState({ id: "", name: "", gen: "", type: "" });
  const [getSubMenuAnchor, setSubMenuAnchor] = React.useState(null);
  const [getCategoryList, setCategoryList] = React.useState([]);

  const toogleDrawer=(open)=>{
      setCartDrawerState(open);
  }
  const getCategory = async () => { 
    var result = await fetchdata(`${ServerUrl}/category/fetchcategory`);
    setCategoryList(result.data);
  }
  const handleOpenSubMenu = (event) => {
    setSubMenuAnchor(event.currentTarget);
    let a = JSON.parse(event.currentTarget.value)
    setMenuItem({ id: a.categoryid, name: a.categoryname, gen: "" });
    
  }
  const handleCategoryChange = (event) => {
    let a = JSON.parse(event.currentTarget.value)
    // setMenuItem({ id: a.categoryid, name: a.categoryname, gen: "" });
    history.push('/products', { id: a.categoryid, name: a.categoryname })
  }
  const handleCloseSubMenu = () => {
    setSubMenuAnchor(null);
  }
  const subMenuItem = () => {
    return (<div style={{ display: 'flex', width: 1366 }} onMouseLeave={() => handleCloseSubMenu()} >
      <div>
        <img alt="..."   src={`${getMenuItem.name}men.jpg`} style={{ width: 683, cursor: "pointer" }} onClick={() => { setMenuItem({ ...getMenuItem, gen: " and type='men'", type: "Men" }); history.push('/products', { id: getMenuItem.id, gen: " and type='men'", type: "Men", name: getMenuItem.name });document.title=`IndoForest-${getMenuItem.name} For Men` }} />
      </div>
      <div>
        <img alt="..."   src={`${getMenuItem.name}women.jpg`} style={{ width: 683, cursor: "pointer" }} onClick={() => { setMenuItem({ ...getMenuItem, gen: " and type='women'", type: "Women" }); history.push('/products', { id: getMenuItem.id, gen: " and type='women'", type: "Women", name: getMenuItem.name });document.title=`IndoForest-${getMenuItem.name} For Women` }} />
      </div>
    </div>)
  }
  const SubMenu = () => {
    var a = ""
    return (
      getCategoryList.map((item, index) => {
        if (index !== 0) {
          a = <ArrowDropDownIcon />
        }
        return (
          <div>

            <Button style={{ marginLeft: 5 }} value={JSON.stringify(item)} onClick={(event) => handleCategoryChange(event)} onMouseEnter={(event) => handleOpenSubMenu(event)} endIcon={a} aria-controls="simple-menu" aria-haspopup="true" >
              {item.categoryname}
            </Button>


          </div>

        )
      })
    )
  }
  useEffect(function () {
    getCategory();
  }, [])


  let products=Object.values(cartState.cart)
  const handleDelete=(qty,id)=>{
    if(parseInt(qty)-1===0){
      dispatch({type:"Delete_Product",payload:id})
    }
    else{
      dispatch({type:"Update_Product",payload:[id,-1]})
    }
    setRefresh(!refresh)
    // alert(props.hasOwnProperty('refresh'))
    if(props.hasOwnProperty('refresh')){
      props.setRefresh(!props.refresh)
    }
  }
  const handleBuy=(e)=>{
    if(cartState.user.token!==undefined){
      history.push({pathname:'/cart'})
    }
    else{
      history.push('/signin')
    }
  }
  const netPrice=(products)=>{
    let netamt=products.reduce((a,b)=>{
        return (a+(b.item.offerprice>0?b.item.offerprice:b.item.price)*b.qty)
    },0)
    return netamt;
  }
  const totalAmount=(products)=>{
    let netamt=products.reduce((a,b)=>{
        return (a+b.item.price*b.qty)
    },0)
    return netamt;
  }
  const handleAdd=(id)=>{
    dispatch({type:"Update_Product",payload:[id,1]})
    setRefresh(!refresh)
    if(props.hasOwnProperty('refresh')){
      props.setRefresh(!props.refresh)
    }
  }
  let itemCount=products.length
  console.log(products)
  const cartContent=()=>{
    let netamt=netPrice(products)
    let total=totalAmount(products)
    console.log(history.location.pathname)
    return(
      <div
      className={classes.list}
      role="presentation"
      onKeyDown={()=>toogleDrawer(false)}>
       <Hidden smUp>
        <Button onClick={()=>{toogleDrawer(false)}}>Close</Button>
       </Hidden>
        <div style={{display:'flex',justifyContent:'center',marginTop:5}}>
        <img src="/lenslogo.png" alt="GlassCart" style={{width:200,height:60}} />
        </div>
        {products.length===0?<div><img alt="..." src="/emptycart.jpg"width="100%" height="590" /></div>:
        <div>
        <div style={{display:'flex',alignItems:'start',marginTop:10,marginLeft:5}}>
          <div style={{fontSize:18,fontWeight:500,padding:5}}>
            Item(s) {products.length}
          </div>
          <div style={{display:"flex",justifyContent:"flex-end",fontSize:18,fontWeight:500,padding:5,marginLeft:45,width:250}}>
            &#8377; {netamt}
          </div>
        </div>
        <Divider/>
       <div style={{height:"350px",overflowY:"auto"}}>
        {
          products.map((item)=>{
            return(
              <>
              <div style={{display:'flex',alignItems:'start',marginTop:10,marginLeft:5}}>
              <Avatar alt="Remy Sharp" variant="rounded" src={`${ServerUrl}/images/${item.item.picture}`} style={{padding:10,width:110}} className={classes.large} />
                <div style={{display:'flex',flexDirection:"column",padding:5}}>
                  <div style={{fontSize:18,fontWeight:500,padding:5}}>
                    {item.item.productname}
                  </div>
                  <div style={{display:'flex'}}>
                    <div style={{fontSize:18,fontWeight:500,padding:5}}>{item.item.colorname}</div>
                    <div style={{fontSize:18,fontWeight:500,padding:5}}>{item.item.offerprice>0?item.item.offerprice:item.item.price} x {item.qty}</div>
                  </div>
                    <div style={{fontSize:18,fontWeight:500,padding:5}}>
                    {item.item.offerprice>0?<span><s>&#8377; {item.item.price}</s></span>:<span>No Offer</span>}
                    </div>
                    <div style={{fontSize:18,fontWeight:500,padding:5}}>
                    {item.item.offerprice>0?<span style={{color:'green'}}>You Save &#8377; {(item.item.price-item.item.offerprice)*item.qty}</span>:<span></span>}
                    </div>
                    <div style={{display:history.location.pathname!=="/payment"?'flex':"none",alignItems:'center',justifyContent:'center'}}>
        <Fab size="small" style={{backgroundColor:"#303952"}} aria-label="add" onClick={()=>{handleDelete(item.qty,item.item.finalproductid)}} >
          <Remove style={{color:"white"}} />
        </Fab>
        <div style={{fontSize:24,fontWeight:"bold",marginInline:20}}>{item.qty}</div>
        <Fab size="small"style={{backgroundColor:"#303952"}}  disabled={item.qty>=5 || item.qty>=item.item.stock} aria-label="add" onClick={()=>{handleAdd(item.item.finalproductid)}} >
        <AddIcon style={{color:"white"}}  />
        </Fab>
        </div>
                </div>
                <div style={{display:"flex",justifyContent:"flex-end",fontSize:18,fontWeight:500,padding:5,marginLeft:28}}>
                {item.item.offerprice>0?<span>&#8377; {item.item.offerprice*item.qty}</span>:<span>&#8377; {item.item.price*item.qty}</span>}
                </div>
              </div>
                <Divider/>
                </>
            )
          })
        }
        </div>
        <div style={{fontSize:18,fontWeight:500,padding:5}}>
        <div>
          <div style={{float:'left',margin:5}}>
            Payable
          </div>
          <div style={{float:'right',margin:5}}>
            &#8377; {total}
          </div>
        </div>
        <div style={{clear:'both'}}>
          <div style={{float:'left',margin:5}}>
            Saving
          </div>
          <div style={{float:'right',margin:5}}>
            &#8377; -{total-netamt}
          </div>
        </div>
        <div style={{clear:'both'}}>
          <div style={{float:'left',margin:5}}>
            Net Amount
          </div>
          <div style={{float:'right',margin:5}}>
            &#8377; {netamt}
          </div>
          </div>
        </div>
        {cartState.user.token===undefined?
        <Button variant='outlined' style={{marginLeft:20,marginTop:10, width: "90%", height: "60px", backgroundColor: "#303952", color: 'white' }} onClick={()=>{history.push({"pathname":"/signin"})}} >Login/SignUp</Button>
        :history.location.pathname!=="/cart"?
        <Button variant='outlined' style={{marginLeft:20,marginTop:10, width: "90%", height: "60px", backgroundColor: "#303952", color: 'white' }} onClick={handleBuy} >Proced To Cart</Button>
        :<Button variant='outlined' style={{marginLeft:20,marginTop:10, width: "90%", height: "60px", backgroundColor: "#303952", color: 'white' }} onClick={()=>{history.push({pathname:"/payment"});setRefresh(!refresh)}}  >Place Order</Button>
        }
    
      </div>
      } 
   </div> 
    )
  }
  const showCart=()=>{
    return( 
      <div>
        <React.Fragment>
          <Drawer anchor={"right"} style={{overflow:"auto"}} open={cartDrawerState} onClose={()=>toogleDrawer(false)}>
            {cartContent()}
          </Drawer>
        </React.Fragment>
    </div>
    )
  }


  const handleSubMenu=(e)=>{
    return(
      <Drawer anchor={"left"} open={subMenuDrawerState} onClose={()=>setSubMenuDrawerState(false)}>
      <div style={{fontSize:20,display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"flex-start",marginLeft:5,width:"300px"}}>
        <div style={{display:"flex",flexDirection:"row",justifyContent:"center",alignItem:"center",width:"100%"}}>
            <img alt="..."   src="/lenslogo.png" width="100" />
          </div>
          <hr/>
          {
            getCategoryList.map((item)=>{
              return(
                <>
                

                 <Button  endIcon={<ArrowDropDownIcon/>} style={{marginLeft:10}} onClick={()=>{setOpen({status:!open.status,which:item.categoryname})}} aria-controls="simple-menu" aria-haspopup="true" >
                   {item.categoryname}
          </Button>
          
               
                {open.status && open.which===item.categoryname &&
                  <div style={{display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItem:"flex-start"}}> 
                      <Button style={{marginLeft:10}} aria-controls="simple-menu" aria-haspopup="true" startIcon={<EmojiPeopleIcon/>} onClick={()=>{setSubMenuDrawerState(false);setOpen({status:false,which:""});history.push('/products', { id: item.categoryid, gen: " and type='men'", type: "Men", name: item.categoryname });document.title=`IndoForest-${item.categoryname} For Men` }} >
            Men
          </Button>
          <Button style={{marginLeft:10}} aria-controls="simple-menu" aria-haspopup="true" onClick={()=>{setSubMenuDrawerState(false);setOpen({status:false,which:""});history.push('/products', { id: item.categoryid, gen: " and type='women'", type: "Women", name:item.categoryname });document.title=`IndoForest-${item.categoryname} For Women` }} startIcon={<EmojiPeopleIcon/>} >
            Women
          </Button>
                </div>
                }
                </>
              )
            })
          }
        
          <Button startIcon={<LocationOnIcon/>} style={{marginLeft:10}} aria-controls="simple-menu" aria-haspopup="true"  onClick={()=>{history.push('/our-stores')}} >
            Store Locator
          </Button>
          <Button style={{marginLeft:10}} startIcon={<InfoIcon/>} onClick={()=>{history.push('/our-story')}} aria-controls="simple-menu" aria-haspopup="true" >
            Our Story
          </Button>
        </div>
          </Drawer>
    )
  }

  return (
    <div className={classes.grow}  >
      <AppBar position="static" color="transparent" style={{height:100}} >
        <Toolbar variant="regular" disableGutters={false}>
          <Hidden mdUp>
          <MenuIcon onClick={()=>{setSubMenuDrawerState(true)}}/>
          </Hidden>
          {/* it is for logo of company */}
          <div className={classes.title}>
            <img alt="..."   src="/lenslogo.png" width="100" />
          </div>
        <Hidden smDown >
          {/* Menu bar  */}
          {SubMenu()}
          <Button aria-controls="simple-menu" aria-haspopup="true" onClick={()=>{history.push('/our-stores')}} >
            Store Locator
          </Button>
          <Button aria-controls="simple-menu" aria-haspopup="true" onClick={()=>{history.push('/our-story')}} >
            Our Story
          </Button>
          

          {/* for menu item's */}
          <Menu
            anchorEl={getSubMenuAnchor}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            open={Boolean(getSubMenuAnchor)}
            // onClose={handleCloseSubMenu}
            onMouseLeave={handleCloseSubMenu}
          >

            {getSubMenuAnchor ? subMenuItem() : <></>}
          </Menu>
          </Hidden>
          {/* other icons on menu bar */}
          <div className={classes.grow} />
          <div >
            <IconButton aria-label={`${itemCount} in cart`} color="inherit" onClick={()=>{toogleDrawer(!cartDrawerState)}}>
              <Badge badgeContent={String(itemCount)} color="secondary">
              <ShoppingCart/>
              </Badge>
            </IconButton>
           {cartState.user.token!==undefined? 
           <IconButton aria-label={`Profile`} color="inherit" onClick={()=>{history.push('/profile')}}>
            <AccountCircleIcon/>
            </IconButton>
            :<IconButton aria-label={`Signin/SignUp`} color="inherit" onClick={()=>{history.push('/signin')}}>
           <ExitToAppIcon/>
            </IconButton>
            }
          </div>
        </Toolbar>
        {showCart()}
        {handleSubMenu()}
      </AppBar>
    </div>
  );
}
