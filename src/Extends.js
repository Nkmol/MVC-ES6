export default class Extends {
    static run() {
        Extends._customTriggerHandler();
    }

    static _customTriggerHandler() {
        jQuery.fn.extend({
            customTriggerHandler: function(eventname, data = {}) {
                $(this).triggerHandler($.Event(eventname, data));
            }
        });
    }
}