// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import { Button, Select, Form, FormItem, Input, Image, Header, Container, Aside, Menu, Submenu, MenuItem, MenuItemGroup, Main, Breadcrumb, BreadcrumbItem, Row, Col, Dropdown, DropdownItem, DropdownMenu, Table, TableColumn, Pagination } from 'element-ui'

Vue.component(Button.name, Button)
Vue.component(Select.name, Select)
Vue.component(Form.name, Form)
Vue.component(FormItem.name, FormItem)
Vue.component(Input.name, Input)
Vue.component(Image.name, Image)
Vue.component(Header.name, Header)
Vue.component(Container.name, Container)
Vue.component(Aside.name, Aside)
Vue.component(Container.name, Container)
Vue.component(Menu.name, Menu)
Vue.component(Submenu.name, Submenu)
Vue.component(MenuItem.name, MenuItem)
Vue.component(MenuItemGroup.name, MenuItemGroup)
Vue.component(Main.name, Main)
Vue.component(Breadcrumb.name, Breadcrumb)
Vue.component(BreadcrumbItem.name, BreadcrumbItem)
Vue.component(Row.name, Row)
Vue.component(Col.name, Col)
Vue.component(Dropdown.name, Dropdown)
Vue.component(DropdownItem.name, DropdownItem)
Vue.component(DropdownMenu.name, DropdownMenu)
Vue.component(Table.name, Table)
Vue.component(TableColumn.name, TableColumn)
Vue.component(Pagination.name, Pagination)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
