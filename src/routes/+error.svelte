<div class="flex items-center justify-center mt-20">
  <div class="text-center">
    <h1 class="mb-8 text-5xl font-bold">You seem a little lost...</h1>
    <p class="mb-4">Would you like to get back to shopping?</p>
    <button onclick="window.location.assign(window.parent.location.origin + '/categories');" class="px-6 py-3 mb-2 text-white transition duration-150 ease-in-out bg-indigo-900 rounded-md hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
      Back to Marketplace  →
    </button>

    <div class="mt-8">
      <p class="mb-4">Would you rather view your own pages?</p>
      <div class="space-y-2">
        <button onclick="window.location.assign(window.parent.location.origin + '/dashboard');" class="w-full px-6 py-3 text-white transition duration-150 ease-in-out bg-indigo-900 rounded-md hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          My Dashboard
        </button>
        <button onclick="window.location.assign(window.parent.location.origin + '/myads');" class="w-full px-6 py-3 text-white transition duration-150 ease-in-out bg-indigo-900 rounded-md hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
          View My Ads
        </button>
        <button onclick="window.location.assign(window.parent.location.origin + '/postads');" class="w-full px-6 py-3 text-white transition duration-150 ease-in-out bg-indigo-900 rounded-md hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
          Post a New Ad
        </button>
      </div>
    </div>
  </div>
</div>
