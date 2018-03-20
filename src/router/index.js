import Vue from 'vue'
import Router from 'vue-router'
import DesignJX from '@/components/designJX/designJX'
import Mydesign from '@/components/mydesign/mydesign'
import Myhx from '@/components/myhx/myhx'
import Myxgt from '@/components/myxgt/myxgt'
import Mygqt from '@/components/myxgt/mygqt/mygqt'
import Myqjt from '@/components/myxgt/myqjt/myqjt'
import Address from '@/components/address/address'
import Imgpage from '@/components/address/imgPage'
Vue.use(Router)
Vue.component("Address",Address);
export default new Router({
  routes: [
        // {
          
        //       path:'/',
        //       name:'Address',
        //       component:Address
          
      
        // },
        {path:'/',
         name:'DesignJX',
         component:DesignJX,
         },
         {
           path:'/index/mydesign',
           name:'Mydesign',
           component:Mydesign
         },
         {
          path:'/index/myxgt',
          name:'Myxgt',
          component:Myxgt
         },
         {
          path:'/index/myhx',
          name:'Myhx',
          component:Myhx
         },{
           path:'/index/imgPage',
           name:"Imgpage",
           component:Imgpage
         }
      ]
})
