<script>
  import { cart, cartTotal, cartItems } from '$lib/stores/cart';

  function handleRemoveFromCart(title) {
    cart.removeFromCart(title);
  }

  async function checkout() {
    const data = await fetch("/stripe/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: $cartItems,
      }),
    }).then((data) => data.json());
    window.location.replace(data.url);
  }

</script>

<div class="container mx-auto mt-8">
  <h1 class="mb-8 text-3xl font-bold text-indigo-900">Shopping Cart</h1>

  {#if $cart.length === 0}
    <p class="text-gray-600">Your cart is empty.</p>
  {:else}
    <div class="flex flex-col gap-6 lg:flex-row">
      <!-- Left section for cart items -->
      <div class="flex-1">
        <div class="bg-white divide-y divide-gray-200 rounded-lg shadow">
          {#each $cart as item}
            <div class="flex items-center px-6 py-4 transition duration-150 ease-in-out hover:bg-gray-100">
              <!-- Image Placeholder -->
              <img src={item.image} class="flex-none w-20 h-20 mr-6 bg-gray-300 rounded-md" />
              <!-- Product details -->
              <div class="flex-1">
                <p class="font-bold text-gray-800">{item.title}</p>
                <p class="text-gray-600">${item.price}</p>
              </div>
              <!-- Total price -->
              <p class="text-gray-800">${item.totalPrice}</p>
              <!-- Remove button -->
              <button class="px-3 py-1 ml-4 text-sm font-medium text-white transition duration-150 ease-in-out bg-red-600 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500" on:click={() => handleRemoveFromCart(item.title)}>Remove</button>
            </div>
          {/each}
        </div>
      </div>

      <!-- Right section for summary -->
      <div class="flex-none w-full p-6 bg-white rounded-lg shadow lg:w-64">
        <h2 class="mb-6 text-lg font-bold text-gray-800">Summary</h2>
        <div class="flex justify-between mb-4 font-bold">
          <span>Total</span>
          <span>${$cartTotal}</span>
        </div>
        <button class="w-full px-4 py-2 text-sm font-medium text-white transition duration-150 ease-in-out bg-indigo-900 rounded-md hover:bg-indigo-800 focus:outline-none" on:click={checkout}>Checkout</button>
      </div>
    </div>
  {/if}
</div>

