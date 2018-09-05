<template>
  <div class="homePage">
    <!--首页-->
    <div class="mainPage">
      添米网
    </div>
    <!--轮播图-->
    <div class="swiperTop">
      <mt-swipe :auto="3000">
        <mt-swipe-item style="width: 100%;height: 100%" v-for="(item,index) in adList" :key="index">
          <img :src="item.picPath" alt="" style="width: 100%;height: 100%">
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <!--分类-->

    <div class="main_class clearFloat">
      <div class="main_class_item" v-for="(item,index) in classes" :key="index" @click="skip(index)">
        <img :src="item.src" alt="">
        <p>{{item.name}}</p>
      </div>
      <div class="main_class_item all_class" @click="action" v-show="show">
        <img src="./images/c10.png" alt="">
        <p>全部分类</p>
      </div>
    </div>

    <div class="recommendation">
      <!--今日推荐-->
      今日推荐
    </div>
    <div class="recommendationShop">

      <div class="recommendationShopList" v-for="item in recommendList">
        <!--/particulars-->
        <router-link :to="{path:'/particulars',query:{id:item.id}}">
          <div>
            <img :src="item.picPath" alt="">
          </div>
          <div>
            <span class="priceNew">¥{{item.realPrice}}</span>
            <span class="priceOld"><s>¥{{item.marketPrice}}</s></span>
          </div>
          <div>
            {{item.name}}
          </div>
        </router-link>
      </div>

    </div>
    <!--热销产品-->
    <div class="hotProducts">
      热销产品
    </div>
    <!--热销产品列表-->
    <div class="hotProductsShop clearFloat">

      <div v-for="item in sellList" class="hot_item">
        <router-link :to="{path:'/particulars',query:{id:item.id}}" tag="div" class="hotProductsList">
          <div class="hotProductsShopImg">
            <img :src="item.picPath" alt="">
          </div>
          <div class="hotProductsShopImgText">
            <div>
              {{item.name}}
            </div>
            <div>
              <span class="btn">¥ {{item.realPrice}}</span>
              <span class="old_price">¥ {{item.marketPrice}}</span>
            </div>
          </div>
        </router-link>
      </div>

    </div>
    <div class="action" @click="action">
      <img src='./images/分类icon.png' alt="">
    </div>
  </div>
</template>

