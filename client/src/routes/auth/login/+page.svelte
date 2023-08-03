<script lang="ts">
	import { goto } from '$app/navigation';
	import axiosWorker from '$shared/axios';
	import { LOGIN } from '$shared/constants';
	import { saveTokens } from '$shared/tokensWorkshop';
	import { tokens } from '$store/store';

	let password = '';
	let email = '';
	let error = ' ';

	const { post } = axiosWorker();

	const login = async () => {
		try {
			const { data, message } = await post(LOGIN, {
				email: email,
				password: password
			});
			if (message) {
				error = message;
			}

			if (data) {
				saveTokens(data);
				tokens.set(data);
			}
			goto('/dashboard');
		} catch (err: any) {
			console.log('🚀 ~ file: +page.svelte:24 ~ login ~ err:', err);
		}
	};
</script>

<form on:submit|preventDefault={login} class="flex flex-col gap-3 w-[500px]">
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
	<button type="submit" class="self-center p-2 bg-gray-600 rounded-md hover:bg-gray-500"
		>Login</button
	>
	<p class="text-center">
		Don't have an account? <a href="/auth/register" class="underline">Jump in!</a>
	</p>
	<p class="text-center text-red-600">{error}</p>
</form>
