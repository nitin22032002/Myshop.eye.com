import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import AssignmentIcon from '@material-ui/icons/Assignment';
import DisplyAllStores from './displaystores';
import DisplayAllCategory from './DisplayCategory';
import DisplayAllShape from './ShowAllShape';
import DisplayAllPriceRange from './DisplayAllPrice';
import DisplayAllMaterial from './DisplayAllMaterial';
import DisplayAllColor from './DisplayAllColor';
import DisplayAllFrame from './DisplayAllFrame';
import DisplayAllFinalProduct from './DisplayAllFinalProduct';
import DisplayAllProduct from './DisplayAllProduct'
import DisplayUserHome from './DisplayUserHomePage';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));
export default function MainListItems(props)
{const classes = useStyles();
return(    <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Store's</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Stores" onClick={()=>props.setComponent(<DisplyAllStores setComponent={props.setComponent} />)} />
    </ListItem>
    </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>Product's</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Products" onClick={()=>props.setComponent(<DisplayAllProduct setComponent={props.setComponent} />)} />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Final Product" onClick={()=>props.setComponent(<DisplayAllFinalProduct setComponent={props.setComponent} />)} />
    </ListItem>
    </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel3a-header"
        >
          <Typography className={classes.heading}>Attributes's</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
    <ListItem button>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Categories" onClick={()=>props.setComponent(<DisplayAllCategory  setComponent={props.setComponent} />)} />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Material" onClick={()=>props.setComponent(<DisplayAllMaterial setComponent={props.setComponent} />)} />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Frame" onClick={()=>props.setComponent(<DisplayAllFrame setComponent={props.setComponent} />)}  />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Color" onClick={()=>props.setComponent(<DisplayAllColor setComponent={props.setComponent} />)}  />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Shape" onClick={()=>props.setComponent(<DisplayAllShape setComponent={props.setComponent} />)}  />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Price" onClick={()=>props.setComponent(<DisplayAllPriceRange setComponent={props.setComponent} />)} />
    </ListItem>
    </Typography>
        </AccordionDetails>
      </Accordion>
      <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="User Home Page" onClick={()=>props.setComponent(<DisplayUserHome setComponent={props.setComponent}/>)} />
    </ListItem>    
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" onClick={()=>props.history.replace({pathname:'/signin'})} />
    </ListItem>
  </div>
)
}