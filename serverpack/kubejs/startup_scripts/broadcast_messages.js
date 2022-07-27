onEvent('server.load', function (event) {
  //event.server.schedule(1 * MINUTE, event.getServer(), debug)
  event.server.schedule(15 * MINUTE, event.getServer(), liveMap)
  event.server.schedule(20 * MINUTE, event.getServer(), discord)
  event.server.schedule(120 * MINUTE, event.getServer(), vote)
})

function debug(callback) {
    callback.getData().tell('Debug Broadcast')
    callback.reschedule()
}

function discord(callback) {
    callback.getData().tell(Text.of([
			Text.white("Join our Discord! "),
			Text.gold("Click Here").hover('Open https://discord.multiplayer.co.at').click('https://discord.multiplayer.co.at')
		]))
    callback.reschedule()
}

function liveMap(callback) {
    callback.getData().tell(Text.of([
			Text.white("Visit the Live Map! "),
			Text.gold("Click Here").hover('Open https://create-together-map.multiplayer.co.at/').click('https://create-together-map.multiplayer.co.at/')
		]))
    callback.reschedule()
}

function vote(callback) {
    callback.getData().tell(Text.of([
			Text.white("Buy a coffee for the Server! "),
			Text.gold("Click Here").hover('Open https://www.buymeacoffee.com/multiplayercoat').click('https://www.buymeacoffee.com/multiplayercoat')
		]))
    callback.reschedule()
}