<script>
  // import Swiper from 'swiper';
  // import 'swiper/dist/css/swiper.css'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'

  export default {

    name: 'homePage',
    data() {
      return {
        adList: '',//首页轮播图数据
        recommendList: '',//今日推荐产品数据
        sellList: '',//热销产品
        autoPlay: true,
        showIndicator: true,
        classes: "",//分类,
        imgList: [
          require('./images/c1.png'),
          require('./images/c2.png'),
          require('./images/c3.png'),
          require('./images/c4.png'),
          require('./images/c5.png'),
          require('./images/c6.png'),
          require('./images/c7.png'),
          require('./images/c8.png'),
          require('./images/c9.png'),
        ],
        show: false  //加载效果好一点
      }
    },
    components: {},
    methods: {
      action() {
        this.$router.push({
          path:'/ShopSearch',
          query: {
            index: 0
          }
        })
      },
      skip(index) {
        this.$router.push({
          path: '/ShopSearch',
          query: {
            index: index
          }
        })
      },
    },
    mounted() {
      let _this = this;
      this.$nextTick(() => {
        //this.mySwiper()
      })
    },
    beforeCreate() {
      let _this = this;
      // 拿到分类
      this.$http.get('/showapi/productType/getProductType').then((res) => {
        if (res.data.code === 0) {
          res.data.data.productTypeFirstList.pop();
          this.classes = res.data.data.productTypeFirstList;
          for (var i = 0; i < this.classes.length; i++) {
            this.classes[i].src = this.imgList[i]
          }
          this.show = true;
          // console.log(this.classes);
        }
      })
        .catch((err) => {
          console.error(err)
        });

      this.$http.get('/showapi/index/getIndex').then((res) => {
        if (res.data.code === 0) {
          this.adList = res.data.data.adList;
          this.recommendList = res.data.data.recommendList;
          this.sellList = res.data.data.sellList;
          console.log(this.sellList);
        }
      }).catch((err) => {
        console.error(err)
      });
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped type="text/less" lang="less">
  .clearFloat:after {
    display: block;
    clear: both;
    content: "";
    visibility: hidden;
    height: 0;
  }

  .homePage {
    width: 100%;
    background: #F1F1F1;
    .mainPage {
      width: 100%;
      height: 90px;
      background: #595CA1;
      text-align: center;
      line-height: 90px;
      color: white;
      font-size: 36px;
    }
    .swiperTop {
      width: 100%;
      height: 340px;

    }
    /*分类*/
    .main_class {
      width: 100%;
      height: 350px;
      box-sizing: border-box;
      background: #ffffff;
      .main_class_item {
        padding-top: 30px;
        padding-bottom: 6px;
        width: 20%;
        text-align: center;
        float: left;
        img {
          width: 88px;
          height: 88px;
        }
        p {
          font-size: 26px;
          font-family: PingFang-SC-Regular;
          color: rgba(51, 51, 51, 1);
        }
      }
    }
    .recommendation {
      margin-top: 10px;
      width: 100%;
      height: 90px;
      background: #ffffff;
      padding-left: 21px;
      line-height: 90px;
      color: black;
      font-size: 32px;
      box-sizing: border-box;
      font-family: PingFang-SC-Regular;
    }
    .recommendationShop {
      width: 100%;
      height: 364px;
      padding: 10px;
      display: flex;
      box-sizing: border-box;
      overflow: scroll;
      -webkit-overflow-scrolling: touch;
      .recommendationShopList {
        width: 256px;
        height: 344px;
        background: #ffffff;
        border-radius: 8px;
        box-sizing: border-box;
        padding: 22px;
        margin-right: 10px;
        div:nth-of-type(1) {
          img {
            width: 214px;
            height: 170px;
          }
        }
        div:nth-of-type(2) {
          .priceNew {
            color: #595CA1;
            opacity: 1;
            font-size: 30px;
            font-family: PingFang-SC-Regular;
          }
          .priceOld {
            color: #999999;
            opacity: 1;
            font-size: 20px;
            font-family: PingFang-SC-Regular;
          }
        }
        div:nth-of-type(3) {
          color: #333333;
          opacity: 1;
          font-size: 26px;
          width: 214px;
          height: 70px;
          margin-top: 26px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
      }
    }
    .hotProducts {
      width: 100%;
      height: 90px;
      background: #ffffff;
      line-height: 90px;
      color: black;
      font-size: 32px;
      margin-bottom: 10px;
      font-family: PingFang-SC-Regular;
      padding-left: 21px;
      box-sizing: border-box;
    }
    .hotProductsShop {
      width: 100%;
      padding-left: 10px;
      box-sizing: border-box;
      .hot_item {
        width: 360px;
        height: 460px;
        text-align: center;
        float: left;
        background: #ffffff;
        margin-right: 10px;
        margin-bottom: 10px;
      }
      .hotProductsList {
        margin-top: 50px;
        .hotProductsShopImg {
          margin-right: 20px;
          img {
            width: 240px;
            height: 200px;
          }
        }
        .hotProductsShopImgText {
          width: 300px;
          height: 70px;
          font-size: 26px;
          font-family: PingFang-SC-Regular;
          text-align: left;
          div:nth-of-type(1) {
            margin-top: 50px;
            margin-left: 30px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;

          }
          div:nth-of-type(2) {
            text-align: left;
            margin-top: 20px;
            .btn {
              text-align: left;
              padding-left: 30px;
              width: 100px;
              height: 52px;
              background: #ffffff;
              outline: none;
              border: none;
              line-height: 52px;
              color: #595CA1;
              font-size: 30px;
              font-family: PingFang-SC-Regular;
              margin-top: 20px;
            }
            .old_price {
              color: #999;
              opacity: 1;
              font-size: 20px;
              font-family: PingFang-SC-Regular;
              text-decoration: line-through;
            }
          }
        }
      }
    }
    .action {
      position: fixed;
      bottom: 100px;
      left: 70px;
      display: none;
      img {
        width: 80px;
        height: 80px;
      }
    }
  }

  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
