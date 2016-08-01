
var socialShare = require("nativescript-social-share");
var swipeDelete = require("../../shared/utils/ios-swipe-delete");
var Dialog = require("ui/dialogs");
var Observable = require("data/observable").Observable;

var Page;
var Messages = require("../../shared/view-models/grocery-list-view-model");

var data = new Messages([]);
var pageData = new Observable({
    messages: data,
    message: ""
});

exports.loaded = function (args) {
    Page = args.object;
    Page.bindingContext = pageData;

    data.load();
}

exports.sendMessage = function (args) {
    if (pageData.get("message").trim() === "") {
        Dialog.alert({
            message: "Your need to enter a message before sending a message",
            okButtonText: "OK"
        });

        return false;
    }

    Page.getViewById("message").dismissSoftInput();
    data.sendMessage(pageData.get("message"));
    pageData.set("message", "");
}