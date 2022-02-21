import React, { useState, useEffect } from "react";
import { Button, Menu,Hidden,Drawer } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import FilterListIcon from '@material-ui/icons/FilterList';
import ArrowForwardIosSharp from '@material-ui/icons/ArrowForwardIosSharp'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import IconButton from '@material-ui/core/IconButton';
import Header from "./header";
import Product from './ProductComponent'
import { fetchdata, ServerUrl, postData } from "../fetchfromnode";
import Footer from "./Footer";
const useStyles = makeStyles((theme) => ({
  root: {
    width: '40%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  product:{
  display:"flex",
  flexDirection:"row",
  flexWrap:"wrap",
  justifyContent:"center",
  alignItems:"center",
  [theme.breakpoints.up("md")]:{
    justifyContent:"flex-start",
    alignItems:"default"
  }
}
}));
export default function FilterList(props) {
  const classes = useStyles();
  const [getCategoryId, setCategoryId] = useState({ id: props.type, gen: props.other })
  const [getSubMenuAnchor, setSubMenuAnchor] = React.useState(null);
  const [getList, setList] = useState({ val: "", list: [], checked: [], main: "" });
  const [itemlist, setitemlist] = useState([{ key: 1, table: 'shapes', attr: "Shape", val: "shape", list: [], checked: [] }, { key: 2, table: 'frames', attr: "Frame Type", val: "frame", list: [], checked: [] }, { key: 3, attr: "Size", val: "size", list: [{ sizename: "Small", sizeid: "Small" }, { sizename: "Medium", sizeid: "Medium" }, { sizename: "Large", sizeid: "Large" }], checked: [] }, { key: 4, table: 'colors', attr: "Color", val: "color", list: [], checked: [] }, { key: 5, table: 'materials', attr: "Material", val: "material", list: [], checked: [] }, { key: 6, attr: "Gender", val: "type", list: [{ typename: "Men", typeid: "Men" }, { typename: "Women", typeid: "Women" }], checked: [] }, { key: 7, table: 'price', attr: "Price", val: "price", list: [], checked: [] }, { key: 8, attr: "Sorting", val: "sort", list: [{ id: "Price:Low to High" }, { id: "Price:High to Low" }, { id: "New Arrival" }, { id: "Best Seller" }], checked: [] }, { key: 9, attr: "Reset" }])
  const [getProductList, setProductList] = useState([])
  const [filterDrawer,setFilterDrawer]=useState(false)
  if (itemlist.length === 0) {
    setitemlist([])
  }
  const handleShowSubList = async (event, item) => {
    setSubMenuAnchor(event.currentTarget);
    if (item.list.length === 0) {
      var result = await fetchdata(`${ServerUrl}/attribute/fetchshape?a=${item.table}`);
      result = await result.data
      item.list = result;
      setList({ val: item.val, list: result, checked: item.checked, key: item.key })
    }
    else {
      setList({ val: item.val, list: item.list, checked: item.checked, key: item.key })
    }
  }
  const handleClose = () => {
    setSubMenuAnchor(null);
  }
  const handleReset = () => {
    itemlist.map((item) => {
      item.checked = [];
      return ""
    })
    FilterContent();
  }
  const handleFilterList = (dir="row") => {
    return (
      <div style={{ marginTop: dir==="row"?30:10, display: "flex", flexDirection: dir, justifyContent: "space-evenly" }}>
        {itemlist.map((item) => {
          var a = <ArrowDropDown />
          var b = "black"
          if (item.key === 9) {
            a = ""
            b = "#22a6b3"
            return (

              <Button value={item} endIcon={a} style={{ border: "none", color: b }} onClick={(event) => handleReset(event, item)} variant="outlined">{item.attr}</Button>
            )
          }
          else {
            return (
              <div>
                <Button value={item} endIcon={a} style={{ border: "none", color: b }} onClick={(event) => handleShowSubList(event, item)} variant="outlined">{item.attr}</Button>
               {dir==="row"? <div style={{ height: 200, background: "black", display: "inline", borderLeft: "1px solid black" }}></div>
          :<hr/>}</div>
            )
          }
        })}
      </div>
    )
  }
  useEffect(function () {
    FilterContent();
    // eslint-disable-next-line
  }, [])
  const FilterContent = async () => {
    var cat = ""
    var a = ""
    var k = ""
    if (props.location.state.id !== undefined) {
      cat = ` and p.categoryid=${props.location.state.id}`
    }
    if (props.location.state.gen !== undefined && itemlist[5].checked.length === 0) {
      cat = `${cat}${props.location.state.gen}`
    }
    var query = `where p.productid!=0${cat}`
    for (var i = 0; i < itemlist.length - 1; i++) {
      var item = itemlist[i];
      // alert(item.val);
      // alert(JSON.stringify(item))
      if (item.val === "size" && item.checked.length !== 0) {
        a = "";
        for (k = 0; k < item.checked.length; k++) {
          a += `'${item.checked[k]}',`
        }
        a = a.slice(0, a.length - 1)
        if (itemlist[3].checked.length !== 0) {
          a = `where size in (${a}) and colorid in (${itemlist[3].checked})`
        }
        else {
          a = `where size in (${a})`
        }
        query = `${query} and p.productid in (select productid from finalproduct ${a}) `
      }
      else if (item.val === "price" && item.checked.length !== 0) {
        var t = item.checked[0].split(",")
        var min = parseInt(t[0])
        var max = parseInt(t[1])
        for (let value of item.checked) {
          t = value.split(",")
          if (min > parseInt(t[0])) {
            min = parseInt(t[0])
          }
          if (max < parseInt(t[1])) {
            max = parseInt(t[1])
          }
        }
        query = `${query} and p.productid in (select productid from finalproduct where price>=${min} and price<=${max})`
      }
      else if (item.val === "color" && item.checked.length !== 0) {
        query = `${query} and p.productid in (select productid from finalproduct where colorid in (${item.checked}))`
      }
      else if (item.val === "type" && item.checked.length !== 0) {
        a = "";
        for (k = 0; k < item.checked.length; k++) {
          a += `'${item.checked[k]}',`
        }
        a = a.slice(0, a.length - 1)
        query = `${query} and p.type in (${a})`

      }
      else if (item.val === "sort" && item.checked.length !== 0) {
        let tem = ""
        for (let a of item.checked) {
          tem += `'${a}',`
        }
        tem += "'a'"
        query = `${query} and p.status in (${tem})`
      }
      else if (item.checked.length !== 0) {

        query = `${query} and p.${item.val}id in (${item.checked})`
      }
    }
    var result = await postData('userhome/selectproduct', { where: query });
    setProductList(result);
  }

  const fillProduct = () => {
    return (<div className={classes.product}  >

      {getProductList.map(item => {
        return (
          <div style={{ marginBottom: 10, }}>
            <Hidden smDown>
            <Product item={item} key={item.productid} />
            </Hidden>
            <Hidden mdUp>
            <Product item={item} value="home" key={item.productid} />
            </Hidden>
          </div>
        )
      })}
    </div>
    )
  }
  if (props.location.state.id !== getCategoryId.id) {
    setCategoryId({ id: props.location.state.id, gen: props.location.state.gen })
    FilterContent();
  }
  if (props.location.state.gen !== getCategoryId.gen) {
    setCategoryId({ id: props.location.state.id, gen: props.location.state.gen })
    FilterContent();
  }

  const handleToggle = (value) => () => {

    const currentIndex = getList.checked.indexOf(value);
    const newChecked = [...getList.checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    // itemlist[parseInt(getList.key)-1]['checked']=[]
    itemlist[parseInt(getList.key) - 1].checked = newChecked
    setList({ val: getList.val, list: getList.list, checked: newChecked, key: getList.key })
    FilterContent();
  };
  const handleFilterDrawer=()=>{
    return(
      <Drawer anchor={"left"} open={filterDrawer} onClose={()=>setFilterDrawer(false)}>
        
        <div style={{marginLeft:10,fontSize:20,fontWeight:400,display:"flex",flexDirection:"column",justifyContent:"space-between",alignItems:"flex-start",width:170}}>
        <div style={{marginTop:10,display:"flex",flexDirection:"row",justifyContent:"center",alignItem:"center",width:"100%"}}>
            <img alt="..."   src="/lenslogo.png" width="100" />
          </div>
          <hr/>
        {handleFilterList("column")}
        </div>
      </Drawer>
    )
  }
  const SetListItem = () => {
    return (
      <div>
        <List className={classes.root} style={{ width: 150 }} >

          {getList.list.map((value) => {
            console.log("Value")
            var labelId = ""
            var labelId1 = ""
            if (getList.val !== "price" && getList.val !== "sort") {
              labelId = value[`${getList.val}id`];
              labelId1 = value[`${getList.val}name`];
            }
            else if (getList.val === "sort") {
              labelId = value[`id`];
              labelId1 = value[`id`];
            }
            else {
              labelId = `${value['minprice']},${value['maxprice']}`
              if (getList.list.indexOf(value) === 0) {
                labelId1 = "Less than ₹" + value['maxprice']
              }
              else if (getList.list.indexOf(value) === 0) {
                labelId1 = "₹" + value['maxprice'] + "& above"
              }
              else {
                labelId1 = "₹" + value['minprice'] + "- ₹" + value['maxprice']
              }

            }

            return (
              <ListItem key={labelId} role={undefined} dense button onClick={handleToggle(labelId)}>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={getList.checked.indexOf(labelId) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={labelId1} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="comments">
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      </div>
    );
  }
  return (<div>
    <Header key={"category"} value={"category"} history={props.history} />
    <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
      <center>
        <h3>{props.location.state.type !== undefined ? <>{props.location.state.name} For {props.location.state.type}</> : <></>}</h3>
        <p>For expert recommendations</p>
        <Button variant="outlined" style={{ background: '#95afc0' }} endIcon={<ArrowForwardIosSharp />} onClick={() => alert("Hello")}>Take Our Style Quiz</Button>
      </center>
    </div>
    <Hidden smDown>
    {handleFilterList()}
    </Hidden>
    <Hidden mdUp>
    <Button startIcon={<FilterListIcon/>} style={{marginLeft:10,fontSize:20}}  aria-controls="simple-menu" aria-haspopup="true" onClick={()=>setFilterDrawer(true)} >
                   Filter
          </Button>
    </Hidden>
    <Menu
      anchorEl={getSubMenuAnchor}
      elevation={10}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={Boolean(getSubMenuAnchor)}
      onClose={handleClose}
    >

      {getSubMenuAnchor ? SetListItem() : <></>}
    </Menu>
    {fillProduct()}
    {handleFilterDrawer()}

    <Footer />
  </div>)
}