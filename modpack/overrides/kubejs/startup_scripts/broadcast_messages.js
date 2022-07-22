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
			Text.gold("Click Here").hover('Open https://discord.gg/GBBg3BPHRx').click('https://discord.gg/GBBg3BPHRx')
		]))
    callback.reschedule()
}

function liveMap(callback) {
    callback.getData().tell(Text.of([
			Text.white("Visit the Live Map! "),
			Text.gold("Click Here").hover('Open https://create-map.multiplayer.co.at/').click('https://create-map.multiplayer.co.at/')
		]))
    callback.reschedule()
}

function vote(callback) {
    callback.getData().tell(Text.of([
			Text.white("Vote for this Server! "),
			Text.gold("Click Here").hover('Open https://minecraft-server.eu/vote/index/223DC').click('https://minecraft-server.eu/vote/index/223DC')
		]))
    callback.reschedule()
}
