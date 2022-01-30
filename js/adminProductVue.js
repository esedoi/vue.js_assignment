const url = "https://vue3-course-api.hexschool.io/";
const path = "esedoi";
const productsData =[];
import{ createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js";
 
let productModal = null;
let delProductModal = null;
const app = createApp( {         
  //資料集合
  data(){
    return{
      temp:{
        imagesUrl:[],
      },   
      products:[],
      isNew:false
    }
  },
  //方法集合
  methods: {
    //確認是否登入
    checkLogin(params){
    //取得token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hextoken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  console.log(token);
  axios.defaults.headers.common['Authorization'] = token;
    axios.post(`${url}v2/api/user/check`)
    .then((res)=>{
      console.log(res.data);
    }).catch((error)=>{
          console.log(error)
          window.location = 'index.html';
      })
  },

  //modal判斷
  openModal(isNew,item){
    if(isNew === "new"){
      this.temp = {
        imagesUrl:[],
      };
      this.isNew = true;
      productModal.show();
    }else if(isNew ==="edit"){
      this.temp = {...item};
      this.isNew = false;
      productModal.show()
    }else if(isNew ==="delete"){
      this.temp = {...item};
      delProductModal.show();
    }
  },
   //取得產品
    getProducts(){
    axios.get(`${url}v2/api/${path}/admin/products`)
    .then((res)=>{
      console.log(res.data.products);     
      this.products = res.data.products;
    }).catch((error)=>{
          console.log(error);
      })
  },
    //刪除資料
    deleteProduct(){
      console.log();
      axios.delete(`${url}v2/api/${path}/admin/product/${this.temp.id}`)
    .then((res)=>{
       
      alert(res.data.message);
        delProductModal.hide();
      this.getProducts();    
    }).catch((err)=>{
      alert(err.data.message);
      })
        
    },
    

    //新增或編輯
    updateProduct(){
      let api = `${url}v2/api/${path}/admin/product`;
      let httpMethod = "post";

      if(!this.isNew){
        api = `${url}v2/api/${path}/admin/product/${this.temp.id}`;
        httpMethod = "put";
      }
      axios[httpMethod](api,{data:this.temp})
    .then((res)=>{
      alert(res.data.message);
      productModal.hide();
      this.getProducts();    
    }).catch((err)=>{
      alert(err.data.message);
      })
    },

    //新增圖片
    addpic(){
      this.temp.imagesUrl = [];
      this.temp.imagesUrl.push('');
    }



  },
  //生命週期
  mounted(){
    this.checkLogin();
    this.getProducts();
    productModal = new bootstrap.Modal(document.getElementById('productModal'),{keyboard:false});
    delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'),{keyboard:false});
  }
})
app.mount("#app")