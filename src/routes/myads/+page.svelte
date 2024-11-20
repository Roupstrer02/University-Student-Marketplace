<script>
    import Ad from "$lib/components/Ad.svelte";
    import { page } from "$app/stores";
    import { onMount } from 'svelte';
    import { supabase } from '$lib/supabaseClient';
    import Myads from "$lib/components/Myads.svelte";


    let name = "";
    let uid = "";

    if (!!$page.data.session) {
        name = $page.data.session.user.email;
        uid = $page.data.session.user.id;
    }

    let ads = [];
    let ads_copy = [];
    let filterSet = new Set();
    let maxPrice = 100; // Assuming 100 is the max price for simplicity
    let selectedPrice = maxPrice; // Default to max price

    onMount(async () => {
        try {
            const { data, error } = await supabase
                .from('ads')
                .select('*')
                .eq('user_id', uid);

            if (error) {
                throw error;
            }

            ads = data || [];
            ads_copy = [...ads];
        } catch (error) {
            console.error('Error fetching ads:', error.message);
        }
    });

    let selected = {
        "Items Wanted": false,
        "Items for Sale": false,
        "Academic Services": false,
    };

    function filterAds(filterType) {
        selected[filterType] = !selected[filterType];

        if (filterSet.has(filterType)) {
            filterSet.delete(filterType);
        } else {
            filterSet.add(filterType);
        }
        updateAdsDisplay();
    }

    function updateAdsDisplay() {
        ads = ads_copy.filter(ad => {
            const typeMatch = filterSet.size === 0 || filterSet.has(ad.type_of_service);
            const priceMatch = ad.price <= selectedPrice;
            return typeMatch && priceMatch;
        });
    }

    function reset() {
        Object.keys(selected).forEach(key => selected[key] = false);
        filterSet.clear();
        selectedPrice = maxPrice;
        ads = [...ads_copy];
    }
</script>

<div class="flex flex-col gap-4 m-4 md:flex-row">
    <div class="flex flex-col w-full gap-4 md:w-1/4">
        <div class="space-y-4">
            <div class="text-lg font-bold">Filter Categories</div>
            
            <label class="flex items-center gap-2">
                <input type="checkbox" class="checkbox" bind:checked={selected["Items Wanted"]} on:click={() => filterAds("Items Wanted")}>
                <span>Items Wanted</span>
            </label>

            <label class="flex items-center gap-2">
                <input type="checkbox" class="checkbox" bind:checked={selected["Items for Sale"]} on:click={() => filterAds("Items for Sale")}>
                <span>Items for Sale</span>
            </label>

            <label class="flex items-center gap-2">
                <input type="checkbox" class="checkbox" bind:checked={selected["Academic Services"]} on:click={() => filterAds("Academic Services")}>
                <span>Academic Services</span>
            </label>
        </div>

        <div class="divider"></div>

        <div class="space-y-2">
            <div class="text-lg font-bold">Filter Price</div>
            <input type="range" min="0" max={maxPrice} bind:value={selectedPrice} class="range range-primary " on:input={updateAdsDisplay} />
            <div class="flex justify-between text-xs">
                <span>$0</span>
                <span>$25</span>
                <span>$50</span>
                <span>$75</span>
                <span>${maxPrice}</span>
            </div>
        </div>

        <button class="mt-4 btn btn-primary" on:click={reset}>Reset Filters</button>
    </div>

    <div class="w-full md:w-3/4">
        <div class="grid grid-cols-1 gap-4">
            {#each ads as ad}
                <a href={"ad/" + ad.title} class="block">
                    <Myads
                        type={ad.type_of_service}
                        imageSrc={ad.images}
                        imageAlt={ad.imageAlt}
                        adTitle={ad.title}
                        adDescription={ad.description}
                        adPrice={ad.price}
                    /> 
                   
                </a>
            {/each}
        </div>
    </div>
</div>
