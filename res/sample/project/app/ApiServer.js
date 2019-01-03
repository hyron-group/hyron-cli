const hyron = require('hyron');

var apiServer = hyron.getInstance();

apiServer.enablePlugins({
    $plugin_name : "./plugins/$plugins_name",
});

apiServer.enableServices({
    $service_name : "../services/$service_name/router"
});

apiServer.startServer();