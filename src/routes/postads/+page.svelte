<script>
    import { page } from "$app/stores";
    import { stripe } from '$lib/stripeClient';
    import { supabase } from '$lib/supabaseClient';

    let name = "";
    let uid = ""

    if (!!$page.data.session){
      name = $page.data.session.user.email;
    }
    if (!!$page.data.session){
      uid = $page.data.session.user.id;
    }

    let adTypeOfService = "";
    let adTitle = "";
    let adDescription = "";
    let adPrice = "";
    let adImage = [];
    let adPosted = false;
    let successMessage = '';

    async function submitAd() {
        // Prepare data object
        const data = {
            type_of_service: adTypeOfService,
            title: adTitle,
            description: adDescription,
            images: adImage,
            price: parseFloat(adPrice),
            user_id: uid,
        };

        try {
            // Send data to supabase    
            const { data: ad, error } = await supabase
                .from('ads')
                .insert(data)
                .select()

            if (error) {    
                throw error;
            }


            // Create a stripe product
            const stripeProduct = await stripe.products.create({
                name: adTitle,
                description: adDescription,
            });

            // Create a stripe price
            const stripePrice = await stripe.prices.create({
                unit_amount: parseFloat(adPrice) * 100, 
                currency: 'cad', 
                product: stripeProduct.id,
            });


            // Update supabase ad data with stripe ids
            const { error: updateError } = await supabase
                .from('ads')
                .update({ 
                    stripe_product_id: stripeProduct.id, 
                    stripe_price_id: stripePrice.id 
                })
                .match({ id: ad[0].id })

            if (updateError) { 
              throw updateError;
            }

            adTypeOfService = "";
            adTitle = "";
            adDescription = "";
            adPrice = "";
            adImage = [];

            successMessage = 'Ad posted successfully!';
            adPosted = true; 
            setTimeout(() => {
                adPosted = false;
            }, 3000);
            

        } catch (error) {
            successMessage = 'There was an error posting your ad.'
            console.error('Error posting ad, creating Stripe product/price, or updating ad:', error.message);
        }
    }
</script>

<div class="grid gap-4 m-4 md:mt-8 grid-col-1 md:grid-cols-12">
    <div class="sm:col-span-6">
        <h1 class="text-3xl font-bold text-center text-indigo-900 md:text-left">Post an Ad! </h1>
        <form on:submit|preventDefault="{submitAd}" class="w-full p-8 mx-auto mt-10 bg-white rounded-lg shadow-lg">
            <label for="adTypeOfService" class="block mb-2 text-sm font-medium text-gray-700">Type of Service</label>
            <select id="adTypeOfService" bind:value="{adTypeOfService}" required class="w-full p-3 mb-4 text-gray-600 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500">
                <option value="">Select a service type</option>
                <option value="Items Wanted">Items Wanted</option>
                <option value="Items for Sale">Items for Sale</option>
                <option value="Academic Services">Academic Services</option>
            </select>
        
            <label for="adTitle" class="block mb-2 text-sm font-medium text-gray-700">Title</label>
            <input type="text" id="adTitle" bind:value="{adTitle}" placeholder="Enter title" required class="w-full p-3 mb-4 text-gray-600 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500">
        
            <label for="adDescription" class="block mb-2 text-sm font-medium text-gray-700">Description</label>
            <textarea id="adDescription" bind:value="{adDescription}" placeholder="Enter description" required class="w-full p-3 mb-4 text-gray-600 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"></textarea>
        
            <label for="adPrice" class="block mb-2 text-sm font-medium text-gray-700">Price</label>
            <div class="flex items-center">
                <span class="mr-2 text-sm font-medium text-gray-700">$</span>
                <input type="text" id="adPrice" bind:value="{adPrice}" placeholder="Enter price" required class="flex-1 p-3 mb-4 text-gray-600 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500">
            </div>
        
            <label for="adImage" class="block mb-2 text-sm font-medium text-gray-700">Image URL</label>
            <input type="url" id="adImage" bind:value="{adImage}" placeholder="Enter image URL" class="w-full p-3 mb-6 text-gray-600 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500">
        
            <button type="submit" class="w-full p-3 text-white transition duration-150 ease-in-out bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">Submit</button>
            
            {#if adPosted}
                <div class="z-20 toast">
                    <div class="px-4 text-white bg-indigo-700 alert">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 stroke-current shrink-0" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>{successMessage}</span>
                    </div>
                  </div>
            {/if}
        </form>
        
    </div>

    <div class="hidden sm:col-span-6 lg:mt-12 md:block">
        <div class="flex justify-center">
            <div class="relative flex flex-col items-start justify-start w-3/4 h-56 gap-2 p-4 duration-500 bg-indigo-900 rounded-lg group hover:-translate-y-2 hover:shadow-xl shadow-purple-400">
                <div class="absolute w-1/2 duration-700 bg-indigo-800 rounded-lg shadow-md group-hover:-translate-y-4 group-hover:-translate-x-4 -bottom-10 -right-10 h-1/2" alt="image here">
                    <img src="https://rjlksgkqfbbfkedwbfxa.supabase.co/storage/v1/object/public/images/p.png?t=2024-03-31T17%3A40%3A26.507Z" alt="" class="rounded-lg w-fit">
                 </div>

                 <div class="absolute w-1/2 duration-700 bg-indigo-800 rounded-lg shadow-md group-hover:-translate-y-4 group-hover:-translate-x-4 -bottom-40 -left-8 h-1/2" alt="image here">
                    <img src="https://rjlksgkqfbbfkedwbfxa.supabase.co/storage/v1/object/public/images/s.png?t=2024-03-31T18%3A13%3A38.306Z" alt="" class="rounded-lg w-fit">
                 </div>

                 <div class="absolute w-1/2 duration-700 bg-indigo-800 rounded-lg shadow-md group-hover:-translate-y-4 group-hover:-translate-x-4 -bottom-80 right-4 h-1/2" alt="image here">
                    <img src="https://rjlksgkqfbbfkedwbfxa.supabase.co/storage/v1/object/public/images/b.png?t=2024-03-31T18%3A15%3A24.784Z" alt="" class="rounded-lg w-fit">
                 </div>

                <div class="">
                    <h2 class="mb-2 text-2xl font-bold text-white">Product</h2>
                    <p class="text-gray-200 line-clamp-3">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean convallis
                        magna quis lectus fermentum, quis scelerisque orci pellentesque. Duis id
                        porta justo. Sed ac enim id justo tincidunt hendrerit id ac lectus.
                        Pellentesque maximus posuere tortor vitae consequat.
                    </p>
                </div>
                    <button class="p-2 px-6 mt-6 text-black bg-white rounded ">See more </button>
                </div>
        </div>
    </div>
</div>