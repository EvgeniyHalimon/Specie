<script lang="ts">
	import BillModal from '$components/BillModal.svelte';
	import BillModalForm from '$components/BillModalForm.svelte';
	import BillsChart from '$components/BillsChart.svelte';
	import BillsTable from '$components/BillsTable.svelte';
	import LoadCoin from '$components/LoadCoin.svelte';
	import MonthlyBillChart from '$components/MonthlyBillChart.svelte';
	import WeeklyBillsChart from '$components/WeeklyBillsChart.svelte';
	import axiosWorker from '$shared/axios';
	import { GET_BILLS, GET_CATEGORIES, GET_SUBCATEGORIES } from '$shared/constants';
	import type { IBill, IMergedBill, IMergedByDay } from '$shared/types';
	import { getName } from '$shared/utils';
	import { bills, categories, subcategories } from '$store/store';
	import { onMount } from 'svelte';
	let open: boolean = false;
	let isLoaded: boolean = false;
	let mergedBills: IMergedBill[];
	let billsByWeek: any;
	const openBillModal = () => (open = !open);

	const mergeByCategory = (arr: IMergedBill[]) => {
		return arr.reduce((result: IMergedBill[], current: IMergedBill) => {
			const existingItem = result.find((item: IMergedBill) => item.category === current.category);
			if (existingItem) {
				let b = Number(existingItem.price);
				b += Number(current.price);
			} else {
				result.push({
					category: current.category,
					price: Number(current.price),
					categoryID: current.categoryID
				});
			}
			return result;
		}, []);
	};

	const mergeByDay = (arr: IBill[]) => {
		return arr.reduce((result: IMergedByDay[], current: any) => {
			const existingItem = result.find(
				(item: any) => new Date(item.createdAt).getDate() === new Date(current.createdAt).getDate()
			);

			if (existingItem) {
				existingItem.price += current.price;
			} else {
				result.push({
					date: new Date(current.createdAt).getDate(),
					price: current.price,
					categoryID: current.categoryID,
					createdAt: current.createdAt
				});
			}
			return result;
		}, []);
	};

	const getData = async () => {
		try {
			const { data: cat } = await axiosWorker().get(GET_CATEGORIES);
			if (cat) categories.set(cat);
			const { data } = await axiosWorker().get(GET_SUBCATEGORIES);
			if (data) subcategories.set(data);
			const { data: billData } = await axiosWorker().get(GET_BILLS);
			if (data) {
				const sorted = billData
					.sort((a: IBill, b: IBill) => a.createdAt.localeCompare(b.createdAt))
					.map((item: IBill) => {
						return { ...item, price: Number(item.price) };
					});
				bills.set(sorted);
				mergedBills = sorted.map((bill: any) => {
					return {
						category: getName(bill.categoryID, $categories),
						price: bill.price,
						categoryID: bill.categoryID
					};
				});
				billsByWeek = mergeByDay(sorted);
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
	<div class="flex justify-between w-full gap-10">
		<WeeklyBillsChart {billsByWeek} />
		<MonthlyBillChart />
	</div>
{:else}
	<LoadCoin />
{/if}
