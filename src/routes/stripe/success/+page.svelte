<script>
import { supabase } from '$lib/supabaseClient';
import { cartItems } from '$lib/stores/cart';
import { page } from "$app/stores";

let name = "";

if (!!$page.data.session){
    name = $page.data.session.user;
    }

async function getData() {
        const { data: incoming_data } = await supabase.from("profiles").select();

        let temp_data = incoming_data;
        let outgoing_data;
        for (let i = 0; i < incoming_data.length; i++) {
            if (temp_data[i].id == name.id) {
                console.log(temp_data[i].items_bought);
                temp_data[i].items_bought += $cartItems.length;
                console.log(temp_data[i].items_bought);
                outgoing_data = temp_data[i];
            }
        }
        
        console.log(outgoing_data);

        const {  } = await supabase
                .from('profiles')
                .update({items_bought: outgoing_data.items_bought})
                .eq('id', outgoing_data.id);

        for (let i = 0; i < $cartItems.length; i++) {
            const { error } = await supabase
                .from('ads')
                .delete()
                .eq('id', $cartItems[i].id)
        }

        $cartItems = [];
    }

    getData();

</script>

<main>
    <h1>Successfully ordered items!</h1>
    <br>
    <input 
        type="button" 
        class="px-4 py-2 mt-4 text-white bg-indigo-900 rounded-lg cursor-pointer hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50" 
        onclick="window.location.assign(window.parent.location.origin + '/categories');" 
        value="back to Marketplace">
</main>
