const app = require('./core/app');
const config = require('./core/config');

async function main() {
    const api = await app();

    return api.listen(config.port, () => {
        console.log(
            `Server is running on port ${config.port} (http://localhost:${config.port})`
        );
    });
}

main();
