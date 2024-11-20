<script>
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import Image1 from '$lib/assets/Image1.png';
  import Image2 from '$lib/assets/Image2.png';
  import Image3 from '$lib/assets/Image3.png';
  import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'


  if (!!$page.data.session) {
    goto("/categories");
  } 
</script>

<div class="px-4 py-6">
  <p
    class="mb-16 text-4xl text-center text-indigo-900 md:text-left md:text-6xl"
  >
    The ultimate hub for people to buy, sell, and connect over classifieds,
    tailored for your job life - available anywhere, anytime.
  </p>
</div>
  <div class="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
    <!-- Main sections will stack vertically on mobile, and horizontally on wider screens -->
    <div class="flex flex-col items-center flex-1 text-center ">
      <div class="bg-[#1C1041] text-[#EDEFF4] p-4 rounded-md shadow-lg font-bold">
        Sell Item
        <img src="{Image1}" class="w-3/4 mx-auto mt-4 rounded-lg" alt="">
      </div>
    </div>
    <div class="flex flex-col items-center flex-1 text-center">
      <div class="bg-[#1C1041] text-[#EDEFF4] p-4 rounded-md shadow-lg font-bold">
        Request Item
        <img src="{Image2}" class="w-3/4 mx-auto mt-4 rounded-lg" alt="">
      </div>
    </div>
    <div class="flex flex-col items-center flex-1 text-center">
      <div class="bg-[#1C1041] text-[#EDEFF4] p-4 rounded-md shadow-lg font-bold">
        Academic Services
        <img src="{Image3}" class="w-3/4 mx-auto mt-4 rounded-lg" alt="">
      </div>
    </div>
  </div>
  
