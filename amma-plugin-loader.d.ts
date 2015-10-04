
declare module "amma-plugin-loader/index"{
    import tmp = require('index');
    export = tmp;
}

declare module "amma-plugin-loader/test/unit-testing/index.test"{
    import tmp = require('test/unit-testing/index.test');
    export = tmp;
}

declare module "amma-plugin-loader/test/unit-testing/test-sample-module/controller"{
    import tmp = require('test/unit-testing/test-sample-module/controller');
    export = tmp;
}

declare module "amma-plugin-loader/test/unit-testing/test-sample-module/failure-run"{
    import tmp = require('test/unit-testing/test-sample-module/failure-run');
    export = tmp;
}

declare module "amma-plugin-loader/test/unit-testing/test-sample-module/index"{
    import tmp = require('test/unit-testing/test-sample-module/index');
    export = tmp;
}

declare module "amma-plugin-loader/test/unit-testing/test-sample-module/success-run"{
    import tmp = require('test/unit-testing/test-sample-module/success-run');
    export = tmp;
}

declare module "amma-plugin-loader"{
    import tmp = require('index');
    export = tmp;
}