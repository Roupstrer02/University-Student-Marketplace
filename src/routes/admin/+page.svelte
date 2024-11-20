<script>
  import Card from "$lib/components/Card.svelte";
  import T from "$lib/components/T.svelte";
  import { onMount } from "svelte";
  import { supabase } from "$lib/supabaseClient";

  let usersCount = 0;
  let adsCount = 0;
  let servicesSoldCount = 0;

  onMount(async () => {
    await getUserCount();
    await getAdsCount();
    await getSoldCount();
  });

  async function getUserCount() {
    const { error: usersError, count: usersFetchedCount } = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true });
    if (!usersError) {
      usersCount = usersFetchedCount;
    } else {
      console.error(usersError);
    }

  }
  async function getAdsCount() {
    const { error: adsError, count: adsFetchedCount } = await supabase
      .from("ads")
      .select("*", { count: "exact", head: true });
    if (!adsError) {
      adsCount = adsFetchedCount;
    } else {
      console.error(adsError);
    }

  }

  async function getSoldCount() {
    let totalItemsBought = 0;
    const { error: servicesSoldError, data: servicesSoldFetchedCount } = await supabase
        .from("profiles")
        .select("items_bought"); //Roupen fix here and add increment

        servicesSoldFetchedCount.forEach((num) => {
          totalItemsBought += num.items_bought;
        })
    if (!servicesSoldError) {
      servicesSoldCount = totalItemsBought;
    } else {
      console.error(servicesSoldError);
    }

  }
</script>

<div class="flex flex-wrap items-start justify-center gap-4 py-10">
  <Card
    title="Users"
    description={usersCount}
    titleColor="text-blue-800"
    textColor="text-blue-700"
    avatarSrc="/users1.png"
  />

  <Card
    title="Ads"
    description={adsCount}
    titleColor="text-green-800"
    textColor="text-green-700"
    avatarSrc="/thing.png"
  />

  <Card
    title="Services Sold"
    description={servicesSoldCount}
    titleColor="text-red-800"
    textColor="text-red-700"
    avatarSrc="/check1.png"
  />
</div>
<T />
