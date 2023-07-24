<script lang="ts">
	import BillModal from '$components/BillModal.svelte';
	import BillsChart from '$components/BillsChart.svelte';
	let open: boolean = false;
	const openBillModal = () => (open = !open);
</script>

<button on:click={openBillModal}>Create bill</button>

{#if open}
	<BillModal bind:open/>
    <BillsChart/>
{/if}
