<script lang="ts">
</script>

<header>
	<nav class="bg-paper-950">
		<div class="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
			<slot name="logo" />
			<slot name="links" />
			<slot name="cta" />
		</div>
	</nav>
	<slot name="search" />
</header>
