<script>
  import "../app.css";
  import Navbar from "$lib/components/Navbar.svelte";
  import Footer from "$lib/components/Footer.svelte";
</script>


<div class="max-w-[90rem] flex flex-col min-h-screen mx-auto">
  <Navbar />
  <main class="flex-grow">
    <slot />
  </main>
 <Footer/>
  </div>