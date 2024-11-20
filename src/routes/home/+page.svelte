<script>
  
  import { page } from "$app/stores";
  let name = "";
  
  if (!!$page.data.session){
    name = $page.data.session.user.user_metadata.user_name;
  }
</script>

<p class="mt-16 text-6xl text-indigo-900">Welcome to marketplace {name}! </p>
<p class="mt-16 text-3xl italic text-indigo-900">Display all ads here?</p>
