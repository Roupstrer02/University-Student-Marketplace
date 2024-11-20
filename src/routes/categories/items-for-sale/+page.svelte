<script>
    import Ad from "$lib/components/Ad.svelte";
    import { supabase } from '$lib/supabaseClient';

    let ads = [];
    let ads_copy = [];
    let filterSet = new Set();

    async function fetchData(table) {
        try {
            const { data, error } = await supabase.from(table).select();
            ads = data.filter(ad => ad.type_of_service === "Items for Sale")
            ads_copy = data;
            console.log(data);
            console.log(ads);
            if (error) {
                throw error;
            }
        } catch (err) {
            console.error("Error fetching ads: ", err.message);
        }
    }

    fetchData("ads");
    $: console.log(ads);

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
        ads = ads_copy.filter((ad) => filterSet.has(ad.type_of_service));
    }

    function reset() {
        for (let btn in selected) {
            console.log(btn);
            selected[btn] = false;
        }
        filterSet = new Set();
        ads = ads_copy;
    }
</script>

<div class="grid grid-cols-1 gap-4 mt-16 sm:grid-cols-2 lg:grid-cols-4">
    {#each ads as ad}
    <a href={"/ad/" + encodeURIComponent(ad.title)} class="block">
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
