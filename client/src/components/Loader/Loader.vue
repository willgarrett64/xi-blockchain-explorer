<template>
  <div class="loader">
    <p>Loading Data...</p>
    <img 
      :src="require(`@/assets/images/xi-logo.jpg`)" 
      alt="xi logo" 
      class="spinner-img"
    />
  </div>
</template>

<script>
export default {
  name: "Loader",
};
</script>

<style>
.loader {
  color: white;
  position: fixed;
  background-color: var(--xi-blue);
  border-radius: 15%;
  width: 160px;
  height: 160px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.loader p {
  margin-top: 133px;
}

.loader img {
  position: absolute;
  animation: spin 2s linear infinite;
  height: 80px;
  width: 80px;
  top: calc(50% - 40px);
  left: calc(50% - 40px);
  border-color: var(--xi-orange);
  border-style: solid;
  border-width: 2px 2px 2px 0;
  border-radius: 50%;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
