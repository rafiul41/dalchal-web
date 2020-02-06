<template>
  <div class="container">
    <div id="all-categories">
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        allCategories: null
      };
    },
    methods: {
      populateCategories(category) {
        if (category.subCategories && category.subCategories.length > 0) {
          const divElement = document.createElement('div');
          divElement.setAttribute('id', category.name + '-content');
          document.getElementById(category.name).appendChild(divElement);
          category.subCategories.forEach(subCategory => {
            this.createLiNodeAndPopulate(subCategory, category.name + '-content');
          });
        }
      },
      appendCategories() {
        this.allCategories.forEach(category => {
          this.createLiNodeAndPopulate(category, 'all-categories');
        });
      },
      createLiNodeAndPopulate(category, parentElementName) {
        const textNode = document.createTextNode(category.name);
        const child = document.createElement('li');
        child.appendChild(textNode);
        child.setAttribute('id', category.name);
        document.getElementById(parentElementName).appendChild(child);
        this.populateCategories(category);
      }
    },
    created() {
      axios
        .get(process.env.apiUrl + "/categories")
        .then(response => {
          this.allCategories = response.data.data;
          this.appendCategories();
        })
        .catch(err => {
          console.log(err);
        })
    }
  }
</script>

<style>
  .container {
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .title {
    font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
  }

  .subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
  }

  .links {
    padding-top: 15px;
  }
</style>
