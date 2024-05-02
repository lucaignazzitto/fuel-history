<script>
  import AddFuel from '../components/AddFuel/AddFuel.svelte';
	import { formatDate } from '../helpers';

	const today = formatDate(new Date(), 'D MMMM, YYYY')
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<div class="title">
		<h1>Aggiungi nuove spesa</h1>
		<span>{today}</span>
	</div>
	<div class="add-fuel">
		<AddFuel />
	</div>
</section>

<style lang="scss">
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		flex: 0.6;
	}

	.title {
		width: 100%;
		
		h1 {
			text-align: left;
			margin: 0;
			margin-bottom: 12px;
		}

		span {
			font-size: 16px;
		}
	}

	.add-fuel {
		margin-top: 24px;
	}
</style>
