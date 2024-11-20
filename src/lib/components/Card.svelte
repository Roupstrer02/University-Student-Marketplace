<script>
  export let title = 'Default Title';
  export let description = 'Default description.';
  export let bgColor = 'bg-blue-100';
  export let titleColor = 'text-blue-800';
  export let textColor = 'text-blue-700';
  export let avatarSrc = '';
</script>

<div class={`flex-1 ${bgColor} rounded-lg overflow-hidden shadow-lg flex flex-col items-center p-5 text-center`}>
  {#if avatarSrc}
    <img src={avatarSrc} alt="Avatar" class="w-24 h-24 rounded-full object-cover mb-4">
  {/if}
  <div class="text-3xl font-extrabold tracking-tight">{title}</div>
  <p class={`${textColor} text-4xl font-extrabold`}>{description}</p>
</div>