<script>
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabaseClient';
  
  let profiles = [];
  let ads = [];
  let showToast = false; // Reactive variable for controlling toast visibility
  
  onMount(async () => {
    await loadProfiles();
    await loadAds();
  });

  async function loadProfiles() {
    const { data, error } = await supabase.from('profiles').select('*');
    if (error) console.error('Error:', error.message);
    else profiles = data;
  }
  
  async function loadAds() {
    const { data, error } = await supabase.from('ads').select('*');
    if (error) console.error('Error:', error.message);
    else ads = data;
  }

  async function deleteProfile(profileId) {
    const { data, error } = await supabase.from('profiles').delete().match({ id: profileId });
    if (error) console.error('Error:', error.message);
    else {
      console.log('Deleted:', data);
      loadProfiles();
      loadAds();
      displayToast();
    }
  }

  async function deleteAds(adsId) {
    const { data, error } = await supabase.from('ads').delete().match({ id: adsId });
    if (error) console.error('Error:', error.message);
    else {
      console.log('Deleted:', data);
      loadAds();
      displayToast();
    }
  }
  
  // Function to show the toast and hide it after 3 seconds
  function displayToast() {
    showToast = true;
    setTimeout(() => {
      showToast = false;
    }, 3000);
  }
</script>

<div class="flex flex-col gap-4 m-4 md:flex-row">
  <div class="flex flex-col w-full gap-4 md:w-1/2">
    <h2 class="my-4 text-xl font-semibold">Users</h2>
      <table class="table w-full overflow-hidden rounded-lg shadow-lg custom-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th class="text-center">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          {#each profiles as profiles}
            <tr class="hover:bg-gray-100">
              <td class="cursor-pointer hover:bg-green-100">{profiles.username}</td>
              <td class="cursor-pointer hover:bg-green-100">{profiles.email}</td>
              <td class="text-center">
                <button
                class="px-4 py-2 font-bold text-white transition duration-150 ease-in-out transform bg-red-500 rounded shadow-lg hover:-translate-y-1 hover:bg-red-600 hover:shadow-md"
                on:click={() => {
                  if(confirm(`Deleting user profile will delete user ads`)) {deleteProfile(profiles.id);}
              }}>
              Delete
            </button>
            </td>
          </tr>
        {/each}
        </tbody>
      </table>
  </div>

  <div class="w-full md:w-1/2">
    <h2 class="my-4 text-xl font-semibold">Ads</h2>
      <table class="table w-full overflow-hidden rounded-lg shadow-lg custom-table">
        <thead>
          <tr>
            <th >Ad ID</th>
            <th>Types Of Service</th>
            <th>Title</th>
            <th class="text-center">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          {#each ads as ads}
            <tr class="hover:bg-gray-100">
              <td class="cursor-pointer hover:bg-green-100">{ads.id}</td>
              <td class="cursor-pointer hover:bg-green-100">{ads.type_of_service}</td>
              <td class="cursor-pointer hover:bg-green-100">{ads.title}</td>
              <td class="text-center">
                <button
                class="px-4 py-2 font-bold text-white transition duration-150 ease-in-out transform bg-red-500 rounded shadow-lg hover:-translate-y-1 hover:bg-red-600 hover:shadow-md"
                on:click={() => deleteAds(ads.id)} >
                Delete
              </button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
  </div>
</div>

{#if showToast}
  <div class="fixed bottom-0 right-0 m-4 toast">
    <div class="px-4 text-white bg-red-700 alert">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 stroke-current shrink-0" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      <span>Deleted!</span>
    </div>
  </div>
{/if}
