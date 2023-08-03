<script lang="ts">
	import { onMount } from 'svelte';
	import { goto, afterNavigate } from '$app/navigation';
	import { getAccessToken, removeTokens } from '$shared/tokensWorkshop';
	import { page } from '$app/stores';
	import Coin from '$components/Coin.svelte';
	import './styles.css';
	import './app.css';

	let token: string | undefined;
	let route: string | null;

	onMount(() => {
		token = getAccessToken();
		route = $page.route.id;
	});

	afterNavigate((value) => {
		const isAuthRoute = /^\/auth\/.*/.test(String(value.to?.route.id));
		if (!token && !isAuthRoute) {
			goto('/auth/login', { noScroll: true, replaceState: true });
		}
	});

	$: page.subscribe((value) => {
		route = value.route.id;
	});

	const submitLogout = async () => {
		goto('/auth/login');
		removeTokens();
	};
</script>

<div class="w-screen p-8 app">
	<nav class="flex items-center justify-between pb-4">
		<div class="flex items-center gap-2">
			<h1 class="text-3xl">Specie</h1>
			<Coin />
		</div>
		{#if token}
			<button type="submit" on:click={submitLogout} class="btn btn-primary">Logout</button>
		{:else}
			<div class="flex gap-3">
				{#if route === '/auth/register'}
					<a href="/auth/login" class="btn btn-primary">Login</a>
				{/if}
				{#if route === '/auth/login'}
					<a href="/auth/register" class="btn btn-secondary">Register</a>
				{/if}
			</div>
		{/if}
	</nav>

	<main>
		<slot />
	</main>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
