<script>
  import { enhance } from "$app/forms";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { supabase } from '$lib/supabaseClient';
  import { onMount } from 'svelte';

  onMount(async () => {
    await loadUserRoles();
  });
  
let isAdmin = false;

async function loadUserRoles() {
 
  const userId = $page.data.session.user.id; 

  const { data, error } = await supabase.from('profiles').select('role').eq('id', userId).single();

  if (error) {console.error('Error:', error.message);
  } else {
    isAdmin = data.role === 'admin';
  }}


  let loading = false;

  let name = "";
  
  if (!!$page.data.session) {
    name = $page.data.session.user.user_metadata.user_name;
  }

  const handleLogout = async () => {
    loading = true;
    let { error } = await $page.data.supabase.auth.signOut();
    if (!error) {
      await goto("/home", { invalidateAll: true, replaceState: true });
    }
    loading = false;
  };
</script>

<div class="z-10 px-0 py-4 text-indigo-900 navbar">
  <div class="navbar-start">
    <div class="dropdown">
      <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li><a href="/categories/items-wanted">Item Wanted</a></li>
        <li><a href="/categories/items-for-sale">Items for Sale</a></li>
        <li><a href="/categories/academic-services">Academic Services</a></li>
      </ul>
    </div>
    <a href="/" class="text-xl font-bold">Marketplace</a>
  </div>
  {#if $page.data.session}
  <div class="hidden navbar-center lg:flex">
    <ul class="px-1 menu menu-horizontal">
      <li><a href="/categories/items-wanted">Item Wanted</a></li>
      <li><a href="/categories/items-for-sale">Items for Sale</a></li>
      <li><a href="/categories/academic-services">Academic Services</a></li>
    </ul>
  </div>
  {/if}
  <div class="navbar-end">
    <ul class="p-0 menu menu-horizontal">
      {#if !$page.data.session}
      <form method="post" action="?/GitHubLogin" use:enhance={() => {loading = true;}}>
        <li>
          <a class="border border-indigo-900">
            <button disabled={loading} type="submit" >
              {loading ? "Signing in..." : "Sign in with GitHub"}
            </button>
          </a>
        </li>
      </form>
      {/if}
      {#if $page.data.session}
      <li><a href="/postads">Post Ad</a></li>
      <li><a href="/cart">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm1.336-5l1.977-7h-16.813l2.938 7h11.898zm4.969-10l-3.432 12h-12.597l.839 2h13.239l3.474-12h1.929l.743-2h-4.195z"/></svg>
      </a></li>
      <li on:click={handleLogout}>
        <a class="text-red-400">{loading ? "Logging out..." : "Logout"}</a>
      </li>
      <li>
        <details class="border border-indigo-900 rounded-md">
          <summary>{name}</summary>
          <ul class="p-2">
            <li><a href="/myads">My Ads</a></li>
            <li><a href="/dashboard">Dashboard</a></li>
            {#if isAdmin}
            <li><a href="/admin">Admin</a></li>
          {/if}
          </ul>
        </details>
      </li>
      {/if}
    </ul>
  </div>
</div>
