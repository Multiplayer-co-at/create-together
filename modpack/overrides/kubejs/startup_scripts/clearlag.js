const ignoredItems = []

function clearlagWarning(server, callback) {
  server.tell([
    Text.lightPurple('[ClearLag]'),
    ' Clearing Items in 5 minutes.'
  ])
  server.schedule(5 * MINUTE, (_) => clearlag(server, callback))
}

function clearlag(server, callback) {
  const entities = server.getEntities('@e[type=item]');
  let entityCount = 0;
  let entityChunks = {};
  
  entities.forEach(entity => {
    const { item } = entity;
    if (ignoredItems.indexOf(item.getId().toString()) !== -1) {
        return;
    }
    const chunkX = Math.floor(entity.getX() / 16)
    const chunkZ = Math.floor(entity.getZ() / 16)
    const chunkName = "x=" + chunkX + " z=" + chunkZ;
    if (!entityChunks[chunkName] || entityChunks[chunkName] < 0) {
        entityChunks[chunkName] = 0
    }
    entityChunks[chunkName] = entityChunks[chunkName] + item.getCount();
    entityCount = entityCount + item.getCount();
    entity.kill();
  });

  let mostPollutedChunk = ""
  Object.keys(entityChunks).forEach((entityChunk) => {
      const count = entityChunks[entityChunk];
      const previousCount = entityChunks[mostPollutedChunk] || 0;
      if (count > previousCount) {
          mostPollutedChunk = entityChunk;
      }
  })
  
  const pollution = entityCount / Object.keys(entityChunks).length
  server.tell([
    Text.lightPurple('[ClearLag]'),
    ' Removed ',
    Math.floor(entityCount),
    ' items in ',
    Math.floor(Object.keys(entityChunks).length),
    ' chunks. pollution level: ',
    Math.floor(pollution)
  ]);
  if (pollution >= 100) {
    server.tell([
      Text.lightPurple('[ClearLag]'),
      ' Chunk ',
      mostPollutedChunk,
      ' is most polluted!'
  	]);
  }  
  
  callback.reschedule();
}

onEvent('server.load', (event) => event.getServer().schedule(10 * MINUTE, (callback) => clearlagWarning(event.getServer(), callback)))
