<svelte:head>
	<title>History</title>
	<meta name="description" content="Your fuel history" />
</svelte:head>

<script>
  import algoliaClient from '../../services/algolia'

  let promise = getHistory();

  async function getHistory() {
    const historyIndex = algoliaClient.initIndex('dev_fuel-history')
		return historyIndex.search('', {
      filters: 'vehicle:GG334LZ'
    })
      .then((res) => {
        return res.hits
      })
	}
</script>

<div class="text-column">
  {#await promise}
    <p>...waiting</p>
  {:then hits}
    <ul>
      render hits
      {#each hits as line}
        <li>
          {line.vehicle} {line.liter}l - {line.moneySpot}{line.currency}
        </li>
      {/each}
    </ul>
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
</div>
