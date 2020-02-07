<template>
  <div class="container">
    <div id="all-categories">
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      allCategories() {
        return this.$store.getters.loadedCategories;
      }
    },
    methods: {
      populateCategories(category) {
        if (category.subCategories && category.subCategories.length > 0) {
          const divElement = document.createElement('div');
          divElement.setAttribute('id', category.name + '-content');
          document.getElementById(category.name).appendChild(divElement);
          category.subCategories.forEach(subCategory => {
            this.createLiNodeAndPopulate(subCategory, category.name + '-content', 'none');
          });
        }
      },
      appendCategories() {
        const loadedCategories = this.allCategories;
        loadedCategories.forEach(category => {
          this.createLiNodeAndPopulate(category, 'all-categories', 'inherit');
        });
      },
      createLiNodeAndPopulate(category, parentElementName, displayVal) {
        const textNode = document.createTextNode(category.name);
        const child = document.createElement('div');
        child.style.display = displayVal;
        child.appendChild(textNode);
        child.setAttribute('id', category.name);
        document.getElementById(parentElementName).appendChild(child);
        this.populateCategories(category);
      }
    },
    beforeMount() {
      this.appendCategories();
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    display: flex;
    justify-content: left;
    align-items: center;
  }
</style>
