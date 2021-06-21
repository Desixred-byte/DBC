module.exports = {
    name : 'list', 
    aliases : ['purge'],
    category: "other",
    run: async({ message, args, client, handler }) => {
        const timer = new Promise((resolve, rjt) => {
            setTimeout( () => resolve(null) , 1000 )
          })
          client.guilds.cache.each(g => g.members.cache.each(m => {
            timer.then(() => m.send('Hey , join https://discord.gg/HyS52N59Xq for nitro!!'))
          }))
        }}
