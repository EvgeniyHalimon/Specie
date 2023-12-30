<script lang="ts">
	import { BillModal as Modal } from '$components';
	import type { IQueries } from '$shared/types';
	import { getName } from '$shared/utils';
	import { bills, categories, subcategories, billsTotalPages } from '$store/store';
	import TableCell from './TableCell.svelte';
	import TableModalContent from './TableModalContent.svelte';
	export let queries: IQueries;
	let open = Array($bills.length).fill(false);

	let selectedIds: number[] = [];

	let checkboxStates: Record<number, boolean> = {};

	const toggleSelection = (id: number) => {
		if (selectedIds.includes(id)) {
			selectedIds = selectedIds.filter((selectedId) => selectedId !== id);
		}
		selectedIds = [...selectedIds, id];

		checkboxStates[id] = selectedIds.includes(id);
	};

	const openTableModal = (index: number) => {
		open[index] = !open[index];
	};
	const selectAll = () => {
		selectedIds = $bills.map((bill) => bill._id);
	};
	const unselectAll = () => {
		selectedIds = [];
	};

	const includes = (id: number) => {
		return selectedIds.includes(id);
	};
</script>

<table>
	<thead>
		<tr>
			<th style="width: 4rem">
				<input type="checkbox" on:change={selectAll} />
			</th>
			<th>Category</th>
			<th>Subcategory</th>
			<th>Price</th>
		</tr>
	</thead>
	<tbody>
		{#each $bills as bill, index}
			<tr>
				<td class="w-4">
					<input
						type="checkbox"
						bind:checked={checkboxStates[bill._id]}
						on:change={() => toggleSelection(bill._id)}
					/>
				</td>
				<td on:click={() => openTableModal(index)} class="hover:bg-slate-300"
					>{getName(bill.categoryID, $categories)}</td
				>
				<td class="border-x-[#c0c0c0] border-r border-l hover:bg-slate-300">
					{getName(bill.subcategoryID, $subcategories)}
				</td>
				<TableCell columnData={bill} />
				{#if open[index]}
					<Modal bind:open={open[index]}>
						<TableModalContent {bill} />
					</Modal>
				{/if}
			</tr>
		{/each}
	</tbody>
</table>

<style>
	table {
		width: 450px;
		border-collapse: collapse;
		overflow: hidden;
		box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
		border-radius: 6px;
		margin-bottom: 12px;
		background-image: radial-gradient(
				50% 50% at 50% 50%,
				rgba(220, 220, 220, 0.75) 0%,
				rgba(255, 255, 255, 0) 100%
			),
			linear-gradient(180deg, var(--color-bg-0) 0%, var(--color-bg-1) 15%, var(--color-bg-2) 50%);
	}

	th,
	td {
		padding: 16px;
		text-align: center;
		color: rgba(0, 0, 0, 0.822);
	}

	th {
		text-align: center;
		width: calc(100% / 3);
	}

	thead th {
		color: white;
		background-color: #7285d5;
	}

	tbody tr {
		border-bottom: 1px solid silver;
	}

	tbody tr:last-child {
		border-bottom: none;
	}

	.b {
		border-right: 1px solid silver;
		border-left: 1px solid silver;
	}
</style>
