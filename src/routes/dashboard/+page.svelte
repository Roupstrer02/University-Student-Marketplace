<script>
    import { page } from "$app/stores";
    import { supabase } from '$lib/supabaseClient';
    import { get } from "svelte/store";
    import Messages from "$lib/components/Messages.svelte";

    const queryParams = get(page).url.searchParams;
    const messageReceiver = queryParams.get("data");
    console.log(messageReceiver);


    async function getData() {
        const { data, error } = await supabase.from(tableName).select();
        
        for (let index = 0; index < data.length; index++)
        {
          if (data[index].email === name)
          {
            profile = data[index];
          }
        }
    }
    
    let name = "";
    const tableName = 'profiles';
    var profile;
  
    if (!!$page.data.session){
      name = $page.data.session.user.email;
    }
</script>

<main>

  {#await getData()}
  <div></div>
  {:then _}
  <div class="flex items-start mt-8 rounded-lg">
    <img src="{profile.avatar_url}" class="object-cover w-64 h-64 mr-8 rounded-lg" alt="profile picture"/>
    <div>
      <h1 class="text-6xl font-semibold text-gray-800">{profile.username}</h1>
      <p class="mt-2 text-lg text-gray-600">Any additional information here that can be pulled from Supabase</p>
      <p class="text-lg text-gray-600"> <span class="text-indigo-900">{profile.email}</span></p>
      <input type="button" class="px-4 py-2 mt-4 text-white bg-indigo-900 rounded-lg cursor-pointer hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50" onclick="window.location.assign(window.parent.location.origin + '/myads');" value="View my Ads">
    </div>
  </div>
  {/await}

  <Messages receiverId={messageReceiver} />
</main>

  