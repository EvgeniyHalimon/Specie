<script lang="ts">
	import BillModal from '$components/BillModal.svelte';
	import BillModalForm from '$components/BillModalForm.svelte';
	import BillsChart from '$components/BillsChart.svelte';
	import BillsTable from '$components/BillsTable.svelte';
	import LoadCoin from '$components/LoadCoin.svelte';
	import axiosWorker from '$shared/axios';
	import { GET_BILLS, GET_CATEGORIES, GET_SUBCATEGORIES } from '$shared/constants';
	import type { IBill, IMergedBill } from '$shared/types';
	import { getName } from '$shared/utils';
	import { bills, categories, subcategories } from '$store/store';
	import { onMount } from 'svelte';
	let open: boolean = false;
	let isLoaded: boolean = false;
	let mergedBills: IMergedBill[];
	const openBillModal = () => (open = !open);

	const getData = async () => {
		try {
			const { data: cat } = await axiosWorker().get(GET_CATEGORIES);
			if (cat) categories.set(cat);
			const { data } = await axiosWorker().get(GET_SUBCATEGORIES);
			if (data) subcategories.set(data);
			const { data: billData } = await axiosWorker().get(GET_BILLS);
			if (data) {
				const sorted = billData.sort((a: IBill, b: IBill) =>
					a.createdAt.localeCompare(b.createdAt)
				);
				bills.set(sorted);
				mergedBills = $bills.map((bill) => {
					return {
						category: getName(bill.categoryID, $categories),
						price: Number(bill.price), //da hell?!
						categoryID: bill.categoryID
					};
				});
			}
			isLoaded = true;
		} catch (error) {
			console.log('🚀 ~ file: +page.svelte:13 ~ getCategories ~ error:', error);
		}
	};

	const mergeByCategory = (arr: IMergedBill[]) => {
		return arr.reduce((result: IMergedBill[], current: IMergedBill) => {
			const existingItem = result.find((item: IMergedBill) => item.category === current.category);
			if (existingItem) {
				existingItem.price += current.price;
			} else {
				result.push({
					category: current.category,
					price: current.price,
					categoryID: current.categoryID
				});
			}
			return result;
		}, []);
	};

	onMount(() => {
		getData();
	});
</script>

{#if isLoaded === true}
	<div class="flex justify-between w-full gap-10">
		{#if mergedBills.length !== 0}
			<BillsChart data={mergeByCategory(mergedBills)} />
		{:else}
			<h1>No data yet</h1>
		{/if}
		<div class="flex flex-column">
			{#if open}
				<BillModal bind:open>
					<BillModalForm />
				</BillModal>
			{/if}
			<div class="flex flex-col items-center gap-3">
				<button on:click={openBillModal}>Create bill</button>
				{#if mergedBills.length !== 0}
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
