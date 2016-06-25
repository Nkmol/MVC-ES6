import "babel-polyfill"; // Used for Promise polyfill
import 'whatwg-fetch';

import Extends from "./Extends"
import Controller from "./Controllers/Controller";

Extends.run(); // Load extensions
$(document).ready(function() {
    new Controller().loadViewPromise();
});