<script lang="ts">
	import BillModal from '$components/BillModal.svelte';
	import BillModalForm from '$components/BillModalForm.svelte';
	import BillsChart from '$components/BillsChart.svelte';
	import BillsTable from '$components/BillsTable.svelte';
	import LoadCoin from '$components/LoadCoin.svelte';
	import AnnualBillChart from '$components/AnnualBillsChart.svelte';
	import MonthlyBillsChart from '$components/MonthlyBillsChart.svelte';
	import axiosWorker from '$shared/axios';
	import { GET_BILLS, GET_CATEGORIES, GET_SUBCATEGORIES } from '$shared/constants';
	import { currentMonth } from '$shared/date';
	import { mergeByCategory, mergeByDay, mergedByMonth } from '$shared/formatData';
	import type { IBill, IMergedBill, IMergedByDay, IMergedByMonth } from '$shared/types';
	import { getName } from '$shared/utils';
	import { bills, categories, subcategories } from '$store/store';
	import { onMount } from 'svelte';
	let open: boolean = false;
	let isLoaded: boolean = false;
	let mergedBills: IMergedBill[];
	let billsByWeek: IMergedByDay[];
	let billsByMonth: IMergedByMonth[];
	const openBillModal = () => (open = !open);

	const getData = async () => {
		try {
			const { data: cat } = await axiosWorker().get(GET_CATEGORIES);
			if (cat) categories.set(cat);
			const { data } = await axiosWorker().get(GET_SUBCATEGORIES);
			if (data) subcategories.set(data);
			const { data: billData } = await axiosWorker().get(GET_BILLS);
			if (billData) {
				const sorted = billData
					.sort((a: IBill, b: IBill) => a.createdAt.localeCompare(b.createdAt))
					.map((item: IBill) => {
						return { ...item, price: Number(item.price) };
					});
				bills.set(sorted);
				mergedBills = sorted.map((bill: IBill) => {
					return {
						category: getName(bill.categoryID, $categories),
						price: bill.price,
						categoryID: bill.categoryID,
						createdAt: bill.createdAt
					};
				});
				billsByWeek = mergeByDay(sorted, currentMonth);
				billsByMonth = mergedByMonth(sorted);
			}
			isLoaded = true;
		} catch (error) {
			console.log('🚀 ~ file: +page.svelte:13 ~ getCategories ~ error:', error);
		}
	};

	onMount(() => {
		getData();
	});
</script>

{#if isLoaded === true}
	<div class="flex justify-between w-full gap-10">
		{#if mergedBills.length !== 0}
			<BillsChart data={mergeByCategory(mergedBills, currentMonth)} />
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
	<div class="flex justify-between w-full gap-10">
		<MonthlyBillsChart {billsByWeek} />
		<AnnualBillChart data={billsByMonth} />
	</div>
{:else}
	<LoadCoin />
{/if}
