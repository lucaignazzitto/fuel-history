<script>
  import Counter from '../../routes/Counter.svelte';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let measureUnit = '€'
  export let useMotion = false

  const numbers = [1,2,3,4,5,6,7,8,9]
  let currentCount = 0

  function setCount (count) {
    currentCount = `${count}` * 1
    console.log(currentCount)
    dispatch(`change`, { currentCount })
  }

  function numberClick (value) {
    setCount(`${currentCount}${value}`)
  }

  function deleteNumber (toRemove = -1) {
    if (currentCount > 0) {
      setCount(currentCount.toString().slice(0, toRemove))
    } else {
      clear()
    }
  }

  function clear () {
    setCount(0)
  }
</script>

<div class="numbersWrapper">
  <Counter count={currentCount} useMotion={useMotion} measureUnit={measureUnit} />
  
  <div class="tableNumber">
    {#each numbers as n }
      <div class="number-tile">
        <button class="number-inserter" on:click={() => numberClick(n)}>
          {n}
        </button>
      </div>
    {/each}
    <!-- last line actions -->
    <div class="number-tile">
      <button class="number-inserter" on:click={() => clear()}>
        clear
      </button>
    </div>
    <div class="number-tile">
      <button class="number-inserter" on:click={() => numberClick(0)}>
        0
      </button>
    </div>
    <div class="number-tile">
      <button class="number-inserter" on:click={() => deleteNumber(-1)}>
        del
      </button>
    </div>
  </div>
</div>

<style lang="scss">
  .numbersWrapper {
    display: block;
    width: 100%;
    max-width: 400px;
    
    .tableNumber {
      position: relative;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      width: 100%;
      margin-top: 24px;
  
      .number-tile {
        position: relative;
        display: block;
        padding-bottom: 72%;
        
        .number-inserter {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          outline: none;
          background: transparent;
          cursor: pointer;
          border: none;
          filter: drop-shadow(3px 3px 10px var(--color-bg-0));
          background-color: #fff;
          border-radius: 6px;
          font-size: 16px;
          font-weight: 500;

          &:hover {
            background-color: #f9f9f9;
          }
  
          &:active {
            filter: drop-shadow(3px 3px 5px var(--color-bg-0));
          }
        }
      }
    }
  }
</style>
