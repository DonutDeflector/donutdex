import Vue from "vue";
import Router from "vue-router";
import Header from "@/components/Header";
import MainList from "@/components/MainList";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "MainList",
      components: {
        header: Header,
        default: MainList
      }
    }
  ]
});
