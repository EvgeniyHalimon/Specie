<script lang="ts">
	import axiosWorker from '$shared/axios';
	import { POST_BILL } from '$shared/constants';
	import { categories, subcategories } from '$store/store';
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
			console.log('🚀 ~ file: +page.svelte:23 ~ register ~ data:', data);
		} catch (err: any) {
			console.log('🚀 ~ file: +page.svelte:24 ~ login ~ err:', err);
		}
	};
</script>

<form on:submit|preventDefault={register} class="flex flex-col justify-between h-full gap-4 cursor-default">
	<Select bind:value={categoryValue} selectData={$categories} />
	<Select
		bind:value={subcategoryValue}
		selectData={$subcategories.filter((sub) => sub.categoryID === categoryValue)}
	/>
	<label for="price">Price</label>
	<input
		type="number"
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
