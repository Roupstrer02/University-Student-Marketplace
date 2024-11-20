import { supabase } from '$lib/supabaseClient';

export function load({ params }) {
    let ads = [];
    let selectedAdData;

    async function fetchData(table) {
        try {
            const { data, error } = await supabase.from(table).select();
            if (error) {
                throw error;
            }

            ads = data;
            selectedAdData = ads.find((element) => {
                return element.title === params.selectedAd
            })
        } catch (err) {
            console.error("Error fetching ads: ", err.message);
        }
        return selectedAdData
    }


    return fetchData("ads") 
}