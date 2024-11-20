<script>
    import Ad from "$lib/components/Ad.svelte";
    import { supabase } from '$lib/supabaseClient';

    let ads = [];
    let ads_copy = [];
    let filterSet = new Set();
    let maxPrice = 200; // Assuming 100 is the max price for simplicity
    let selectedPrice = maxPrice; // Default to max price

    let searchBar;

    async function fetchData(table) {
        const { data, error } = await supabase.from(table).select();
        if (error) {
            console.error("Error fetching ads: ", err.message);
            return;
        }
        ads = data;
        ads_copy = [...data];
    }

    fetchData("ads");

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
            const keywords = searchBar.value.toLowerCase().split(" ");
            let searchMatch = true;
            keywords.forEach(function(word) {
                searchMatch = searchMatch && ad.title.toLowerCase().includes(word);
            });
            return typeMatch && priceMatch && searchMatch;
        });
    }

    function reset() {
        Object.keys(selected).forEach(key => selected[key] = false);
        filterSet.clear(); 
        selectedPrice = maxPrice; // Reset price filter
        ads = [...ads_copy]; 
    }
</script>

<div class="flex flex-col gap-4 mt-4 md:flex-row">
    <div class="flex flex-col w-full gap-4 mr-8 md:w-1/5">
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
            <input type="range" min="0" max={maxPrice} bind:value={selectedPrice} class="range-primary range" on:input={updateAdsDisplay} />
            <div class="flex justify-between text-xs">
                <span>$0</span>
                <span>${maxPrice * (1/4)}</span>
                <span>${maxPrice * (2/4)}</span>
                <span>${maxPrice * (3/4)}</span>
                <span>${maxPrice}</span>
            </div>
        </div>

        <button class="mt-4 btn btn-primary" on:click={reset}>Reset Filters</button>
    </div>

    <div class="w-full md:w-3/4">
        <label class="flex items-center gap-2 mb-2 input input-bordered">
            <input id="searchBar" type="text" class="grow" placeholder="Search" bind:this={searchBar} on:input={() => updateAdsDisplay()}/>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70"><path fill-rule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clip-rule="evenodd" /></svg>
          </label>

          <ul>
            <li>

            </li>
          </ul>
        <div class="divider"></div>

        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {#each ads as ad}
                <a href={"ad/" + ad.title} class="block">
                    <Ad
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
