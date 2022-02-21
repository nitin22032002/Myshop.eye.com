import React from 'react';
import CityState from './components/admincomponents/storelocator';
import DisplayAllStores from './components/admincomponents/displaystores';
import AddCategory from './components/admincomponents/AddCategory';
import DisplayAllCategory from './components/admincomponents/DisplayCategory';
import { ToastContainer } from 'react-toastify';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import AddPrice from './components/admincomponents/AddPrice'; import DisplayAllPriceRange from './components/admincomponents/DisplayAllPrice';
import Dashboard from './components/admincomponents/dashboard';
import SignIn from './components/admincomponents/signin';
import AddMaterial from './components/admincomponents/AddMaterial';
import AddShape from "./components/admincomponents/AddShapes";
import AddColor from './components/admincomponents/AddColor';
import AddFrame from './components/admincomponents/AddFrame';
import DisplayAllColor from './components/admincomponents/DisplayAllColor';
import DisplayAllFrame from './components/admincomponents/DisplayAllFrame';
import DisplayAllMaterial from './components/admincomponents/DisplayAllMaterial';
import DisplayAllShape from './components/admincomponents/ShowAllShape';
import FilterList from './components/userinterface/FilterList';
import Home from './components/userinterface/Home';
import StoreCities from './components/userinterface/StoreCities';
import SliderComponent from './components/userinterface/SliderComponent';
import OurStory from './components/userinterface/OurStory';
import UserSignin from './components/userinterface/UserSignin';
import SignUp from './components/userinterface/SignUp';
import AddressCart from './components/userinterface/AddressCart';
import ShowCart from './components/userinterface/ShowCart';
import StoreLocator from './components/userinterface/StoreLocator';
import Loader from "./components/loader"
function App(props) {
  return (
    <div>
      <Router>
        {/* Admin Side */ }
        <Route component={CityState} path={"/addnewstore"} props={props.history} />
        <Route component={DisplayAllStores} path={"/displayallstores"} props={props.history} />
        <Route component={AddCategory} path={"/addnewcategory"} props={props.history} />
        <Route component={DisplayAllCategory} path={"/displayallcategory"} props={props.history} />
        <Route component={DisplayAllPriceRange} path={"/displayallpricerange"} props={props.history} />
        <Route component={AddPrice} path={"/addnewpricerange"} props={props.history} />
        <Route component={Dashboard} path={"/dashboard"} props={props.history} />
        <Route component={SignIn} path={"/adminsignin"} props={props.history} />
        <Route component={AddShape} path={"/addnewshape"} props={props.history} />
        <Route component={AddMaterial} path={"/addnewmaterial"} props={props.history} />
        <Route component={AddColor} path={"/addnewcolor"} props={props.history} />
        <Route component={AddFrame} path={"/addnewframe"} props={props.history} />
        <Route component={DisplayAllShape} path={"/displayallshape"} props={props.history} />
        <Route component={DisplayAllFrame} path={"/displayallframe"} props={props.history} />
        <Route component={DisplayAllMaterial} path={"/displayallmaterial"} props={props.history} />
        <Route component={DisplayAllColor} path={"/displayallcolor"} props={props.history} />
       
        {/* End Admin Side*/}
        
        {/*User Side */}
        <Route component={FilterList} path="/products" props={props.history} />
        <Route component={Home} exact path={"/"} props={props.history} />
        <Route component={SliderComponent} path={"/product"} props={props.history} />
        <Route component={OurStory} path={"/our-story"} props={props.history} />
        <Route component={StoreCities} path={"/our-stores"} props={props.history} />
        <Route component={UserSignin} path={"/signin"} props={props.history} />
        <Route component={SignUp} path={"/signup"} props={props.history} />
        <Route component={ShowCart} path={"/cart"} props={props.history} />
        <Route component={AddressCart} path={"/payment"} props={props.history} />
        <Route component={StoreLocator} path={"/store-locator"} props={props.history} />
        <Route component={Loader} path={"/loader"} props={props.history} />
        {/*End User Side */}
      </Router>
      <ToastContainer />
    </div>
  );
}
export default App;
