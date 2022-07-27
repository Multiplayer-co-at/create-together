const bannedItems = {
  
}

function itemCheck (item, event, player) {
  if (!item) return;

  const id = item.getId().toString()
  if (Object.keys(bannedItems).indexOf(id) === -1) return;

  item.count = 0;
  event.cancel();

  if (player && player.isPlayer()) {
    player.tell(["Item ", text.yellow(id), " has been ", text.red("removed"), ".\nReason: ", text.red(bannedItems[id])]);
  }
}

function blockCheck(block, event, player){
  if (!block) return;

  const id = block.getId().toString();
  if (Object.keys(bannedItems).indexOf(id) === -1) return;

  event.cancel();

  if (player && player.isPlayer()) {
    player.tell(["Item ", text.yellow(id), " has been ", text.red("removed"), ".\nReason: ", text.red(bannedItems[id])]);
  }
}

onEvent('block.registry', event => blockCheck(event.getBlock(), event, event.getEntity()));
onEvent("block.place", event => blockCheck(event.getBlock(), event, event.getEntity()));
onEvent("block.break", event => blockCheck(event.getBlock(), event, event.getEntity()));
onEvent("block.left_click", event => blockCheck(event.getBlock(), event, event.getEntity()));
onEvent("block.right_click", event => blockCheck(event.getBlock(), event, event.getEntity()));

onEvent("item.right_click", event => itemCheck(event.getItem(), event, event.getPlayer()));
onEvent("item.left_click", event => itemCheck(event.getItem(), event, event.getPlayer()));
onEvent("item.pickup", event => itemCheck(event.getItem(), event, event.getPlayer()));
onEvent("item.toss", event => itemCheck(event.getItem(), event, event.getPlayer()));
onEvent("item.crafted", event => itemCheck(event.getItem(), event, event.getPlayer()));
onEvent("item.smelted", event => itemCheck(event.getItem(), event, event.getPlayer()));
onEvent("item.entity_interact", event => itemCheck(event.getItem(), event, event.getPlayer()));
