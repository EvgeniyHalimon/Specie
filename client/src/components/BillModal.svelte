<script lang="ts">
	export let open: boolean;
	let dialog: HTMLDialogElement;
	$: if (dialog && open) dialog.showModal();

	// Event listener to close the dialog on Escape key press
	const handleKeyPress = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			dialog.close();
		}
	};

	// Function to handle dialog close
	const handleClose = () => {
		dialog.close();
	};
</script>

<!-- ARIA attributes added for accessibility -->
<dialog
	bind:this={dialog}
	on:close={() => (open = false)}
	on:keydown={handleKeyPress}
	role="dialog"
	aria-modal="true"
>
	<div class="flex flex-col justify-between h-full gap-4 cursor-default">
		<h1>BILL MODAL</h1>
		<slot />
		<button on:click={handleClose} class="self-end">Close</button>
	</div>
</dialog>

<style>
	dialog {
		width: 33rem;
		border-radius: 6px;
		border: none;
		padding: 0;
		cursor: default;
		background-image: radial-gradient(
				50% 50% at 50% 50%,
				rgba(255, 255, 255, 0.75) 0%,
				rgba(255, 255, 255, 0) 100%
			),
			linear-gradient(180deg, var(--color-bg-0) 0%, var(--color-bg-1) 15%, var(--color-bg-2) 50%);
	}

	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}

	dialog > div {
		padding: 1rem;
	}

	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}

	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}

	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
