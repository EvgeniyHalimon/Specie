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
	import { currentMonth, lastDayOfMonth, currentYear } from '$shared/date';
	import { mergeByCategory, mergeByDay, mergedByMonth } from '$shared/formatData';
	import type { IBill, IMergedBill, IMergedByDay, IMergedByMonth, IQueries } from '$shared/types';
	import { getName } from '$shared/utils';
	import { bills, billsTotalPages, categories, subcategories } from '$store/store';
	import { onMount } from 'svelte';
	let open: boolean = false;
	let isLoaded: boolean = false;
	let mergedBills: IMergedBill[];
	let billsByWeek: IMergedByDay[];
	let billsByMonth: IMergedByMonth[];
	const openBillModal = () => (open = !open);

	let month = currentMonth;
	let year = currentYear;
	let currMonth = (month: number) => {
		return `${month + 1 > 9 ? month + 1 : `0${month + 1}`}`;
	};

	let gteDate = `${year}-${currMonth(month)}-01`;
	let lteDate = `${currentYear}-${currMonth(month)}-${lastDayOfMonth(currentYear, month)}`;

	$: page = 0;

	let queries: IQueries = {
		search: '',
		skip: page,
		take: 5,
		sortBy: 'createdAt',
		sort: 'asc',
		gteDate: gteDate,
		lteDate: lteDate
	};

	const getData = async () => {
		try {
			const { data: cat } = await axiosWorker().get(GET_CATEGORIES);
			if (cat) categories.set(cat);
			const { data } = await axiosWorker().get(GET_SUBCATEGORIES);
			if (data) subcategories.set(data);
			const { data: billData } = await axiosWorker().get(GET_BILLS({ ...queries, skip: page }));
			console.log('🚀 ~ file: +page.svelte:52 ~ getData ~ queries:', queries);
			if (billData) {
				billsTotalPages.set(billData.totalPages);
				const sorted = billData.data.map((item: IBill) => {
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
				billsByWeek = mergeByDay(sorted);
				billsByMonth = mergedByMonth(sorted);
			}
			isLoaded = true;
		} catch (error) {
			console.log('🚀 ~ file: +page.svelte:13 ~ getCategories ~ error:', error);
		}
	};

	let pagination = Array($billsTotalPages).fill(false);
	const skipToFirstPage = () => {
		queries = { ...queries, skip: 0 };
	};

	const skipToLastPage = () => {
		queries = { ...queries, skip: ($billsTotalPages - 1) * 5 };
	};

	const goToPage = (page: number) => {
		page = page + 5;
	};

	const goToNextPage = () => {
		if (page >= $billsTotalPages) {
			return;
		}
		queries = { ...queries, skip: page + 5 };
	};

	const goToPrevPage = () => {
		if (page <= 0) {
			return;
		}
		queries = { ...queries, skip: page - 5 };
	};

	onMount(() => {
		getData();
	});

	$: async () => {
		const { data: billData } = await axiosWorker().get(GET_BILLS({ ...queries, skip: page }));
		console.log('🚀 ~ file: +page.svelte:52 ~ getData ~ queries:', queries);
		if (billData) {
			billsTotalPages.set(billData.totalPages);
			const sorted = billData.data.map((item: IBill) => {
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
			billsByWeek = mergeByDay(sorted);
			billsByMonth = mergedByMonth(sorted);
		}
	};
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
					<BillsTable bind:queries />
					<div class="flex gap-2">
						<button
							class="w-6 h-6 rounded-sm bg-slate-400 flex items-center justify-center"
							on:click={skipToFirstPage}
						>
							⇇
						</button>
						<button
							class="w-6 h-6 rounded-sm bg-slate-400 flex items-center justify-center"
							on:click={goToPrevPage}
						>
							←
						</button>
						{#each pagination as bill, i}
							<button
								class="w-6 h-6 rounded-sm bg-slate-400 flex items-center justify-center"
								on:click={() => goToPage(i)}
							>
								{i + 1}
							</button>
						{/each}
						<button
							class="w-6 h-6 rounded-sm bg-slate-400 flex items-center justify-center"
							on:click={goToNextPage}
						>
							→
						</button>
						<button
							class="w-6 h-6 rounded-sm bg-slate-400 flex items-center justify-center"
							on:click={skipToLastPage}
						>
							⇉
						</button>
					</div>
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
