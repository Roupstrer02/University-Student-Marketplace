<script>
    export let type;
    export let imageSrc;
    export let imageAlt;
    export let adTitle;
    export let adPrice;
  </script>
  <div class="relative overflow-hidden bg-white rounded shadow-lg max-w-80">
    <div class="absolute top-0 left-0 px-3 py-1 text-white bg-indigo-900 rounded-br-lg">
      {type} 
    </div>
    <img class="w-full" src={imageSrc} alt={imageAlt} />
    <div class="px-6 py-4">
      <div class="mb-3 text-xl font-bold">{adTitle}</div>
      <div class="flex items-baseline">
        <span class="mr-2 text-xl font-semibold">${adPrice}</span>
      </div>
      <div class="flex mt-4">
        <button class="flex items-center justify-center w-full px-4 py-2 font-bold text-white bg-indigo-900 rounded hover:bg-indigo-800">
            See more →
        </button>
      </div>
    </div>
  </div>
