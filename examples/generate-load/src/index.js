function wait(ms) {
    // eslint-disable-next-line no-promise-executor-return -- expected
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function getRandomMethod() {
    const methods = ['GET', 'POST', 'PUT', 'DELETE'];

    return methods[Math.floor(Math.random() * methods.length)];
}

function getRandomStatusCode() {
    const statusCodes = [200, 200, 200, 201, 204, 400, 401, 403, 404, 500, 503];

    return statusCodes[Math.floor(Math.random() * statusCodes.length)];
}

(async () => {
    let count = 0;

    process.on('SIGINT', () => {
        console.info(`\n${count} requests sent`);

        process.exit(0);
    });

    setInterval(() => {
        console.info(`${count} requests sent until now`);
    }, 10 * 1000);

    const hostname = process.argv[2];

    if (!hostname) {
        throw new Error('Please provide a hostname');
    }

    const requestsPerMinute = parseInt(process.argv[3]);

    if (!requestsPerMinute) {
        throw new Error('Please provide a number of requests per minute');
    }

    // eslint-disable-next-line no-constant-condition -- expected
    while (true) {
        const method = getRandomMethod();
        const statusCode = getRandomStatusCode();

        const url = new URL(`_v/status/${statusCode}`, hostname)

        fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
        }).catch((error) => {
            console.error(error);

            process.exit(1);
        });

        console.info(`${method} ${statusCode} ${url.href}`);

        count++;

        // eslint-disable-next-line no-await-in-loop -- expected
        await wait(60 * 1000 / requestsPerMinute);
    }
})();