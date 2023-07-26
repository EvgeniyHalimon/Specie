<script lang="ts">
	import BillModal from '$components/BillModal.svelte';
	import BillModalContent from '$components/BillModalContent.svelte';
	import BillsChart from '$components/BillsChart.svelte';
	import BillsTable from '$components/BillsTable.svelte';
	import axiosWorker from '$shared/axios';
	import { GET_CATEGORIES, GET_SUBCATEGORIES } from '$shared/constants';
	import { categories, subcategories } from '$store/store';
	import { onMount } from 'svelte';
	let open: boolean = false;
	const openBillModal = () => (open = !open);
	const getCategories = async () => {
		try {
			const { data } = await axiosWorker().get(GET_CATEGORIES);
			if (data) categories.set(data);
		} catch (error) {
			console.log('🚀 ~ file: +page.svelte:13 ~ getCategories ~ error:', error);
		}
	};
	const getSubcategories = async () => {
		try {
			const { data } = await axiosWorker().get(GET_SUBCATEGORIES);
			if (data) subcategories.set(data);
		} catch (error) {
			console.log('🚀 ~ file: +page.svelte:13 ~ getCategories ~ error:', error);
		}
	};

	const getData = () => {
		getCategories();
		getSubcategories();
	};
	onMount(async () => {
		getData();
	});
</script>

<div class="flex justify-between w-full gap-10">
	<BillsChart />
	<div class="flex flex-column">
		{#if open}
			<BillModal bind:open>
				<BillModalContent/>
			</BillModal>
		{/if}
		<div class="flex flex-col items-center gap-3">
			<button on:click={openBillModal}>Create bill</button>
			<BillsTable />
		</div>
	</div>
</div>
