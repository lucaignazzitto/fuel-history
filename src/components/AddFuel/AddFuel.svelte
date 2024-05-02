<script>
  import Numbers from '../Table/Numbers.svelte';
  import algoliaClient from '../../services/algolia';

  const currency = 'EUR'
  let literCount = 0
  let priceCount = 0

  $: pricePerLiter = (priceCount / literCount)

  let isLoading = false

  function storeFuelHistory () {
    isLoading = true
    const index = algoliaClient.initIndex('dev_fuel-history')
    index.saveObjects([{
      "firstname": "Luca", // this have to be global
      "lastname": "Ignazzitto", // this have to be global
      "vehicle": "GG334LZ", // this have to be global
      "currency": currency, // this have to be global
      "moneySpot": priceCount,
      "liter": literCount,
      "pricePerLiter": pricePerLiter,
      "created_at": "2024-05-02T15:36:50" // check method here
    }], {
      autoGenerateObjectIDIfNotExist: true
    }).then(({ objectIDs }) => {
      console.log(objectIDs);

    })
    .finally(() => {
      isLoading = false
    })
  }

</script>

<div class="wrapper-numbers">
  {#if isFinite(pricePerLiter)}
    <h5 class="price-per-liter">price per liter: {pricePerLiter.toFixed(2)} {currency}</h5>
  {/if}
  <div class="numbers">
    <Numbers measureUnit="lt" on:change={(event) => literCount = event.detail.currentCount} />
    <Numbers useMotion on:change={(event) => priceCount = event.detail.currentCount} />
  </div>
  <div class="submitter">
    {isLoading ? 'isLoading' : ''}
    <button on:click={storeFuelHistory} disabled={!(priceCount && literCount)}>save</button>
  </div>
</div>

<style lang="scss">
	.wrapper-numbers {
    width: 100%;

    .price-per-liter {
      margin: 0;
    }
    
    .numbers {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      margin-top: 12px;
    }

    .submitter {
      margin-top: 42px;
      text-align: center;

      button {
        padding: 12px 14px;
        border-radius: 20px;
        min-width: 130px;
        background-color: #cad9e4;
        border: none;
        outline: none;
      }
    }
	}
</style>