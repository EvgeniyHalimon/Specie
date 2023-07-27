<script lang="ts">
	import { goto } from '$app/navigation';
	import axiosWorker from '$shared/axios';
	import { REGISTER } from '$shared/constants';
	import { saveTokens } from '$shared/tokensWorkshop';
	import { onMount } from 'svelte';

	let password = '';
	let email = '';
	let firstname = '';
	let lastname = '';
	let message: null | string = null;

	const { post } = axiosWorker();

	const register = async () => {
		try {
			const { data } = await post(REGISTER, {
				email: email,
				password: password,
				firstname: firstname,
				lastname: lastname
			});
			message = data.message;
			console.log('🚀 ~ file: +page.svelte:23 ~ register ~ data:', data);
		} catch (err: any) {
			console.log('🚀 ~ file: +page.svelte:24 ~ login ~ err:', err);
		}
	};
</script>

<form on:submit|preventDefault={register} class="flex flex-col gap-3">
	<label for="firstname">First name</label>
	<input
		type="text"
		id="firstname"
		name="firstname"
		bind:value={firstname}
		autocomplete="off"
		class="h-8 pl-2 text-black border-0 rounded-md caret-black bg-stone-400"
	/>
	<label for="lastname">Last name</label>
	<input
		type="text"
		id="lastname"
		name="lastname"
		bind:value={lastname}
		autocomplete="off"
		class="h-8 pl-2 text-black border-0 rounded-md caret-black bg-stone-400"
	/>
	<label for="email">Email</label>
	<input
		name="email"
		id="email"
		bind:value={email}
		autocomplete="off"
		class="h-8 pl-2 text-black border-0 rounded-md caret-black bg-stone-400"
	/>
	<label for="password">Password</label>
	<input
		type="password"
		id="password"
		name="password"
		bind:value={password}
		autocomplete="off"
		class="h-8 pl-2 mb-2 text-black border-0 rounded-md caret-black bg-stone-400"
	/>
	{#if !message}
		<button type="submit" class="self-center p-2 bg-gray-600 rounded-md hover:bg-gray-500"
			>Register</button
		>
	{:else}
		<p class="text-center text-green-700">{`✔️ ${message}`}</p>
	{/if}
	<p class="text-center">
		Don't have an account? <a href="/auth/login" class="underline">Jump in!</a>
	</p>
</form>
