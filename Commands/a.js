module.exports = {
    config: {
        name: "test",
        category: 'test',
        description: "test description"
    },
    onExecute: async function (message, args, QAT) {
        message.channel.send("OH JUNGE DU HURENSOHN");
    }
}