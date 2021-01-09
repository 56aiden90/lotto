// script 로 실행하는 법
// pm2 start yarn --interpreter bash --name api -- start -p 3100

module.exports = {
    apps: [
        {
            name: "LOTTO",
            script: "yarn start -p 3000",
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: "1G",
            log_date_format: "YY-MM-DD HH:mm:ss ",
        },
    ],
};
