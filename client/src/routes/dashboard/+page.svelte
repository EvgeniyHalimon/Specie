<script lang="ts">
	import BillModal from '$components/BillModal.svelte';
	import BillModalContent from '$components/BillModalContent.svelte';
	import BillsChart from '$components/BillsChart.svelte';
	import BillsTable from '$components/BillsTable.svelte';
	import LoadCoin from '$components/LoadCoin.svelte';
	import axiosWorker from '$shared/axios';
	import { GET_BILLS, GET_CATEGORIES, GET_SUBCATEGORIES } from '$shared/constants';
	import { bills, categories, subcategories } from '$store/store';
	import { onMount } from 'svelte';
	let open: boolean = false;
	let flag: boolean = false;
	let reducedBills: any;
	const openBillModal = () => (open = !open);

	const getData = async () => {
		try {
			const { data: cat } = await axiosWorker().get(GET_CATEGORIES);
			if (cat) categories.set(cat);
			const { data } = await axiosWorker().get(GET_SUBCATEGORIES);
			if (data) subcategories.set(data);
			const { data: billData } = await axiosWorker().get(GET_BILLS);
			if (data) {
				bills.set(billData);
				reducedBills = $bills.map((bill) => {
					return {
						category: bill.categoryID,
						price: bill.price
					};
				});
			}
			flag = true;
		} catch (error) {
			console.log('🚀 ~ file: +page.svelte:13 ~ getCategories ~ error:', error);
		}
	};

	const mergeByCategory = (arr: any) => {
		return arr.reduce((result: any, current: any) => {
			const existingItem = result.find((item: any) => item.category === current.category);
			if (existingItem) {
				existingItem.price += current.price;
			} else {
				result.push({ category: current.category, price: current.price });
			}
			return result;
		}, []);
	};

	onMount(() => {
		getData();
	});
</script>

{#if flag === true}
	<div class="flex justify-between w-full gap-10">
		{#if reducedBills.length !== 0}
			<BillsChart data={mergeByCategory(reducedBills)} />
		{:else}
			<h1>No data yet</h1>
		{/if}
		<div class="flex flex-column">
			{#if open}
				<BillModal bind:open>
					<BillModalContent />
				</BillModal>
			{/if}
			<div class="flex flex-col items-center gap-3">
				<button on:click={openBillModal}>Create bill</button>
				{#if reducedBills.length !== 0}
					<BillsTable />
				{:else}
					<h1>No data yet</h1>
				{/if}
			</div>
		</div>
	</div>
{:else}
	<LoadCoin />
{/if}
