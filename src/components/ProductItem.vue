<template>
  <main class="products">
    <ul class="products--box" v-if="dataProduct">
      <li class="products--box__item">
        <img
          :title="dataProduct.name"
          :alt="dataProduct.summary"
          src="../assets/camera.png"
        />
        <h2 v-for="(nameProduct, index) in dataProduct.categories" :key="index">
          {{ nameProduct.name }}
        </h2>
        <h3>{{ dataProduct.price.formattedValue }}</h3>
        <button
          class="in-stock"
          v-if="dataProduct.stock.stockLevelStatus === 'inStock'"
          @click="addToCart()"
        >
          COMPRAR
        </button>
        <button class="out-stock" disabled v-else>FORA DE ESTOQUE</button>

        <div class="products--box__item-resume">
          <h4>
            <strong>RESUMO</strong><br />
            {{ dataProduct.summary }}
          </h4>

          <h5>CARACTERÍSTICAS</h5>
          <p v-html="dataProduct.description"></p>
        </div>
      </li>
    </ul>
  </main>
</template>

<script>
export default {
  name: "ProductItem",
  data() {
    return {
      dataProduct: null,
    };
  },
  props: ["id"],
  methods: {
    getProducts() {
      console.log(this.id);
      fetch(
        `http://challenge-front-end-keyrus.us-east-2.elasticbeanstalk.com/retrieve-product/${this.id}`, {
            headers: {
              "Content-Security-Policy": "upgrade-insecure-requests"
            }
          }
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.dataProduct = data;
          console.log(this.dataProduct);
        });
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
.products--box__item {
  text-align: center;
  background: #ffffff;
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
  padding: 30px;
}

.products--box__item img {
  width: 300px;
  height: 300px;
  object-fit: cover;
  border-radius: 50%;
}

.products--box__item h2:first-of-type {
  font-weight: 700;
  font-size: 28px;
  margin-top: 15px;
  margin-bottom: 5px;
}

.products--box__item h2:last-of-type {
  font-size: 22px;
  margin-bottom: 15px;
}

.products--box__item h3 {
  font-weight: 700;
  font-size: 24px;
  margin-bottom: 15px;
  color: #e80;
}

.products--box__item p b {
  font-weight: bold;
}

.products--box__item button {
  display: block;
  margin: 0 auto;
  border-radius: 4px;
  padding: 15px 50px;
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

.products--box__item-resume {
  max-width: 60%;
  width: 100%;
  padding-top: 20px;
  margin: 50px auto 0 auto;
  border-top: 1px solid #ccc;
}

.products--box__item-resume h4 strong {
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 10px;
  display: inline-block;
}

.products--box__item-resume h5 {
  font-weight: 700;
  font-size: 20px;
  margin-top: 20px;
  margin-bottom: 10px;
  display: inline-block;
}

.products--box__item-resume p {
  max-height: 350px;
  height: 100%;
  overflow: auto;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
}

/* =========== RESPONSIVE =========== */
@media only screen and (max-width: 768px) {
  .products--box__item {
    margin: 0 10px;
    background: none;
  }

  .products--box__item-resume {
    max-width: none;
  }
}
</style>
