<script>
    import { cart, cartItems } from "$lib/stores/cart";
    import { supabase } from "$lib/supabaseClient";
    import { page } from "$app/stores";
    import Messages from "$lib/components/Messages.svelte";
    import { goto } from "$app/navigation";
    export let data;
    let otherUsername;
    let myUsername;
    let user;
    let showAlert = false;
    let contactInfo;
    let contactAdPoster = false;
    let profiles = [];
    async function testing() {
      goto("/dashboard?data="+data.user_id)
    }

    async function loadProfiles() {
        const { data, error } = await supabase.from("profiles").select("*");
        if (error) console.error("Error:", error.message);
        else {
            profiles = data;
            console.log(profiles);
        }
    }
    function handleAddToCart() {
        let canAddToCart = true;
        $cartItems.forEach((item) => {
            if (item.id == data.id) {
                canAddToCart = false;
            }
        });

        if (canAddToCart) {
            cart.addToCart(data);
            showAlert = true;
            setTimeout(() => {
                showAlert = false;
            }, 3000);
        }
    }

    async function getData() {
        const { data: userdata, error } = await supabase
            .from("profiles")
            .select();
        userdata.forEach((profile) => {
            if (profile.id == data.user_id) {
                contactInfo = profile.username;
            }
        });
    }
</script>

<div class="flex flex-wrap items-start justify-center gap-4 mt-16 md:gap-10">
    <img
        src={data.images}
        alt={data.imageAlt}
        class="object-cover w-full h-auto border-2 border-gray-200 rounded-lg sm:w-1/2 md:w-96"
    />
    <div
        class="flex flex-col items-start w-full gap-2 md:gap-3 md:items-start md:w-1/2"
    >
        <h1 class="text-2xl font-bold text-indigo-900 md:text-4xl">
            {data.title}
        </h1>
        <h3 class="text-lg font-bold text-indigo-900 md:text-xl">
            ${data.price}
        </h3>
        <div class="flex justify-start w-full md:justify-end card-actions">
            <div
                class="text-xs text-white badge badge-primary badge-outline md:text-sm"
            >
                {data.type_of_service}
            </div>
        </div>
        <div class="text-sm text-gray-600 md:text-base">
            {data.description}
        </div>
        {#await getData()}
            <div></div>
        {:then _}
            {#if data.type_of_service == "Items Wanted"}
                <div class="mb-4">
                    <br />
                    Posted by
                    <b class="text-white badge badge-primary">{contactInfo}</b>
                </div>
            {:else}
                <div class="mt-4 md:mt-8">
                    Posted by
                    <b class="text-white badge badge-primary">{contactInfo}</b>
                    <br />
                    <button
                        class="px-4 py-2 mt-4 text-white transition-colors duration-200 ease-in-out bg-indigo-900 btn btn-primary hover:bg-indigo-700"
                        on:click={handleAddToCart}>Add to Cart</button
                    >
                </div>
            {/if}
        {/await}
        <button
            class="px-4 py-2 text-white transition-colors duration-200 ease-in-out bg-indigo-900 btn btn-primary hover:bg-indigo-700"
            on:click={() => {
                testing();
            }}
        >
            {contactAdPoster ? "Close Chat" : "Chat With Ad Poster"}
        </button>
        {#if contactAdPoster}
            <Messages userId={user.id} receiverId={data.user_id} otherUsername = {otherUsername} myUsername = {myUsername} />
        {/if}
        {#if showAlert}
            <div class="toast">
                <div class="px-4 text-white bg-indigo-700 alert">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-6 h-6 stroke-current shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        ><path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        /></svg
                    >
                    <span>Added to cart!</span>
                </div>
            </div>
        {/if}
    </div>
</div>
