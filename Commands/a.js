module.exports = {
    config: {
        name: "test",
        category: 'test',
        description: "test description"
    },
    onExecute: async function (message, args, QAZ) {
        message.channel.send("OH JUNGE DU HURENSOHN");
    }
}
