<script>
	import { spring } from 'svelte/motion';

	export let count = 0;
	export let measureUnit = '€';
	export let useMotion = false;

	const displayed_count = spring();
	$: displayed_count.set(count);
	$: offset = modulo($displayed_count, 1);
	$: formattedCount = new Intl.NumberFormat('it-IT').format(count)

	/**
	 * @param {number} n
	 * @param {number} m
	 */
	function modulo(n, m) {
		// handle negative numbers
		return ((n % m) + m) % m;
	}
</script>

<div class="counter">
	<div class="counter-viewport">
		<div class="counter-digits" style="transform: translate(0, {useMotion ? 100 * offset : 100}%)">
			<strong class="hidden" aria-hidden="true">{formattedCount}</strong>
			<strong>{formattedCount}</strong>
		</div>
		<div class="unit-label">
			{measureUnit}
		</div>
	</div>
</div>

<style>
	.counter {
		display: flex;
		border-top: 1px solid rgba(0, 0, 0, 0.1);
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	}


	.counter-viewport {
		width: 100%;
		height: 4em;
		overflow: hidden;
		text-align: center;
		position: relative;
		display: flex;
		align-items: center;
	}

	.counter-viewport strong {
		position: absolute;
		display: flex;
		width: 100%;
		height: 100%;
		font-weight: 400;
		color: var(--color-theme-1);
		font-size: 4rem;
		align-items: center;
		justify-content: center;
	}

	.counter-digits {
		position: relative;
		width: 100%;
		height: 100%;
	}

	.unit-label {
		font-weight: 300;
		color: var(--color-theme-1);
		font-size: 2rem;
		padding: 5px 15px;
    border-left: 1px solid rgba(0, 0, 0, 0.1);
    border-right: 1px solid rgba(0, 0, 0, 0.1);
	}

	.hidden {
		top: -100%;
		user-select: none;
	}
</style>
