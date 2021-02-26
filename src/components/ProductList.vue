<template>
  <main class="products">
    <section class="loading" v-show="showLoad">
      <div class="loader">Loading...</div>
    </section>

    <ul class="products--banner">
      <span>PRODUTO MAIS BARATO DA SEMANA</span>
      <li v-if="productMin">
        <h2 v-for="(nameProduct, index) in productMin.categories" :key="index">
          {{ nameProduct.name }}
        </h2>
        <h3>{{ productMin.price.formattedValue }}</h3>
        <button
          class="in-stock"
          v-if="productMin.stock.stockLevelStatus === 'inStock'"
          @click="addToCart()"
        >
          COMPRAR
        </button>
        <button class="out-stock" disabled v-else>FORA DE ESTOQUE</button>
        <router-link
          :to="{ name: 'ProductItem', params: { id: productMin.code } }"
          title="Ir para Página do Produto"
          >VER PRODUTO</router-link
        >
      </li>
    </ul>

    <!-- <img v-for="item in items" :key="item.img" :src="item.img" /> -->

    <ul class="products--box">
      <VueSlickCarousel v-bind="settings" v-if="dataProduct">
        <li
          class="products--box__item"
          v-for="product in dataProduct"
          :key="product.code"
        >
          <router-link
            :to="{ name: 'ProductItem', params: { id: product.code } }"
            title="Ir para Página do Produto"
          >
            <img
              :title="product.name"
              :alt="product.summary"
              src="../assets/thumb-camera.jpg"
            />
            <h2 v-for="(nameProduct, index) in product.categories" :key="index">
              {{ nameProduct.name }}
            </h2>
            <h3>{{ product.price.formattedValue }}</h3>
            <button
              class="in-stock"
              v-if="product.stock.stockLevelStatus === 'inStock'"
              @click="addToCart()"
            >
              COMPRAR
            </button>
            <button class="out-stock" disabled v-else>FORA DE ESTOQUE</button>
          </router-link>
        </li>
      </VueSlickCarousel>
    </ul>
  </main>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";

export default {
  name: "ProductList",
  components: {
    VueSlickCarousel,
  },
  data() {
    return {
      showLoad: false,
      dataProduct: null,
      productMin: null,
      settings: {
        /*centerMode: true,
        centerPadding: "20px",
        focusOnSelect: true,
        infinite: true,
        slidesToShow: 3,
        speed: 500*/

        /*dots: true,
        infinite: true,
        initialSlide: 2,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        swipeToSlide: true*/

        centerMode: true,
        centerPadding: "20px",
        focusOnSelect: true,
        infinite: true,
        slidesToShow: 3,
        speed: 500,
        dots: true,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      },
    };
  },
  methods: {
    getProducts: async function () {
      this.showLoad = true;

      try {
        fetch(
          "http://challenge-front-end-keyrus.us-east-2.elasticbeanstalk.com/retrieve-product/products", {
            headers: {
              "Content-Security-Policy": "upgrade-insecure-requests"
            }
          }
        )
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            this.dataProduct = data.products;
            this.productMinValue();
          });
      } catch (error) {
        console.log(error);
      } finally {
        this.showLoad = false;
      }
    },
    productMinValue() {
      const arrProducts = new Array();
      const arrValues = new Array();

      this.dataProduct.map((value) => {
        arrValues.push(value.price.value);
        arrProducts.push(value);

        return arrProducts, arrProducts;
      });

      for (let i = 0; i < arrProducts.length; i++) {
        if (arrProducts[i].price.value === Math.min(...arrValues)) {
          this.productMin = arrProducts[i];
        }
      }
    },
    addToCart() {
      alert("Produto Adicionado ao Carrinho");
    },
  },
  created() {
    this.getProducts();
  },
};
</script>

<style scoped>
.products--banner {
  width: 100%;
  height: 300px;
  background-image: url("../assets/teste.jpg");
  background-position: center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  color: #fff;
  padding-left: 20px;
}

.products--banner span {
  background: #388e3c;
  width: max-content;
  padding: 10px 20px;
  font-weight: 700;
  border-radius: 4px;
}

.products--banner h2:first-of-type {
  font-size: 38px;
  font-weight: 700;
  margin-bottom: 10px;
}

.products--banner h2:last-of-type {
  font-size: 30px;
  font-weight: 300;
  margin-bottom: 20px;
}

.products--banner h3 {
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 15px;
}

.products--banner button {
  display: block;
  font-weight: 300;
  padding: 10px 20px;
  font-size: 18px;
}

.products--banner .in-stock {
  color: #f2f2f2;
  border: 1px solid #fff;
  cursor: pointer;
}

.products--banner .out-stock {
  background: #cccccc;
  cursor: no-drop;
}

.products--banner a {
  font-weight: 700;
  display: block;
  margin-top: 20px;
  text-decoration: underline;
}

.products--box {
  margin-top: 50px;
}

.products--box__item {
  display: inline-block;
  max-width: 85% !important;
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
  padding: 10px;
  background: #fff;
  border-radius: 4px;
  transition: all 0.2s;
}

.products--box__item img {
  border-radius: 4px;
  margin-bottom: 20px;
  display: block;
  max-width: 100%;
}

.products--box__item h2:first-of-type {
  font-weight: 700;
  font-size: 20px;
  margin-top: 15px;
  margin-bottom: 5px;
}

.products--box__item h2:last-of-type {
  font-size: 18px;
  margin-bottom: 15px;
}

.products--box__item h3 {
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 15px;
  color: #e80;
}

.products--box__item button {
  display: block;
  margin: 0 auto;
  border-radius: 4px;
  padding: 10px 20px;
  width: 100%;
  font-weight: 300;
  font-size: 18px;
}

.products--box__item .in-stock {
  background: #333333;
  color: #ffffff;
  cursor: pointer;
  transition: 0.2s;
}

.products--box__item .out-stock {
  background: #cccccc;
  cursor: no-drop;
}

.products--box__item .in-stock:hover {
  background: #666666;
}

/* =========== RESPONSIVE =========== */
@media only screen and (max-width: 768px) {
  .products--box__item {
    max-width: 90% !important;
  }
}
</style>
