<script lang="ts">
	export let toxicResponses: string[] = [];

	if (!Array.isArray(toxicResponses)) {
		toxicResponses = [];
	}

	let editing = false;
	let editingIndex = -1;
	let editingValue = '';

	const write = async () => {
		const response = await fetch('/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(toxicResponses),
		});
		if (response.ok) {
			alert('Saved!');
		} else {
			alert('Error!');
		}
	};

	const edit = (index: number, str: string) => {
		editing = true;
		editingIndex = index;
		editingValue = str;
	};

	const save = () => {
		editing = false;
		toxicResponses[editingIndex] = editingValue;
		editingIndex = -1;
		editingValue = '';
	};

	const cancel = () => {
		editing = false;
		editingIndex = -1;
		editingValue = '';
	};
</script>

<button on:click={write}>Save All</button>

<ul>
	{#each toxicResponses as res, i}
		<li>
			{#if editing && i === editingIndex}
				<input type="text" id="toxic-{i}" bind:value={editingValue} />
				<button on:click={cancel}>Cancel</button>
				<button on:click={save}>Save</button>
				<br />
			{:else}
				<input type="text" id="toxic-{i}" value={res} disabled />
				<button on:click={() => edit(i, res)}>Edit</button><br />
			{/if}
		</li>
	{/each}
</ul>
