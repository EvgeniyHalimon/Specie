<script lang="ts">
	import axiosWorker from '$shared/axios';
	import { UPDATE_BILL } from '$shared/constants';
	import type { IBill } from '$shared/types';

	export let columnData: IBill;
	let updatedTitle = columnData.price;
	let open = false;

	const updatePrice = async (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			const data = await axiosWorker().put(UPDATE_BILL, {
				...columnData,
				price: updatedTitle
			});
			open = false;
		}

		if (e.key === 'Escape') {
			open = false;
			return;
		}
	};
</script>

{#if !open}
	<td class="hover:bg-slate-300 text-center p-4" on:click={() => (open = true)}>{updatedTitle}</td>
{:else}
	<td class="p-4 w-1/3">
		<input
			class="bg-transparent w-[118px] outline-none text-center"
			autofocus
			type="number"
			min="1"
			step="any"
			bind:value={updatedTitle}
			on:keydown={updatePrice}
		/>
	</td>
{/if}
