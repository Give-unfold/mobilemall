import Vue from 'vue'
import { Button, Lazyload, Toast, Icon, Loading, PullRefresh, NavBar, Swipe, SwipeItem, Cell, CellGroup, Col, Row, Tab, Tabs, GoodsAction, GoodsActionButton, GoodsActionIcon, Search, IndexBar, IndexAnchor, Form, Field, Tabbar, TabbarItem, SubmitBar, Card, Checkbox, Tag, Stepper, AddressList, AddressEdit, NumberKeyboard, PasswordInput, Popup, Step, Steps, Grid, GridItem, Dialog } from 'vant';

Vue.use(Button);
Vue.use(Dialog);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Step);
Vue.use(Steps);
Vue.use(Popup);
Vue.use(Toast);
Vue.use(Icon);
Vue.use(Loading);
Vue.use(PullRefresh);
Vue.use(NavBar);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Col);
Vue.use(Row);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
Vue.use(Search);
Vue.use(IndexBar);
Vue.use(IndexAnchor);
Vue.use(Form);
Vue.use(Field);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(SubmitBar);
Vue.use(Card);
Vue.use(Checkbox);
Vue.use(Tag);
Vue.use(Stepper);
Vue.use(AddressList);
Vue.use(AddressEdit);
Vue.use(NumberKeyboard);
Vue.use(PasswordInput);
Vue.use(Lazyload, {
  lazyComponent: true,
  error: require("../assets/imgs/ebf93ae5e90120f60055f1142fc447d8.jpg"),
  loading: require("../assets/imgs/src=http___inews.gtimg.com_newsapp_match_0_13748294563_0&refer=http___inews.gtimg.gif"),
});
