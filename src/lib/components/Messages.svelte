<script>
    import { onMount, onDestroy } from "svelte";
    import { supabase } from "$lib/supabaseClient";
    import { page } from "$app/stores";
    let userId;
    let profiles = {};

    async function loadProfiles() {
        const { data, error } = await supabase.from("profiles").select("*");
        if (error){
            console.log("here");
            console.error("Error:", error.message);
        } 
        else {
            for(let profile of data){
                profiles[profile.id] = profile
            }
        }
    }

    if ($page.data.session) {
        userId = $page.data.session.user;
        console.log(userId);
    }
    export let receiverId;
    export let otherUsername;
    export let myUsername;

    let newMessage = "";
    let messages = [];
    let filtered = [];
    console.log();
    let selectedReceiverId = receiverId; // first time the component loads and we have not selected a reply
    // gives u the chat that happened between two people
    function ourChat(otherPersonUid, myUid) {
        let filtered = messages.filter(
            (message) =>
                message.pair_test &&
                (message.pair_test.sender === myUid ||
                    message.pair_test.receiver === myUid),
        );
        console.log(filtered);
        return filtered;
    }

    async function fetchMessages() {
        console.log("inheree");
        const { data, error } = await supabase
            .from("messages")
            .select("*")
            .order("created_at", { ascending: false });

        console.log("in hereeee");
        if (!error) {
            messages = data;
            console.log(messages);
            filtered = ourChat(receiverId, userId.id);
        } else {
            console.error(error);
        }
    }

    async function sendMessage() {
        console.log("hereee");
        const { error } = await supabase.from("messages").insert([
            {
                uid: userId.id,
                content: newMessage,
                pair_test: {
                    sender: userId.id,
                    // receiver: receiverId,
                    receiver: selectedReceiverId,
                },
            },
        ]);

        if (!error) {
            newMessage = ""; // Clear the input after sending
        } else {
            console.error(error);
        }
    }
    function handleMessageClick(sendTo) {
        selectedReceiverId = sendTo;
    }
    onMount(async () => {
        console.log("here");
        await fetchMessages();
        await loadProfiles(); 
        // listening to changes in the db and updating messages arr
        const messageSubscription = supabase
            .channel("testChannel")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "messages" },
                async () => {
                    console.log("change detected");
                    await fetchMessages();
                },
            )
            .subscribe();

        return () => {
            // Cleanup subscription when component unmounts
            supabase.removeSubscription(messageSubscription);
        };
    });
</script>


<main class="mt-4 ">
    <h1 class="mb-4 text-xl font-bold">My Chats</h1>
    <div id="message-list" class="mt-2 space-y-2 overflow-y-auto max-h-96">
        {#each filtered as message (message.id)}
            <div class="p-4 space-y-2 bg-white rounded-lg shadow">
                <div class="flex items-center justify-between">
                    <button
                        class="px-3 py-1 text-sm font-bold text-white bg-blue-500 rounded hover:bg-blue-600"
                        on:click={() => handleMessageClick(message.pair_test.sender)}
                    >
                        reply
                    </button>
                    <div class="flex items-center gap-2">
                        <span class="italic font-bold">@sender:</span>
                        {#if profiles[message.pair_test.sender]}
                            <span class="text-gray-700">{profiles[message.pair_test.sender].username}</span>
                        {/if}
                        <span class="italic font-bold">@receiver:</span>
                        {#if profiles[message.pair_test.receiver]}
                            <span class="text-gray-700">{profiles[message.pair_test.receiver].username}</span>
                        {/if}
                    </div>
                </div>
                <p class="ml-4">{message.content}</p>
            </div>
        {/each}
    </div>
    <form class="mt-4" on:submit|preventDefault={sendMessage}>
        <div class="flex gap-2">
            <input
                type="text"
                class="flex-grow p-2 border border-gray-400 rounded"
                placeholder="Type a message..."
                bind:value={newMessage} 
            />
            <button type="submit" class="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600">
                Send
            </button>
        </div>
    </form>
</main>