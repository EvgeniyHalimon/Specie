<script lang="ts">
	import axiosWorker from '$shared/axios';
	import { POST_BILL } from '$shared/constants';
	import { bills, categories, filteredSubcategories, subcategories } from '$store/store';
	import { onMount, afterUpdate } from 'svelte';
	import Select from './Select.svelte';
	let categoryValue = 1;
	let subcategoryValue = 1;
	let comment = '';
	let price = 0;

	const { post } = axiosWorker();

	const register = async () => {
		try {
			const { data } = await post(POST_BILL, {
				price: price,
				comment: comment,
				categoryID: categoryValue,
				subcategoryID: subcategoryValue
			});
			console.log('🚀 ~ file: BillModalContent.svelte:22 ~ register ~ data:', data);
			categoryValue = 1;
			subcategoryValue = 1;
			comment = '';
			price = 0;
			bills.set([...$bills, data]);
		} catch (err: any) {
			console.log('🚀 ~ file: +page.svelte:24 ~ login ~ err:', err);
		}
	};

	const filterSubcategories = () => {
		const filtered = $subcategories.filter((sub) => sub.categoryID === categoryValue);
		filteredSubcategories.set(filtered);
	};

	afterUpdate(filterSubcategories);

	onMount(() => {
		filterSubcategories();
	});
</script>

<form
	on:submit|preventDefault={register}
	class="flex flex-col justify-between h-full gap-4 cursor-default"
>
	<Select bind:value={categoryValue} selectData={$categories} />
	<Select bind:value={subcategoryValue} selectData={$filteredSubcategories} />
	<label for="price">Price</label>
	<input
		type="number"
		min="1"
		step="any"
		id="price"
		name="price"
		bind:value={price}
		autocomplete="off"
		class="h-8 pl-2 text-black border-0 rounded-md resize-none caret-black bg-stone-400"
	/>
	<label for="comment">Comment</label>
	<textarea
		id="comment"
		name="comment"
		bind:value={comment}
		autocomplete="off"
		class="h-40 pl-2 mb-2 text-black border-0 rounded-md resize-none caret-black bg-stone-400"
	/>
	<button type="submit" class="self-center p-2 bg-gray-600 rounded-md hover:bg-gray-500"
		>Post bill</button
	>
</form>
