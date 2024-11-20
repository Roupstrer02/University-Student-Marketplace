<script>
  export let type;
  export let imageSrc;
  export let adTitle;
  export let adPrice;
  export let adDescription;
</script>

<div class="flex items-center w-full p-6 shadow rounded-xl">
  <img class="flex-none w-24 h-24 mr-4" src={imageSrc} alt="Image description" />
  <div class="flex-grow">
    <div class="px-2 py-1 mb-4 text-sm font-medium text-indigo-100 bg-indigo-900 rounded-md w-fit">{type}</div>
    <p class="mb-2 text-xl">{adTitle}</p>
    <p class="mb-2 text-gray-400 line-clamp-1">{adDescription}</p>
    <p class="mb-2 text-md">${adPrice}</p>
  </div>
</div>




