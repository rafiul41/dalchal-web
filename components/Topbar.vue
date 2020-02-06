<template>
  <div class="row">
    <div id="sidebar-toggle" class="col-1"></div>
    <div id="dalchal-logo" class="col-2"></div>
    <div id="search-box" class="col-7">
      <input id="search-input">
    </div>
    <div id="others" class="col-2"></div>
  </div>
</template>

<style lang="scss" scoped>
  .row {
    height: 55px;
  }

  #sidebar-toggle {
    background: orange;
  }
  #dalchal-logo {
    background: rebeccapurple;
  }
  #search-box {
    background: aquamarine;
  }
  #others {
    background: aqua;
  }
</style>
